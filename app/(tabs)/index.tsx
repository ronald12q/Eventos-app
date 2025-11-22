import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';


const EVENTOS_EJEMPLO = [
  {
    id: '1',
    nombre: 'FIESTA NAVIDEÑA',
    titulo: 'FIESTA NAVIDEÑA',
    descripcion: 'PREPÁRATE PARA VIVIR UNA NOCHE INOLVIDABLE LLENA DE ESPÍRITU NAVIDEÑO EN EL CORAZÓN DE SAN SALVADOR. LA "FIESTA NAVIDEÑA" TE INVITA A SUMERGIRTE EN UN AMBIENTE FESTIVO CON MÚSICA EN VIVO, LUCES CENTELLEANTES, DELICIOSA COMIDA TÍPICA Y LA MEJOR COMPAÑÍA. ESTE EVENTO ES PERFECTO PARA CELEBRAR LA TEMPORADA DE VILLANCICOS, SORPRESAS ESPECIALES Y CREA RECUERDOS MÁGICOS MIENTRAS CELEBRAMOS JUNTOS LA ÉPOCA MÁS HERMOSA DEL AÑO. ¡NO TE PIERDAS ESTA OPORTUNIDAD ÚNICA DE COMPARTIR LA ALEGRÍA Y EL CALOR DE LA NAVIDAD!',
    ubicacion: 'CENTRO HISTÓRICO, SAN SALVADOR',
    asistentes: '100',
    fecha: 'SÁBADO 24 DE DICIEMBRE DE 2025 12PM',
    imagen: '',
  },
  {
    id: '2',
    nombre: 'PARTIDO DE FÚTBOL',
    titulo: 'PARTIDO DE FÚTBOL',
    descripcion: 'JUE, ESTADIO MÁGICO GONZÁLEZ 15 AGO 10 AM',
    ubicacion: 'ESTADIO MÁGICO GONZÁLEZ',
    asistentes: '150',
    fecha: 'JUEVES 15 DE AGOSTO DE 2025 10AM',
    imagen: '',
  },
  {
    id: '3',
    nombre: 'FIESTA NAVIDEÑA',
    titulo: 'FIESTA NAVIDEÑA',
    descripcion: 'CENTRO HISTÓRICO DE SAN SALVADOR, HORA 9 PM',
    ubicacion: 'CENTRO HISTÓRICO, SAN SALVADOR',
    asistentes: '80',
    fecha: 'VIERNES 20 DE DICIEMBRE DE 2025 9PM',
    imagen: '',
  },
  {
    id: '4',
    nombre: 'BABY SHOWER',
    titulo: 'BABY SHOWER',
    descripcion: 'CENTRO HISTÓRICO DE SAN SALVADOR, HORA 9 PM',
    ubicacion: 'CENTRO HISTÓRICO, SAN SALVADOR',
    asistentes: '50',
    fecha: 'DOMINGO 10 DE ENERO DE 2026 9PM',
    imagen: '',
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleEventPress = (evento: typeof EVENTOS_EJEMPLO[0]) => {
    router.push({
      pathname: '/event-details',
      params: {
        id: evento.id,
        nombre: evento.nombre,
        ubicacion: evento.ubicacion,
        asistentes: evento.asistentes,
        descripcion: evento.descripcion,
        fecha: evento.fecha,
        imagen: evento.imagen,
      },
    });
  };

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
        
        <View style={styles.eventsGrid}>
          {EVENTOS_EJEMPLO.map((evento) => (
            <TouchableOpacity 
              key={evento.id} 
              style={styles.eventCard}
              onPress={() => handleEventPress(evento)}
            >
              <Text style={styles.eventTitle}>{evento.titulo}</Text>
              <Text 
                style={styles.eventDescription}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {evento.descripcion}
              </Text>
            </TouchableOpacity>
          ))}
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
    padding: 20,
    marginBottom: 15,
    minHeight: 150,
    justifyContent: 'space-between',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  eventDescription: {
    fontSize: 11,
    color: '#B0B0B0',
    lineHeight: 16,
    letterSpacing: 0.3,
  },
});
