import { dataTypes } from "../../AppTypes"

export type ForecastType = {
    forecast: never[]
    currDay: number
    isOpenForestForDay: boolean
    setIsOpenForestForDay: React.Dispatch<React.SetStateAction<boolean>>
    selectDay: number
    setSelectDay: React.Dispatch<React.SetStateAction<number>>
    wheatherCode: never[]
    returnIcon: Function
}

export type ForecastStylesTypes = {
    wrapper: object
    wrapperWeekdays: object
    weekday: object
    currDay: object
    wrapperForecast: object
    forecastTemp: object
    temp: object
    forecastIcon: object
    wrapperIcon: object
    icon: object
    goToForecastForDay: object
}