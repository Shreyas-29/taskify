import { useAuth } from '@/context/AuthProvider';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, LockKeyhole, Mail, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Keyboard, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';

const SignUp = () => {

    const toast = useToast();

    const { signUp } = useAuth();

    const router = useRouter();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [type, setType] = useState<string>("password");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSignUp = async () => {
        Keyboard.dismiss();

        if (!email || !password || !name) {
            toast.show("Please enter name, email and password.");
            return;
        }

        setLoading(true);

        try {
            const response = await signUp(email, password, name);

            if (response.success) {
                toast.show("You are Signed Up 🚀");

                setName("");
                setEmail("");
                setPassword("");

                router.push("/");
            } else {
                toast.show("Could not Sign Up. Please try again.");
            }
        } catch (error) {
            console.log(error);
            toast.show("Could not Sign Up. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="items-center justify-center flex-1 px-4">

                {/* Greetings */}
                <View className="items-center mx-auto">
                    <Image
                        source={require('@/assets/images/signup.png')}
                        className="object-cover w-36 h-36"
                    />
                    <Text className="text-2xl text-neutral-800 font-[Semibold] mt-2">
                        Sign Up
                    </Text>
                    <Text className="text-neutral-500 mt-2 font-[Regular]">
                        Create an account to continue
                    </Text>
                </View>

                {/* Form */}
                <View className="relative items-start w-full mt-6">
                    <View className="relative w-full">
                        <User size={16} className="absolute text-neutral-500 top-3 left-4" />
                        <TextInput
                            placeholder="Name"
                            placeholderTextColor="#737373"
                            value={name}
                            onChangeText={setName}
                            className="w-full h-10 pl-10 pr-4 text-sm font-[Regular] border border-neutral-200 rounded-lg"
                        />
                    </View>
                    <View className="relative w-full mt-4">
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
                    <View className="flex-row items-center justify-start mt-5">
                        <BouncyCheckbox
                            size={18}
                            fillColor="#171717"
                            unfillColor="#fff"
                            disableText
                            iconStyle={{ borderRadius: 4, marginLeft: 4, }}
                            innerIconStyle={{ borderRadius: 4, borderColor: "#737373" }}
                            onPress={(isChecked: boolean) => { }}
                        />
                        <Text className="text-neutral-500 ml-2 font-[Regular] text-sm">
                            I agree to the <Text className="text-neutral-800">Terms</Text> and <Text className="text-neutral-800">Privacy Policy</Text>
                        </Text>
                    </View>
                    <View className="relative w-full mt-5">
                        <TouchableOpacity
                            onPress={handleSignUp}
                            className="flex-row items-center justify-center w-full h-10 py-2 rounded-lg bg-neutral-800"
                        >
                            {loading ? (
                                <ActivityIndicator size={16} color="#fff" />
                            ) : (
                                <Text className="text-white font-[Medium]">
                                    Create Account
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View className="w-full mt-4">
                        <View className="flex-row items-center justify-center">
                            <Text className="text-center text-sm font-[Regular] text-neutral-500">
                                Already have an account?{" "}
                            </Text>
                            <TouchableOpacity onPress={() => router.push("/signin")}>
                                <Text className="text-neutral-800 font-[Medium]">
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignUp