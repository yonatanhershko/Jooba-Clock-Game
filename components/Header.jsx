import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>JOOBA</Text>
      <View style={styles.languageToggle}>
        <TouchableOpacity style={styles.langButton}>
          <Text>ENG</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.langButton}>
          <Text>Hebrew</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'purple',
  },
  languageToggle: {
    flexDirection: 'row',
  },
  langButton: {
    padding: 5,
    marginLeft: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
});