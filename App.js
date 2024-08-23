import 'intl-pluralrules'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import axios from 'axios'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import TimePicker from './components/TimePicker.jsx'
import WinList from './components/WinList.jsx'
import AnswerModal from './components/AnswerModal.jsx'
import { saveWins, loadWins, API_KEY, RANDOM_LOCATIONS } from './services/storage.js'
import { useTranslation } from 'react-i18next'
import i18n from './services/i18/i18n.js'

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [wins, setWins] = useState([])
  const [randomLocation, setRandomLocation] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [correctTime, setCorrectTime] = useState('')
  const { t } = useTranslation()

  useEffect(() => {
    getWins()
  }, [])

  async function getWins() {
    try {
      const loadedWins = await loadWins()
      setWins(loadedWins)
    } catch (error) {
      console.error(error)
    }
  }

  function handleLocationSelect(location) {
    setSelectedLocation(location)
  }

  function onRandomLocation() {
    const randomIndex = Math.floor(Math.random() * RANDOM_LOCATIONS.length)
    const location = RANDOM_LOCATIONS[randomIndex]
    setRandomLocation(location)
    setSelectedLocation(location)
  }

  async function checkGuess(guessedTime) {
    if (!selectedLocation) {
      Alert.alert('Error', 'Please select a location first.')
      return
    }

    try {
      const response = await axios.get(`https://api.ipgeolocation.io/timezone?apiKey=${API_KEY}&location=${selectedLocation}`)
      const data = response.data
      const currentTime = data.time_24

      const [guessedHour, guessedMinute] = guessedTime.split(':').map(Number)
      const [currentHour, currentMinute] = currentTime.split(':').map(Number)

      if (currentHour === guessedHour && currentMinute === guessedMinute) {
        setIsCorrect(true)
        // Alert.alert('Correct!', 'You guessed the time correctly!')
        const newWins = [...wins, { time: guessedTime, location: selectedLocation }]
        setWins(newWins)
        saveWins(newWins)
      } else {
        setIsCorrect(false)
        setCorrectTime(`${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`)
        // Alert.alert('Incorrect', `The correct time was ${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`)
      }
      setModalVisible(true)

    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'Failed to fetch the current time. Please try again.')
    }
  }

  function handleDeleteWin(index) {
    const updatedWins = wins.filter((_, i) => i !== index)
    setWins(updatedWins)
    saveWins(updatedWins)
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>{t('title')}</Text>
        <Text style={styles.subtitle}>{t('subtitle')}</Text>
        <TouchableOpacity onPress={onRandomLocation}>
          <Text style={styles.randBtn}>{t('randomBtn')}</Text>
        </TouchableOpacity>

        <SearchBar onLocationSelect={handleLocationSelect} initialLocation={randomLocation} />

        <TimePicker onGuessSubmit={checkGuess} />
        <View style={styles.imageContainer}>
        </View>
      </View>

      <StatusBar style="auto" />{/*!*/}
      <WinList wins={wins} onDeleteWin={handleDeleteWin} />

      <AnswerModal
        isVisible={modalVisible}
        correctTime={correctTime}
        isCorrect={isCorrect}
        onClose={() => setModalVisible(false)}
      />
    </View>
  )
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
  randBtn: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#f3edf7',
  }
})