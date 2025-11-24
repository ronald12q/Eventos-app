import { auth, db } from '@/config/firebase';
import { cancelAttendance, confirmAttendance, hasUserConfirmed } from '@/services/eventService';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function EventDetailsScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [isOrganizador, setIsOrganizador] = useState(false);

  
  const evento = {
    id: params.id as string,
    nombre: params.nombre as string,
    ubicacion: params.ubicacion as string,
    asistentes: params.asistentes as string,
    descripcion: params.descripcion as string,
    fecha: params.fecha as string,
  };

  useEffect(() => {
    checkConfirmationStatus();
  }, [evento.id]);

  const checkConfirmationStatus = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsOrganizador(userData.userType === 'organizador');
        }
      }
      
      const isConfirmed = await hasUserConfirmed(evento.id);
      setConfirmed(isConfirmed);
    } catch (error) {
      console.error('Error checking confirmation status:', error);
    } finally {
      setCheckingStatus(false);
    }
  };

  const handleConfirmar = async () => {
    setLoading(true);
    try {
      if (confirmed) {
        await cancelAttendance(evento.id);
        setConfirmed(false);
        Alert.alert(
          'Cancelado',
          'Has cancelado tu asistencia al evento',
          [{ text: 'OK', onPress: () => router.back() }]
        );
      } else {
        await confirmAttendance(evento.id);
        setConfirmed(true);
        Alert.alert(
          'Éxito',
          'Has confirmado tu asistencia al evento',
          [{ text: 'OK', onPress: () => router.back() }]
        );
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al confirmar asistencia');
    } finally {
      setLoading(false);
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
     
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Image
            source={require('@/assets/images/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

    
        <Text style={styles.title}>DETALLES</Text>

        
        <View style={styles.eventHeader}>
          <Text style={styles.eventName}>{evento.nombre}</Text>
          <Ionicons name="navigate" size={28} color="#00D9FF" />
        </View>

        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{evento.ubicacion}</Text>
          <Text style={styles.infoValue}>{evento.asistentes} ASISTENTES</Text>
        </View>


        {!isOrganizador && (
          <TouchableOpacity
            style={[
              styles.confirmarButton, 
              loading && styles.confirmarButtonDisabled,
              confirmed && styles.cancelarButton
            ]}
            onPress={handleConfirmar}
            disabled={loading || checkingStatus}
          >
            <Text style={styles.confirmarButtonText}>
              {checkingStatus ? 'CARGANDO...' : confirmed ? 'CANCELAR ASISTENCIA' : 'CONFIRMAR'}
            </Text>
          </TouchableOpacity>
        )}

  
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>DESCRIPCION</Text>
          <Text style={styles.descriptionText}>{evento.descripcion}</Text>
          <Text style={styles.fechaText}>{evento.fecha}</Text>
        </View>
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
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 30,
  },
  backIcon: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    letterSpacing: 2,
    textAlign: 'center',
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1.5,
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 12,
    color: '#999',
    letterSpacing: 0.5,
  },
  confirmarButton: {
    backgroundColor: '#00D9FF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 40,
  },
  cancelarButton: {
    backgroundColor: '#FF4444',
  },
  confirmarButtonDisabled: {
    opacity: 0.6,
  },
  confirmarButtonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  descriptionContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    padding: 25,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    letterSpacing: 1.5,
  },
  descriptionText: {
    fontSize: 13,
    color: '#CCC',
    lineHeight: 20,
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  fechaText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
