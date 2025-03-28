import axios from "axios";

const key2 = '9e108e13-e7b1-4342-a9fb-f47c475819d7'

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://api.open-meteo.com/v1/`
})

const geoInstance = axios.create({
  withCredentials: true,
  baseURL: `https://geocode-maps.yandex.ru/1.x/`
})

const sunriseSunset = axios.create({
  withCredentials: true,
  baseURL: `https://api.sunrisesunset.io/json`
})



export const getSunrise = async (dispatch: React.Dispatch<React.SetStateAction<null>>,
  latitude: number | undefined, longitude: number | undefined) => {
  try {
    const response = sunriseSunset.get(`?lat=${latitude}&lng=${longitude}`)
    response.then((response) => dispatch(response.data.results.sunrise)
    );
  } catch (err: any) {
    console.log(err)
  }
}

export const getSunset = async (dispatch: React.Dispatch<React.SetStateAction<null>>,
  latitude: number | undefined, longitude: number | undefined) => {
  try {
    const response = sunriseSunset.get(`?lat=${latitude}&lng=${longitude}`)
    response.then((response) => dispatch(response.data.results.sunset)
    );
  } catch (err: any) {
    console.log(err)
  }
}

// 44.5978387,33.5549148 - Sevastopol
export const getLocation = async (dispatch: React.Dispatch<React.SetStateAction<null>>,
  latitude: number | undefined, longitude: number | undefined) => {
  try {
    const response = geoInstance.get(`?apikey=${key2}&geocode=${longitude},${latitude}&autoReverseGeocode=true&kind=locality&results=1&format=json`)
    response.then((response) => dispatch(response.data.response.GeoObjectCollection.featureMember[0]?.GeoObject.name))
    
      // 
  } catch (err: any) {
    console.log(err)
  }
}

export const getCurrentTemp = async (dispatch: React.Dispatch<React.SetStateAction<string>>,
  latitude: number | undefined, longitude: number | undefined) => {

  if (typeof latitude === 'number' && typeof longitude === 'number') {
    try {
      const response = instance.get(`forecast?latitude=${latitude}&longitude=${longitude}&current_weather&timezone=Europe%2FMoscow`)
      response.then((response) => dispatch(response.data.current_weather));
    } catch (err: any) {
      console.log(err + ' position')
    }
  }
};

export const getForecast = async (dispatch: React.Dispatch<React.SetStateAction<never[]>>,
  latitude: number | undefined, longitude: number | undefined) => {
  if (typeof latitude === 'number' && typeof longitude === 'number') {
    try {
      const response =
        instance.get(`forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&timezone=Europe%2FMoscow`)
      response.then((response) => dispatch(response.data.daily.temperature_2m_max));
    } catch (err: any) {
      console.log(err)
    }
  }
};

export const getWeatherCode = async (dispatch: React.Dispatch<React.SetStateAction<never[]>>,
  latitude: number | undefined, longitude: number | undefined) => {
  if (typeof latitude === 'number' && typeof longitude === 'number') {
    try {
      const response =
        instance.get(`forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode&timezone=Europe%2FMoscow&`)
      response.then((response) => dispatch(response.data.daily.weathercode));
    } catch (err: any) {
      console.log(err)
    }
  }
};

export const getTimeForecastForDay = async (dispatch: React.Dispatch<React.SetStateAction<null>>,
  latitude: number | undefined, longitude: number | undefined) => {
  if (typeof latitude === 'number' && typeof longitude === 'number') {
    try {
      const response =
        instance.get(`forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timezone=Europe%2FMoscow&`)
      response.then((response) => dispatch(response.data.hourly.time));
    } catch (err: any) {
      console.log(err)
    }
  }
}

export const getTempForecastForDay = async (dispatch: React.Dispatch<React.SetStateAction<null>>,
  latitude: number | undefined, longitude: number | undefined) => {
  if (typeof latitude === 'number' && typeof longitude === 'number') {
    try {
      const response =
        instance.get(`forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timezone=Europe%2FMoscow&`)
      response.then((response) => dispatch(response.data.hourly.temperature_2m));
    } catch (err: any) {
      console.log(err)
    }
  }
}

export const getWeatherCodeForHourly = async (dispatch: React.Dispatch<React.SetStateAction<null>>,
  latitude: number | undefined, longitude: number | undefined) => {
  if (typeof latitude === 'number' && typeof longitude === 'number') {
    try {
      const response =
        instance.get(`forecast?latitude=${latitude}&longitude=${longitude}&hourly=weathercode&timezone=Europe%2FMoscow&`)
      response.then((response) => dispatch(response.data.hourly.weathercode));
    } catch (err: any) {
      console.log(err)
    }
  }
}

export const getWindSpeedForHourly = async (dispatch: React.Dispatch<React.SetStateAction<null>>,
  latitude: number | undefined, longitude: number | undefined) => {
  if (typeof latitude === 'number' && typeof longitude === 'number') {
    try {
      const response =
        instance.get(`forecast?latitude=${latitude}&longitude=${longitude}&hourly=windspeed_10m&timezone=Europe%2FMoscow&`)
      response.then((response) => dispatch(response.data.hourly.windspeed_10m));
    } catch (err: any) {
      console.log(err)
    }
  }
}

export const getPrecipitation = async (dispatch: React.Dispatch<React.SetStateAction<null>>,
  latitude: number | undefined, longitude: number | undefined) => {
  if (typeof latitude === 'number' && typeof longitude === 'number') {
    try {
      const response =
        instance.get(`forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_probability_mean&timezone=Europe%2FMoscow&`)
      response.then((response) => dispatch(response.data.daily.precipitation_probability_mean));
    } catch (err: any) {
      console.log(err)
    }
  }
}

export const getWindSpeedForDay = async (dispatch: React.Dispatch<React.SetStateAction<null>>,
  latitude: number | undefined, longitude: number | undefined) => {
  if (typeof latitude === 'number' && typeof longitude === 'number') {
    try {
      const response =
        instance.get(`forecast?latitude=${latitude}&longitude=${longitude}&daily=windspeed_10m_max&timezone=Europe%2FMoscow&`)
      response.then((response) => dispatch(response.data.daily.windspeed_10m_max));
    } catch (err: any) {
      console.log(err)
    }
  }
}

export const getTempApparentForDay = async (dispatch: React.Dispatch<React.SetStateAction<null>>,
  latitude: number | undefined, longitude: number | undefined) => {
  if (typeof latitude === 'number' && typeof longitude === 'number') {
    try {
      const response =
        instance.get(`forecast?latitude=${latitude}&longitude=${longitude}&daily=apparent_temperature_max&timezone=Europe%2FMoscow&`)
      response.then((response) => dispatch(response.data.daily.apparent_temperature_max));
    } catch (err: any) {
      console.log(err)
    }
  }
}