import React, { FC, useCallback } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ForecastStylesTypes, ForecastType } from './ForecastTypes'
import { weekday } from '../../common/weatherOptions'

const Forecast: FC<ForecastType> = ({ forecast, currDay, isOpenForestForDay, setIsOpenForestForDay,
    selectDay, setSelectDay, wheatherCode, returnIcon }) => {

    const day1 = weekday(currDay + 1)
    const day2 = weekday(currDay + 2)
    const day3 = weekday(currDay + 3)
    const day4 = weekday(currDay + 4)
    const day5 = weekday(currDay + 5)
    const day6 = weekday(currDay + 6)

    const week = [day1, day2, day3, day4, day5, day6]

    const openSelectDay = useCallback((i: number) => {
        setIsOpenForestForDay(!isOpenForestForDay)
        setSelectDay(i)
    }, [setIsOpenForestForDay])

    return (
        <View style={styles.wrapper}>
            <View style={styles.wrapperWeekdays}>
                <Text style={styles.currDay}>{weekday(currDay)}</Text>
                {week.map((d, i) => (
                    <View key={i}>
                        <Text style={styles.weekday}>{d}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.wrapperForecast}>
                <View style={styles.forecastTemp}>
                    {forecast.map((f: any, i: number) => (
                        <View key={i}>
                            <Text style={styles.temp}>{Math.floor(f)}°</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.forecastIcon}>
                    {wheatherCode.map((p, i) => (
                        <View key={i} style={styles.wrapperIcon}>
                            {returnIcon(p)}
                            <TouchableOpacity onPress={() => openSelectDay(i)}>
                                <Text style={styles.goToForecastForDay}>ᐳ</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    )
}

const styles: ForecastStylesTypes = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        flexDirection: 'row'
    },
    wrapperWeekdays: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        width: 115
    },
    weekday: {
        fontSize: 21,
        fontWeight: '300',
        color: 'white',
        textShadowColor: '#4a4a4a',
        textShadowRadius: 10,
    },
    currDay: {
        fontSize: 22,
        fontWeight: '700',
        color: 'white',
        textShadowColor: '#4a4a4a',
        textShadowRadius: 10
    },
    wrapperForecast: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '65%'
    },
    forecastTemp: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    temp: {
        fontSize: 22,
        marginRight: 15,
        color: 'white',
        fontWeight: '700'
    },
    forecastIcon: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    wrapperIcon: {
        flexDirection: 'row'
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
        alignItems: 'center',

    },
    goToForecastForDay: {
        fontSize: 21,
        color: 'white'
    }
})

export default Forecast