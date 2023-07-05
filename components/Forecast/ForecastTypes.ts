import { dataTypes } from "../../AppTypes"

export type ForecastType = {
    forecast: never[]
    currDay: number
    isOpenForestForDay: boolean
    setIsOpenForestForDay: React.Dispatch<React.SetStateAction<boolean>>
    setSelectDay: React.Dispatch<React.SetStateAction<number>>
    wheatherCode: never[]
    returnIcon: Function
}

export type ForecastStylesTypes = {
    wrapper: object
    wrapperWeekdays: object
    currDay: object
    wrapperForecast: object
    forecastTemp: object
    forecastIcon: object
    wrapperIcon: object
    goToForecastForDay: object
}