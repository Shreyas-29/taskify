import { AddButton, Header, Tabs } from '@/components'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
    return (
        <SafeAreaView className='flex-1 bg-white'>

            <StatusBar style='dark' />

            <Header />

            <Tabs />

            <AddButton />

        </SafeAreaView>
    )
}

export default Home