import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { AppStyleTypes, dataTypes, dateTypes } from './AppTypes';
import { getCurrentTemp, getForecast, getIsDay, getPrecipitation, getTempApparentForDay, getTempForecastForDay, getTimeForecastForDay, getWheatherCode, getWheatherCodeForHourly, getWindSpeedForDay, getWindSpeedForHourly } from './api/api';
import Forecast from './components/Forecast/Forecast';
import ForecastForDay from './components/ForecastForDay/ForecastForDay';

const App: React.FC = () => {

  const [currTemp, setCurrTemp] = useState('')
  const [isDay, setIsDay] = useState('')
  const [forecast, setForecast] = useState([])
  const [wheatherCode, setWheatherCode] = useState([])
  const [timeforecastForDay, setTimeForecastForDay] = useState<null>(null)
  const [tempForecastForDay, setTempForecastForDay] = useState<null>(null)
  const [isOpenForestForDay, setIsOpenForestForDay] = useState(false)
  const [selectDay, setSelectDay] = useState(0)
  const [hourly, setHourly] = useState<dataTypes | null>(null)
  const [tempHourly, setTempHourly] = useState(null)
  const [wheatherCodeForDay, setWeatherCodeForDay] = useState(null)
  const [wheatherCodeHorly, setWheatherCodeHorly] = useState(null)
  const [windSpeedForecastHourly, setWindSpeedForecastHourly] = useState(null)
  const [windSpeedForecastDay, setWindSpeedForecastDay] = useState(null)
  const [windSpeedDay, setWindSpeedDay] = useState(null)
  const [windSpeedHourly, setWindSpeedHourly] = useState(null)
  const [precipitationForecastDay, setPrecipitationForecastDay] = useState(null)
  const [precipitationDay, setPrecipitationDay] = useState(null)
  const [tempApparentForecastDay, setTempApparentForecastDay] = useState(null)
  const [tempApparentDay, setTempApparentDay] = useState(null)

  useEffect(() => {
    getCurrentTemp(setCurrTemp)
    getIsDay(setIsDay)
    getForecast(setForecast)
    getTimeForecastForDay(setTimeForecastForDay)
    getTempForecastForDay(setTempForecastForDay)
    getWheatherCode(setWheatherCode)
    getWheatherCodeForHourly(setWeatherCodeForDay)
    getWindSpeedForHourly(setWindSpeedForecastHourly)
    getPrecipitation(setPrecipitationForecastDay)
    getWindSpeedForDay(setWindSpeedForecastDay)
    getTempApparentForDay(setTempApparentForecastDay)
  }, [getCurrentTemp, getIsDay, getForecast])

  useEffect(() => {
    setHourly(timeforecastForDay)
    setTempHourly(tempForecastForDay)
    setWheatherCodeHorly(wheatherCodeForDay)
    setWindSpeedHourly(windSpeedForecastHourly)
    setWindSpeedDay(windSpeedForecastDay)
    setTempApparentDay(tempApparentForecastDay)
    setPrecipitationDay(precipitationForecastDay)
  }, [isOpenForestForDay])

  const date: dateTypes = new Date()
  const currDay: number = date.getDay()

  const currHour: string = date.getHours().toString()

  if (!forecast.length) {
    return <ActivityIndicator style={styles.preloader} size='large' color='#0000ff' />
  }

  const dayBg: React.ReactElement = <Image style={styles.background} source={require('./assets/day.jpg')} />
  const nightBg: React.ReactElement = <Image style={styles.background} source={require('./assets/night.jpg')} />

  const returnIcon: Function = (weatherCode: number) => {
    if (weatherCode === 0 || weatherCode === 1) {
      return <Image style={styles.icon} source={require('./assets/iconCondition/clear.png')} />
    } else if (weatherCode === 2) {
      return <Image style={styles.icon} source={require('./assets/iconCondition/partlyСloudy.png')} />
    } else if (weatherCode === 45 || weatherCode === 48) {
      return <Image style={styles.icon} source={require('./assets/iconCondition/fog.png')} />
    } else if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55 || weatherCode === 61 ||
      weatherCode === 63 || weatherCode === 65 || weatherCode === 67 || weatherCode === 80 ||
      weatherCode === 81 || weatherCode === 82) {
      return <Image style={styles.icon} source={require('./assets/iconCondition/rain.png')} />
    } else if (weatherCode === 56 || weatherCode === 57) {
      return <Image style={styles.icon} source={require('./assets/iconCondition/freezingRain.png')} />
    } else if (weatherCode === 3) {
      return <Image style={styles.icon} source={require('./assets/iconCondition/cloudy.png')} />
    } else if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75 || weatherCode === 77 ||
      weatherCode === 85 || weatherCode === 86) {
      return <Image style={styles.icon} source={require('./assets/iconCondition/snow.png')} />
    } else if (weatherCode === 95) {
      return <Image style={styles.icon} source={require('./assets/iconCondition/thunder.png')} />
    } else if (weatherCode === 96 || weatherCode === 99) {
      return <Image style={styles.icon} source={require('./assets/iconCondition/thunderWithRain.png')} />
    }
  }

  return (
    <View style={styles.container}>
      {isDay ? dayBg : nightBg}
      {isOpenForestForDay ?
        <View style={styles.wrapperForecastForDay}>
          {hourly && <ForecastForDay isOpenForestForDay={isOpenForestForDay} setIsOpenForestForDay={setIsOpenForestForDay}
            selectDay={selectDay} hourly={hourly} setHourly={setHourly} currHour={currHour}
            tempHourly={tempHourly} setTempHourly={setTempHourly} returnIcon={returnIcon} wheatherCode={wheatherCode}
            wheatherCodeHorly={wheatherCodeHorly} setWheatherCodeHorly={setWheatherCodeHorly}
            windSpeedHourly={windSpeedHourly} setWindSpeedHourly={setWindSpeedHourly}
            windSpeedDay={windSpeedDay} setWindSpeedDay={setWindSpeedDay} precipitationDay={precipitationDay}
            setPrecipitationDay={setPrecipitationDay} tempApparentDay={tempApparentDay}
            setTempApparentDay={setTempApparentDay} currDay={currDay} />}
        </View> :
        <View style={styles.wrapperMainPage}>
          <View style={styles.wrapperTitle}>
            <Text style={styles.city}>Севастополь</Text>
            <Text style={styles.temperature}>{currTemp}°</Text>
          </View>
          <View style={styles.wrapperWeek}>
            <Forecast currDay={currDay} forecast={forecast} returnIcon={returnIcon}
              setSelectDay={setSelectDay} wheatherCode={wheatherCode}
              isOpenForestForDay={isOpenForestForDay} setIsOpenForestForDay={setIsOpenForestForDay} />
          </View>
        </View>}
      <StatusBar style="light" />
    </View>
  );
}

const styles: AppStyleTypes = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  preloader: {
    flex: 1
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  wrapperMainPage: {
    height: '100%',
  },
  wrapperForecastForDay: {
    height: '100%'
  },
  wrapperTitle: {
    height: '45%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 60
  },
  city: {
    fontSize: 27,
    fontWeight: '200',
    color: 'white',
    letterSpacing: 1,
    textShadowColor: 'gray',
    textShadowRadius: 10
  },
  temperature: {
    fontSize: 70,
    fontWeight: '700',
    color: 'white',
    textShadowColor: 'gray',
    textShadowRadius: 10
  },
  wrapperWeek: {
    height: '52%',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginLeft: 40,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 17,
    alignItems: 'center',
  },
});

export default App