import { auth, db } from '@/config/firebase';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore';

export interface EventData {
  id?: string;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  fecha: string;
  hora: string;
  organizadorId: string;
  organizadorNombre: string;
  asistentes: string[]; 
  createdAt: any;
  updatedAt: any;
  isActive: boolean;
}


export const createEvent = async (
  nombre: string,
  descripcion: string,
  ubicacion: string,
  fecha: string,
  hora: string
): Promise<string> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

 
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data();

    const eventData: Omit<EventData, 'id'> = {
      nombre,
      descripcion,
      ubicacion,
      fecha,
      hora,
      organizadorId: user.uid,
      organizadorNombre: userData?.username || user.displayName || 'Organizador',
      asistentes: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isActive: true,
    };

    const docRef = await addDoc(collection(db, 'eventos'), eventData);
    return docRef.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const getAllEvents = async (): Promise<EventData[]> => {
  try {
    const q = query(
      collection(db, 'eventos'),
      where('isActive', '==', true)
    );

    const querySnapshot = await getDocs(q);
    const eventos: EventData[] = [];

    querySnapshot.forEach((doc) => {
      eventos.push({
        id: doc.id,
        ...doc.data(),
      } as EventData);
    });

    eventos.sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

    return eventos;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getEventById = async (eventId: string): Promise<EventData | null> => {
  try {
    const docRef = doc(db, 'eventos', eventId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as EventData;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const confirmAttendance = async (eventId: string): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const eventRef = doc(db, 'eventos', eventId);
    
   
    await updateDoc(eventRef, {
      asistentes: arrayUnion(user.uid),
      updatedAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const cancelAttendance = async (eventId: string): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const eventRef = doc(db, 'eventos', eventId);
    
    
    await updateDoc(eventRef, {
      asistentes: arrayRemove(user.uid),
      updatedAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const getUserConfirmedEvents = async (): Promise<EventData[]> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const q = query(
      collection(db, 'eventos'),
      where('asistentes', 'array-contains', user.uid),
      where('isActive', '==', true)
    );

    const querySnapshot = await getDocs(q);
    const eventos: EventData[] = [];

    querySnapshot.forEach((doc) => {
      eventos.push({
        id: doc.id,
        ...doc.data(),
      } as EventData);
    });

    eventos.sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

    return eventos;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const getUserCreatedEvents = async (): Promise<EventData[]> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const q = query(
      collection(db, 'eventos'),
      where('organizadorId', '==', user.uid),
      where('isActive', '==', true)
    );

    const querySnapshot = await getDocs(q);
    const eventos: EventData[] = [];

    querySnapshot.forEach((doc) => {
      eventos.push({
        id: doc.id,
        ...doc.data(),
      } as EventData);
    });

    eventos.sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

    return eventos;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const updateEvent = async (
  eventId: string,
  data: Partial<EventData>
): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

   
    const eventDoc = await getDoc(doc(db, 'eventos', eventId));
    if (!eventDoc.exists()) {
      throw new Error('Evento no encontrado');
    }

    const eventData = eventDoc.data();
    if (eventData.organizadorId !== user.uid) {
      throw new Error('No tienes permisos para editar este evento');
    }

    const eventRef = doc(db, 'eventos', eventId);
    await updateDoc(eventRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const deleteEvent = async (eventId: string): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuario no autenticado');
    }


    const eventDoc = await getDoc(doc(db, 'eventos', eventId));
    if (!eventDoc.exists()) {
      throw new Error('Evento no encontrado');
    }

    const eventData = eventDoc.data();
    if (eventData.organizadorId !== user.uid) {
      throw new Error('No tienes permisos para eliminar este evento');
    }

    const eventRef = doc(db, 'eventos', eventId);
    await updateDoc(eventRef, {
      isActive: false,
      updatedAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const hasUserConfirmed = async (eventId: string): Promise<boolean> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      return false;
    }

    const eventDoc = await getDoc(doc(db, 'eventos', eventId));
    if (!eventDoc.exists()) {
      return false;
    }

    const eventData = eventDoc.data();
    return eventData.asistentes?.includes(user.uid) || false;
  } catch (error: any) {
    return false;
  }
};
