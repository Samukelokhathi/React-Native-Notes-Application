import { useAuth } from "@/context/authContext";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from "react-native";
import CustomButton from "../../components/custom/customButton";
import CustomInput from "../../components/custom/customInput";
import { loginUser } from "../../services/authService";
import { colors } from "../../styles/colors";
import AuthForm from "./authForm";
const router = useRouter();
const { refreshSession } = useAuth();

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email.trim() || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const user = await loginUser(email, password);

      await refreshSession();

      router.replace("/dashboard");

      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <AuthForm
        title="Welcome back"
        description="Log in to access your personal notes."
      >
        <CustomInput
          label="Email address"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <CustomInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <CustomButton title="Log in" onPress={handleLogin} loading={loading} />

        <Link href="/auth/register" style={styles.link}>
          Don't have an account? Create one
        </Link>
      </AuthForm>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  error: {
    color: colors.danger,
    fontSize: 14,
    marginBottom: 12,
  },
  link: {
    color: colors.secondary,
    textAlign: "center",
    marginTop: 22,
    fontSize: 14,
  },
});
