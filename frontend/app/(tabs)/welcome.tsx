import { useAuth } from "@/context/AuthContext";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import ProtectedRoute from "../components/ProtectedRoute";
import LogoutIcons from "../components/icons/LogoutIcons";
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
            <View className="flex-1 justify-center items-center px-6 relative">
                <View className="w-full  aspect-square">
                    <LogoutImages width="100%" height="100%" />
                </View>

                <View className="left-10 right-10 absolute bottom-8">
                    <TouchableOpacity
                        onPress={handleLogout}
                        className="flex-row justify-center items-center w-full bg-blue-500 py-3 px-4 rounded-xl gap-x-2"
                    >
                        <LogoutIcons width={20} height={20} color={"#fff"} />

                        <Text className="text-white text-xl font-bold text-center">
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ProtectedRoute>
    );
}
