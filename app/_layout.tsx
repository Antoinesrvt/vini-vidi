import "../global.css";
import { Stack } from "expo-router";
import { SupabaseProvider } from "@/context/supabase-provider";

export default function RootLayout() {
	return (
		<SupabaseProvider>
			<Stack>
				<Stack.Screen name="(app)" options={{ headerShown: false }} />
			</Stack>
		</SupabaseProvider>
	);
}
