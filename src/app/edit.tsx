import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { ArrowLeft } from 'lucide-react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Databases } from 'appwrite'
import { appwrite } from '@/lib/appwrite'
import { useToast } from 'react-native-toast-notifications'
import { ExtendedDocument, Task } from '@/types'
import { useAuth } from '@/context/AuthProvider'

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID as string;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID as string;

const Edit = () => {

    const router = useRouter();

    const params = useLocalSearchParams();

    let taskId = params.taskId as string;

    const toast = useToast();

    const { user } = useAuth();

    const [task, setTask] = useState<ExtendedDocument<Task> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [editedTask, setEditedTask] = useState<Task>({
        $id: task?.$id as string,
        title: task?.title || '',
        description: task?.description || '',
        date: task?.date || new Date(),
        time: task?.date || new Date(),
        priority: task?.priority || "important",
        reminder: task?.reminder || false,
        status: task?.status || "pending",
        userId: user?.$id as string,
    });

    const handleSaveTask = async () => {

    }

    useEffect(() => {
        const getTask = async () => {
            try {
                const databases = new Databases(appwrite.client);

                const response = await databases.getDocument(
                    DATABASE_ID,
                    COLLECTION_ID,
                    taskId
                );

                setTask(response as ExtendedDocument<Task>);
                setEditedTask({
                    $id: response.$id as string,
                    title: response.title,
                    description: response.description,
                    date: response.date,
                    time: response.time,
                    priority: response.priority,
                    reminder: response.reminder,
                    status: response.status,
                    userId: response.userId,
                });
            } catch (error) {
                console.log("Error getting task: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        getTask();
    }, [taskId]);

    return (
        <SafeAreaView className="flex-1 bg-white">

            <StatusBar style="dark" backgroundColor="#fff" animated={true} />

            {/* Header */}
            <View className="flex-row items-center justify-between w-full px-4 py-3 bg-white border-b border-neutral-200/80">
                <TouchableOpacity onPress={() => router.back()} className="flex items-center justify-center w-10 h-10 border rounded-lg border-neutral-200/80">
                    <ArrowLeft size={20} color="#27272a" />
                </TouchableOpacity>
                <Text className="text-lg font-[Medium] text-neutral-800">
                    Edit Task
                </Text>
                <View className="w-10 h-10"></View>
            </View>

            <View className="items-center flex-1 w-full mt-4">

            </View>

        </SafeAreaView>
    )
}

export default Edit