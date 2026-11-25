
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/authContext";
import { categories } from "../constants/categories";
import { colors } from "../styles/colors";
import { createNote } from "../services/notesService";

export default function AddNoteScreen() {
  const router = useRouter();
  const { currentUser } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Personal");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Missing information", "Enter a title and note content.");
      return;
    }

    if (!currentUser) {
      Alert.alert("Error", "Please log in before creating a note.");
      return;
    }

    try {
      setLoading(true);

      await createNote(currentUser.id, {
        title: title.trim(),
        content: content.trim(),
        category,
      });

      Alert.alert("Success", "Your note has been saved.");
      router.back();
    } catch {
      Alert.alert("Error", "Unable to save your note.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Create Note</Text>
        <Text style={styles.subtitle}>Write down your thoughts.</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter note title"
          placeholderTextColor={colors.muted}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.categories}>
          {categories.map((item) => (
            <Pressable
              key={item.name}
              style={[
                styles.categoryButton,
                category === item.name && {
                  borderColor: item.color,
                  backgroundColor: colors.surface,
                },
              ]}
              onPress={() => setCategory(item.name)}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === item.name && { color: item.color },
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Note</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Start writing your note..."
          placeholderTextColor={colors.muted}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />

        <Pressable
          style={[styles.saveButton, loading && styles.disabledButton]}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>
            {loading ? "Saving..." : "Save Note"}
          </Text>
        </Pressable>

        <Pressable onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
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
  },
  heading: {
    color: colors.white,
    fontSize: 27,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.secondary,
    marginTop: 8,
    fontSize: 14,
  },
  form: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  label: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
  },
  textArea: {
    minHeight: 180,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  categoryText: {
    color: colors.muted,
    fontSize: 13,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  disabledButton: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    alignItems: "center",
    padding: 16,
    marginTop: 8,
  },
  cancelText: {
    color: colors.muted,
    fontSize: 14,
  },
});
