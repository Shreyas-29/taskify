import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const AddButton = () => {

    const router = useRouter();

    return (
        <View className="absolute z-50 flex-row items-center justify-end w-full right-6 bottom-6">

            <TouchableOpacity onPress={() => router.push("/addTask")} className="flex-row items-center justify-center rounded-full shadow-md w-14 h-14 shadow-zinc-300 bg-zinc-800">
                <Plus size={24} color="#fff" className="to-zinc-800" />
            </TouchableOpacity>
        </View>
    )
}

export default AddButton