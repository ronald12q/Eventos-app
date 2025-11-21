import { registerUser } from '@/services/authService';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'usuario' | 'organizador'>('usuario');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      await registerUser(email, password, username, userType);
      Alert.alert('Éxito', 'Cuenta creada correctamente', [
        { text: 'OK', onPress: () => router.push('/login') }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al crear cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
     
      <TouchableOpacity 
        style={styles.backIconContainer}
        onPress={() => router.back()}
      >
        <Image 
          source={require('@/assets/images/back.png')} 
          style={styles.backIcon}
        />
      </TouchableOpacity>

    
      <Text style={styles.title}>CREATE AN ACCOUNT</Text>


      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="USERNAME"
          placeholderTextColor="#666"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="EMAIL"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>


      <View style={styles.radioContainer}>
        <TouchableOpacity 
          style={styles.radioOption}
          onPress={() => setUserType('usuario')}
        >
          <View style={styles.radioCircle}>
            {userType === 'usuario' && <View style={styles.radioSelected} />}
          </View>
          <Text style={styles.radioText}>USUARIO</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.radioOption}
          onPress={() => setUserType('organizador')}
        >
          <View style={styles.radioCircle}>
            {userType === 'organizador' && <View style={styles.radioSelected} />}
          </View>
          <Text style={styles.radioText}>ORGANIZADOR</Text>
        </TouchableOpacity>
      </View>

    
      <TouchableOpacity 
        style={[styles.signUpButton, loading && styles.signUpButtonDisabled]} 
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.signUpButtonText}>SIGN UP</Text>
        )}
      </TouchableOpacity>

     
      <View style={styles.footer}>
        <Text style={styles.footerText}>DO YOU HAVE AN ACCOUNT? </Text>
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text style={styles.clickHere}>CLICK HERE</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  backIconContainer: {
    position: 'absolute',
    top: 50,
    left: 30,
  },
  backIcon: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 50,
    letterSpacing: 1,
  },
  inputContainer: {
    marginBottom: 30,
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
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00D9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00D9FF',
  },
  radioText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  signUpButton: {
    backgroundColor: '#00D9FF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  signUpButtonDisabled: {
    opacity: 0.6,
  },
  signUpButtonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  clickHere: {
    color: '#A855F7',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
