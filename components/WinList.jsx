
import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

export default function WinsList({ wins }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wins</Text>
      <ScrollView horizontal>
        {wins.map((win, index) => (
          <View key={index} style={styles.card}>
            <Text>Time: {win.time}</Text>
            <Text>Time Zone: {win.location}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    // backgroundColor: '#f0f0f0',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
})