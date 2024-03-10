import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Home from '.';
import AddTask from './addTask';
import '@/styles/globals.css';

const Stack = createStackNavigator();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        'Light': require('@/src/assets/fonts/Inter-Light.ttf'),
        'Regular': require('@/src/assets/fonts/Inter-Regular.ttf'),
        'Medium': require('@/src/assets/fonts/Inter-Medium.ttf'),
        'Semibold': require('@/src/assets/fonts/Inter-SemiBold.ttf'),
        'Bold': require('@/src/assets/fonts/Inter-Bold.ttf'),
        'Extrabold': require('@/src/assets/fonts/Inter-ExtraBold.ttf'),
        'Black': require('@/src/assets/fonts/Inter-Black.ttf'),
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    return (
        <Stack.Navigator screenOptions={{ animationTypeForReplace: 'push' }}>
            <Stack.Screen name="index" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="addTask" component={AddTask} options={{ headerShown: false, presentation: 'modal', gestureEnabled: true, gestureDirection: 'vertical', gestureResponseDistance: 800 }} />
        </Stack.Navigator>
    );
};
