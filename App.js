import 'intl-pluralrules'
import React, { useEffect, useState } from 'react'
import {  ScrollView,StyleSheet, View, Text, Alert, TouchableOpacity, I18nManager, Image, Dimensions } from 'react-native'
import axios from 'axios'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import TimePicker from './components/TimePicker.jsx'
import WinList from './components/WinList.jsx'
import AnswerModal from './components/AnswerModal.jsx'
import InfoModal from './components/InfoModal.jsx'
import joobaImg from './assets/imgs/JoobaImg.png'
import { saveWins, loadWins, API_KEY, RANDOM_LOCATIONS } from './services/storage.js'
import { useTranslation } from 'react-i18next'

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [wins, setWins] = useState([])
  const [randomLocation, setRandomLocation] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [correctTime, setCorrectTime] = useState('')
  const [infoModalVisible, setInfoModalVisible] = useState(false)


  const { t } = useTranslation()

  useEffect(() => {
    getWins()
    const isRTL = I18nManager.isRTL
    I18nManager.allowRTL(isRTL)
    I18nManager.forceRTL(isRTL)
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

  function toggleInfoModal() {
    setInfoModalVisible(!infoModalVisible)
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
    <ScrollView contentContainerStyle={styles.scrollView}>
    <View style={styles.container}>
      <Header onInfoPress={toggleInfoModal} />
      <View style={styles.content}>
        <Text style={styles.title}>{t('title')}</Text>
        <Text style={styles.subtitle}>{t('subtitle')}</Text>
        <TouchableOpacity onPress={onRandomLocation}>
          <Text style={styles.randomBtn}>{t('randomBtn')}</Text>
        </TouchableOpacity>

        <SearchBar onLocationSelect={handleLocationSelect} initialLocation={randomLocation} />

        <View style={styles.mainPageContainer}>
          <TimePicker onGuessSubmit={checkGuess} />
          <Image source={joobaImg} style={styles.JoobaImg} />
        </View>
      </View>

      <WinList wins={wins} onDeleteWin={handleDeleteWin} style={styles.winList} />

      <AnswerModal
        isVisible={modalVisible}
        correctTime={correctTime}
        isCorrect={isCorrect}
        onClose={() => setModalVisible(false)}
      />

      <InfoModal
        isVisible={infoModalVisible}
        onClose={toggleInfoModal}
      />


    </View>
    </ScrollView>
  )
}
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1, // Ensures the scroll view takes up available space
  },
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
  mainPageContainer: {
    flex: 1,
    gap: 10,
    flexDirection: screenWidth > 1000 ? 'row' : screenWidth < 500 ? 'column' : 0,
    justifyContent: 'space-around',
    width: screenWidth > 1000 ? '60%' : screenWidth < 500 ? '100%' : 0,
    alignContent: 'center'
  },
  randomBtn: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#f3edf7',
  },
  JoobaImg: {
    height: screenHeight < 700 ? 240 : 200,
    width: screenWidth > 1000 ? 470 : screenWidth < 500 ? 340 : 0,
    resizeMode: 'contain',
    zIndex: -1,
  },

})