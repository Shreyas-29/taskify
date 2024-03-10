import { View, Text, TouchableOpacity, TextInput, Switch } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import { ArrowLeft, Calendar, Clock, MoreVertical, NotepadText, TextQuote } from 'lucide-react-native'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { cn } from '@/lib/utils'

type AndroidMode = 'date' | 'time';

type Priority = 'important' | 'high' | 'medium' | 'low';

const AddTask = () => {

    const router = useRouter();

    const [date, setDate] = useState<Date>(new Date());
    const [mode, setMode] = useState<AndroidMode>('date');
    const [show, setShow] = useState<boolean>(false);
    const [priority, setPriority] = useState<Priority>('important');
    const [reminder, setReminder] = useState<boolean>(false);

    const handleChange = (event: any, selectedDate: any) => {
        let currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };
    const showMode = (currentMode: AndroidMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const handleShowDatepicker = () => {
        showMode('date');
    };

    const handleShowTimepicker = () => {
        showMode('time');
    };

    const handlePriority = (priority: Priority) => {
        setPriority(priority);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">

            <StatusBar style="dark" backgroundColor="#fff" animated={true} />

            {/* Header */}
            <View className="flex-row items-center justify-between w-full px-4 py-3 bg-white border-b border-neutral-100">
                <TouchableOpacity onPress={() => router.back()} className="flex items-center justify-center w-10 h-10 border rounded-lg border-neutral-200/60">
                    <ArrowLeft size={20} color="#27272a" />
                </TouchableOpacity>
                <Text className="text-lg font-[Medium] text-neutral-800">
                    New Task
                </Text>
                <TouchableOpacity className="flex items-center justify-center w-10 h-10 border rounded-lg border-neutral-200/60">
                    <MoreVertical size={20} color="#27272a" />
                </TouchableOpacity>
            </View>

            {/* Form */}
            <View className="items-start flex-1 w-full px-4 mt-4">
                <View className="relative w-full">
                    <NotepadText size={20} strokeWidth={1.8} color="#737373" className="absolute z-10 top-3.5 left-3" />
                    <TextInput
                        placeholder="Task title"
                        placeholderTextColor="#737373"
                        className="pl-10 pr-4 to-neutral-100 py-auto h-12 w-full rounded-lg bg-neutral-50  border-neutral-200/40 text-neutral-800 font-[Regular] text-sm"
                    />
                </View>

                <View className="relative w-full mt-4">
                    <TextQuote size={20} strokeWidth={1.8} color="#737373" className="absolute z-10 top-3.5 left-3" />
                    <TextInput
                        multiline={true}
                        // numberOfLines={4}
                        placeholder="Add a description"
                        placeholderTextColor="#737373"
                        style={{ textAlignVertical: 'top' }}
                        className="pl-10 pr-4 py-3.5 h-24 w-full rounded-lg bg-neutral-50 border border-neutral-200/40 text-neutral-800 font-[Regular] text-sm"
                    />
                </View>

                <View className="relative w-full mt-4">
                    <Calendar size={20} strokeWidth={1.8} color="#737373" className="absolute z-10 top-3.5 left-3" />
                    <TouchableOpacity
                        onPress={handleShowDatepicker}
                        className="flex-row items-center justify-start w-full h-12 pl-10 pr-4 border rounded-lg bg-neutral-50 border-neutral-200/40">
                        <Text className="text-neutral-500 text-sm font-[Regular]">
                            {date?.toDateString()}
                        </Text>
                    </TouchableOpacity>
                </View>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode as AndroidMode}
                        is24Hour={true}
                        onChange={handleChange}
                    />
                )}

                <View className="relative w-full mt-4">
                    <Clock size={20} strokeWidth={1.8} color="#737373" className="absolute z-10 top-3.5 left-3" />
                    <TouchableOpacity
                        onPress={handleShowTimepicker}
                        className="flex-row items-center justify-start w-full h-12 pl-10 pr-4 border rounded-lg bg-neutral-50 border-neutral-200/40">
                        <Text className="text-neutral-500 text-sm font-[Regular]">
                            {date?.toLocaleTimeString()}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="relative w-full mt-4">
                    <Text className='text-base font-[Medium] text-neutral-800 ml-1'>
                        Select a priority
                    </Text>
                    <View className="flex-row items-center justify-around w-full mt-2">
                        <TouchableOpacity
                            onPress={() => handlePriority('important')}
                            className={cn(
                                "flex-row items-center w-auto px-3 py-1 rounded-md",
                                priority === 'important' ? 'bg-red-500' : 'bg-red-500/10'
                            )}
                        >
                            <Text className={cn(
                                "text-sm font-[Medium]",
                                priority === 'important' ? 'text-red-50' : 'text-red-500'
                            )}>
                                Important
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handlePriority('high')}
                            className={cn(
                                "flex-row items-center w-auto px-3 py-1 rounded-md",
                                priority === 'high' ? 'bg-yellow-500' : 'bg-yellow-500/10'
                            )}
                        >
                            <Text className={cn(
                                "text-sm font-[Medium]",
                                priority === 'high' ? 'text-yellow-50' : 'text-yellow-500'
                            )}>
                                High
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handlePriority('medium')}
                            className={cn(
                                "flex-row items-center w-auto px-3 py-1 rounded-md",
                                priority === 'medium' ? 'bg-blue-500' : 'bg-blue-500/10'
                            )}
                        >
                            <Text className={cn(
                                "text-sm font-[Medium]",
                                priority === 'medium' ? 'text-blue-50' : 'text-blue-500'
                            )}>
                                Medium
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handlePriority('low')}
                            className={cn(
                                "flex-row items-center w-auto px-3 py-1 rounded-md",
                                priority === 'low' ? 'bg-neutral-500' : 'bg-neutral-500/10'
                            )}
                        >
                            <Text className={cn(
                                "text-sm font-[Medium]",
                                priority === 'low' ? 'text-neutral-50' : 'text-neutral-500'
                            )}>
                                Low
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="relative w-full mt-4">
                    <View className="flex-row items-center justify-between w-full">
                        <Text className='text-base font-[Medium] text-neutral-800 ml-1'>
                            Set a reminder
                        </Text>
                        <Switch
                            value={reminder}
                            trackColor={{ false: "#e5e5e5", true: "#e5e5e5" }}
                            thumbColor={reminder ? "#27272a" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setReminder(!reminder)}
                        />
                    </View>
                    <Text className='text-sm font-[Regular] text-neutral-500 ml-1'>
                        You will get a reminder 10 minutes before your task
                    </Text>
                </View>

                <View className="items-center justify-end flex-1 w-full mb-8">
                    <TouchableOpacity className="flex-row items-center justify-center w-full py-2.5 rounded-lg bg-neutral-800">
                        <Text className="text-sm text-neutral-50 font-[Medium]">
                            Save Task
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default AddTask