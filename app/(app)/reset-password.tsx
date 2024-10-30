import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ActivityIndicator, View, Alert } from "react-native";
import * as z from "zod";
import { useRouter } from "expo-router";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { useSupabase } from "@/context/supabase-provider";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, "Please enter at least 8 characters.")
      .max(64, "Please enter fewer than 64 characters.")
      .regex(/^(?=.*[a-z])/, "Your password must have at least one lowercase letter.")
      .regex(/^(?=.*[A-Z])/, "Your password must have at least one uppercase letter.")
      .regex(/^(?=.*[0-9])/, "Your password must have at least one number.")
      .regex(/^(?=.*[!@#$%^&*])/, "Your password must have at least one special character."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const router = useRouter();
  const { updatePassword } = useSupabase();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await updatePassword(data.password);
      Alert.alert(
        "Success",
        "Your password has been updated successfully.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/(app)/sign-in"),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message || "Failed to update password. Please try again.",
        [{ text: "OK" }]
      );
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background p-4" edges={["bottom"]}>
      <View className="flex-1 gap-4 web:m-4">
        <H1 className="self-start">Reset Password</H1>
        <Muted>Please enter your new password</Muted>

        <Form {...form}>
          <View className="gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormInput
                  label="New Password"
                  placeholder="Enter new password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormInput
                  label="Confirm Password"
                  placeholder="Confirm new password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  {...field}
                />
              )}
            />
          </View>
        </Form>
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
          <Text className="text-white">Update Password</Text>
        )}
      </Button>
    </SafeAreaView>
  );
}