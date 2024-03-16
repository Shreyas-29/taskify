import { useAuth } from '@/context/AuthProvider'
import useImage from '@/hooks/useImage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ArrowLeft, ChevronRight, HelpCircle, LockKeyhole, LogOut, ShieldCheck, SquarePen } from 'lucide-react-native'
import moment from 'moment'
import React, { useState } from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useToast } from 'react-native-toast-notifications'

const Profile = () => {

    const router = useRouter();

    const { user, signOut } = useAuth();

    const { image, setImage } = useImage();

    const toast = useToast();

    const [isSelecting, setIsSelecting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSignOut = async () => {
        setIsLoading(true);

        try {
            await signOut();

            toast.show("Logged out successfully");
            router.push("/(auth)/signin");
        } catch (error) {
            console.log("Error signout", error);
            toast.show("Error logging out");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setIsSelecting(true);

            setImage(result.assets[0].uri);

            try {
                await AsyncStorage.setItem("taskify_user_image", result.assets[0].uri);
            } catch (error) {
                console.log("Error saving image", error);
                toast.show("Could not save image. Please try again later.", { duration: 1000 });
            } finally {
                setIsSelecting(false);
            }
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
                <Text className="text-lg font-[Medium] capitalize text-neutral-800">
                    {user?.name}
                </Text>
                <View className="w-10 h-10"></View>
            </View>

            <View className="items-center flex-1 w-full px-4 mt-4">

                <View className="relative flex-row items-center w-full pb-4">
                    <View className="rounded-full">
                        <TouchableOpacity
                            onPress={handleSelectImage}
                            className="relative flex-row items-center justify-center w-20 h-20 overflow-hidden rounded-full border- border-neutral-100"
                        >
                            <Image
                                source={{ uri: image && image || "https://image.lexica.art/full_webp/21d2a6e0-0bac-4bd9-8596-2838999b1449" }}
                                className="w-20 h-20 rounded-full opacity-50"
                            />
                            {isSelecting ? (
                                <ActivityIndicator size="small" color="#171717" className="absolute inset-0" />
                            ) : (
                                <Image
                                    source={{ uri: image && image || "https://image.lexica.art/full_webp/21d2a6e0-0bac-4bd9-8596-2838999b1449" }}
                                    className="w-[72px] h-[72px] rounded-full absolute top-1 left-1"
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View className="items-start w-full ml-5">
                        <Text className="text-lg w-full capitalize text-neutral-800 font-[Semibold] tracking-wider">
                            {user?.name?.slice(0, 30)}
                        </Text>
                        <Text className="text-sm w-full text-neutral-600 font-[Regular]">
                            {user?.email}
                        </Text>
                        <Text className="text-sm mt-0.5 text-neutral-500 font-[Regular]">
                            Joined on {moment(user?.$createdAt).format("MMM YYYY")}
                        </Text>
                    </View>
                </View>

                <View className="items-start w-full pt-4 border-t border-neutral-200/60">
                    <Text className="text-lg font-[Medium] text-neutral-800">
                        Account
                    </Text>
                    <View className="w-full mt-3">
                        <TouchableOpacity className="flex-row items-center justify-between w-full h-12 px-1 py-2 bg-white rounded-lg border-neutral-200/60">
                            <View className="flex-row items-center">
                                <SquarePen size={18} color="#404040" />
                                <Text className="text-base font-[Regular] ml-2 text-neutral-800">
                                    Edit Profile
                                </Text>
                            </View>
                            <ChevronRight size={16} color="#737373" />
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center justify-between w-full h-12 px-1 py-2 bg-white border-t rounded-lg border-neutral-200/60">
                            <View className="flex-row items-center">
                                <LockKeyhole size={18} color="#404040" />
                                <Text className="text-base font-[Regular] ml-2 text-neutral-800">
                                    Change Password
                                </Text>
                            </View>
                            <ChevronRight size={16} color="#737373" />
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center justify-between w-full h-12 px-1 py-2 bg-white border-t rounded-lg border-neutral-200/60">
                            <View className="flex-row items-center">
                                <ShieldCheck size={18} color="#404040" />
                                <Text className="text-base font-[Regular] ml-2 text-neutral-800">
                                    Privacy
                                </Text>
                            </View>
                            <ChevronRight size={16} color="#737373" />
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center justify-between w-full h-12 px-1 py-2 bg-white border-t rounded-lg border-neutral-200/60">
                            <View className="flex-row items-center">
                                <HelpCircle size={18} color="#404040" />
                                <Text className="text-base font-[Regular] ml-2 text-neutral-800">
                                    Help
                                </Text>
                            </View>
                            <ChevronRight size={16} color="#737373" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="absolute flex-1 w-full bottom-8">
                    <TouchableOpacity
                        onPress={handleSignOut}
                        className="flex-row items-center justify-center w-full h-10 rounded-lg py- bg-neutral-800"
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <LogOut size={18} color="#fff" />
                        )}
                        <Text className="text-base ml-2 font-[Medium] text-white">
                            {isLoading ? "Logging out..." : "Log out"}
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView>
    )
}

export default Profile
