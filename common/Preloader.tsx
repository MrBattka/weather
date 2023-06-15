import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Preloader = () => {

    const preloader = <Image source={require('../assets/preloader.svg')} />

    return (
        <View style={styles.wrapper}>
            <Image source={require('../assets/preloader.svg')} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
    }
})

export default Preloader