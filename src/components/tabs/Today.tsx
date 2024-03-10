import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'

const Today = () => {
    return (
        <View className='flex-1'>
            <View className='flex-1 flex-col max-w-xs px-4 items-center justify-start mt-48 mx-auto'>
                <Image
                    source={require("@/assets/images/task.png")}
                    width={1024}
                    height={1024}
                    className="w-20 h-20 object-cover"
                />
                <Text className="mt-4 text-center font-[Semibold] text-lg text-zinc-800">
                    Create a task to get started
                </Text>
                <Text className="mt-1 text-center text-zinc-500 font-[Regular]">
                    You have not created any task yet. Click the button below to create a task.
                </Text>
            </View>
        </View>
    )
}

export default Today