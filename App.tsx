import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { getCurrentTemp, getForecast, getIsDay } from './api/api';
import Forecast from './components/Forecast/Forecast';

const App = () => {
  const [currTemp, setCurrTemp] = useState('')
  const [isDay, setIsDay] = useState('')
  const [forecast, setForecast] = useState([])

  useEffect(() => {
    getCurrentTemp(setCurrTemp)
    getIsDay(setIsDay)
    getForecast(setForecast)
  }, [getCurrentTemp, getIsDay, getForecast])

  const date = new Date()
  const currDay = date.getDay()
 
  if (!forecast.length) {
    return <ActivityIndicator style={styles.preloader} size='large' color='#0000ff' />
  }

  const dayBg = <Image style={styles.background} source={require('./assets/day.jpg')} />
  const nightBg = <Image style={styles.background} source={require('./assets/night.jpg')} />

  return (
    <View style={styles.container}>
      {isDay ? dayBg : nightBg}
      <View style={styles.wrapperTitle}>
        <Text style={styles.city}>Sevastopol</Text>
        <Text style={styles.temperature}>{currTemp}°</Text>
      </View>
      <View style={styles.wrapperWeek}>
        <Forecast currDay={currDay} forecast={forecast} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
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
});

export default App