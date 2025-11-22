import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';


const EVENTOS_CONFIRMADOS = [
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
  {
    id: '3',
    nombre: 'FIESTA HALLOWEEN',
    fecha: '31 DE OCTUBRE DE 2025',
  },
];

export default function CalendarScreen() {
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
        {EVENTOS_CONFIRMADOS.map((evento) => (
          <View key={evento.id} style={styles.eventoCard}>
           
            <View style={styles.iconContainer}>
              <Image
                source={require('@/assets/images/calendar.png')}
                style={styles.calendarIcon}
              />
            </View>

            
            <View style={styles.eventoInfo}>
              <Text style={styles.eventoNombre}>{evento.nombre}</Text>
              <Text style={styles.eventoFecha}>{evento.fecha}</Text>
            </View>
          </View>
        ))}

        <View style={styles.moreIndicator}>
          <Ionicons name="chevron-down" size={40} color="#00D9FF" />
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
  moreIndicator: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});
