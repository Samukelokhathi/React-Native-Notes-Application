import { Stack } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { AuthProvider } from "../context/authContext";
import { ThemeProvider, useTheme } from "../context/themeContext";

function Navigation() {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />

      <Pressable
        style={[
          styles.themeToggle,
          {
            backgroundColor: colors.primary,
            borderColor: colors.border,
          },
        ]}
        onPress={toggleTheme}
      >
        <Text style={styles.toggleText}>
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </Text>
      </Pressable>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  themeToggle: {
    position: "absolute",
    bottom: 24,
    right: 20,
    zIndex: 100,
    elevation: 8,
    borderRadius: 30,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  toggleText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});