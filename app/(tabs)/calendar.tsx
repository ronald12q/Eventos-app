import { cancelAttendance, EventData, getUserConfirmedEvents } from '@/services/eventService';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useFocusEffect } from 'expo-router';
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

export default function CalendarScreen() {
  const [eventos, setEventos] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  const loadConfirmedEvents = async () => {
    try {
      setLoading(true);
      const data = await getUserConfirmedEvents();
      setEventos([...data]);
    } catch (error: any) {
      alert(error.message || 'Error al cargar eventos confirmados');
    } finally {
      setLoading(false);
    }
  };

 
  useFocusEffect(
    useCallback(() => {
      loadConfirmedEvents();
    }, [])
  );

  const handleCancelAttendance = async (eventId: string, eventName: string) => {
    const confirmed = confirm(`¿Estás seguro de cancelar tu asistencia a "${eventName}"?`);
    
    if (confirmed) {
      try {
        setLoading(true);
        await cancelAttendance(eventId);
        await loadConfirmedEvents();
        alert('Has cancelado tu asistencia al evento');
      } catch (error: any) {
        console.error('Error al cancelar:', error);
        alert(error.message || 'Error al cancelar asistencia');
        setLoading(false);
      }
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      
      <View style={styles.header}>
        <Text style={styles.title}>EVENTOS CONFIRMADOS</Text>
      </View>

      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00D9FF" />
            <Text style={styles.loadingText}>Cargando eventos...</Text>
          </View>
        ) : eventos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={60} color="#666" />
            <Text style={styles.emptyText}>
            
            </Text>
          </View>
        ) : (
          <>
            {eventos.map((evento) => (
              <View key={evento.id} style={styles.eventoCard}>
               
                <View style={styles.iconContainer}>
                  <Image
                    source={require('@/assets/images/calendar.png')}
                    style={styles.calendarIcon}
                  />
                </View>

                
                <View style={styles.eventoInfo}>
                  <Text style={styles.eventoNombre}>{evento.nombre}</Text>
                  <Text style={styles.eventoFecha}>{evento.fecha} {evento.hora}</Text>
                </View>

                
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => {
                    if (evento.id) {
                      handleCancelAttendance(evento.id, evento.nombre);
                    } else {
                      alert('ID de evento no disponible');
                    }
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelButtonText}>CANCELAR</Text>
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.moreIndicator}>
              <Ionicons name="chevron-down" size={40} color="#00D9FF" />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  eventoCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#3A3A3A',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  calendarIcon: {
    width: 45,
    height: 45,
  },
  eventoInfo: {
    flex: 1,
  },
  eventoNombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: 1,
  },
  eventoFecha: {
    fontSize: 13,
    color: '#999',
    letterSpacing: 0.5,
  },
  cancelButton: {
    backgroundColor: '#FF4444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  moreIndicator: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
