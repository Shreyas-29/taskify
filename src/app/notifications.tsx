import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ArrowLeft } from 'lucide-react-native'
import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Notifications = () => {

    const router = useRouter();

    const notifications: string[] = [];

    const renderItem = ({ item }: { item: any }) => (
        <View className="w-full py-2 border-b border-neutral-200/80">
            <Text className="text-base font-[Medium] text-neutral-800">
                {item}
            </Text>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-white">

            <StatusBar style="dark" backgroundColor="#fff" animated={true} />

            {/* Header */}
            <View className="flex-row items-center justify-between w-full px-4 py-3 bg-white border-b border-neutral-200/80">
                <TouchableOpacity onPress={() => router.back()} className="flex items-center justify-center w-10 h-10 border rounded-lg border-neutral-200/80">
                    <ArrowLeft size={20} color="#27272a" />
                </TouchableOpacity>
                <Text className="text-lg font-[Medium] text-neutral-800">
                    Notifications
                </Text>
                <View className="w-10 h-10"></View>
            </View>

            {/* Notifications */}
            <View className="items-start px-4 py-2">
                <View className="items-start w-full mt-6">

                    {/* No Notifications */}
                    {notifications?.length === 0 && (
                        <View className="items-center justify-center w-full mt-56">
                            <Image
                                source={require("@/assets/images/inbox.png")}
                                width={1024}
                                height={1024}
                                className="object-cover w-20 h-20 opacity-80"
                            />
                            <Text className="text-lg mt-2 font-[Medium] text-neutral-800">
                                All caught up!
                            </Text>
                            <Text className="text-base font-[Regular] text-neutral-600">
                                You have no new notifications.
                            </Text>
                        </View>
                    )}

                    {/* List */}
                    <FlatList
                        data={notifications}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => <View className="h-2" />}
                    />
                </View>
            </View>

        </SafeAreaView>
    )
}

export default Notifications