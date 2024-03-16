import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const Loader = () => {
    return (
        <View className="absolute inset-0 z-50 items-center justify-center flex-1 w-full h-full bg-white">
            <ActivityIndicator size="large" color="#171717" />
        </View>
    )
}

export default Loader
