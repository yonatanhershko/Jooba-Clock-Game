import AsyncStorage from '@react-native-async-storage/async-storage'

const WINS_STORAGE_KEY = 'timezone_game_wins'

export async function saveWins(wins) {
    try {
        const jsonValue = JSON.stringify(wins)
        await AsyncStorage.setItem(WINS_STORAGE_KEY, jsonValue)
    } catch (e) {
        console.error('Error saving wins:', e)
    }
}

export async function loadWins() {
    try {
        const jsonValue = await AsyncStorage.getItem(WINS_STORAGE_KEY)
        return jsonValue != null ? JSON.parse(jsonValue) : []
    } catch (e) {
        console.error('Error loading wins:', e)
        return []
    }
}