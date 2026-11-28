
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CategoryCard from "../components/dashboard/categoryCard";
import { useAuth } from "../context/authContext";
import { addUserCategory, getUserCategories } from "../services/categoryService";
import { getUserNotes } from "../services/notesService";
import { colors } from "../styles/colors";
import { Category, Note } from "../types/noteAppModels";

export default function DashboardScreen() {
  const router = useRouter();
  const { currentUser, logout } = useAuth();

  const [userCategories, setUserCategories] = useState<Category[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const [savedCategories, savedNotes] = await Promise.all([
        getUserCategories(currentUser.id),
        getUserNotes(currentUser.id),
      ]);

      setUserCategories(savedCategories);
      setNotes(savedNotes);
    } catch {
      Alert.alert("Error", "Unable to load your dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadDashboard();
    }, [currentUser?.id]),
  );

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

  const handleAddCategory = async () => {
    if (!currentUser) return;

    try {
      const newCategory = await addUserCategory(
        currentUser.id,
        categoryName,
      );

      setUserCategories((previous) => [...previous, newCategory]);
      setCategoryName("");
      setShowModal(false);
    } catch (error) {
      Alert.alert(
        "Category",
        error instanceof Error ? error.message : "Unable to add category.",
      );
    }
  };

  const openCategory = (name: string) => {
    router.push({
      pathname: "/notes",
      params: { category: name },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
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
          <Text style={styles.viewButtonText}>View All Notes</Text>
        </Pressable>

        <View style={styles.categoryHeading}>
          <Text style={styles.heading}>My Notes</Text>

          <Pressable
            style={styles.addCategoryButton}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.addCategoryText}>+ Category</Text>
          </Pressable>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={colors.secondary} />
        ) : (
          <View style={styles.categoryContainer}>
            {userCategories.map((category) => {
              const noteCount = notes.filter(
                (note) => note.category === category.name,
              ).length;

              return (
                <CategoryCard
                  key={category.name}
                  name={category.name}
                  color={category.color}
                  noteCount={noteCount}
                  onPress={() => openCategory(category.name)}
                />
              );
            })}
          </View>
        )}
      </View>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add Category</Text>

            <TextInput
              style={styles.categoryInput}
              placeholder="Enter category name"
              placeholderTextColor={colors.muted}
              value={categoryName}
              onChangeText={setCategoryName}
              maxLength={25}
            />

            <View style={styles.modalActions}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => {
                  setShowModal(false);
                  setCategoryName("");
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={styles.saveButton}
                onPress={handleAddCategory}
              >
                <Text style={styles.saveText}>Add Category</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 30,
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
  content: {
    padding: 24,
  },
  welcome: {
    color: colors.muted,
    fontSize: 15,
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
  categoryHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 26,
    marginBottom: 18,
  },
  heading: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "bold",
  },
  addCategoryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  addCategoryText: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: "bold",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modal: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalTitle: {
    color: colors.white,
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 18,
  },
  categoryInput: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 9,
    padding: 14,
    color: colors.white,
    fontSize: 15,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 20,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  cancelText: {
    color: colors.muted,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  saveText: {
    color: colors.white,
    fontWeight: "bold",
  },
});
