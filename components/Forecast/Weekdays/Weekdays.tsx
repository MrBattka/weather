import { StyleSheet, Text, View } from 'react-native'
import { TextStyle } from "react-native";
import React from 'react'

type WeekdaysTypes = {
    day: number
}

const Weekdays: React.FC<WeekdaysTypes> = ({ day }) => {
    return (
        <View>
            <Text style={styles.weekday}>{day}</Text>
        </View>
    )
}

type WeekdaysStyleTypes = {
    weekday: TextStyle
}

const styles = StyleSheet.create<WeekdaysStyleTypes>({
    weekday: {
        fontSize: 21,
        fontWeight: '300',
        color: '#e8e8e8',
        textShadowColor: '#4a4a4a',
        textShadowRadius: 10,
    },
})

export default Weekdays