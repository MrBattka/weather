import { TextStyle, ViewStyle } from "react-native";

export type ForecastType = {
    forecast: never[]
    currDay: number
    isOpenForestForDay: boolean
    setIsOpenForestForDay: React.Dispatch<React.SetStateAction<boolean>>
    setSelectDay: React.Dispatch<React.SetStateAction<number>>
    weatherCode: never[]
    returnIcon: Function
}

export type ForecastStylesTypes = {
    wrapper: ViewStyle
    wrapperWeekdays: ViewStyle
    currDay: TextStyle
    wrapperForecast: ViewStyle
    forecastTemp: ViewStyle
    forecastIcon: ViewStyle
    wrapperIcon: ViewStyle
    goToForecastForDay: TextStyle
}