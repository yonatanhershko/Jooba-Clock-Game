import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import axios from 'axios'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import TimePicker from './components/TimePicker.jsx'
import WinList from './components/WinList.jsx'
import { saveWins, loadWins } from './services/storage.js'

const API_KEY = '71ce652a85d84a44b380069c8be0b9e2'

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [wins, setWins] = useState([])


  useEffect(() => {
    loadWins().then(loadedWins => setWins(loadedWins))
  }, [])

  function handleLocationSelect(location) {
    setSelectedLocation(location)
  }

  async function checkGuess(guessedTime) {
    if (!selectedLocation) {
        Alert.alert("Error", "Please select a location first.")
        return
    }

    try {
        const response = await axios.get(`https://api.ipgeolocation.io/timezone?apiKey=${API_KEY}&location=${selectedLocation}`)
        const data = response.data
        const currentTime = new Date(data.date_time_ymd)
        const currentHour = currentTime.getHours()
        const currentMinute = currentTime.getMinutes()

        const [guessedHour, guessedMinute] = guessedTime.split(':').map(Number)

        if (currentHour === guessedHour && currentMinute === guessedMinute) {
            Alert.alert("Correct!", "You guessed the time correctly!")
            const newWins = [...wins, { time: guessedTime, location: selectedLocation }]
            setWins(newWins)
            saveWins(newWins)  
        } else {
            Alert.alert("Incorrect", `The correct time was ${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`)
        }
    } catch (error) {
        console.error(error)
        Alert.alert("Error", "Failed to fetch the current time. Please try again.")
    }
}

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>THE CLOCK IS TICKING</Text>
        <Text style={styles.subtitle}>are you ready to guess?</Text>
        <SearchBar onLocationSelect={handleLocationSelect} />
        <TimePicker onGuessSubmit={checkGuess} />
        <View style={styles.imageContainer}>
        </View>
      </View>
      <StatusBar style="auto" />
      <WinList wins={wins} />
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
})