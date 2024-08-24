import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTranslation } from 'react-i18next'
import i18n from '../services/i18/i18n.js'

export default function TimePicker({ onGuessSubmit }) {
  const { t } = useTranslation()
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [hourFocused, setHourFocused] = useState(false)
  const [minuteFocused, setMinuteFocused] = useState(false)

  function handleSubmit() {
    onGuessSubmit(`${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.timeInputsContainer}>
        <Text style={i18n.language === 'he' ? styles.labelRTL : styles.label}>{t('timePicker.enterTime')}</Text>
        <View style={styles.timeInputs}>
          <TextInput
            style={[
              styles.input,
              hourFocused && styles.inputFocused,
            ]}
            placeholder="00"
            value={hour}
            onChangeText={setHour}
            maxLength={2}
            onFocus={() => setHourFocused(true)}
            onBlur={() => setHourFocused(false)}
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            style={[
              styles.input,
              minuteFocused && styles.inputFocused,
            ]}
            placeholder="00"
            value={minute}
            onChangeText={setMinute}
            maxLength={2}
            onFocus={() => setMinuteFocused(true)}
            onBlur={() => setMinuteFocused(false)}
          />
        </View>
        <View style={i18n.language === 'he' ? styles.underInputsTxtContainerRTL : styles.underInputsTxtContainer} >
          <Text style={styles.underInputsTxt}>{t('timePicker.hourLabel')}</Text>
          <Text style={styles.underInputsTxt}>{t('timePicker.minuteLabel')}</Text>
        </View>
      </View>

      <View style={styles.btnsContainer}>
        <View style={i18n.language === 'he' ? styles.btnsFieldRTL : styles.btnsField}>
          <View style={i18n.language === 'he' ? styles.onlyBtnsRTL : styles.onlyBtns}>
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.btnTxt}>{t('timePicker.okBtn')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => { setHour(''); setMinute(''); }}>
              <Text style={styles.btnTxt}>{t('timePicker.cancelBtn')}</Text>
            </TouchableOpacity>
          </View>
          <FontAwesome6 name="clock" size={16} color="#49454f" style={styles.icon} />
        </View>
      </View>
    </View>
  )
}

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ece6f0',
    padding: 30,
    width: screenWidth > 700 ? 350 : screenWidth < 500 ? 220 : 0,
    borderRadius: 14,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: screenWidth > 700 ? 15 : screenWidth < 500 ? 65 : 0,
    paddingLeft: screenWidth > 700 ? 29 : screenWidth < 500 ? 16 : 0,
    height: screenHeight < 700 ? 200 : 200,
  },
  timeInputsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  label: {
    fontSize: 12,
    marginBottom: 14,
    color: '#726d77',
  },
  labelRTL: {
    fontSize: 12,
    marginBottom: 14,
    color: '#726d77',
    textAlign: 'right',
    marginRight: screenWidth > 700 ? 0 : screenWidth < 500 ? -15 : 0,
  },
  timeInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#e6e0e9',
    padding: 10,
    fontSize: screenHeight < 700 ? 32 : 24,
    width: '50%',
    textAlign: 'center',
    borderRadius: 4,
    height: screenHeight < 700 ? 70 : 50,
    color: '#1d1b20',
  },
  inputFocused: {
    backgroundColor: '#eaddff',
    color: '#21005d',
  },
  colon: {
    fontSize: screenWidth > 700 ? 40 : screenWidth < 500 ? 28 : 0,
    fontWeight: '600',
    marginHorizontal: 5,
  },
  btnsContainer: {
    justifyContent: 'space-between',
    width:screenWidth > 700 ? '100%' : screenWidth < 500 ? '110%' : 0,
  },
  btnsField: {
    flexDirection: 'row-reverse',
    color: '#8779a7',
    gap: 14,
  },
  btnsFieldRTL: {
    flexDirection: 'row',
    color: '#8779a7',
    gap: screenWidth > 700 ? 190 : screenWidth < 500 ? 94 : 0,
  },
  onlyBtns:{
    flexDirection: 'row-reverse',
    gap: 14,
  },
  onlyBtnsRTL:{
    flexDirection: 'row',
    gap: 14,
  },
  btn: {
    color: '#8779a7',
    backgroundColor: '#ece6f0',
    borderRadius: 5,
  },
  btnTxt: {
    color: '#65558f',
    fontWeight: '600',
  },
  icon: {
    flex: 1,
    marginTop: 1,
  },
  underInputsTxtContainer: {
    flex: 1,
    flexDirection: 'row',
    width: screenWidth > 700 ? '65%' : screenWidth < 500 ? '85%' : 0,
    justifyContent: 'space-between',
    marginBottom: 18,

  },
  underInputsTxtContainerRTL: {
    flex: 1,
    flexDirection: 'row',
    width: screenWidth > 700 ? '62%' : screenWidth < 500 ? '70%' : 0,
    marginLeft: screenWidth > 700 ? 110 : screenWidth < 500 ? 65 : 0,
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  underInputsTxt: {
    fontSize: 12,
    color: '#726d77',

  }
});