import axios from "axios";

const key = '3f4d9eb05018402abfb140837231106'

const instance = axios.create({
  withCredentials: true,
  baseURL: `http://api.weatherapi.com/v1/`,
});

export const getCurrentTemp = async (dispatch: any) => {
  try {
    const response = instance.get(`forecast.json?key=${key}&q=Sevastopol&aqi=no&alerts=no`)
    response.then((response) => dispatch(response.data.forecast.forecastday[0].day.avgtemp_c));
  } catch (err: any) {
    console.log(err)
  }
};

export const getIsDay = async (dispatch: any) => {
  try {
    const response = instance.get(`current.json?key=${key}&q=Sevastopol&aqi=no&alerts=no`)
    response.then((response) => dispatch(response.data.current.is_day));
  } catch (err: any) {
    console.log(err)
  }
};

export const getForecast = async (dispatch: any) => {
  try {
    const response = instance.get(`forecast.json?key=${key}&q=Sevastopol&days=7&aqi=no&alerts=no`)
    response.then((response) => dispatch(response.data.forecast.forecastday));
  } catch (err: any) {
    console.log(err)
  }
};