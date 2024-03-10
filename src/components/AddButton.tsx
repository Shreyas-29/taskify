import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CircleFadingPlus, PlusCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const AddButton = () => {

    const router = useRouter();
    const navigation = useNavigation();

    return (
        <View className="absolute z-50 flex-row items-center justify-center w-full mx-auto bottom-8">

            <TouchableOpacity onPress={() => router.push("/addTask")} className="flex-row items-center justify-center px-3 shadow-md shadow-zinc-500 py-2 rounded-lg bg-zinc-800">
                <PlusCircle size={20} color="#27272a" fill="#fafafa" className="to-zinc-800" />
                <Text className="text-sm text-zinc-50 font-[Medium] ml-1.5">
                    Add Task
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default AddButton