import React, { FC, useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { weekday } from '../../common/weatherHelpers'
import { ForecastStylesTypes, ForecastType } from './ForecastTypes'
import Weekdays from './Weekdays/Weekdays'
import ForecastTemp from './ForecastTemp/ForecastTemp'

const Forecast: FC<ForecastType> = ({ forecast, currDay, isOpenForestForDay, setIsOpenForestForDay,
    setSelectDay, wheatherCode, returnIcon }) => {

    const day1: number = weekday(currDay + 1)
    const day2: number = weekday(currDay + 2)
    const day3: number = weekday(currDay + 3)
    const day4: number = weekday(currDay + 4)
    const day5: number = weekday(currDay + 5)
    const day6: number = weekday(currDay + 6)

    const week: number[] = [day1, day2, day3, day4, day5, day6]


    const openSelectDay = useCallback((i: number) => {
        setIsOpenForestForDay(!isOpenForestForDay)
        setSelectDay(i)
    }, [setIsOpenForestForDay, setSelectDay])
    

    return (
        <View style={styles.wrapper}>
            <View style={styles.wrapperWeekdays}>
                <TouchableOpacity onPress={() => openSelectDay(currDay)}>
                    <Text style={styles.currDay}>{weekday(currDay)}</Text>
                </TouchableOpacity>
                {week.map((d, i) => (
                    <TouchableOpacity key={i} onPress={() => openSelectDay(i + 1)}>
                        <Weekdays day={d} />
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.wrapperForecast}>
                <View style={styles.forecastTemp}>
                    {forecast.map((temp, i) => (
                        <ForecastTemp temp={temp} key={i} />
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
        width: 140
    },
    currDay: {
        fontSize: 22,
        fontWeight: '700',
        color: 'white',
        letterSpacing: 0.3
    },
    wrapperForecast: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '60%',
        paddingRight: 7
    },
    forecastTemp: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    forecastIcon: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    wrapperIcon: {
        flexDirection: 'row',
    },
    goToForecastForDay: {
        fontSize: 21,
        color: 'white',
        marginRight: 10
    }
})

export default Forecast