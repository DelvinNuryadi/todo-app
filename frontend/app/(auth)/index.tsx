import LoginIcon from "@/app/components/icons/LoginIcon";
import { useAuth } from "@/context/AuthContext";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";

type ErrorType = {
    [key: string]: string;
};

export default function LoginScreen() {
    const toast = useToast();
    const { login } = useAuth();
    const [formErrors, setFormErrors] = useState<ErrorType>({});

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        try {
            setLoading(true);
            setFormErrors({});

            await login(email, password);
            toast.show("Welcome", {
                type: "success",
                placement: "top",
            });
        } catch (error: any) {
            const errors: ErrorType = {};

            if (Array.isArray(error?.data)) {
                error.data.forEach((err: any) => {
                    errors[err.path] = err.msg;
                });
                setFormErrors(errors);
            } else {
                Alert.alert("Error login", error?.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <ImageBackground
            source={require("@/assets/images/bg.jpg")}
            className="flex-1"
        >
            <View className="flex-1 justify-center items-center px-6 ">
                <Text className="text-2xl font-bold mb-6 text-black">
                    Login
                </Text>

                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(val) => {
                        setEmail(val);
                        setFormErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    className={`w-full border rounded-xl px-4 py-3  text-black ${formErrors.email ? "border-red-500 mb-1" : "border-gray-300 mb-4"}`}
                />

                {formErrors.email && (
                    <View className="w-full mb-4 ">
                        <Text className=" text-red-500 text-sm">
                            {formErrors.email}
                        </Text>
                    </View>
                )}
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(val) => {
                        setPassword(val);
                        setFormErrors((prev) => ({ ...prev, password: "" }));
                    }}
                    secureTextEntry
                    className={`w-full border rounded-xl px-4 py-3 text-black ${formErrors.password ? "border-red-500 mb-1" : "border-gray-300 mb-4"}`}
                />
                {formErrors.password && (
                    <View className="w-full mb-4">
                        <Text className=" text-red-500 text-sm">
                            {formErrors.password}
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    disabled={loading}
                    onPress={handleLogin}
                    className="bg-blue-500 w-full py-3 rounded-xl mb-4 flex-row justify-center items-center gap-x-2"
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <>
                            <LoginIcon width={18} height={18} color="#fff" />
                            <Text className="text-center text-white font-bold text-lg">
                                Login
                            </Text>
                        </>
                    )}
                </TouchableOpacity>

                <Text>
                    Don&apos;t have an account?{" "}
                    <Link href={"/signup"}>
                        <Text className="text-blue-500 font-semibold">
                            Sign up
                        </Text>
                    </Link>
                </Text>
            </View>
        </ImageBackground>
    );
}
