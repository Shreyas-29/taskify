import { SearchItem } from '@/components'
import { useAuth } from '@/context/AuthProvider'
import useTaskStore from '@/hooks/useBoard'
import { cn } from '@/lib/utils'
import { Task } from '@/types'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ArrowLeft, SearchIcon, SlidersHorizontal, XCircle } from 'lucide-react-native'
import moment from 'moment'
import React, { useState } from 'react'
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { ScrollView } from 'react-native-virtualized-view'

const Search = () => {

    const router = useRouter();

    const { tasks } = useTaskStore();

    const { user } = useAuth();

    const [input, setInput] = useState<string>("");
    const [results, setResults] = useState<Task[]>([]);
    const [activeTab, setActiveTab] = useState<number>(0);

    const userTasks = tasks.filter((task) => {
        return task?.userId === user.$id;
    });

    const handleTabPress = (index: number) => {
        setActiveTab(index);

        let filteredTasks: Task[] = [];

        switch (index) {
            case 0: // All
                filteredTasks = userTasks;
                break;
            case 1: // Today
                filteredTasks = userTasks.filter((task) => {
                    const taskDate = moment(task.date || task.time);
                    return taskDate.isSame(moment(), "day");
                });
                break;
            case 2: // Upcoming
                filteredTasks = userTasks.filter((task) => {
                    const taskDate = moment(task.date || task.time);
                    return taskDate.isAfter(moment(), "day");
                });
                break;
            case 3: // Completed
                filteredTasks = userTasks.filter((task) => {
                    return task.status === "completed";
                });
                break;
            default:
                filteredTasks = userTasks;
        };

        // Update the results state with filtered tasks
        setResults(filteredTasks);
    };

    const handleSearch = () => {
        const filteredTasks = userTasks.filter((task: Task) =>
            task.title.toLowerCase().includes(input.toLowerCase()) ||
            task.description.toLowerCase().includes(input.toLowerCase())
        );

        setResults(filteredTasks);
    };

    const handleChange = (text: string) => {
        setInput(text);
        if (text.length > 0) {
            handleSearch();
        } else {
            setResults([]);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">


            <StatusBar style="dark" backgroundColor="#fff" animated={true} />

            {/* Header */}
            <View className="flex-row items-center justify-between w-full px-4 py-3 bg-white border-b border-neutral-200/80">
                <TouchableOpacity onPress={() => router.back()} className="flex items-center justify-center w-10 h-10 border rounded-lg border-neutral-200/80">
                    <ArrowLeft size={20} color="#27272a" />
                </TouchableOpacity>
                <Text className="text-lg font-[Medium] text-neutral-800">
                    Search Task
                </Text>
                <View className="w-10 h-10"></View>
            </View>

            <View className="flex-1 w-full px-4 mt-4">

                {/* Input and Filter */}
                <View className="flex-row items-center w-full">
                    <View className="relative flex-1 to-neutral-400">
                        <SearchIcon size={20} color="#737373" className="absolute z-10 top-2.5 left-3" />
                        <TextInput
                            value={input}
                            onChangeText={(text) => handleChange(text)}
                            returnKeyType="search"
                            placeholder="Search for task"
                            placeholderTextColor="#737373"
                            className="font-[Regular] text-sm  rounded-lg border-neutral-200/50 bg-zinc-100/60 pl-10 pr-4 py-2 h-10 text-neutral-800"
                        />
                        {input.length > 0 && (
                            <TouchableOpacity
                                onPress={() => setInput("")}
                                className="absolute z-10 top-2.5 right-3"
                            >
                                <XCircle size={20} color="#a3a3a3" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View className="items-center ml-3">
                        <TouchableOpacity className="flex-row items-center justify-center w-10 h-10 rounded-lg bg-neutral-800">
                            <SlidersHorizontal size={18} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Filter Tabs */}
                <View className="flex-row items-center w-full py-4 overflow-scroll border-b border-neutral-200/60">
                    <FlatList
                        horizontal
                        data={["All", "Today", "Upcoming", "Completed"]}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => <View className="w-2" />}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => handleTabPress(index)}
                                className={cn(
                                    "items-center justify-center h-8 px-3 border rounded-md border-neutral-200/80",
                                    activeTab === index ? "bg-neutral-700 border-neutral-700" : "bg-transparent"
                                )}
                            >
                                <Text className={cn(
                                    "font-[Medium] text-sm",
                                    activeTab === index ? "text-white" : "text-neutral-600"
                                )}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                    {/* Search Results */}
                    <View className="items-center w-full mt-4">

                        {input.length === 0 && results.length === 0 && (
                            <FlatList
                                data={userTasks}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => <SearchItem task={item} />}
                                ItemSeparatorComponent={() => <View className="h-4" />}
                                contentContainerStyle={{ paddingBottom: 20 }}
                                style={{ width: "100%" }}
                            />
                        )}

                        {input.length > 0 && results.length === 0 && (
                            <View className="flex-col items-center justify-center w-full mt-24">
                                <Image source={require("@/assets/images/no-results.png")} className="object-cover w-10 h-10" />
                                <Text className="mt-4 text-base font-[Regular] text-neutral-600">
                                    No results found
                                </Text>
                            </View>
                        )}

                        {input.length > 0 || results.length > 0 ? (
                            <FlatList
                                data={results}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => <SearchItem task={item} />}
                                ItemSeparatorComponent={() => <View className="h-4" />}
                                contentContainerStyle={{ paddingBottom: 20 }}
                                style={{ width: "100%" }}
                            />
                        ) : null}

                    </View>

                </ScrollView>

            </View>

        </SafeAreaView>
    )
}

export default Search
