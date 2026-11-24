import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/authContext";

export default function DashboardScreen() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {currentUser?.name}</Text>

      <Text style={styles.subtitle}>Your notes are waiting for you.</Text>

      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15182B",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#A69CFF",
    marginTop: 12,
  },
  button: {
    backgroundColor: "#8175F5",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
