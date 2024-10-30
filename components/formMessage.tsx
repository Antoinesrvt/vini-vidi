import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

interface FormMessageProps {
	message?: string;
	type?: "error" | "success" | "info";
}

export function FormMessage({ message, type = "error" }: FormMessageProps) {
	if (!message) return null;

	const colorClasses = {
		error: "bg-destructive/10 text-destructive",
		success: "bg-green-500/10 text-green-500",
		info: "bg-blue-500/10 text-blue-500",
	};

	return (
		<View className={cn("rounded-md px-3 py-2 mt-2", colorClasses[type])}>
			<Text className={cn("text-sm", colorClasses[type])}>{message}</Text>
		</View>
	);
}
