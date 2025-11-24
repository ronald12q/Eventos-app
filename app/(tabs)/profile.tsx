import { auth, db } from '@/config/firebase';
import { logoutUser } from '@/services/authService';
import { getUserConfirmedEvents, getUserCreatedEvents, type EventData } from '@/services/eventService';
import { Image } from 'expo-image';
import { useFocusEffect, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const [eventos, setEventos] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userType, setUserType] = useState<'usuario' | 'organizador'>('usuario');

  const loadUserData = useCallback(async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (user) {
        setUserName(user.displayName || 'Usuario');
        setUserEmail(user.email || '');
        
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserType(userData.userType);
          
          if (userData.userType === 'organizador') {
            const eventosCreados = await getUserCreatedEvents();
            setEventos(eventosCreados);
          } else {
            const eventosConfirmados = await getUserConfirmedEvents();
            setEventos(eventosConfirmados);
          }
        }
      }
    } catch (error) {
      console.error('Error al cargar datos del perfil:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [loadUserData])
  );

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.replace('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
     
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('@/assets/images/bussiness-man.png')}
              style={styles.avatarImage}
            />
          </View>
          <Text style={styles.userName}>{userName.toUpperCase()}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>

        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>
            {userType === 'organizador' ? 'MIS EVENTOS CREADOS' : 'EVENTOS ASISTIDOS'}
          </Text>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#00D9FF" />
              <Text style={styles.loadingText}>Cargando eventos...</Text>
            </View>
          ) : eventos.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {userType === 'organizador' 
                  ? 'No has creado ningún evento aún' 
                  : 'No has confirmado asistencia a ningún evento'}
              </Text>
            </View>
          ) : (
            eventos.map((evento) => (
              <View key={evento.id} style={styles.eventoCard}>
                <View style={styles.iconContainer}>
                  <Image
                    source={require('@/assets/images/calendar.png')}
                    style={styles.calendarIcon}
                  />
                </View>

                <View style={styles.eventoInfo}>
                  <Text style={styles.eventoNombre}>{evento.nombre}</Text>
                  <View style={styles.eventoDetalles}>
                    <Text style={styles.eventoFecha}>{evento.fecha}</Text>
                    {userType === 'organizador' && (
                      <Text style={styles.eventoAsistentes}>
                        {evento.asistentes?.length || 0} asistentes
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ))
          )}
        </View>

       
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>LOG OUT</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#7B68EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 120,
    height: 120,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#999',
    letterSpacing: 0.5,
  },
  eventsSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    letterSpacing: 1.5,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: '#999',
    fontSize: 14,
    marginTop: 10,
    letterSpacing: 0.5,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  eventoCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#3A3A3A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  calendarIcon: {
    width: 40,
    height: 40,
  },
  eventoInfo: {
    flex: 1,
  },
  eventoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    letterSpacing: 1,
  },
  eventoDetalles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eventoFecha: {
    fontSize: 12,
    color: '#999',
    letterSpacing: 0.5,
  },
  eventoAsistentes: {
    fontSize: 11,
    color: '#00D9FF',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  logoutButton: {
    backgroundColor: '#00D9FF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: 20,
  },
  logoutText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
