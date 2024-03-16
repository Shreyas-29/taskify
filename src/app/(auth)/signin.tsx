import React, { useState } from 'react';
import { ActivityIndicator, Image, Keyboard, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '@/context/AuthProvider';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';

const SignIn = () => {

    const toast = useToast();

    const router = useRouter();

    const { signIn } = useAuth();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [type, setType] = useState<string>("password");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSignIn = async () => {
        Keyboard.dismiss();

        if (!email || !password) {
            toast.show("Please enter email and password.");
            return;
        }

        setLoading(true);
        try {
            const response = await signIn(email, password);

            if (response.success) {
                toast.show("You are Logged In 🚀");

                setEmail("");
                setPassword("");

                router.push("/");
            } else {
                toast.show("Could not Sign In. Please try again.");
            }

        } catch (error) {
            console.log(error);
            toast.show("Could not Sign In. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = () => {
        toast.show("This feature will be available soon. 🚀");
    };


    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="items-center justify-center flex-1 px-4">

                {/* Greetings */}
                <View className="items-center mx-auto">
                    <Image
                        source={require('@/assets/images/signin.png')}
                        className="object-cover w-36 h-36"
                    />
                    <Text className="text-2xl text-neutral-800 font-[Semibold] mt-2">
                        Sign In
                    </Text>
                    <Text className="text-neutral-500 mt-2 font-[Regular]">
                        Enter your email and password to continue
                    </Text>
                </View>

                {/* Form */}
                <View className="relative items-start w-full mt-6">
                    <View className="relative w-full">
                        <Mail size={16} className="absolute text-neutral-500 top-3 left-4" />
                        <TextInput
                            keyboardType="email-address"
                            placeholder="Email"
                            placeholderTextColor="#737373"
                            value={email}
                            onChangeText={setEmail}
                            className="w-full h-10 pl-10 pr-4 text-sm font-[Regular] border border-neutral-200 rounded-lg"
                        />
                    </View>
                    <View className="relative w-full mt-4">
                        <LockKeyhole size={16} className="absolute text-neutral-500 top-3 left-4" />
                        <TextInput
                            secureTextEntry={type === "password" ? true : false}
                            placeholder="Password"
                            placeholderTextColor="#737373"
                            value={password}
                            onChangeText={setPassword}
                            className="w-full h-10 pl-10 pr-4 text-sm font-[Regular] border border-neutral-200 rounded-lg"
                        />
                        <Pressable className="absolute p-2 top-1 right-4" onPress={() => setType(type === "password" ? "text" : "password")}>
                            {type === "password" ? <EyeOff size={16} className="text-neutral-500" /> : <Eye size={16} className="text-neutral-500" />}
                        </Pressable>
                    </View>
                    <View className="flex-row items-center justify-end mt-4 ml-auto">
                        <TouchableOpacity onPress={handleForgotPassword}>
                            <Text className="text-neutral-800 font-[Medium] text-sm">Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="relative w-full mt-4">
                        <TouchableOpacity
                            onPress={handleSignIn}
                            className="flex-row items-center justify-center w-full h-10 py-2 rounded-lg bg-neutral-800"
                        >
                            {loading ? (
                                <ActivityIndicator size={16} color="#fff" />
                            ) : (
                                <Text className="text-white font-[Medium]">
                                    Sign In
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View className="w-full mt-4">
                        <View className="flex-row items-center justify-center">
                            <Text className="text-center text-sm font-[Regular] text-neutral-500">
                                Don't have an account?{" "}
                            </Text>
                            <TouchableOpacity onPress={() => router.push("/signup")}>
                                <Text className="text-neutral-800 font-[Medium]">
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignIn