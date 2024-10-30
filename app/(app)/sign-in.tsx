import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ActivityIndicator, View, Alert } from "react-native";
import * as z from "zod";
import { useRouter } from "expo-router";
import { useState } from "react";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { useSupabase } from "@/context/supabase-provider";
import { FormMessage } from "@/components/formMessage";

const formSchema = z.object({
	email: z.string().email("Please enter a valid email address."),
	password: z
		.string()
		.min(8, "Please enter at least 8 characters.")
		.max(64, "Please enter fewer than 64 characters."),
});

export default function SignIn() {
	const router = useRouter();
	const { signInWithPassword, resetPassword } = useSupabase();
	const [formError, setFormError] = useState<string>("");
	const [formSuccess, setFormSuccess] = useState<string>("");

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			setFormError("");
			setFormSuccess("");
			await signInWithPassword(data.email, data.password);
			form.reset();
			setFormSuccess("Successfully signed in!");
		} catch (error: any) {
			setFormError(error.message || "Please check your credentials and try again.");
			Alert.alert(
				"Sign In Failed",
				error.message || "Please check your credentials and try again.",
				[{ text: "OK" }]
			);
		}
	}

	const handleForgotPassword = async () => {
		const email = form.getValues("email");
		if (!email) {
			setFormError("Please enter your email address first.");
			Alert.alert("Email Required", "Please enter your email address first.");
			return;
		}

		try {
			setFormError("");
			setFormSuccess("");
			await resetPassword(email);
			setFormSuccess("Check your email for password reset instructions.");
			Alert.alert(
				"Password Reset",
				"Check your email for password reset instructions.",
				[{ text: "OK" }]
			);
		} catch (error: any) {
			setFormError(error.message || "Failed to send reset email.");
			Alert.alert("Error", error.message || "Failed to send reset email.");
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-background p-4" edges={["bottom"]}>
			<View className="flex-1 gap-4 web:m-4">
				<H1 className="self-start">Welcome Back</H1>
				<Muted>Sign in to your account to continue</Muted>

				<Form {...form}>
					<View className="gap-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormInput
									label="Email"
									placeholder="Email"
									autoCapitalize="none"
									autoComplete="email"
									autoCorrect={false}
									keyboardType="email-address"
									{...field}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormInput
									label="Password"
									placeholder="Password"
									autoCapitalize="none"
									autoCorrect={false}
									secureTextEntry
									{...field}
								/>
							)}
						/>
					</View>
				</Form>

				{formError && <FormMessage message={formError} type="error" />}
				{formSuccess && <FormMessage message={formSuccess} type="success" />}

				<Button
					variant="ghost"
					onPress={handleForgotPassword}
					className="self-start"
				>
					<Text className="text-primary">Forgot password?</Text>
				</Button>
			</View>

			<Button
				size="default"
				variant="default"
				onPress={form.handleSubmit(onSubmit)}
				disabled={form.formState.isSubmitting}
				className="web:m-4"
			>
				{form.formState.isSubmitting ? (
					<ActivityIndicator size="small" color="white" />
				) : (
					<Text className="text-white">Sign In</Text>
				)}
			</Button>

			<Button
				variant="ghost"
				onPress={() => router.push("/sign-up")}
				className="mt-4"
			>
				<Text>Don't have an account? Sign up</Text>
			</Button>
		</SafeAreaView>
	);
}
