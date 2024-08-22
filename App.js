import React, { useState } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import axios from 'axios'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import TimePicker from './components/TimePicker.jsx'

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [wins, setWins] = useState([])

  function handleLocationSelect(location) {
    setSelectedLocation(location)
  }

  async function checkGuess(guessedTime) {
    if (!selectedLocation) {
      Alert.alert("Error", "Please select a location first.")
      return
    }

    try {
      const response = await axios.get(`http://worldtimeapi.org/api/timezone/${selectedLocation}`)
      const data = response.data
      const currentTime = new Date(data.datetime)
      const currentHour = currentTime.getUTCHours()
      const currentMinute = currentTime.getUTCMinutes()

      const [guessedHour, guessedMinute] = guessedTime.split(':').map(Number)

      if (currentHour === guessedHour && currentMinute === guessedMinute) {
        Alert.alert("Correct!", "You guessed the time correctly!")
        setWins([...wins, { time: guessedTime, location: selectedLocation }])
      } else {
        Alert.alert("Incorrect", `The correct time was ${currentHour}:${currentMinute}`)
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