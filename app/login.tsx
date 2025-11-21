import { loginUser } from '@/services/authService';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      await loginUser(email, password);
      router.push('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />


      <Text style={styles.title}>WELCOME BACK</Text>


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

  
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>SIGN IN</Text>
      </TouchableOpacity>

 
      <Link href="/reset-password" asChild>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>FORGOT PASSWORD?</Text>
        </TouchableOpacity>
      </Link>

   
      <TouchableOpacity style={styles.googleButtonContainer}>
        <Image 
          source={require('@/assets/images/google.png')} 
          style={styles.googleIcon}
        />
      </TouchableOpacity>

    
      <View style={styles.footer}>
        <Text style={styles.footerText}>DON'T YOU HAVE AN ACCOUNT? </Text>
        <Link href="/register" asChild>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 60,
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
  signInButton: {
    backgroundColor: '#00D9FF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  signInButtonDisabled: {
    opacity: 0.6,
  },
  signInButtonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  forgotPassword: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 40,
    letterSpacing: 1,
  },
  googleButtonContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  googleIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
