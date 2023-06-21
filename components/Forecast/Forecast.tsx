import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { ForecastStylesTypes, ForecastType } from './ForecastTypes'

const weekday: Function = (day: number) => {
    if (day === 0 || day === 7) {
        return 'Sunday'
    } else if (day === 1 || day === 8) {
        return 'Monday'
    } else if (day === 2 || day === 9) {
        return 'Thuesday'
    } else if (day === 3 || day === 10) {
        return 'Wednesday'
    } else if (day === 4 || day === 11) {
        return 'Thursday'
    } else if (day === 5 || day === 12) {
        return 'Friday'
    } else if (day === 6 || day === 13) {
        return 'Suturday'
    }
}

const Forecast: FC<ForecastType> = ({ forecast, currDay }) => {

    const day1 = weekday(currDay + 1)
    const day2 = weekday(currDay + 2)
    const day3 = weekday(currDay + 3)
    const day4 = weekday(currDay + 4)
    const day5 = weekday(currDay + 5)
    const day6 = weekday(currDay + 6)

    const week = [day1, day2, day3, day4, day5, day6]

    const returnIcon: Function = (url: string) => {
        return <Image style={styles.icon} source={{ uri: `https:${url}` }} />
    }


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
                            {!f.day.condition.icon ?
                                <ActivityIndicator size='large' color='#0000ff' /> :
                                <Text style={styles.temp}>{Math.round(f.day.avgtemp_c)}°</Text>}
                        </View>
                    ))}
                </View>
                <View style={styles.forecastIcon}>
                    {forecast.map((ic: any, i: number) => (
                        <View key={i}>
                            {returnIcon(ic.day.condition.icon)}
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
        fontSize: 25,
        marginRight: 10,
        color: 'white',
        fontWeight: '700'
    },
    forecastIcon: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    icon: {
        width: 40,
        height: 35
    }
})

export default Forecast