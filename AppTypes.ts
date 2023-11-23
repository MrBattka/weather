export type dateTypes = {
    getDay: () => number
    getHours: () => number
}

export type AppStyleTypes = {
    container: object
    preloader: object
    background: object
    wrapperMainPage: object
    wrapperForecastForDay: object
    wrapperTitle: object
    reloadPosition: object
    reloadTitle: object
    positionIcon: object
    city: object
    temperature: object
    wrapperWeek: object
    icon: object
    currIcon: object
    wrapperCurrIcon: object
}

export type dataTypes = {
    forecastForDay: forecastForDayType
}

type dayType = {
    avgtemp_c: string
    condition: conditionType
    maxwind_kph: number
    avghumidity: number
}

type conditionType = {
    text: string
}

type hourType = {
    pressure_mb: number
    feelslike_c: number
    time: number
}

export type forecastForDayType = {
    time: []
}