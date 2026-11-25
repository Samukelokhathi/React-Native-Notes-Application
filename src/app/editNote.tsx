import { useLocalSearchParams, useRouter } from "expo-router";
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
import { categories } from "../constants/categories";
import { useAuth } from "../context/authContext";
import { getUserNotes, updateNote } from "../services/notesService";
import { colors } from "../styles/colors";
import { Note } from "../types/noteAppModels";

export default function EditNoteScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentUser } = useAuth();

  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Personal");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadNote = async () => {
      if (!currentUser || !id) return;

      const userNotes = await getUserNotes(currentUser.id);
      const selectedNote = userNotes.find((item) => item.id === id);

      if (!selectedNote) {
        Alert.alert("Not found", "This note could not be found.");
        router.back();
        return;
      }

      setNote(selectedNote);
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setCategory(selectedNote.category);
    };

    loadNote();
  }, [currentUser?.id, id]);

  const handleUpdate = async () => {
    if (!currentUser || !note) return;

    if (!title.trim() || !content.trim()) {
      Alert.alert("Missing information", "Enter a title and note content.");
      return;
    }

    try {
      setLoading(true);

      await updateNote(currentUser.id, note.id, {
        title: title.trim(),
        content: content.trim(),
        category,
      });

      Alert.alert("Success", "Your note has been updated.");
      router.back();
    } catch {
      Alert.alert("Error", "Unable to update your note.");
    } finally {
      setLoading(false);
    }
  };

  if (!note) {
    return (
      <View style={styles.loading}>
        <Text style={styles.message}>Loading note...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Edit Note</Text>
        <Text style={styles.subtitle}>Update your note details.</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter note title"
          placeholderTextColor={colors.muted}
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

        <Text style={styles.label}>Note content</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          placeholder="Write your note..."
          placeholderTextColor={colors.muted}
        />

        <Pressable
          style={[styles.saveButton, loading && styles.disabledButton]}
          onPress={handleUpdate}
          disabled={loading}
        >
          <Text style={styles.saveText}>
            {loading ? "Updating..." : "Save Changes"}
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
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    color: colors.muted,
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
  saveText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    padding: 16,
    alignItems: "center",
  },
  cancelText: {
    color: colors.muted,
  },
});
