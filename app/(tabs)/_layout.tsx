import { auth, db } from '@/config/firebase';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isOrganizador, setIsOrganizador] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserType = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setIsOrganizador(userData.userType === 'organizador');
          }
        }
      } catch (error) {
        console.error('Error checking user type:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserType();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#1A1A1A',
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: '',
          href: !isOrganizador ? '/calendar' : null,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "calendar" : "calendar-outline"} size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: '',
          href: isOrganizador ? '/add' : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={40} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
