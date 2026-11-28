
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/authContext";
import {
  updateUserPassword,
  updateUserProfile,
} from "../services/authService";
import { colors } from "../styles/colors";

export default function ProfileScreen() {
  const router = useRouter();
  const { currentUser, refreshSession, logout } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleProfileUpdate = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);

      await updateUserProfile(currentUser.id, name, email);
      await refreshSession();

      Alert.alert("Success", "Your profile has been updated.");
    } catch (error) {
      Alert.alert(
        "Profile Update Failed",
        error instanceof Error ? error.message : "Unable to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!currentUser) return;

    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please complete all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await updateUserPassword(
        currentUser.id,
        currentPassword,
        newPassword
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      Alert.alert("Success", "Your password has been changed.");
    } catch (error) {
      Alert.alert(
        "Password Update Failed",
        error instanceof Error ? error.message : "Unable to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Please log in to view your profile.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <Text style={styles.subtitle}>
          Manage your personal information.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor={colors.muted}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor={colors.muted}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.accountDate}>
          Member since:{" "}
          {new Date(currentUser.createdAt).toLocaleDateString()}
        </Text>

        <Pressable
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleProfileUpdate}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Please wait..." : "Save Profile"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Change Password</Text>

        <Text style={styles.label}>Current Password</Text>
        <TextInput
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Enter current password"
          placeholderTextColor={colors.muted}
          secureTextEntry
        />

        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Enter new password"
          placeholderTextColor={colors.muted}
          secureTextEntry
        />

        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm new password"
          placeholderTextColor={colors.muted}
          secureTextEntry
        />

        <Pressable
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handlePasswordUpdate}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Please wait..." : "Update Password"}
          </Text>
        </Pressable>
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginTop: 30,
    marginBottom: 24,
  },
  title: {
    color: colors.white,
    fontSize: 27,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.secondary,
    fontSize: 14,
    marginTop: 8,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 18,
  },
  label: {
    color: colors.text,
    fontSize: 13,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 13,
    color: colors.white,
    fontSize: 14,
  },
  accountDate: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 16,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 14,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 4,
  },
  logoutText: {
    color: colors.danger,
    fontWeight: "bold",
  },
  message: {
    color: colors.muted,
    textAlign: "center",
    marginTop: 40,
  },
});
