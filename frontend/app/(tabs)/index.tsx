// app/(tabs)/index.tsx
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type TodoType = {
    _id: string;
    user: string;
    title: string;
    completed: boolean;
};

export default function HomeScreen() {
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [todos, setTodos] = useState<TodoType[]>([]);

    async function getTodos() {
        try {
            const response = await fetch(
                "http://192.168.1.19:3000/api/v1/todo"
            );
            const result = await response.json();
            console.log(result.data);
            const mappedTodos = result.data.map((todo: TodoType) => ({
                _id: todo._id,
                user_id: todo.user,
                title: todo.title,
                completed: todo.completed,
            }));
            console.log(mappedTodos);
            setTodos(mappedTodos);
        } catch (error) {
            console.log("Error bang:", error);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <View className="flex-1">
            {/* header */}
            <View className="bg-white pt-10 pb-3  px-6">
                <Text className="text-xl font-bold text-black">
                    {user?.name.toUpperCase()}'s TODO
                </Text>
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

                <FlatList
                    data={todos}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onLongPress={() => setShowModal(true)}
                        >
                            <View className="bg-white rounded-lg p-4 mb-3 flex-row items-center justify-between border border-gray-100">
                                {/* left checkbox and text */}
                                <View className="flex-row items-center flex-1">
                                    <TouchableOpacity className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3"></TouchableOpacity>
                                    <Text className="text-lg text-gray-800 ">
                                        {item.title}
                                    </Text>
                                </View>
                                <TouchableOpacity className="w-8 h-8 justify-center items-center">
                                    <Text className="text-red-500 text-xl font-semibold">
                                        X
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* MODAL */}
            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowModal(false)}
            >
                <Pressable
                    className="absolute inset-0"
                    onPress={() => setShowModal(false)}
                />
                <View className="flex-1 justify-end ">
                    <View className="bg-white rounded-t-3xl p-6">
                        <View className="w-16 h-1 bg-gray-300 self-center rounded-full mb-4" />
                        <Text className="text-sm mb-1">Detail Todo</Text>
                        <TextInput
                            placeholder="Todo"
                            className="border border-gray-300 rounded-md px-3 py-2 mb-3"
                        />
                        <TouchableOpacity
                            className="bg-blue-500 py-4 rounded-lg"
                            onPress={() => setShowModal(false)}
                        >
                            <Text className="text-white text-center text-lg font-bold">
                                Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
