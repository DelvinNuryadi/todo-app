import { Tabs } from "expo-router";

export default function _Layout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Todo",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="welcome"
                options={{ title: "Account", headerShown: true }}
            />
        </Tabs>
    );
}
