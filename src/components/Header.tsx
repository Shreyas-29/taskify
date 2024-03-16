import { useAuth } from '@/context/AuthProvider'
import useImage from '@/hooks/useImage'
import { useRouter } from 'expo-router'
import { Inbox, Search } from 'lucide-react-native'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const Header = () => {

    const router = useRouter();

    const { user } = useAuth();

    const { image } = useImage();

    return (
        <View className="flex-row items-center justify-between w-full px-4 py-4 border-neutral-200">
            <TouchableOpacity
                onPress={() => router.push("/profile")}
                className="flex-row items-center"
            >
                <View className="flex-row items-center w-8 h-8 border rounded-full border-neutral-400">
                    <Image source={{ uri: image && image || "https://image.lexica.art/full_webp/21d2a6e0-0bac-4bd9-8596-2838999b1449" }} width={500} height={500} className="object-cover w-8 h-8 rounded-full" />
                </View>
                <Text className="ml-2 text-base font-[Medium] text-neutral-900">
                    {user?.name}
                </Text>
            </TouchableOpacity>
            <View className="flex-row items-center gap-4">
                <TouchableOpacity
                    onPress={() => router.push("/search")}
                    className="flex-row items-center justify-center w-10 h-10 border rounded-md border-neutral-200/50"
                >
                    <Search size={20} className="text-neutral-800" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => router.push("/notifications")}
                    className="flex-row items-center justify-center w-10 h-10 border rounded-md border-neutral-200/50"
                >
                    <Inbox size={20} className="text-neutral-800" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header