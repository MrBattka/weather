
export const sunnyOption: string[] = ['Sunny', 'Partly cloudy']
export const cloudyOption: string[] = ['Cloudy', 'Overcast']
export const rainOption: string[] = ['Patchy rain possible', 'Patchy freezing drizzle possible', 'Patchy light drizzle',
    'Light drizzle', 'Freezing drizzle', 'Heavy freezing drizzle', 'Patchy light rain', 'Moderate rain at times',
    'Moderate rain', 'Heavy rain at times', 'Heavy rain', 'Heavy rain', 'Moderate or heavy freezing rain',
    'Light rain shower', 'Moderate or heavy rain shower', 'Torrential rain shower', 'Light sleet showers',
    'Moderate or heavy sleet showers']
export const rainWithThunderOption: string[] = ['Patchy light rain with thunder', 'Moderate or heavy rain with thunder']
export const snowOption: string[] = ['Moderate or heavy showers of ice pellets', 'Light showers of ice pellets', 'Moderate or heavy snow showers',
    'Light snow showers', 'Ice pellets', 'Heavy snow', 'Patchy heavy snow', 'Light snow', 'Patchy light snow'
    , 'Moderate snow', 'Moderate or heavy sleet', ': Light sleet', 'Blowing snows', 'Patchy sleet possible',
    'Patchy snow possible', 'Blizzard']
export const thunderyOutbreaksOption: string[] = ['Thundery outbreaks possible', 'Patchy light snow with thunder', 'Moderate or heavy snow with thunder']
export const mistOption: string[] = ['Mist', 'Fog', 'Freezing fog']

export const isCondition = (weatherCode: number) => {
    if (weatherCode === 0 || weatherCode === 1) {
        return 'Ясно'
    } else if (weatherCode === 2) {
        return 'Переменная облачность'
    } else if (weatherCode === 3) {
        return 'Пасмурная погода'
    } else if (weatherCode === 45 || weatherCode === 48) {
        return 'Туман'
    } else if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55 ||
        weatherCode === 56 || weatherCode === 57 || weatherCode === 61 || weatherCode === 63 ||
        weatherCode === 65 || weatherCode === 80 || weatherCode === 81 || weatherCode === 82) {
        return 'Дождь'
    } else if (weatherCode === 66 || weatherCode === 67) { 
        return 'Ледяной дождь'
    } else if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75 ||
        weatherCode === 77 || weatherCode === 85 || weatherCode === 86) {
        return 'Снег'
    } else if (weatherCode === 95) {
        return 'Гроза'
    } else if (weatherCode === 96 || weatherCode === 99) {
        return 'Гроза с осадками'
    }
}

export const weekday: Function = (day: number) => {
    if (day === 0 || day === 7) {
        return 'Sunday'
    } else if (day === 1 || day === 8) {
        return 'Monday'
    } else if (day === 2 || day === 9) {
        return 'Thuesday'
    } else if (day === 3 || day === 10) {
        return 'Wednesday'
    } else if (day === 4 || day === 11) {
        return 'Thursday'
    } else if (day === 5 || day === 12) {
        return 'Friday'
    } else if (day === 6 || day === 13) {
        return 'Suturday'
    }
}

export const isConditionForCurrDay = (selectDay: number, wheatherCode: never[]) => {
    if (selectDay === 0) {
        return isCondition(wheatherCode[0])
    } else if (selectDay === 1) {
        return isCondition(wheatherCode[1])
    } else if (selectDay === 2) {
        return isCondition(wheatherCode[2])
    } else if (selectDay === 3) {
        return isCondition(wheatherCode[3])
    } else if (selectDay === 4) {
        return isCondition(wheatherCode[4])
    } else if (selectDay === 5) {
        return isCondition(wheatherCode[5])
    } else if (selectDay === 6) {
        return isCondition(wheatherCode[6])
    }
}

export const currData = (data: any, selectDay: number, callback: any) => {
    if (selectDay === 0) {
        return callback(data.slice(0, 24))
    } else if (selectDay === 1) {
        return callback(data.slice(24, 48))
    } else if (selectDay === 2) {
        return callback(data.slice(48, 72))
    } else if (selectDay === 3) {
        return callback(data.slice(48, 72))
    } else if (selectDay === 4) {
        return callback(data.slice(72, 96))
    } else if (selectDay === 5) {
        return callback(data.slice(96, 120))
    } else if (selectDay === 6) {
        return callback(data.slice(120, 144))
    }
}

const kmHInMS = (num: number) => {
    const result = num / 3600 * 1000
    return result.toFixed(1)
}

export const currWindForDay = (data: any, selectDay: number) => {
    if (selectDay === 0) {
        return kmHInMS(data[0])
    } else if (selectDay === 1) {
        return kmHInMS(data[1])
    } else if (selectDay === 2) {
        return kmHInMS(data[2])
    } else if (selectDay === 3) {
        return kmHInMS(data[3])
    } else if (selectDay === 4) {
        return kmHInMS(data[4])
    } else if (selectDay === 5) {
        return kmHInMS(data[5])
    } else if (selectDay === 6) {
        return kmHInMS(data[6])
    }
}

export const currDataForDay = (data: any, selectDay: number) => {
    if (selectDay === 0) {
        return data[0]
    } else if (selectDay === 1) {
        return data[1]
    } else if (selectDay === 2) {
        return data[2]
    } else if (selectDay === 3) {
        return data[3]
    } else if (selectDay === 4) {
        return data[4]
    } else if (selectDay === 5) {
        return data[5]
    } else if (selectDay === 6) {
        return data[6]
    }
}