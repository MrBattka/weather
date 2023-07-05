import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type WeekdaysTypes = {
    day: number
    i: number
}

const Weekdays: React.FC<WeekdaysTypes> = ({ day, i }) => {
    return (
        <View key={i}>
            <Text style={styles.weekday}>{day}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weekday: {
        fontSize: 21,
        fontWeight: '300',
        color: 'white',
        textShadowColor: '#4a4a4a',
        textShadowRadius: 10,
    },
})

export default Weekdays