
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NoteSpace</Text>

      <Text style={styles.subtitle}>
        Your personal space for keeping notes.
      </Text>

      <Link href="/auth/register" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </Link>
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
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#A69CFF",
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#8175F5",
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
