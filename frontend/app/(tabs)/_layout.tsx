import { Tabs } from "expo-router";
import AccountIcon from "../components/icons/AccountIcon";
import TodoIcon from "../components/icons/TodoIcon";

export default function _Layout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Todo",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <TodoIcon width={size} height={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="welcome"
                options={{
                    title: "Account",
                    headerShown: true,
                    tabBarIcon: ({ color, size }) => (
                        <AccountIcon width={size} height={size} color={color} />
                    ),
                    headerStyle: {
                        height: 60,
                    },
                    headerTitleStyle: {
                        marginTop: -10,
                    },
                }}
            />
        </Tabs>
    );
}
