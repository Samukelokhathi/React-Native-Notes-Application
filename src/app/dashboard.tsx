import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import CategoryCard from "../components/dashboard/categoryCard";
import { categories } from "../constants/categories";
import { useAuth } from "../context/authContext";
import { colors } from "../styles/colors";

export default function DashboardScreen() {
  const router = useRouter();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>NoteSpace</Text>
          <Text style={styles.subtitle}>Your personal notes space</Text>
        </View>

        <View style={styles.headerActions}>
          <Pressable
            style={styles.profileButton}
            onPress={() => router.push("/profile")}
          >
            <Text style={styles.profileButtonText}>Profile</Text>
          </Pressable>

          <Pressable onPress={handleLogout}>
            <Text style={styles.logout}>Logout</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcome}>
          Welcome, {currentUser?.name || "User"}!
        </Text>
        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/addNote")}
        >
          <Text style={styles.addButtonText}>+ Create Note</Text>
        </Pressable>

        <Pressable
          style={styles.viewButton}
          onPress={() => router.push("/notes")}
        >
          <Text style={styles.viewButtonText}>View My Notes</Text>
        </Pressable>

        <Text style={styles.heading}>My Notes</Text>

        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              color={category.color}
              noteCount={0}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 24,
    paddingTop: 55,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.secondary,
    fontSize: 14,
    marginTop: 6,
  },
  logout: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "bold",
  },
  content: {
    padding: 24,
  },
  welcome: {
    color: colors.muted,
    fontSize: 15,
  },
  heading: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 22,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  viewButton: {
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  viewButtonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: "bold",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileButton: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  profileButtonText: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: "bold",
  },
});
