import { logoutUser } from '@/services/authService';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Datos de ejemplo del usuario
const USUARIO = {
  nombre: 'STEVEN',
  email: 'steven@gmail.com',
};

// Eventos asistidos de ejemplo
const EVENTOS_ASISTIDOS = [
  {
    id: '1',
    nombre: 'BODA',
    fecha: '24 DE NOVIEMBRE DE 2025',
  },
  {
    id: '2',
    nombre: 'GRADUACION',
    fecha: '1 DE NOVIEMBRE DE 2025',
  },
];

export default function ProfileScreen() {
  const router = useRouter();

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
        {/* Avatar y datos del usuario */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('@/assets/images/bussiness-man.png')}
              style={styles.avatarImage}
            />
          </View>
          <Text style={styles.userName}>{USUARIO.nombre}</Text>
          <Text style={styles.userEmail}>{USUARIO.email}</Text>
        </View>

        {/* Sección de eventos asistidos */}
        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>EVENTOS ASISTIDOS</Text>

          {EVENTOS_ASISTIDOS.map((evento) => (
            <View key={evento.id} style={styles.eventoCard}>
              {/* Icono de calendario */}
              <View style={styles.iconContainer}>
                <Image
                  source={require('@/assets/images/calendar.png')}
                  style={styles.calendarIcon}
                />
              </View>

              {/* Información del evento */}
              <View style={styles.eventoInfo}>
                <Text style={styles.eventoNombre}>{evento.nombre}</Text>
                <Text style={styles.eventoFecha}>{evento.fecha}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Botón Log Out */}
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
  eventoFecha: {
    fontSize: 12,
    color: '#999',
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
