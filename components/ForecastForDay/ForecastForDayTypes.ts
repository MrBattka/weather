import { dataTypes } from "../../AppTypes"

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
    wheatherCode: never[]
    wheatherCodeHorly: null
    setWheatherCodeHorly: React.Dispatch<React.SetStateAction<null>>
    windSpeedHourly: null
    setWindSpeedHourly: React.Dispatch<React.SetStateAction<null>>
    windSpeedDay: null
    setWindSpeedDay: React.Dispatch<React.SetStateAction<null>>
    precipitationDay: null
    setPrecipitationDay: React.Dispatch<React.SetStateAction<null>>
    tempApparentDay: null
    setTempApparentDay: React.Dispatch<React.SetStateAction<null>>
}