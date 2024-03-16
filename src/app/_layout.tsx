import '@/styles/globals.css';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-url-polyfill/auto';
import { Loader } from '@/components';
import { AuthProvider, useAuth } from '@/context/AuthProvider';
import ToasterProvider from '@/context/ToasterProvider';

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

    return (
        <AuthProvider>
            <ToasterProvider>
                <RootLayoutNav />
            </ToasterProvider>
        </AuthProvider>
    );
}

function RootLayoutNav() {

    const router = useRouter();

    const { isLoggedIn, isLoading } = useAuth();

    useEffect(() => {
        // NOTE: Here we are checking if the user is logged in or not with loading state
        if (!isLoading) {
            if (isLoggedIn) {
                router.replace("/");
            } else {
                router.replace("/(auth)/signin");
            }
        }
    }, [isLoggedIn, isLoading, router]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="addTask" options={{ headerShown: false, gestureEnabled: true, gestureDirection: 'vertical', fullScreenGestureEnabled: true, animation: 'slide_from_bottom' }} />
            <Stack.Screen name="details" options={{ headerShown: false, animation: 'slide_from_right' }} />
            <Stack.Screen name="search" options={{ headerShown: false, animation: 'default' }} />
            <Stack.Screen name="notifications" options={{ headerShown: false, animation: 'default' }} />
            <Stack.Screen name="profile" options={{ headerShown: false, animation: 'slide_from_right' }} />
            <Stack.Screen name="edit" options={{ headerShown: false, animation: 'slide_from_right' }} />
        </Stack>
    );
};
