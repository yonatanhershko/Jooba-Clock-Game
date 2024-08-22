import React, { useState, useEffect, useCallback } from 'react'
import { View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native'
// import TextField from '@mui/material/TextField'
import axios from 'axios'
import { debounce } from 'lodash'

const INITIAL_LOCATIONS = ["Europe/London", "America/New_York"]
const API_KEY = '71ce652a85d84a44b380069c8be0b9e2'

export default function SearchBar({ onLocationSelect }) {
    const [search, setSearch] = useState('')
    const [locations, setLocations] = useState(INITIAL_LOCATIONS)
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [isFocused, setIsFocused] = useState(false)

    const debouncedFetchLocations = useCallback(
        debounce(async (searchTerm) => {
            if (searchTerm.length > 2) {
                try {
                    const response = await axios.get(`https://api.ipgeolocation.io/timezone?apiKey=${API_KEY}&location=${searchTerm}`)
                    const timezoneData = response.data.timezone
                    setLocations([timezoneData])
                } catch (error) {
                    console.error('Error fetching locations:', error)
                    setLocations([])
                }
            } else if (searchTerm.length === 0) {
                setLocations(INITIAL_LOCATIONS)
                setSelectedLocation(null)
            }
        }, 1000), // Reduced debounce time to 1 second
        []
    )

    useEffect(() => {
        debouncedFetchLocations(search)
        return () => debouncedFetchLocations.cancel()
    }, [search, debouncedFetchLocations])

    function handleLocationSelect(location) {
        setSelectedLocation(location)
        onLocationSelect(location)
        setSearch(location)
    }

    return (
        <View style={styles.container}>
        <TextInput
                style={[
                    styles.input,
                    isFocused && styles.inputFocused,
                ]}
                placeholder="Search location"
                value={search}
                onChangeText={setSearch}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {!selectedLocation && (
                <FlatList
                    data={locations}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => handleLocationSelect(item)}
                        >
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item}
                />
            )}
            {selectedLocation && (
                <TouchableOpacity
                    style={styles.selectedItem}
                    onPress={() => setSelectedLocation(null)}
                >
                    <Text>{selectedLocation}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        fontSize: 16,
    },
    inputFocused: {
        borderColor: '#e6e0e9',
    },
});