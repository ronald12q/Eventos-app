import { auth, db } from '@/config/firebase';
import { createEvent } from '@/services/eventService';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
  const [isOrganizador, setIsOrganizador] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserAccess = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.userType === 'organizador') {
              setIsOrganizador(true);
            } else {
              Alert.alert(
                'Acceso denegado',
                'Solo los organizadores pueden crear eventos.',
                [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
              );
            }
          }
        }
      } catch (error) {
        console.error('Error checking access:', error);
        router.replace('/(tabs)');
      } finally {
        setCheckingAccess(false);
      }
    };

    checkUserAccess();
  }, []);

  const handleCreateEvent = async () => {
    if (!titulo || !fecha || !hora || !descripcion || !ubicacion) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      await createEvent(titulo, descripcion, ubicacion, fecha, hora);
      
      setTitulo('');
      setFecha('');
      setHora('');
      setDescripcion('');
      setUbicacion('');
      
      Alert.alert(
        '¡Evento creado!', 
        'Tu evento ha sido publicado exitosamente y ya está visible para otros usuarios.',
        [
          { 
            text: 'Ver eventos', 
            onPress: () => router.push('/(tabs)')
          }
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al crear evento');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAccess) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00D9FF" />
          <Text style={styles.loadingText}>Verificando permisos...</Text>
        </View>
      </View>
    );
  }

  if (!isOrganizador) {
    return null;
  }

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
          />
        </View>

        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="00:00"
            placeholderTextColor="#666"
            value={hora}
            onChangeText={setHora}
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
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.createButtonText}>CREAR</Text>
          )}
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
  backIcon: {
    width: 60,
    height: 60,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#999',
    fontSize: 14,
    marginTop: 10,
    letterSpacing: 0.5,
  },
});
