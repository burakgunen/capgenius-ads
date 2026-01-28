import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#7b89f4', tabBarStyle: { backgroundColor: '#1e293b' }, headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Giriş', tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} />
      <Tabs.Screen name="explore" options={{ title: 'Yazıcı', tabBarIcon: ({ color }) => <Ionicons name="create" size={24} color={color} /> }} />
    </Tabs>
  );
}
