import { Ionicons } from '@expo/vector-icons';
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
    titulo: 'FIESTA NAVIDEÑA',
    descripcion: 'SAB, CENTRO HISTÓRICO DE SAN SALVADOR 24 DE 12 PM',
  },
  {
    id: '2',
    titulo: 'PARTIDO DE FÚTBOL',
    descripcion: 'JUE, ESTADIO MÁGICO GONZÁLEZ 15 AGO 10 AM',
  },
  {
    id: '3',
    titulo: 'FIESTA NAVIDEÑA',
    descripcion: 'CENTRO HISTÓRICO DE SAN SALVADOR, HORA 9 PM',
  },
  {
    id: '4',
    titulo: 'BABY SHOWER',
    descripcion: 'CENTRO HISTÓRICO DE SAN SALVADOR, HORA 9 PM',
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

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
            <TouchableOpacity key={evento.id} style={styles.eventCard}>
              <Text style={styles.eventTitle}>{evento.titulo}</Text>
              <Text style={styles.eventDescription}>{evento.descripcion}</Text>
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
