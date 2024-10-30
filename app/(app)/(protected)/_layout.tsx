import React, { useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { Tabs } from "expo-router";
import { Globe, Users, Image, Search, Bell, MessageCircle, MapPin, ChevronDown } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { LocationProvider } from "@/context/location-context";

export const unstable_settings = {
	initialRouteName: 'map',
};

function TopBar() {
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	return (
		<SafeAreaView edges={['top']} className="bg-white border-b border-slate-200">
			<View className="px-4 h-14 flex-row items-center justify-between">
				{/* Left Section */}
				<View className="flex-row items-center gap-3">
					<Text className="text-xl font-semibold text-slate-800">Veni Vidi</Text>
				</View>

				{/* Center - Location */}
				<TouchableOpacity className="flex-row items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-full">
					<MapPin className="w-4 h-4 text-slate-600" />
					<Text className="text-sm font-medium">New York</Text>
					<ChevronDown className="w-4 h-4 text-slate-600" />
				</TouchableOpacity>

				{/* Right Section */}
				<View className="flex-row items-center gap-2">
					<TouchableOpacity className="p-2">
						<Bell className="w-5 h-5 text-slate-600" />
						<View className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
					</TouchableOpacity>

					<TouchableOpacity className="p-2">
						<MessageCircle className="w-5 h-5 text-slate-600" />
					</TouchableOpacity>
				</View>
			</View>

			{/* Search Overlay */}
			{isSearchOpen && (
				<View className="px-4 py-2 bg-white border-b border-slate-200">
					<View className="relative">
						<TextInput
							placeholder="Search activities, groups, or people..."
							className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-lg"
						/>
						<Search className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
					</View>
				</View>
			)}
		</SafeAreaView>
	);
}

export default function AppLayout() {
	return (
		<LocationProvider>
			<View className="flex-1 bg-white">
				<TopBar />
				<Tabs
					screenOptions={{
						headerShown: false,
						tabBarStyle: {
							backgroundColor: 'white',
							borderTopWidth: 1,
							borderTopColor: '#e2e8f0',
						},
						tabBarActiveTintColor: '#2563eb',
						tabBarInactiveTintColor: '#64748b',
					}}
				>
					{/* Hidden Routes */}
					<Tabs.Screen
						name="index"
						options={{
							href: null,
						}}
					/>
					<Tabs.Screen
						name="settings"
						options={{
							href: null,
						}}
					/>
					<Tabs.Screen
						name="location/[id]"
						options={{
							href: null,
						}}
					/>
					<Tabs.Screen
						name="event/[id]"
						options={{
							href: null,
						}}
					/>
					<Tabs.Screen
						name="locations"
						options={{
							href: null,
						}}
					/>
					<Tabs.Screen
						name="events"
						options={{
							href: null,
						}}
					/>

					{/* Visible Tab Bar Items */}
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
			</View>
		</LocationProvider>
	);
}
