// app/(tabs)/index.tsx
import { useAuth } from "@/context/AuthContext";
import { authFetch } from "@/utils/authFetch";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Modal,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import EditIcon from "../components/icons/EditIcon";

type TodoType = {
    _id: string;
    user: string;
    title: string;
    completed: boolean;
};

type AddTodoType = {
    path: string;
    msg: string;
};

export default function HomeScreen() {
    const inputRef = useRef<TextInput>(null);
    const toast = useToast();
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [addTodoError, setAddTodoError] = useState<string | null>(null);
    const [todo, setTodo] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);

    useEffect(() => {
        getTodos();
    }, []);

    useEffect(() => {
        if (showModal) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    });

    async function getTodos() {
        try {
            const response = await authFetch(`/todo`);
            const result = await response.json();
            const mappedTodos = result.data.map((todo: TodoType) => ({
                _id: todo._id,
                user_id: todo.user,
                title: todo.title,
                completed: todo.completed,
            }));

            setTodos(mappedTodos);
        } catch (error) {
            console.log("Error bang:", error);
        }
    }

    async function handleAddTodo() {
        try {
            setLoading(true);
            const response = await authFetch(`/todo/add-todo`, {
                method: "POST",
                body: JSON.stringify({ title: todo }),
            });

            const result = await response.json();

            if (!response.ok) {
                const errorData: AddTodoType = result.data[0];
                setAddTodoError(errorData.msg);
                throw new Error(errorData.msg);
            }
            setTodo("");
            setAddTodoError(null);
            await getTodos();

            toast.show("todo added!", {
                type: "success",
                duration: 2000,
            });
        } catch (error) {
            if (error instanceof Error) {
                toast.show(error.message, {
                    type: "danger",
                });
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteTodo(id: string) {
        try {
            const response = await authFetch(`/todo/delete/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                const error = new Error("Something wrong");
                throw error;
            }

            await getTodos();
            toast.show("todo deleted", {
                type: "success",
            });
        } catch (error) {
            if (error instanceof Error) {
                toast.show(error.message || "unexpected error", {
                    type: "danger",
                });
            }
        }
    }

    async function handleUpdateTodo(id: string, title: string) {
        try {
            const response = await authFetch(`/todo/update/${id}`, {
                method: "PUT",
                body: JSON.stringify({ title: title }),
            });
            if (!response.ok) {
                const error = new Error("something went wrong");
                throw error;
            }

            const result = await response.json();
            await getTodos();
            toast.show(result.message, {
                type: "success",
            });
        } catch (error) {
            if (error instanceof Error) {
                toast.show(error.message, {
                    type: "danger",
                });
            }
        }
    }

    return (
        <View className="flex-1">
            {/* header */}
            <View className="bg-white pt-10 pb-3  px-6">
                <Text className="text-xl font-bold text-black">
                    {user?.name.toUpperCase()}&apos;s TODO
                </Text>
            </View>

            {/* content */}
            <View className="px-6 mt-5">
                <View className="flex-row items-center gap-3 ">
                    <TextInput
                        placeholder="Add new task..."
                        placeholderTextColor="#9CA3AF"
                        className={`flex-1 bg-white px-4 py-4 text-lg rounded-lg border ${addTodoError ? "border-red-500" : "border-gray-200"} `}
                        value={todo}
                        onChangeText={(val) => {
                            setTodo(val);
                            setAddTodoError(null);
                        }}
                    />
                    <TouchableOpacity
                        onPress={handleAddTodo}
                        className="bg-blue-500 rounded-lg w-12 h-12 items-center justify-center"
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" size={10} />
                        ) : (
                            <Text className="text-white font-bold">+</Text>
                        )}
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
                        <View className="bg-white rounded-lg p-4 mb-3 flex-row items-center justify-between border border-gray-100">
                            {/* left checkbox and text */}
                            <View className="flex-row items-center gap-x-3">
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowModal(true);
                                        setSelectedTodo(item);
                                    }}
                                >
                                    <EditIcon
                                        width={20}
                                        height={20}
                                        color="#000"
                                    />
                                </TouchableOpacity>
                                <Text className=" text-lg text-gray-800 ">
                                    {item.title}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => handleDeleteTodo(item._id)}
                                className="w-10 h-10 justify-center items-center"
                            >
                                <Text className="text-red-500  text-xl font-semibold">
                                    X
                                </Text>
                            </TouchableOpacity>
                        </View>
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
                            ref={inputRef}
                            placeholder="Todo"
                            className="border border-gray-300 rounded-md px-3 py-2 mb-3"
                            value={selectedTodo?.title || ""}
                            onChangeText={(text) => {
                                if (selectedTodo) {
                                    setSelectedTodo({
                                        ...selectedTodo,
                                        title: text,
                                    });
                                }
                            }}
                        />
                        <TouchableOpacity
                            className="bg-blue-500 py-4 rounded-lg"
                            onPress={() => {
                                if (!selectedTodo) return;
                                handleUpdateTodo(
                                    selectedTodo._id,
                                    selectedTodo.title
                                );
                                setShowModal(false);
                            }}
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
