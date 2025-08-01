import { useAuth } from "@/context/AuthContext";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

type ErrorType = {
    [key: string]: string;
};

export default function SignupPage() {
    const { signup } = useAuth();
    const [formErrors, setFormErrors] = useState<ErrorType>({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSignup() {
        try {
            setLoading(true);
            setFormErrors({});
            await signup(name, email, password);
        } catch (error: any) {
            const errors: ErrorType = {};
            if (Array.isArray(error?.data)) {
                error.data.forEach((err: any) => {
                    errors[err.path] = err.msg;
                });
                setFormErrors(errors);
            } else {
                Alert.alert("Signup Error", error?.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <View className="flex-1 justify-center items-center bg-white px-6">
            <Text className="text-2xl font-bold mb-6 text-black">Register</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={(val) => {
                    setName(val);
                    setFormErrors((prev) => ({ ...prev, name: "" }));
                }}
                className={`w-full border rounded-xl px-4 py-3 mb-4 text-black ${formErrors.name ? "border-red-500" : "border-gray-300"}`}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(val) => {
                    setEmail(val);
                    setFormErrors((prev) => ({ ...prev, email: "" }));
                }}
                className={`w-full border rounded-xl px-4 py-3 mb-4 text-black ${formErrors.email ? "border-red-500" : "border-gray-300"}`}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-black"
            />
            <TouchableOpacity
                onPress={handleSignup}
                className="bg-blue-500 w-full py-3 rounded-xl mb-4"
            >
                <Text className="text-center text-white font-bold">
                    {loading ? "Loading..." : "Register"}
                </Text>
            </TouchableOpacity>
            <Text>
                Have an account?{" "}
                <Link href={"/"}>
                    <Text className="text-blue-500 font-semibold">Login</Text>
                </Link>
            </Text>
        </View>
    );
}
