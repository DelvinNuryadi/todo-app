import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";

export default function RootLayout() {
    return (
        <SafeAreaView className="flex-1 bg-black">
            <ToastProvider>
                <AuthProvider>
                    <Slot />
                </AuthProvider>
            </ToastProvider>
        </SafeAreaView>
    );
}
