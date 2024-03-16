import { Priority, TextLoader } from '@/components';
import useTaskStore from '@/hooks/useBoard';
import { appwrite } from '@/lib/appwrite';
import { ExtendedDocument, Task } from '@/types';
import { Databases } from 'appwrite';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AlarmClock, ArrowLeft, Calendar, CheckCircle2, Clock, SquarePen, Trash2 } from 'lucide-react-native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';

type TaskStatusUpdate = {
    status: "completed";
}

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID as string;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID as string;

const TaskDetails = () => {

    const router = useRouter();

    const params = useLocalSearchParams();

    let taskId = params.taskId as string;

    const toast = useToast();

    const { updateTask, deleteTask, tasks, setTasks } = useTaskStore();

    const [task, setTask] = useState<ExtendedDocument<Task> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isCompleting, setIsCompleting] = useState<boolean>(false);

    const handleDeleteTask = async (taskId: string) => {
        setIsDeleting(true);
        try {
            if (!taskId) {
                toast.show("This task does not exists. Please refresh.");
                return;
            }

            await deleteTask(taskId);

            // Filter out the deleted task from the tasks array and update the local state
            const updatedTasks = tasks.filter((task) => task?.$id !== taskId);
            setTasks(updatedTasks);

            router.push("/");
        } catch (error) {
            console.log('Error deleting task: ', error);
            toast.show('Could not delete task, please try again later');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCompleteTask = async (taskId: string) => {
        setIsCompleting(true);
        try {
            if (!taskId) {
                toast.show("This task does not exists. Please refresh.");
                return;
            }

            if (task?.status === "completed") {
                toast.show("This task is already completed");
                return;
            }

            const statusUpdate: TaskStatusUpdate = {
                status: "completed",
            };

            await updateTask(taskId, statusUpdate);

            setTask(task => {
                if (task) {
                    return {
                        ...task,
                        status: "completed",
                    };
                }
                return task;
            });

        } catch (error) {
            console.log('Error completing task: ', error);
            toast.show('Could not complete task, please try again later');
        } finally {
            setIsCompleting(false);
        }
    };

    const handleNavigate = () => {
        router.push({
            pathname: '/details',
            params: {
                taskId: task?.$id! as string,
            }
        });
    };

    const handleEditTask = () => {
        toast.show("We are working on this feature. Please check back later.");
    };

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
                    Task Details
                </Text>
                <View className="w-10 h-10"></View>
            </View>

            {/* Details */}
            <View className="justify-center flex-1 w-full px-4 mt-4">
                <View className="flex-row items-center justify-between py-2">
                    <TextLoader width={90} height={24} radius={8} isReady={isLoading}>
                        <Priority priority={task?.priority!} />
                    </TextLoader>
                    <TouchableOpacity
                        onPress={() => handleEditTask()}
                        className="flex-row items-center px-3 py-1 border rounded-md border-neutral-200"
                    >
                        <SquarePen size={16} color="#525252" />
                        <Text className="text-neutral-600 ml-2 font-[Medium]">
                            Edit
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="my-4">
                    <TextLoader width={180} height={16} radius={4} isReady={isLoading}>
                        <Text className="text-lg font-[Medium] text-neutral-800">
                            {task?.title}
                        </Text>
                    </TextLoader>
                    {isLoading && <View className="w-1 h-2" />}
                    <TextLoader width={100} height={16} radius={4} isReady={isLoading}>
                        <Text className="text-sm mt-1 font-[Regular] text-neutral-500">
                            {task?.description}
                        </Text>
                    </TextLoader>
                </View>

                <View className="w-full h-px bg-neutral-200/80" />

                <View className="my-4 space-y-4">
                    <View className="flex-row items-center justify-center">
                        <View className="flex-row items-center flex-">
                            <Calendar size={16} color="#525252" />
                            <Text className="text-neutral-500 ml-1 font-[Regular]">
                                Due Date
                            </Text>
                        </View>
                        <Text className="text-neutral-600 font-[Regular] ml-10 mr-auto">
                            {moment(task?.date).format("Do MMM YYYY")}
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-center">
                        <View className="flex-row items-center flex-">
                            <Clock size={16} color="#525252" />
                            <Text className="text-neutral-500 ml-1 font-[Regular]">
                                Due Time
                            </Text>
                        </View>
                        <Text className="text-neutral-600 font-[Regular] ml-10 mr-auto">
                            {task?.time ? moment(task?.time).format("LT") : 'Not Set'}
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-center">
                        <View className="flex-row items-center flex-">
                            <AlarmClock size={16} color="#525252" />
                            <Text className="text-neutral-500 ml-1 font-[Regular]">
                                Reminder
                            </Text>
                        </View>
                        <Text className="text-neutral-600 font-[Regular] ml-10 mr-auto">
                            {task?.reminder === true ? "Enabled" : "Disabled"}
                        </Text>
                    </View>
                </View>

                <View className="w-full h-px bg-neutral-200/80" />

                <View className="flex-col my-4">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-base font-[Medium] text-neutral-600">
                            Subtask
                        </Text>
                        <Text className="text-sm font-[Regular] text-neutral-500">
                            5/15
                        </Text>
                    </View>
                    <View className="items-start mt-4">
                        <Text className="text-sm font-[Regular] text-neutral-500">
                            You have not added any subtasks yet.
                        </Text>
                    </View>
                </View>

                <View className="flex-col items-center justify-center gap-4 mt-auto mb-8">
                    <TouchableOpacity
                        disabled={isDeleting}
                        onPress={() => handleDeleteTask(task?.$id!)}
                        className="flex-row items-center justify-center w-full h-10 py-2 bg-white border rounded-lg border-neutral-200/80"
                    >
                        {isDeleting ? (
                            <ActivityIndicator size="small" color="#f87171" />
                        ) : (
                            <Trash2 size={16} color="#ef4444" />
                        )}
                        <Text className="text-red-500 ml-2 font-[Medium]">
                            {isDeleting ? "Deleting..." : "Delete Task"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={isCompleting}
                        onPress={() => handleCompleteTask(task?.$id!)}
                        className="flex-row items-center justify-center w-full h-10 py-2 rounded-lg bg-neutral-800"
                    >
                        {isLoading ? (
                            <Text className="w-full h-10 rounded-lg bg-neutral-200"></Text>
                        ) : (
                            <>
                                {isCompleting ? (
                                    <ActivityIndicator size="small" color="#fff" className="mr-2" />
                                ) : null}
                                {task?.status === "completed" && (
                                    <CheckCircle2 size={16} color="#fff" className="mr-2" />
                                )}
                                <Text className="text-white font-[Medium]">
                                    {task?.status === "completed" ? "Completed" : isCompleting ? "Updating..." : "Mark as Completed"}
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    )
}

export default TaskDetails