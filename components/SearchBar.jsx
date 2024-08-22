import React, { useState, useEffect } from 'react'
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native'

const LOCATIONSGUESS = [
    "Europe/London","Asia (Middle East) /Israel" , "America/New_York", "Asia/Tokyo", "Australia/Sydney",
    "Africa/Cairo", "Europe/Paris", "America/Los_Angeles", "Asia/Dubai"
]

export default function SearchBar({ onLocationSelect }) {
    const [search, setSearch] = useState('')
    const [filteredLocations, setFilteredLocations] = useState(LOCATIONSGUESS)

    useEffect(() => {
        setFilteredLocations(
            LOCATIONSGUESS.filter(location =>
                location.toLowerCase().includes(search.toLowerCase())
            )
        )
    }, [search])

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search location"
                value={search}
                onChangeText={setSearch}
            />
            <FlatList
                data={filteredLocations}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            onLocationSelect(item)
                            setSearch('')
                        }}
                    >
                        <Text>{item}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
})