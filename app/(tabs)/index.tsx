import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="robot" size={100} color="#7b89f4" />
      <Text style={styles.title}>CapGenius</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/explore')}>
        <Text style={styles.buttonText}>Başla</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 42, fontWeight: 'bold', color: '#fff', marginVertical: 40 },
  button: { backgroundColor: '#3b82f6', paddingVertical: 18, width: '80%', borderRadius: 15, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' }
});
