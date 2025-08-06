import { useAuth } from "@/context/AuthContext";
import { Link } from "expo-router";
import { useState } from "react";
import {
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

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
            console.log(error);
            error.data.forEach((err: any) => {
                errors[err.path] = err.msg;
            });
            setFormErrors(errors);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ImageBackground
            source={require("@/assets/images/bg.jpg")}
            className="flex-1"
        >
            <View className="flex-1 justify-center items-center  px-6">
                <Text className="text-2xl font-bold mb-6 text-black">
                    Register
                </Text>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={(val) => {
                        setName(val);
                        setFormErrors((prev) => ({ ...prev, name: "" }));
                    }}
                    className={`w-full border rounded-xl px-4 py-3  text-black ${formErrors.name ? "border-red-500 mb-1" : "border-gray-300 mb-4"}`}
                />
                {formErrors.name && (
                    <View className="w-full mb-4">
                        <Text className="text-red-500 text-sm">
                            {formErrors.name}
                        </Text>
                    </View>
                )}
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
                    <View className="w-full mb-4">
                        <Text className="text-red-500 text-sm">
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
                    className={`w-full border border-gray-300 rounded-xl px-4 py-3  text-black ${formErrors.password ? "border-red-500 mb-1" : "border-gray-300 mb-4"}`}
                />
                {formErrors.password && (
                    <View className="w-full mb-4">
                        <Text className="text-red-500 text-sm">
                            {formErrors.password}
                        </Text>
                    </View>
                )}
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
                        <Text className="text-blue-500 font-semibold">
                            Login
                        </Text>
                    </Link>
                </Text>
            </View>
        </ImageBackground>
    );
}
