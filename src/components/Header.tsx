import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Bell, Search } from 'lucide-react-native'

const Header = () => {
    return (
        <View className="flex-row items-center justify-between w-full px-4 py-4 border-neutral-200">
            <View className="flex-row items-center">
                <Image source={require("@/assets/images/logo.png")} width={500} height={500} className="object-cover w-8 h-8" />
                <Text className="ml-2 text-lg font-[Semibold] text-neutral-900">
                    Taskify
                </Text>
            </View>
            <View className="flex-row items-center gap-4">
                <TouchableOpacity className="flex-row items-center justify-center w-10 h-10 border rounded-md border-neutral-200/50">
                    <Search size={20} className="text-neutral-800" />
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center justify-center w-10 h-10 border rounded-md border-neutral-200/50">
                    <Bell size={20} className="text-neutral-800" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header