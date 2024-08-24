import AntDesign from '@expo/vector-icons/AntDesign'
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import i18n from '../services/i18/i18n.js'
import logo from '../assets/imgs/logo.png'

export default function Header({ onInfoPress }) {

  function changeLanguage(lang) {
    i18n.changeLanguage(lang)
  }

  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.languageToggle}>
        <TouchableOpacity onPress={onInfoPress}>
          <AntDesign name="questioncircle" size={26} color="#c9a7f1" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.langBtn} onPress={() => changeLanguage('en')}>
          <Text style={styles.langBtnText}>ENG</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.langBtn} onPress={() => changeLanguage('he')}>
          <Text style={styles.langBtnText}>Hebrew</Text>
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
    paddingTop: 50,
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
  langBtn: {
    padding: 5,
    marginLeft: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
    width: 100,

  },
  langBtnText: {
    textAlign: 'center',

  }
})