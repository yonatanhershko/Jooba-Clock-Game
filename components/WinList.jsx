import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const CARD_WIDTH = screenWidth > 700 ? 400 : screenWidth < 500 ? 210 : 0
const VISIBLE_CARDS = screenWidth > 700 ? 1.5 : screenWidth < 500 ? 1 : 0

export default function WinsList({ wins, onDeleteWin }) {
  const { t } = useTranslation()
  const scrollViewRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  function scrollLeft() {
    if (currentIndex > 0) {
      const newIndex = Math.max(currentIndex - VISIBLE_CARDS, 0)
      setCurrentIndex(newIndex)
      scrollViewRef.current.scrollTo({ x: newIndex * CARD_WIDTH, animated: true })
    }
  }

  function scrollRight() {
    if (currentIndex + VISIBLE_CARDS < wins.length) {
      const newIndex = Math.min(currentIndex + VISIBLE_CARDS, wins.length - VISIBLE_CARDS)
      setCurrentIndex(newIndex)
      scrollViewRef.current.scrollTo({ x: newIndex * CARD_WIDTH, animated: true })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('WinList.win')}</Text>
      <View style={styles.scrollContainer}>
        <TouchableOpacity onPress={scrollLeft} style={styles.arrowButton}>
          <FontAwesome5 name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          snapToInterval={CARD_WIDTH}
          decelerationRate="fast"
          scrollEnabled={false}
        >
          {wins.map((win, index) => (
            <View key={index} style={styles.card}>
              <TouchableOpacity onPress={() => onDeleteWin(index)} style={styles.closeIcon}>
                <AntDesign name="closecircleo" size={18} color="black" />
              </TouchableOpacity>
              <Text style={styles.timeText}>{t('WinList.time')}: {win.time}</Text>
              <Text>{t('WinList.location')}: {win.location}</Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={scrollRight} style={styles.arrowButton}>
          <FontAwesome5 name="arrow-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
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
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  card: {
    justifyContent: 'center',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    position: 'relative',
    width: CARD_WIDTH,
    height: screenHeight < 700 ? 90 : 70,
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  timeText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  arrowButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 3, // Shadow blur
    elevation: 3, //Android 
  },
})