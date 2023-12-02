import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

export const storeData = async (key: string, value: any): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        console.log('Error storing data', e);
    }
}

export const getData = async (key: string): Promise<number | void> => {
    try {
        const value = await AsyncStorage.getItem(key)
        const numValue = Number(value)
        if (numValue !== null) {
            return numValue
        }

    } catch (e) {
        console.log('Error getting data', e);
    }
}

export const save = async (key: string, value: any): Promise<void> => {
    const jsonValue = JSON.stringify(value)
    await SecureStore.setItemAsync(key, jsonValue)
}

export const getValueFor = async (key: string): Promise<void> => {
    let result = await SecureStore.getItemAsync(key)
    if (result) {
        console.log("🔐 Here's your value 🔐 \n" + result)
    } else {
        console.log('No values stored under that key.')
    }
}