import { StyleSheet, Text, View } from 'react-native'
import { TextStyle } from "react-native";

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

type ForecastTempStyleTypes = {
    temp: TextStyle
}

const styles = StyleSheet.create<ForecastTempStyleTypes>({
    temp: {
        fontSize: 22,
        marginRight: 15,
        color: 'white',
        fontWeight: '700'
    },
})

export default ForecastTemp