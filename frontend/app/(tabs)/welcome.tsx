import { useAuth } from "@/context/AuthContext";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Welcome() {
    const toast = useToast();
    const { user, logout } = useAuth();

    async function handleLogout() {
        try {
            await logout();
        } catch (error: string | any) {
            Alert.alert("Error logout", error);
        } finally {
            toast.show("Logout successfully", {
                type: "success",
                placement: "top",
                duration: 4000,
                animationType: "slide-in",
                style: {
                    marginTop: 50,
                },
            });
        }
    }

    return (
        <ProtectedRoute>
            <View className="flex-1 justify-center items-center px-6">
                <Text>Welcome {user?.name}</Text>
                <TouchableOpacity
                    onPress={handleLogout}
                    className="w-full bg-blue-500 py-3 px-4"
                >
                    <Text className="text-white text-xl font-bold text-center">
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </ProtectedRoute>
    );
}
