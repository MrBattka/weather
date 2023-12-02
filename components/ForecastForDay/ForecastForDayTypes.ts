import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { dataTypes } from "../../AppTypes";

export type ForecastForDayTypes = {
    isOpenForestForDay: boolean
    setIsOpenForestForDay: React.Dispatch<React.SetStateAction<boolean>>
    selectDay: number
    hourly: dataTypes | never[]
    setHourly: React.Dispatch<React.SetStateAction<dataTypes | null>>
    currHour: string
    tempHourly: null
    setTempHourly: React.Dispatch<React.SetStateAction<null>>
    returnIcon: Function
    weatherCode: never[]
    weatherCodeHourly: null
    setWeatherCodeHourly: React.Dispatch<React.SetStateAction<null>>
    windSpeedHourly: null
    setWindSpeedHourly: React.Dispatch<React.SetStateAction<null>>
    windSpeedDay: null
    setWindSpeedDay: React.Dispatch<React.SetStateAction<null>>
    precipitationDay: null
    setPrecipitationDay: React.Dispatch<React.SetStateAction<null>>
    tempApparentDay: null
    setTempApparentDay: React.Dispatch<React.SetStateAction<null>>
    currDay: number
    forecast: never[]
}

export type ForecastForDayStylesTypes = {
    wrapper: ViewStyle
    icon: ImageStyle
    preloader: ImageStyle
    currWeather: ViewStyle
    currTemp: TextStyle
    condition: TextStyle
    currAddInfo: ViewStyle
    blockAddInfo: ViewStyle
    blockAddInfoLastChild: ViewStyle
    titleAddInfo: TextStyle
    valueAddInfo: TextStyle
    measureUnit: TextStyle
    wrapperHourlyForecast: ViewStyle
    hourlyForecast: ViewStyle
    wrapperHours: ViewStyle
    titleItem: ViewStyle
    item: TextStyle
    currItem: TextStyle
    wrapperWinds: ViewStyle
    wrapperIconCondition: ViewStyle
    back: ViewStyle
    backBtn: TextStyle
}