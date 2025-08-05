import { useAuth } from "@/context/AuthContext";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import ProtectedRoute from "../components/ProtectedRoute";
import LogoutImages from "../components/images/LogoutImages";

export default function Welcome() {
    const toast = useToast();
    const { logout } = useAuth();

    async function handleLogout() {
        try {
            await logout();
        } catch (error: string | any) {
            Alert.alert("Error logout", error);
        } finally {
            toast.show("Logout successfully", {
                type: "success",
                placement: "top",
            });
        }
    }

    return (
        <ProtectedRoute>
            <View className="flex-1 justify-center items-center px-6 ">
                <LogoutImages width={200} height={500} />

                <TouchableOpacity
                    onPress={handleLogout}
                    className="w-full bg-blue-500 py-3 px-4 rounded-xl"
                >
                    <Text className="text-white text-xl font-bold text-center">
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </ProtectedRoute>
    );
}
