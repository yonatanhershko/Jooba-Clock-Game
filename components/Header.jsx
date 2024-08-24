import AntDesign from '@expo/vector-icons/AntDesign'
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import i18n from '../services/i18/i18n.js'
import logo from '../assets/imgs/logo.png'
import { useTranslation } from 'react-i18next'

export default function Header({ onInfoPress }) {
  const [selectedLang, setSelectedLang] = useState('en')
  const { t } = useTranslation()

  useEffect(() => {
    changeLanguage('en')
  }, [])

  function changeLanguage(lang) {
    i18n.changeLanguage(lang)
    setSelectedLang(lang)
  }

  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.languageToggle}>
        <TouchableOpacity onPress={onInfoPress}>
          <AntDesign name="questioncircle" size={26} color="#c9a7f1" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.langBtn, selectedLang === 'en' && styles.selectedLangBtn]}
          onPress={() => changeLanguage('en')}
        >
          <Text style={[styles.langBtnText, selectedLang === 'en' && styles.selectedLangBtnText]}>{t('lang.eng')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.langBtn, selectedLang === 'he' && styles.selectedLangBtn]}
          onPress={() => changeLanguage('he')}
        >
          <Text style={[styles.langBtnText, selectedLang === 'he' && styles.selectedLangBtnText]}>{t('lang.heb')}</Text>
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
  selectedLangBtn: {
    backgroundColor: '#2c2c2c',
  },
  langBtnText: {
    textAlign: 'center',
    color: 'black',
  },
  selectedLangBtnText: {
    color: 'white',
  },
})