import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type ForecastTempType = {
    temp: number
}

const ForecastTemp: React.FC<ForecastTempType> = ({ temp}) => {
    return (
        <View>
            <Text style={styles.temp}>{Math.floor(temp)}°</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    temp: {
        fontSize: 22,
        marginRight: 15,
        color: 'white',
        fontWeight: '700'
    },
})

export default ForecastTemp