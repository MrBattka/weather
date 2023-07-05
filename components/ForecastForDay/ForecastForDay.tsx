import React, { FC, useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { currData, currDataForDay, currToDay, currWindForDay, isConditionForCurrDay, kmHInMS } from '../../common/weatherHelpers'
import { ForecastForDayStylesTypes, ForecastForDayTypes } from './ForecastForDayTypes'

const ForecastForDay: FC<ForecastForDayTypes> = ({ isOpenForestForDay, setIsOpenForestForDay,
    selectDay, hourly, setHourly, currHour, tempHourly, setTempHourly, returnIcon, wheatherCode,
    wheatherCodeHorly, setWheatherCodeHorly, windSpeedHourly, setWindSpeedHourly, windSpeedDay,
    setWindSpeedDay, precipitationDay, setPrecipitationDay, tempApparentDay, currDay,
    setTempApparentDay, forecast }): React.ReactElement => {

    const [currForecastDay, setCurrForecastDay] = useState([])
    const [tempForecastDay, setTempForecastDay] = useState([])
    const [weatherCodeForecastDay, setWeatherCodeForecastDay] = useState([])
    const [windSpeedForecastDay, setWindSpeedForecastDay] = useState([])

    if (!hourly) {
        return <ActivityIndicator style={styles.preloader} size='large' color='#0000ff' />
    }

    const backToMainPage: () => void = () => {
        setIsOpenForestForDay(!isOpenForestForDay)
        setHourly(null)
        setTempHourly(null)
        setWheatherCodeHorly(null)
        setWindSpeedHourly(null)
        setWindSpeedDay(null)
        setPrecipitationDay(null)
        setTempApparentDay(null)
    }

    useEffect(() => {
        currData(hourly, selectDay, setCurrForecastDay)
        currData(tempHourly, selectDay, setTempForecastDay)
        currData(wheatherCodeHorly, selectDay, setWeatherCodeForecastDay)
        currData(windSpeedHourly, selectDay, setWindSpeedForecastDay)
    }, [isOpenForestForDay])

    const sunnyImg: React.ReactElement =
        <Image style={styles.icon} source={require('../../assets/forecastForDayCondition/sunnyGif.gif')} />
    const mistImg: React.ReactElement =
        <Image style={styles.icon} source={require('../../assets/forecastForDayCondition/mistGif.gif')} />
    const cloudyImg: React.ReactElement =
        <Image style={styles.icon} source={require('../../assets/forecastForDayCondition/cloudyGif.gif')} />
    const rainImg: React.ReactElement =
        <Image style={styles.icon} source={require('../../assets/forecastForDayCondition/rainGif.gif')} />
    const thunderyOutbreaksImg: React.ReactElement =
        <Image style={styles.icon} source={require('../../assets/forecastForDayCondition/thunder.gif')} />
    const rainWithThunderImg: React.ReactElement =
        <Image style={styles.icon} source={require('../../assets/forecastForDayCondition/thunderWithRain.gif')} />
    const snowImg: React.ReactElement =
        <Image style={styles.icon} source={require('../../assets/forecastForDayCondition/snowGif.gif')} />


    const isCurrHour = (currHour: string, hour: string): boolean => {
        const sliceHour = hour.slice(11, 13)
        return sliceHour == currHour
    }

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.back} onPress={(event) => backToMainPage()}>
                <Text style={styles.backBtn}>{'< Back'}</Text>
            </TouchableOpacity>
            <View style={styles.currWeather}>
                {isConditionForCurrDay(selectDay, wheatherCode) === 'Ясно' && sunnyImg}
                {isConditionForCurrDay(selectDay, wheatherCode) === 'Пасмурно' && cloudyImg}
                {isConditionForCurrDay(selectDay, wheatherCode) === 'Облачно' && cloudyImg}
                {isConditionForCurrDay(selectDay, wheatherCode) === 'Дождь' && rainImg}
                {isConditionForCurrDay(selectDay, wheatherCode) === 'Ледяной дождь' && rainImg}
                {isConditionForCurrDay(selectDay, wheatherCode) === 'Гроза' && thunderyOutbreaksImg}
                {isConditionForCurrDay(selectDay, wheatherCode) === 'Гроза с осадками' && rainWithThunderImg}
                {isConditionForCurrDay(selectDay, wheatherCode) === 'Снег' && snowImg}
                {isConditionForCurrDay(selectDay, wheatherCode) === 'Туман' && mistImg}

                <Text style={styles.currTemp}>{currDataForDay(forecast, selectDay)}°</Text>
                <Text style={styles.condition}>
                    {isConditionForCurrDay(selectDay, wheatherCode)}  |  {currToDay(selectDay, currDay)}
                </Text>
                <View style={styles.currAddInfo}>
                    <View style={styles.blockAddInfo}>
                        <Text style={styles.titleAddInfo}>Ветер</Text>
                        <Text style={styles.valueAddInfo}>
                            {currWindForDay(windSpeedDay, selectDay)} <Text style={styles.measureUnit}>m/s </Text></Text>
                    </View>
                    <View style={styles.blockAddInfo}>
                        <Text style={styles.titleAddInfo}>Осадки</Text>
                        <Text style={styles.valueAddInfo}> {currDataForDay(precipitationDay, selectDay)}%</Text>
                    </View>
                    <View style={styles.blockAddInfoLastChild}>
                        <Text style={styles.titleAddInfo}>Ощущается</Text>
                        <Text style={styles.valueAddInfo}> {currDataForDay(tempApparentDay, selectDay)}°</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.hourlyForecast}>
                <View style={styles.wrapperHourlyForecast}>
                    <View>
                    <View style={styles.titleItem}><Text style={styles.item}>Время</Text></View>
                        {currForecastDay.map((c: string, i) => (
                            <View style={styles.wrapperHours} key={i}>
                                <Text style={isCurrHour(currHour, c) && selectDay === 0 ? styles.currItem : styles.item}>
                                    {c.slice(11, 16)}
                                </Text>
                            </View>
                        ))}
                    </View>
                    <View>
                    <View style={styles.titleItem}><Text style={styles.item}>Темп</Text></View>
                        {tempForecastDay.map((currTemp, i) => (
                            <View style={styles.wrapperHours} key={i}>
                                <Text style={styles.item}>{currTemp}°</Text>
                            </View>
                        ))}
                    </View>
                    <View>
                    <View style={styles.titleItem}><Text style={styles.item}>Ветер</Text></View>
                        {windSpeedForecastDay.map((winds, i) => (
                            <View style={styles.wrapperWnds} key={i}>
                                <Text style={styles.item}>
                                    {kmHInMS(winds)} <Text style={styles.measureUnit}>м/с</Text>
                                </Text>
                            </View>
                        ))}
                    </View>
                    <View>
                        <View style={styles.titleItem}><Text style={styles.item}>Погода</Text></View>
                        {weatherCodeForecastDay.map((code, i) => (
                            <View style={styles.wrapperIconCondition} key={i}>
                                {returnIcon(code)}
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}

const styles: ForecastForDayStylesTypes = StyleSheet.create({
    wrapper: {
        height: '100%'
    },
    icon: {
        height: '100%',
        width: '100%',
        position: 'absolute'
    },
    preloader: {
        flex: 1
    },
    currWeather: {
        height: '45%',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    currTemp: {
        color: 'white',
        paddingLeft: 30,
        fontSize: 70,
        fontWeight: '200',
        marginTop: 'auto',
        paddingTop: 40
    },
    condition: {
        color: 'white',
        paddingLeft: 30,
        fontSize: 18,
        fontWeight: '300'
    },
    currAddInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '16%',
        marginTop: 'auto',
    },
    blockAddInfo: {
        alignItems: 'center',
        borderRightWidth: 0.6,
        borderColor: 'white',
        paddingRight: 45,
        marginLeft: 10
    },
    blockAddInfoLastChild: {
        alignItems: 'center',
        paddingRight: 10,
        marginLeft: 10
    },
    titleAddInfo: {
        color: 'white',
        fontWeight: '600'
    },
    valueAddInfo: {
        color: 'white',
        fontSize: 22,
        fontWeight: '300',
    },
    measureUnit: {
        fontSize: 13
    },
    wrapperHourlyForecast: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    hourlyForecast: {
        backgroundColor: 'black',
        maxHeight: '100%',
        flexDirection: 'column'
    },
    wrapperHours: {
        flexDirection: 'column',
        height: 35,
        margin: 'auto',
        marginTop: 15,
        marginLeft: 5,
        justifyContent: 'space-around',
        width: 72
    },
    titleItem: {
        marginTop: 15
    },
    item: {
        fontSize: 18,
        color: 'white'
    },
    currItem: {
        fontSize: 19,
        color: 'white',
        fontWeight: '900',
    },
    subItem: {
        fontSize: 12
    },
    wrapperIcon: {
        width: 30
    },
    wrapperWnds: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        height: 35,
        marginTop: 15,
    },
    wrapperIconCondition: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        width: 10,
        marginLeft: 15,
        height: 35,
        marginTop: 15,
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
    back: {
        marginTop: 40,
        marginLeft: 20,
        position: 'absolute',
        zIndex: 10
    },
    backBtn: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500',
        textShadowColor: 'black',
        textShadowRadius: 20
    },
    txt: {
        color: 'black',
        fontSize: 20
    }
})

export default ForecastForDay