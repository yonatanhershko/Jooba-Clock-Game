import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet,  Image  } from 'react-native'

export default function Header() {
  return (
    <View style={styles.header}>
      <Image source={require('../assets/imgs/logo.png')} style={styles.logo} />
      <View style={styles.languageToggle}>
        <TouchableOpacity style={styles.langButton}>
          <Text>ENG</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.langButton}>
          <Text>Hebrew</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop:50,
    backgroundColor: '#f0f0f0',

    
  },
  logo: {
    width: 100,  
    height: 40,  
    resizeMode: 'contain', 
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
})