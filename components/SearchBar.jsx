import React, { useState, useEffect, useCallback, useRef } from 'react'
import { View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput, Animated, Platform } from 'react-native'
import { API_KEY } from '../services/storage.js'
import axios from 'axios'
import { debounce } from 'lodash'

const INITIAL_LOCATIONS = [
    "France",
    "Israel",
    "Cypurs",
    "Italy",]

export default function SearchBar({ onLocationSelect }) {
    const [search, setSearch] = useState('')
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)
    const animatedHeight = useRef(new Animated.Value(0)).current

    const debouncedFetchLocations = useCallback(
        debounce(async (searchTerm) => {
            if (searchTerm.length > 2) {
                try {
                    const response = await axios.get(`https://api.ipgeolocation.io/timezone?apiKey=${API_KEY}&location=${searchTerm}`)
                    const timezoneData = response.data.timezone.replace(/_/g, " ")
                    setLocations([timezoneData])
                } catch (error) {
                    console.error('Error fetching locations:', error)
                    setLocations([])
                }
            } else if (searchTerm.length === 0) {
                setLocations(INITIAL_LOCATIONS)
            } else {
                setLocations([])
            }
        }, 1000),//change to 300ms
        []
    )

    useEffect(() => {
        debouncedFetchLocations(search)
        return () => debouncedFetchLocations.cancel()
    }, [search, debouncedFetchLocations])

    useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: isDropdownVisible ? 150 : 0,/* size */
            duration: 300,/* sec */
            useNativeDriver: false,/* improve */
        }).start()
    }, [isDropdownVisible])

    function handleLocationSelect(location) {
        setSelectedLocation(location)
        onLocationSelect(location)
        setSearch(location)
        setIsDropdownVisible(false)
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    isDropdownVisible && styles.inputFocused,
                ]}
                placeholder="Search location"
                value={search}
                onChangeText={setSearch}
                onFocus={() => setIsDropdownVisible(true)}
                onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
            />
            <Animated.View style={[styles.dropdownContainer, { maxHeight: animatedHeight }]}>
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
            </Animated.View>
            {selectedLocation && (
                <TouchableOpacity
                    style={styles.selectedItem}
                    onPress={() => {
                        setSelectedLocation(null)
                        setSearch('')
                    }}
                >
                    <Text>{selectedLocation}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginBottom: 20,
        position: 'relative',
        zIndex: 10,
    },
    input: {
        width: '80%',
        padding: 10,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 2,
        fontSize: 16,
        ...Platform.select({//web,ios,andorid
            web: {
                outlineColor: '#e6e0e9',
            },
        }),
    },
    inputFocused: {
        borderColor: '#e6e0e9',
    },
    dropdownContainer: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: '#f3edf7',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    selectedItem: {
        padding: 10,
        backgroundColor: '#e6e0e9',
        borderRadius: 5,
        marginTop: 10,
        display:'none',
    },
})