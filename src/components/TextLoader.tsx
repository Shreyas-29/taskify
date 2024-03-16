// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View } from 'react-native';
import { GradientProps, SkeletonContainer } from 'react-native-dynamic-skeletons';

interface Props {
    width: number;
    height: number;
    radius: number;
    isReady?: boolean;
    children?: React.ReactNode;
};

const Gradient = (props: GradientProps) => <LinearGradient {...props} />;

const TextLoader = ({ width, height, radius, isReady, children }: Props) => {
    return (
        <SkeletonContainer
            isLoading={isReady ? true : false}
            Gradient={Gradient}
            animationType="leftRight"
            colors={['#d4d4d4', '#e5e5e5']}
            style={{ height, width, borderRadius: radius }}
        >
            <View>
                {children}
            </View>
        </SkeletonContainer>
    )
};

export default TextLoader
