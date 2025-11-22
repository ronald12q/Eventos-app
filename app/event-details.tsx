import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
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

  // Obtener datos del evento desde los parámetros
  const evento = {
    id: params.id as string,
    nombre: params.nombre as string,
    ubicacion: params.ubicacion as string,
    asistentes: params.asistentes as string,
    descripcion: params.descripcion as string,
    fecha: params.fecha as string,
    imagen: params.imagen as string,
  };

  const handleConfirmar = async () => {
    setLoading(true);
    try {
      // TODO: Guardar confirmación en Firebase
      Alert.alert(
        'Éxito',
        'Has confirmado tu asistencia al evento',
        [{ text: 'OK', onPress: () => router.back() }]
      );
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
        {/* Botón de regresar */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Image
            source={require('@/assets/images/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        {/* Título */}
        <Text style={styles.title}>DETALLES</Text>

        {/* Nombre del evento con icono de navegación */}
        <View style={styles.eventHeader}>
          <Text style={styles.eventName}>{evento.nombre}</Text>
          <Ionicons name="navigate" size={28} color="#00D9FF" />
        </View>

        {/* Información del evento */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{evento.ubicacion}</Text>
          <Text style={styles.infoValue}>{evento.asistentes} ASISTENTES</Text>
        </View>

        {/* Botón Confirmar */}
        <TouchableOpacity
          style={[styles.confirmarButton, loading && styles.confirmarButtonDisabled]}
          onPress={handleConfirmar}
          disabled={loading}
        >
          <Text style={styles.confirmarButtonText}>CONFIRMAR</Text>
        </TouchableOpacity>

        {/* Descripción */}
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
