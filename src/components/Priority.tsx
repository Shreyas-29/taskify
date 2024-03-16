import { cn } from '@/lib/utils';
import { Priority as PriorityProps } from '@/types';
import React from 'react';
import { Text, TextProps } from 'react-native';

interface Props extends TextProps {
    priority: PriorityProps;
}

const Priority = ({ priority, ...props }: Props) => {
    return (
        <Text
            {...props}
            className={cn(
                "text-sm font-[Medium] capitalize px-3 py-1 rounded-md",
                priority === "important" ? "bg-red-500/10 text-red-500" : priority === "high" ? "bg-yellow-500/10 text-yellow-500" : priority === "medium" ? "bg-blue-500/10 text-blue-500" : "bg-gray-500/10 text-gray-500"
            )}
        >
            {priority}
        </Text>
    )
};

export default Priority
