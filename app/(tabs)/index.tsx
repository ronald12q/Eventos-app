import { EventData, getAllEvents } from '@/services/eventService';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [eventos, setEventos] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await getAllEvents();
      setEventos(data);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al cargar eventos');
    } finally {
      setLoading(false);
    }
  };

 
  useFocusEffect(
    useCallback(() => {
      loadEvents();
    }, [])
  );

  const handleEventPress = (evento: EventData) => {
    router.push({
      pathname: '/event-details',
      params: {
        id: evento.id,
        nombre: evento.nombre,
        ubicacion: evento.ubicacion,
        asistentes: evento.asistentes.length.toString(),
        descripcion: evento.descripcion,
        fecha: `${evento.fecha} ${evento.hora}`,
      },
    });
  };


  const filteredEventos = eventos.filter((evento) =>
    evento.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    evento.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
    evento.ubicacion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>HOME</Text>
      </View>

   
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder=""
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>EVENTOS DISPONIBLES</Text>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00D9FF" />
            <Text style={styles.loadingText}>Cargando eventos...</Text>
          </View>
        ) : filteredEventos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={60} color="#666" />
            <Text style={styles.emptyText}>
              {searchQuery ? 'No se encontraron eventos' : 'No hay eventos disponibles'}
            </Text>
          </View>
        ) : (
          <View style={styles.eventsGrid}>
            {filteredEventos.map((evento) => (
              <TouchableOpacity 
                key={evento.id} 
                style={styles.eventCard}
                onPress={() => handleEventPress(evento)}
              >
                <Text style={styles.eventTitle}>{evento.nombre}</Text>
                
                <View style={styles.eventMetaContainer}>
                  <View style={styles.eventMetaRow}>
                    <View style={styles.eventMetaItem}>
                      <Ionicons name="calendar-outline" size={14} color="#00D9FF" />
                      <Text style={styles.eventMetaText}>{evento.fecha}</Text>
                    </View>
                    <View style={styles.eventMetaItem}>
                      <Ionicons name="time-outline" size={14} color="#00D9FF" />
                      <Text style={styles.eventMetaText}>{evento.hora}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.eventLocationRow}>
                    <Ionicons name="location-outline" size={14} color="#00D9FF" />
                    <Text style={styles.eventLocationText} numberOfLines={1}>
                      {evento.ubicacion}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.eventDescriptionContainer}>
                  <Text 
                    style={styles.eventDescription}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    {evento.descripcion}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: '#fff',
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#2A2A2A',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    letterSpacing: 1,
  },
  eventsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 100,
  },
  eventCard: {
    width: '48%',
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    height: 220,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  eventMetaContainer: {
    marginBottom: 10,
  },
  eventMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  eventMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  eventMetaText: {
    fontSize: 11,
    color: '#00D9FF',
    fontWeight: '600',
  },
  eventLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  eventLocationText: {
    fontSize: 11,
    color: '#999',
    flex: 1,
  },
  eventDescriptionContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#3A3A3A',
    paddingTop: 8,
  },
  eventDescription: {
    fontSize: 10,
    color: '#B0B0B0',
    lineHeight: 14,
    letterSpacing: 0.3,
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
  },
});
