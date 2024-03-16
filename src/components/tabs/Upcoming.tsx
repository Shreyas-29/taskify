import { useAuth } from '@/context/AuthProvider';
import useTaskStore from '@/hooks/useBoard';
import { appwrite } from '@/lib/appwrite';
import { cn } from '@/lib/utils';
import { Task } from '@/types';
import { Databases } from 'appwrite';
import { usePathname, useRouter } from 'expo-router';
import moment from 'moment';
import React, { useEffect } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import Item from '../Item';

interface Props {
    activeTab: number;
}

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID as string;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID as string;

const Upcoming = ({ activeTab }: Props) => {

    const pathname = usePathname();

    const { user } = useAuth();

    const { tasks, setTasks } = useTaskStore();

    const upcomingTasks = tasks.filter((task) => {
        const taskDate = moment(task.date || task.time);
        // NOTE: isAfter method will get the tasks excluding todays tasks
        return (
            taskDate.isAfter(moment(), "day") &&
            task?.status !== "completed" &&
            task?.userId === user.$id
        );
    });

    const getTasks = async () => {
        try {
            const databases = new Databases(appwrite.client);
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
            );

            const tasks: Task[] = response.documents?.map((doc) => {
                return {
                    ...doc as any,
                };
            });

            setTasks(tasks);
        } catch (error) {
            console.log("Error getting tasks: ", error);
        }
    };

    useEffect(() => {
        getTasks();
    }, [pathname]);

    const renderItem = ({ item }: { item: Task }) => (
        <Item item={item} />
    );

    return (
        <ScrollView className='flex-1 w-full'>
            <View className="flex-col items-center justify-center flex-1 w-full px-2 mt-4">
                {upcomingTasks?.length > 0 ? (
                    <FlatList
                        data={upcomingTasks}
                        horizontal={false}
                        renderItem={renderItem}
                        keyExtractor={item => item.$id?.toString()! + Math.random().toString()}
                        ItemSeparatorComponent={() => <View className="w-full h-px bg-neutral-200/80" />}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <View className='items-center justify-start flex-1 max-w-xs px-4 mx-auto mt-48'>
                        <Image
                            source={require("@/assets/images/upcoming.png")}
                            width={1024}
                            height={1024}
                            className="object-cover w-20 h-20"
                        />
                        <Text className="mt-4 text-center font-[Semibold] text-lg text-zinc-800">
                            No upcoming tasks
                        </Text>
                        <Text className="mt-1 text-center text-zinc-500 font-[Regular]">
                            These are the tasks that are scheduled for the future
                        </Text>
                    </View>
                )}
            </View>
        </ScrollView>
    )
}

export default Upcoming