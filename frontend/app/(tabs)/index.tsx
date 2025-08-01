// app/(tabs)/index.tsx
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
    return (
        <View className="flex-1">
            {/* header */}
            <View className="bg-white pt-10 pb-3  px-6">
                <Text className="text-xl font-bold text-black">TODO</Text>
            </View>

            {/* content */}
            <View className="px-6 mt-5">
                <View className="flex-row items-center gap-3">
                    <TextInput
                        placeholder="Add new task..."
                        placeholderTextColor="#9CA3AF"
                        className="flex-1 bg-white px-4 py-4 text-lg rounded-lg border border-gray-200"
                    />
                    <TouchableOpacity className="bg-blue-500 px-6 py-4 rounded-lg items-center justify-center">
                        <Text className="text-white text-xl font-bold">+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Todo List Area */}
            <View className="flex-1 px-6 mt-6 ">
                {/* Your todo items will go here */}
                <View className="bg-white rounded-lg p-4 mb-3 flex-row items-center justify-between border border-gray-100">
                    {/* left checkbox and text */}
                    <View className="flex-row items-center flex-1">
                        <TouchableOpacity className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3"></TouchableOpacity>
                        <Text className="text-lg text-gray-800">Makan</Text>
                    </View>
                    <TouchableOpacity className="w-8 h-8 justify-center items-center">
                        <Text className="text-red-500 text-xl font-semibold">
                            X
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
