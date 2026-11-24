import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
} from "react-native";
import CustomButton from "../../components/custom/customButton";
import CustomInput from "../../components/custom/customInput";
import { registerUser } from "../../services/authService";
import { colors } from "../../styles/colors";
import { validateRegistration } from "../../utils/inputValidation";
import AuthForm from "./authForm";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");

    const validationError = validateRegistration(
      name,
      email,
      password,
      confirmPassword,
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      await registerUser(name, email, password);

      Alert.alert(
        "Registration successful",
        "Your NoteSpace account has been created.",
      );

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
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
        title="Create account"
        description="Join NoteSpace and organize your thoughts."
      >
        <CustomInput
          label="Full name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

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
          placeholder="Minimum 8 characters"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <CustomInput
          label="Confirm password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <CustomButton
          title="Create account"
          onPress={handleRegister}
          loading={loading}
        />
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
});
