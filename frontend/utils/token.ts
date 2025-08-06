import * as SecureStore from "expo-secure-store";

export const getAccessToken = async () => {
    return await SecureStore.getItemAsync("accessToken");
};

export const setAccessToken = async (accessToken: string) => {
    return await SecureStore.setItemAsync("accessToken", accessToken);
};

export const removeAccessToken = async () => {
    await SecureStore.deleteItemAsync("accessToken");
};
