import React, { useState, useEffect } from 'react'
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native'
import TextField from '@mui/material/TextField';
import axios from 'axios'

const INITIAL_LOCATIONS = [
    "Europe/London", "America/New_York"
]

export default function SearchBar({ onLocationSelect }) {
    const [search, setSearch] = useState('')
    const [locations, setLocations] = useState(INITIAL_LOCATIONS)
    const [selectedLocation, setSelectedLocation] = useState(null)

    useEffect(() => {
        if (search.length > 2) {
            fetchLocations()
            // console.log(search);
        } else if (search.length === 0) {
            setLocations(INITIAL_LOCATIONS)
            setSelectedLocation(null)
        }
    }, [search])

  
    
    async function fetchLocations() {
        try {
            const response = await axios.get(`http://worldtimeapi.org/api/timezone/${search}`)
            setLocations(response.data.slice(0, 3))
        } catch (error) {
            console.error('Error fetching locations:', error)
            setLocations([])
        }
    }

    function handleLocationSelect(location) {
        setSelectedLocation(location)
        onLocationSelect(location)
        setSearch(location)
    }

    return (
        <View style={styles.container}>
               <TextField
                id="outlined-basic"
                label="Search location"
               
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.input}
                InputProps={{
                    style: { borderColor: 'purple' },
                }}
                InputLabelProps={{
                    style: { color: 'purple' },
                }}
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
        marginBottom: 10,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    selectedItem: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginTop: 5,
    },
})