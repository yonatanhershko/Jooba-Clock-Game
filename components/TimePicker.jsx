// components/TimePicker.js
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

export default function TimePicker({ onGuessSubmit }) {
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')

  function handleSubmit() {
    onGuessSubmit(`${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter time</Text>
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
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text>OK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { setHour(''); setMinute(''); }}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ece6f0',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 10,
  },
  timeInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#e6e0e9',
    padding: 10,
    fontSize: 18,
    width: 60,
    textAlign: 'center',
  },
  colon: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  buttons: {
    flexDirection: 'row-reverse',
    color: '#8779a7',
    gap: 3,
  },
  button: {
    padding: 8,
    color: '#8779a7',
    backgroundColor: '#ece6f0',
    borderRadius: 5,
  },
});