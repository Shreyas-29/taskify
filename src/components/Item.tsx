import { cn } from '@/lib/utils';
import { Task } from '@/types';
import { useRouter } from 'expo-router';
import moment from 'moment';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    item: Task;
}

const Item = ({ item }: Props) => {

    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => {
                router.push({
                    pathname: '/details',
                    params: {
                        taskId: item.$id! as string,
                    }
                })
            }}
            className="flex-col items-start justify-center w-full py-3"
        >

            <Text className="text-base text-neutral-800 font-[Medium]">
                {item.title}
            </Text>
            <Text className="text-sm mt-1 text-neutral-500 font-[Regular]">
                {item.description.length > 50 ? item.description.slice(0, 50) + '...' : item.description}
            </Text>
            <View className="flex-row items-center justify-between w-full mt-2">
                <Text className={cn(
                    "px-2 py-0.5 rounded font-[Medium] capitalize text-xs",
                    item.priority === 'important' ? 'bg-red-500/10 text-red-500'
                        : item.priority === 'high' ? 'bg-yellow-500/10 text-yellow-500'
                            : item.priority === 'medium' ? 'bg-blue-500/10 text-blue-500'
                                : 'bg-neutral-500/10 text-neutral-500'
                )}>
                    {item.priority}
                </Text>
                <Text className="text-xs text-neutral-500 font-[Regular]">
                    {moment(item.date || item.time).format("LT") + " " + moment(item?.date).format("Do MMM")}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default Item
