import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTranslation } from 'react-i18next'

export default function TimePicker({ onGuessSubmit }) {
  const { t } = useTranslation()
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')

  function handleSubmit() {
    onGuessSubmit(`${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('timePicker.enterTime')}</Text>
      <View style={styles.timeInputs}>
        <TextInput
          style={styles.input}
          placeholder="00"
          value={hour}
          onChangeText={setHour}
          // keyboardType="numeric"
          maxLength={2}
        />
        <Text style={styles.colon}>:</Text>
        <TextInput
          style={styles.input}
          placeholder="00"
          value={minute}
          onChangeText={setMinute}
          // keyboardType="numeric"
          maxLength={2}
        />
      </View>

      <View style={styles.underInputsTxtContainer} >
        <Text style={styles.underInputsTxt}>{t('timePicker.hourLabel')}</Text>
        <Text style={styles.underInputsTxt}>{t('timePicker.minuteLabel')}</Text>
      </View>

      <View style={styles.btnsContainer}>
        <View style={styles.btns}>
          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btnTxt}>{t('timePicker.okBtn')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => { setHour(''); setMinute(''); }}>
            <Text style={styles.btnTxt}>{t('timePicker.cancelBtn')}</Text>
          </TouchableOpacity>
          <FontAwesome6 name="clock" size={16} color="#49454f" style={styles.icon} />
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ece6f0',
    padding: 20,
    borderRadius: 14,
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 10,
    color:'#726d77',
  },
  timeInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#e6e0e9',
    padding: 10,
    fontSize: 18,
    width: 60,
    textAlign: 'center',
    borderRadius: 4,

  },
  colon: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  btnsContainer: {
    justifyContent: 'space-between',
  },
  btns: {
    flexDirection: 'row-reverse',
    color: '#8779a7',
    gap: 14,
  },
  btn: {
    color: '#8779a7',
    backgroundColor: '#ece6f0',
    borderRadius: 5,
  },
  btnTxt: {
    color: '#65558f',
  },
  icon: {
    flex: 1,
  },
  underInputsTxtContainer: {
    flexDirection: 'row',
    gap: 58,
    marginBottom: 18,
  },
  underInputsTxt: {
    fontSize: 12,
    color:'#726d77',
  }
});