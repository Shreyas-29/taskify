import { cn } from '@/lib/utils';
import { Task } from '@/types';
import { Calendar, CalendarClock, CheckCircle2 } from 'lucide-react-native';
import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';
import Priority from './Priority';

interface Props {
    task: Task;
}

const SearchItem = ({ task }: Props) => {
    return (
        <View className="flex-col items-start justify-center w-full px-4 py-3 bg-white border rounded-lg border-neutral-200/80">
            <View className="flex-row items-center">
                <Priority priority={task.priority} className="px-2.5 py-1 text-xs rounded" />
            </View>
            <View className="flex-col items-start mt-2">
                <Text className="text-lg font-[Medium] text-neutral-800">
                    {task.title}
                </Text>
                <Text className="text-sm font-[Regular] text-neutral-600">
                    {task.description.length > 50 ? task.description.slice(0, 50) + '...' : task.description}
                </Text>
            </View>
            <View className="w-full h-px my-3 bg-neutral-200/50"></View>
            <View className="flex-row items-center justify-between w-full">
                <View className="flex-row items-center">
                    {task.status === "completed" ? (
                        <CheckCircle2 size={18} color="#22c55e" />
                    ) : (
                        <CalendarClock size={18} color="#f87171" />
                    )}
                    <Text className={cn(
                        "text-sm ml-1 capitalize font-[Regular]",
                        task.status === "completed" ? "text-neutral-500" : "text-neutral-500"
                    )}>
                        {task.status}
                    </Text>
                </View>
                <View className="flex-row items-center ml-10">
                    <Calendar size={18} color="#a3a3a3" />
                    <Text className="text-[13px] text-neutral-500 ml-1 font-[Regular]">
                        {moment(task.date).format("Do MMM, LT")}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default SearchItem
