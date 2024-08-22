import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import TimePicker from './components/TimePicker.jsx';
// import WinsList from './components/WinsList.jsx';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>THE CLOCK IS TICKING</Text>
        <Text style={styles.subtitle}>are you ready to guess?</Text>
        <SearchBar />
        <TimePicker />
        <View style={styles.imageContainer}>
        </View>
      </View>
      {/* <WinsList /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  imageContainer: {
   
  },
});