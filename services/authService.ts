import { auth, db } from '@/config/firebase';
import * as WebBrowser from 'expo-web-browser';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

WebBrowser.maybeCompleteAuthSession();

const getErrorMessage = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    'auth/user-not-found': 'No existe una cuenta con este correo',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/email-already-in-use': 'Este correo ya está registrado',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
    'auth/invalid-email': 'Correo electrónico inválido',
    'auth/invalid-credential': 'Credenciales incorrectas. Verifica tu correo y contraseña',
    'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta más tarde',
    'auth/network-request-failed': 'Error de conexión. Verifica tu internet',
  };
  return errorMessages[errorCode] || 'Error al autenticar. Intenta nuevamente';
};

export interface UserData {
  uid: string;
  username: string;
  email: string;
  userType: 'usuario' | 'organizador';
  photoURL?: string | null;
  displayName?: string;
  createdAt: any;
  updatedAt: any;
  isActive: boolean;
  isVerified: boolean;
}
export const registerUser = async (
  email: string,
  password: string,
  username: string,
  userType: 'usuario' | 'organizador'
): Promise<User> => {
  try {
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    
    await updateProfile(user, {
      displayName: username
    });

    
    const userData: UserData = {
      uid: user.uid,
      username: username,
      email: email,
      userType: userType,
      photoURL: null,
      displayName: username,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isActive: true,
      isVerified: false
    };

    await setDoc(doc(db, 'users', user.uid), userData);

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
};


export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
};


export const loginWithGoogle = async (idToken: string): Promise<User> => {
  try {

    const credential = GoogleAuthProvider.credential(idToken);
    
    
    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;
    
  
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
     
      const userData: UserData = {
        uid: user.uid,
        username: user.displayName || 'Usuario',
        email: user.email || '',
        userType: 'usuario',
        photoURL: user.photoURL,
        displayName: user.displayName || undefined,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isActive: true,
        isVerified: true
      };
      
      await setDoc(doc(db, 'users', user.uid), userData);
    }
    
    return user;
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
};

export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserData;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
