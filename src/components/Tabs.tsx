import { cn } from '@/lib/utils';
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import Completed from './tabs/Completed';
import Today from './tabs/Today';
import Upcoming from './tabs/Upcoming';

const Tabs = () => {

    const tabs = ['Today', 'Upcoming', 'Completed'];

    const [activeTab, setActiveTab] = useState<number>(0);

    const handleTabPress = (index: number) => {
        setActiveTab(index);
    };

    return (
        <View className="flex-1 w-full px-4 py-2">
            <View className="flex-row items-center justify-between w-full h-10 px-1 rounded-lg border-[0.5px] border-zinc-200 bg-zinc-100/80">
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleTabPress(index)}
                        className={cn(
                            "flex-row rounded-md px-2 py-1.5 flex-1 items-center relative justify-center bg-transparent",
                            activeTab === index ? 'bg-white' : 'bg-transparent'
                        )}
                    >
                        <Text className={cn("text-sm", activeTab === index ? "font-[Semibold] text-zinc-900" : "font-[Medium] text-zinc-500")}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View className='items-center justify-center flex-1'>
                {activeTab === 0 ? (
                    <Today activeTab={activeTab} />
                ) : activeTab === 1 ? (
                    <Upcoming activeTab={activeTab} />
                ) : (
                    <Completed activeTab={activeTab} />
                )}
            </View>
        </View>
    )
}

export default Tabs