import axios from "axios";

const key = '3f4d9eb05018402abfb140837231106'
const key2 = '3ffec6198ed9cde51f12418cf7d3ed03'

const instance = axios.create({
  withCredentials: true,
  baseURL: `http://api.weatherapi.com/v1/`,
});

const instance2 = axios.create({
  withCredentials: true,
  baseURL: `https://api.open-meteo.com/v1/`
})

export const getCurrentTemp = async (dispatch: React.Dispatch<React.SetStateAction<string>>) => {
  try {
    const response = instance.get(`forecast.json?key=${key}&q=Sevastopol&aqi=no&alerts=no`)
    response.then((response) => dispatch(response.data.forecast.forecastday[0].day.avgtemp_c));
  } catch (err: any) {
    console.log(err)
  }
};

export const getIsDay = async (dispatch: React.Dispatch<React.SetStateAction<string>>) => {
  try {
    const response = instance.get(`current.json?key=${key}&q=Sevastopol&aqi=no&alerts=no`)
    response.then((response) => dispatch(response.data.current.is_day));
  } catch (err: any) {
    console.log(err)
  }
};

export const getForecast = async (dispatch: React.Dispatch<React.SetStateAction<never[]>>) => {
  try {
    const response = instance2.get(`forecast?latitude=44.61&longitude=33.52&daily=temperature_2m_max&timezone=Europe%2FMoscow&`)
    response.then((response) => dispatch(response.data.daily.temperature_2m_max));
  } catch (err: any) {
    console.log(err)
  }
};

export const getWheatherCode = async (dispatch: React.Dispatch<React.SetStateAction<never[]>>) => {
  try {
    const response = instance2.get(`forecast?latitude=44.61&longitude=33.52&daily=weathercode&timezone=Europe%2FMoscow&`)
    response.then((response) => dispatch(response.data.daily.weathercode));
  } catch (err: any) {
    console.log(err)
  }
};

export const getTimeForecastForDay = async (dispatch: React.Dispatch<React.SetStateAction<null>>) => {
  try {
    const response = instance2.get(`forecast?latitude=44.61&longitude=33.52&hourly=temperature_2m&timezone=Europe%2FMoscow&`)
    response.then((response) => dispatch(response.data.hourly.time));
  } catch (err: any) {
    console.log(err)
  }
}

export const getTempForecastForDay = async (dispatch: React.Dispatch<React.SetStateAction<null>>) => {
  try {
    const response = instance2.get(`forecast?latitude=44.61&longitude=33.52&hourly=temperature_2m&timezone=Europe%2FMoscow&`)
    response.then((response) => dispatch(response.data.hourly.temperature_2m));
  } catch (err: any) {
    console.log(err)
  }
} 

export const getWheatherCodeForHourly = async (dispatch: React.Dispatch<React.SetStateAction<null>>) => {
  try {
    const response = instance2.get(`forecast?latitude=44.61&longitude=33.52&hourly=weathercode&timezone=Europe%2FMoscow&`)
    response.then((response) => dispatch(response.data.hourly.weathercode));
  } catch (err: any) {
    console.log(err)
  }
} 

export const getWindSpeedForHourly = async (dispatch: React.Dispatch<React.SetStateAction<null>>) => {
  try {
    const response = instance2.get(`forecast?latitude=44.61&longitude=33.52&hourly=windspeed_10m&timezone=Europe%2FMoscow&`)
    response.then((response) => dispatch(response.data.hourly.windspeed_10m));
  } catch (err: any) {
    console.log(err)
  }
}

export const getPrecipitation = async (dispatch: React.Dispatch<React.SetStateAction<null>>) => {
  try {
    const response = instance2.get(`forecast?latitude=44.61&longitude=33.52&daily=precipitation_probability_mean&timezone=Europe%2FMoscow&`)
    response.then((response) => dispatch(response.data.daily.precipitation_probability_mean));
  } catch (err: any) {
    console.log(err)
  }
}

export const getWindSpeedForDay = async (dispatch: React.Dispatch<React.SetStateAction<null>>) => {
  try {
    const response = instance2.get(`forecast?latitude=44.61&longitude=33.52&daily=windspeed_10m_max&timezone=Europe%2FMoscow&`)
    response.then((response) => dispatch(response.data.daily.windspeed_10m_max));
  } catch (err: any) {
    console.log(err)
  }
}

export const getTempApparentForDay = async (dispatch: React.Dispatch<React.SetStateAction<null>>) => {
  try {
    const response = instance2.get(`forecast?latitude=44.61&longitude=33.52&daily=apparent_temperature_max&timezone=Europe%2FMoscow&`)
    response.then((response) => dispatch(response.data.daily.apparent_temperature_max));
  } catch (err: any) {
    console.log(err)
  }
}