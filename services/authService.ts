import { auth, db } from '@/config/firebase';
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

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
    throw new Error(error.message);
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
    throw new Error(error.message);
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
