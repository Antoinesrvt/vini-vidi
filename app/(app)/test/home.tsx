import React from "react";
import { Slot, Tabs, Redirect } from "expo-router";
import { Menu, Bell, Globe, Users, Image, Search } from "lucide-react-native";

const AppLayout = () => {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: "white",
					borderTopWidth: 1,
					borderTopColor: "#e2e8f0",
				},
				tabBarActiveTintColor: "#2563eb",
				tabBarInactiveTintColor: "#64748b",
			}}
		>
			<Tabs.Screen
				name="map"
				options={{
					title: "Map",
					tabBarIcon: ({ color, size }) => <Globe color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="connections"
				options={{
					title: "Friends",
					tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="memories"
				options={{
					title: "Memories",
					tabBarIcon: ({ color, size }) => <Image color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="discover"
				options={{
					title: "Discover",
					tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
				}}
			/>
		</Tabs>
	);
};

export default AppLayout;
