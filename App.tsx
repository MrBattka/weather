import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppStyleTypes, dataTypes, dateTypes } from './AppTypes';
import {
  getCurrentTemp, getForecast,
  getLocation, getPrecipitation, getTempApparentForDay,
  getTempForecastForDay, getTimeForecastForDay, getWeatherCode, getWeatherCodeForHourly,
  getWindSpeedForDay, getWindSpeedForHourly
} from './api/api';
import { isDayNow } from './common/weatherHelpers';
import Forecast from './components/Forecast/Forecast';
import ForecastForDay from './components/ForecastForDay/ForecastForDay';

const App: React.FC = () => {

  const [isDay, setIsDay] = useState(false)
  const [forecast, setForecast] = useState([])
  const [weatherCode, setWeatherCode] = useState([])
  const [timeForecastForDay, setTimeForecastForDay] = useState<null>(null)
  const [tempForecastForDay, setTempForecastForDay] = useState<null>(null)
  const [isOpenForestForDay, setIsOpenForestForDay] = useState(false)
  const [selectDay, setSelectDay] = useState(0)
  const [hourly, setHourly] = useState<dataTypes | null>(null)
  const [tempHourly, setTempHourly] = useState(null)
  const [weatherCodeForDay, setWeatherCodeForDay] = useState(null)
  const [weatherCodeHourly, setWeatherCodeHourly] = useState(null)
  const [windSpeedForecastHourly, setWindSpeedForecastHourly] = useState(null)
  const [windSpeedForecastDay, setWindSpeedForecastDay] = useState(null)
  const [windSpeedDay, setWindSpeedDay] = useState(null)
  const [windSpeedHourly, setWindSpeedHourly] = useState(null)
  const [precipitationForecastDay, setPrecipitationForecastDay] = useState(null)
  const [precipitationDay, setPrecipitationDay] = useState(null)
  const [tempApparentForecastDay, setTempApparentForecastDay] = useState(null)
  const [tempApparentDay, setTempApparentDay] = useState(null)
  const [location, setLocation] = useState<Location.LocationObjectCoords>()
  const [geo, setGeo] = useState(null)

  //   store geo

  const storeLocation = async (location: Location.LocationObjectCoords) => {
    try {
      if (location) {
        const jsonValue = JSON.stringify(location)
        await AsyncStorage.setItem('location', jsonValue)
      }

    } catch (e) {
      console.log('Error storing data', e);
    }
  }

  useEffect(() => {
    if (location) {
      storeLocation(location)
    }
  }, [storeLocation, setLocation, location])

  //    get geo

  const getStoreLocation = async (): Promise<void> => {
    try {
      const prevGeo: string | null = await AsyncStorage.getItem('location')

      if (prevGeo !== null) {
        const arrValue = prevGeo.slice(1, -1)
        const result = JSON.parse('{' + arrValue + '}')
        setLocation(result)
      } else {
        getNewPosition()
      }

    } catch (err) {
      console.log('Error getting data', err);
    }
  }

  useEffect(() => {
    getStoreLocation()
  }, [])

  const date: dateTypes = new Date()
  const currDay: number = date.getDay()
  const hour: number = date.getHours()
  const currHour: string = date.getHours().toString()

  useEffect(() => {
    isDayNow(setIsDay, hour)
  }, [])

  useEffect(() => {
    getForecast(setForecast, location?.latitude, location?.longitude)
    getTimeForecastForDay(setTimeForecastForDay, location?.latitude, location?.longitude)
    getTempForecastForDay(setTempForecastForDay, location?.latitude, location?.longitude)
    getWeatherCode(setWeatherCode, location?.latitude, location?.longitude)
    getWeatherCodeForHourly(setWeatherCodeForDay, location?.latitude, location?.longitude)
    getWindSpeedForHourly(setWindSpeedForecastHourly, location?.latitude, location?.longitude)
    getPrecipitation(setPrecipitationForecastDay, location?.latitude, location?.longitude)
    getWindSpeedForDay(setWindSpeedForecastDay, location?.latitude, location?.longitude)
    getTempApparentForDay(setTempApparentForecastDay, location?.latitude, location?.longitude)
    getLocation(setGeo, location?.latitude, location?.longitude)
  }, [getCurrentTemp, getForecast, typeof location === 'object', typeof geo === 'object'])

  useEffect(() => {
    setHourly(timeForecastForDay)
    setTempHourly(tempForecastForDay)
    setWeatherCodeHourly(weatherCodeForDay)
    setWindSpeedHourly(windSpeedForecastHourly)
    setWindSpeedDay(windSpeedForecastDay)
    setTempApparentDay(tempApparentForecastDay)
    setPrecipitationDay(precipitationForecastDay)
  }, [isOpenForestForDay])

  const getNewPosition: Function = async (): Promise<Location.LocationObjectCoords | undefined> => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      console.log('Please grant location permissions');
      return
    }
    let currentLocation = await Location.getCurrentPositionAsync({})
    if (location !== currentLocation.coords) {
      setLocation(currentLocation.coords)
    }
  }

  if (typeof location === 'undefined' || location === null) {
    return <ActivityIndicator style={styles.preloader} size='large' color='#0000ff' />
  }

  const dayBg: React.ReactElement = <Image style={styles.background} source={require('./assets/day.gif')} />
  const nightBg: React.ReactElement = <Image style={styles.background} source={require('./assets/night.gif')} />
  const preloadImg: React.ReactElement = <Image style={styles.positionIcon} source={require('./assets/reload.png')} />

  const returnIcon: Function = (weatherCode: number) => {
    if (weatherCode === 0 || weatherCode === 1) {
      return <Image style={styles.icon} source={require('./assets/iconCondition/clear.png')} />
    } else if (weatherCode === 2) {
      return <Image style={styles.icon} source={require('./assets/iconCondition/partlyCloudy.png')} />
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

  const returnCurrIcon: Function = (weatherCode: number) => {
    if (weatherCode === 0 || weatherCode === 1) {
      return <Image style={styles.icon} source={require('./assets/iconCondition/clear.png')} />
    } else if (weatherCode === 2) {
      return <Image style={styles.currIcon} source={require('./assets/iconCondition/partlyCloudy.png')} />
    } else if (weatherCode === 45 || weatherCode === 48) {
      return <Image style={styles.currIcon} source={require('./assets/iconCondition/fog.png')} />
    } else if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55 || weatherCode === 61 ||
      weatherCode === 63 || weatherCode === 65 || weatherCode === 67 || weatherCode === 80 ||
      weatherCode === 81 || weatherCode === 82) {
      return <Image style={styles.currIcon} source={require('./assets/iconCondition/rain.png')} />
    } else if (weatherCode === 56 || weatherCode === 57) {
      return <Image style={styles.currIcon} source={require('./assets/iconCondition/freezingRain.png')} />
    } else if (weatherCode === 3) {
      return <Image style={styles.currIcon} source={require('./assets/iconCondition/cloudy.png')} />
    } else if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75 || weatherCode === 77 ||
      weatherCode === 85 || weatherCode === 86) {
      return <Image style={styles.currIcon} source={require('./assets/iconCondition/snow.png')} />
    } else if (weatherCode === 95) {
      return <Image style={styles.currIcon} source={require('./assets/iconCondition/thunder.png')} />
    } else if (weatherCode === 96 || weatherCode === 99) {
      return <Image style={styles.currIcon} source={require('./assets/iconCondition/thunderWithRain.png')} />
    }
  }

  return (
    <View style={styles.container}>
      {isDay ? dayBg : nightBg}
      {isOpenForestForDay ?

        <View style={styles.wrapperForecastForDay}>
          {hourly && <ForecastForDay isOpenForestForDay={isOpenForestForDay} setIsOpenForestForDay={setIsOpenForestForDay}
            selectDay={selectDay} hourly={hourly} setHourly={setHourly} currHour={currHour}
            tempHourly={tempHourly} setTempHourly={setTempHourly} returnIcon={returnIcon} weatherCode={weatherCode}
            weatherCodeHourly={weatherCodeHourly} setWeatherCodeHourly={setWeatherCodeHourly}
            windSpeedHourly={windSpeedHourly} setWindSpeedHourly={setWindSpeedHourly}
            windSpeedDay={windSpeedDay} setWindSpeedDay={setWindSpeedDay} precipitationDay={precipitationDay}
            setPrecipitationDay={setPrecipitationDay} tempApparentDay={tempApparentDay}
            setTempApparentDay={setTempApparentDay} currDay={currDay} forecast={forecast} />}
        </View> :

        <View style={styles.wrapperMainPage}>
          <View style={styles.wrapperTitle}>
            <TouchableOpacity style={styles.reloadPosition} onPress={() => getNewPosition()}>
              <Text style={styles.reloadTitle}>Обновить позицию</Text>{preloadImg}
            </TouchableOpacity>
            <Text style={styles.city}>{geo}</Text>
            <Text style={styles.temperature}>{forecast[0]}°</Text>
            <View style={styles.wrapperCurrIcon}>{returnCurrIcon(weatherCode[0])}</View>
          </View>
          <View style={styles.wrapperWeek}>
            <Forecast currDay={currDay} forecast={forecast} returnIcon={returnIcon}
              setSelectDay={setSelectDay} weatherCode={weatherCode}
              isOpenForestForDay={isOpenForestForDay} setIsOpenForestForDay={setIsOpenForestForDay} />
          </View>
        </View>}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create<AppStyleTypes>({
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
    height: '100%',
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
    paddingBottom: 40
  },
  reloadPosition: {
    width: 100,
    marginBottom: '10%',
    marginLeft: '60%',
    flexDirection: 'row'
  },
  reloadTitle: {
    fontWeight: '400',
    color: '#969696',
  },
  positionIcon: {
    width: 40,
    height: 40
  },
  city: {
    fontSize: 27,
    fontWeight: '400',
    color: 'white',
    letterSpacing: 1,
    textShadowColor: 'gray',
    textShadowRadius: 10,
    textAlign: 'center'
  },
  temperature: {
    marginLeft: 28,
    fontSize: 70,
    fontWeight: '500',
    color: 'white'
  },
  wrapperWeek: {
    height: '52%',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginLeft: 25,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 17,
    alignItems: 'center',
  },
  wrapperCurrIcon: {
    opacity: 0.8,
    borderRadius: 50
  },
  currIcon: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center'
  }
});

export default App