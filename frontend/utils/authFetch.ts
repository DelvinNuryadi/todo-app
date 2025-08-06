import { getAccessToken, removeAccessToken, setAccessToken } from "./token";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const authFetch = async (
    url: string,
    options: RequestInit = {},
    retry = true
): Promise<Response> => {
    const token = await getAccessToken();
    const response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers: {
            ...(options.headers || {}),
            ...(options.body && { "Content-Type": "application/json" }),
            Authorization: `Bearer ${token}`,
        },
    });

    // kalau token expired
    if (response.status === 401 && retry) {
        console.log("access token expired, trying refresh token...");

        // dapatkan access token baru
        const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            console.log("refresh failed, force logout");
            await removeAccessToken();
            throw new Error("Session expired. please login again");
        }
        const result = await response.json();

        const newAccessToken = result.accessToken;
        await setAccessToken(newAccessToken);

        return authFetch(url, options, false);
    }
    return response;
};
