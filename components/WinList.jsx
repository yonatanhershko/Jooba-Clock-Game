
import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'

export default function WinsList({ wins, onDeleteWin }) {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('WinList.win')}</Text>
      <ScrollView horizontal>
        {wins.map((win, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity onPress={() => onDeleteWin(index)} style={styles.closeIcon}
            >
              <AntDesign name="closecircleo" size={18} color="black" />
            </TouchableOpacity>
            <Text style={styles.timeText}>{t('WinList.time')}: {win.time}</Text>
            <Text>{t('WinList.location')}: {win.location}</Text>
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
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    position: 'relative',
    width: 210,
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'pointer',
  },
  timeText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
})