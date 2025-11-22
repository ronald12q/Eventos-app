import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function AddScreen() {
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateEvent = async () => {
    if (!titulo || !fecha || !hora || !descripcion || !ubicacion) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
   
      Alert.alert('Éxito', 'Evento creado correctamente');

      setTitulo('');
      setFecha('');
      setHora('');
      setDescripcion('');
      setUbicacion('');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al crear evento');
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
          <View style={styles.backIconContainer}>
            <Ionicons name="chevron-back" size={24} color="#00D9FF" />
            <Ionicons 
              name="chevron-back" 
              size={24} 
              color="#00D9FF" 
              style={styles.backIconSecond}
            />
          </View>
        </TouchableOpacity>

  
        <Text style={styles.title}>CREATE NEW EVENT</Text>

       
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="TITULO"
            placeholderTextColor="#666"
            value={titulo}
            onChangeText={setTitulo}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YY"
            placeholderTextColor="#666"
            value={fecha}
            onChangeText={setFecha}
            keyboardType="numeric"
          />
        </View>

        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="00:00"
            placeholderTextColor="#666"
            value={hora}
            onChangeText={setHora}
            keyboardType="numeric"
          />
        </View>

 
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="DESCRIPCION"
            placeholderTextColor="#666"
            value={descripcion}
            onChangeText={setDescripcion}
            autoCapitalize="sentences"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="UBICACION"
            placeholderTextColor="#666"
            value={ubicacion}
            onChangeText={setUbicacion}
            autoCapitalize="words"
          />
        </View>

        
        <TouchableOpacity 
          style={[styles.createButton, loading && styles.createButtonDisabled]}
          onPress={handleCreateEvent}
          disabled={loading}
        >
          <Text style={styles.createButtonText}>CREAR</Text>
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
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 30,
  },
  backIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#00D9FF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backIconSecond: {
    position: 'absolute',
    left: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 50,
    letterSpacing: 2,
  },
  inputContainer: {
    marginBottom: 35,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#00D9FF',
    color: '#fff',
    fontSize: 16,
    paddingVertical: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },
  createButton: {
    backgroundColor: '#00D9FF',
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  createButtonDisabled: {
    opacity: 0.6,
  },
  createButtonText: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
