import useTaskStore from '@/hooks/useBoard'
import { cn } from '@/lib/utils'
import { Priority, Task } from '@/types'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ArrowLeft, Calendar, Clock, MoreVertical, NotepadText, TextQuote } from 'lucide-react-native'
import React, { useState } from 'react'
import { ActivityIndicator, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useToast } from 'react-native-toast-notifications'

type AndroidMode = 'date' | 'time';

const AddTask = () => {

    const router = useRouter();

    const { addTask, tasks, setTasks } = useTaskStore();

    const toast = useToast();

    const [mode, setMode] = useState<AndroidMode>('date');
    const [show, setShow] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [taskTitle, setTaskTitle] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [taskDate, setTaskDate] = useState<Date>(new Date());
    const [taskPriority, setTaskPriority] = useState<Priority>('important');
    const [taskReminder, setTaskReminder] = useState<boolean>(false);

    const handleChange = (event: any, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setTaskDate(selectedDate);
            setShow(false);
            // console.log('Date', selectedDate);
        }
    };

    const handleShow = (currentMode: AndroidMode) => {
        DateTimePickerAndroid.open({
            mode: currentMode,
            value: taskDate,
            is24Hour: true,
            onChange: handleChange,
            display: 'default',
        });
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
        setTaskPriority(priority);
    };

    const handleSaveTask = async () => {
        if (!taskTitle || !taskDescription || !taskDate || !taskPriority) {
            toast.show('Please fill all fields');
            return;
        }

        setIsLoading(true);

        try {
            const task: Task = {
                title: taskTitle,
                description: taskDescription,
                date: taskDate,
                time: taskDate,
                priority: taskPriority,
                reminder: taskReminder || false,
                status: 'pending',
            };

            await addTask(task);

            // Update local state with the newly added task
            setTasks([...tasks, task]);

            toast.show('Task saved successfully');
            router.back();
        } catch (error) {
            console.log('Error saving task: ', error);
            toast.show('Could not save task, please try again later');
        } finally {
            setIsLoading(false);
        }
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

                {/* Title */}
                <View className="relative w-full">
                    <NotepadText size={20} strokeWidth={1.8} color="#737373" className="absolute z-10 top-3.5 left-3" />
                    <TextInput
                        editable={!isLoading}
                        autoFocus={true}
                        value={taskTitle}
                        onChangeText={setTaskTitle}
                        placeholder="Task title"
                        placeholderTextColor="#737373"
                        className="pl-10 pr-4 to-neutral-100 py-auto h-12 w-full rounded-lg bg-neutral-50  border-neutral-200/40 text-neutral-800 font-[Regular] text-sm"
                    />
                </View>

                {/* Description */}
                <View className="relative w-full mt-4">
                    <TextQuote size={20} strokeWidth={1.8} color="#737373" className="absolute z-10 top-3.5 left-3" />
                    <TextInput
                        editable={!isLoading}
                        multiline={true}
                        value={taskDescription}
                        onChangeText={setTaskDescription}
                        placeholder="Add a description"
                        placeholderTextColor="#737373"
                        style={{ textAlignVertical: 'top' }}
                        className="pl-10 pr-4 py-3.5 h-24 w-full rounded-lg bg-neutral-50 border border-neutral-200/40 text-neutral-800 font-[Regular] text-sm"
                    />
                </View>

                {/* Date */}
                <View className="relative w-full mt-4">
                    <Calendar size={20} strokeWidth={1.8} color="#737373" className="absolute z-10 top-3.5 left-3" />
                    <TouchableOpacity
                        disabled={isLoading}
                        onPress={() => handleShow('date')}
                        className="flex-row items-center justify-start w-full h-12 pl-10 pr-4 border rounded-lg bg-neutral-50 border-neutral-200/40">
                        {taskDate ? (
                            <Text className="text-neutral-500 text-sm font-[Regular]">
                                {taskDate?.toDateString()!}
                            </Text>
                        ) : (
                            <Text className="text-neutral-500 text-sm font-[Regular]">
                                Select a date
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>

                {show && (
                    <DateTimePicker
                        disabled={isLoading}
                        testID="dateTimePicker"
                        value={mode === 'date' ? taskDate! : taskDate!}
                        mode={mode as AndroidMode}
                        is24Hour={false}
                        onChange={(event, selectedDate) => handleChange(event, selectedDate)}
                    />
                )}

                {/* Time */}
                <View className="relative w-full mt-4">
                    <Clock size={20} strokeWidth={1.8} color="#737373" className="absolute z-10 top-3.5 left-3" />
                    <TouchableOpacity
                        disabled={isLoading}
                        onPress={() => handleShow('time')}
                        className="flex-row items-center justify-start w-full h-12 pl-10 pr-4 border rounded-lg bg-neutral-50 border-neutral-200/40">
                        {taskDate ? (
                            <Text className="text-neutral-500 text-sm font-[Regular]">
                                {taskDate?.toLocaleTimeString()!}
                            </Text>
                        ) : (
                            <Text className="text-neutral-500 text-sm font-[Regular]">
                                Select a time
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Priority */}
                <View className="relative w-full mt-4">
                    <Text className='text-base font-[Medium] text-neutral-800 ml-1'>
                        Select a priority
                    </Text>
                    <View className="flex-row items-center justify-around w-full mt-2">
                        <TouchableOpacity
                            disabled={isLoading}
                            onPress={() => handlePriority('important')}
                            className={cn(
                                "flex-row items-center w-auto px-3 py-1 rounded-md",
                                taskPriority === 'important' ? 'bg-red-500' : 'bg-red-500/10'
                            )}
                        >
                            <Text className={cn(
                                "text-sm font-[Medium]",
                                taskPriority === 'important' ? 'text-red-50' : 'text-red-500'
                            )}>
                                Important
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={isLoading}
                            onPress={() => handlePriority('high')}
                            className={cn(
                                "flex-row items-center w-auto px-3 py-1 rounded-md",
                                taskPriority === 'high' ? 'bg-yellow-500' : 'bg-yellow-500/10'
                            )}
                        >
                            <Text className={cn(
                                "text-sm font-[Medium]",
                                taskPriority === 'high' ? 'text-yellow-50' : 'text-yellow-500'
                            )}>
                                High
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={isLoading}
                            onPress={() => handlePriority('medium')}
                            className={cn(
                                "flex-row items-center w-auto px-3 py-1 rounded-md",
                                taskPriority === 'medium' ? 'bg-blue-500' : 'bg-blue-500/10'
                            )}
                        >
                            <Text className={cn(
                                "text-sm font-[Medium]",
                                taskPriority === 'medium' ? 'text-blue-50' : 'text-blue-500'
                            )}>
                                Medium
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={isLoading}
                            onPress={() => handlePriority('low')}
                            className={cn(
                                "flex-row items-center w-auto px-3 py-1 rounded-md",
                                taskPriority === 'low' ? 'bg-neutral-500' : 'bg-neutral-500/10'
                            )}
                        >
                            <Text className={cn(
                                "text-sm font-[Medium]",
                                taskPriority === 'low' ? 'text-neutral-50' : 'text-neutral-500'
                            )}>
                                Low
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Reminder */}
                <View className="relative w-full mt-4">
                    <View className="flex-row items-center justify-between w-full">
                        <Text className='text-base font-[Medium] text-neutral-800 ml-1'>
                            Set a reminder
                        </Text>
                        <Switch
                            disabled={isLoading}
                            value={taskReminder}
                            trackColor={{ false: "#e5e5e5", true: "#e5e5e5" }}
                            thumbColor={taskReminder ? "#27272a" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setTaskReminder(!taskReminder)}
                        />
                    </View>
                    <Text className='text-sm font-[Regular] text-neutral-500 ml-1'>
                        You will get a reminder 10 minutes before your task
                    </Text>
                </View>

                <View className="items-center justify-end flex-1 w-full mb-8">
                    <TouchableOpacity
                        disabled={isLoading}
                        onPress={handleSaveTask}
                        className="flex-row items-center justify-center w-full h-10 py-2 rounded-lg bg-neutral-800"
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text className="text-sm text-neutral-50 font-[Medium]">
                                Save Task
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default AddTask