import React, { useState, useEffect, useCallback, useRef } from 'react'
import { View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput, Animated, Platform } from 'react-native'
import { API_KEY } from '../services/storage.js'
import AntDesign from '@expo/vector-icons/AntDesign'
import axios from 'axios'
import { debounce } from 'lodash'
import { useTranslation } from 'react-i18next'

const INITIAL_LOCATIONS = [
    "France",
    "Israel",
    "Cyprus",
    "Italy",]

export default function SearchBar({ onLocationSelect, initialLocation }) {
    const [search, setSearch] = useState('')
    const [locations, setLocations] = useState([])
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)
    const animatedHeight = useRef(new Animated.Value(0)).current
    const { t } = useTranslation()
    
    const debouncedFetchLocations = useCallback(
        debounce(async (searchTerm) => {
            if (searchTerm.length > 2) {
                try {
                    const response = await axios.get(`https://api.ipgeolocation.io/timezone?apiKey=${API_KEY}&location=${searchTerm}`)
                    const timezoneData = response.data.timezone
                    if (timezoneData) {
                        const formattedTimezone = timezoneData.replace(/_/g, " ")
                        setLocations([formattedTimezone])
                    } else {
                        setLocations(['Not found'])
                    }
                } catch (error) {
                    console.error('Error fetching locations:', error)
                    setLocations(['Not found'])
                }
            } else if (searchTerm.length === 0) {
                setLocations(INITIAL_LOCATIONS)
            } else {
                setLocations([''])
            }
        }, 700),
        []
    )

    useEffect(() => {
        if (initialLocation) {
            setSearch(initialLocation)
            onLocationSelect(initialLocation)
        }
    }, [initialLocation])

    useEffect(() => {
        debouncedFetchLocations(search)
        return () => debouncedFetchLocations.cancel()
    }, [search, debouncedFetchLocations])

    useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: isDropdownVisible ? 150 : 0,/* size px */
            duration: 300,/* sec */
            useNativeDriver: false,/* improve */
        }).start()
    }, [isDropdownVisible])

    function handleLocationSelect(location) {
        onLocationSelect(location)
        setSearch(location)
        setIsDropdownVisible(false)
    }

    function clearSearch() {
        setSearch('')
        setLocations(INITIAL_LOCATIONS)
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    isDropdownVisible && styles.inputFocused,
                ]}
                placeholder={t('searchLocation')}
                value={search}
                onChangeText={setSearch}
                onFocus={() => setIsDropdownVisible(true)}
                onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
            />
            {search !== '' && (
                <TouchableOpacity
                    onPress={clearSearch}
                    style={styles.closeIcon}
                >
                    <AntDesign name="closecircleo" size={18} color="#49454f" />
                </TouchableOpacity>
            )}
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
        width: '100%',
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
        textAlign: 'left'
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
        borderBottomColor: '#eee',
    },
    closeIcon: {
        position: 'absolute',
        top: '50%',
        right: 10,
        transform: [{ translateY: -9 }],
    },

})