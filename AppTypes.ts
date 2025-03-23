import { FlexStyle, ImageStyle, TextStyle, ViewStyle } from "react-native";

export type dateTypes = {
    getDay: () => number
    getHours: () => number
    getMinutes: () => number
}

export type AppStyleTypes = {
    container: ViewStyle
    preloader: ImageStyle
    background: ImageStyle
    wrapperMainPage: ViewStyle
    wrapperForecastForDay: ViewStyle
    wrapperTitle: ViewStyle
    reloadPosition: ViewStyle
    reloadTitle: TextStyle
    positionIcon: ImageStyle
    city: TextStyle
    temperature: TextStyle
    wrapperWeek: ViewStyle
    icon: ImageStyle
    currIcon: ImageStyle
    wrapperCurrIcon: ViewStyle
    bgCondition: ImageStyle
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
    time: hourType[]
}