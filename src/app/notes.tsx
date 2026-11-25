
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useAuth } from "../context/authContext";
import { getUserNotes } from "../services/notesService";
import { Note } from "../types/noteAppModels";
import { colors } from "../styles/colors";
import NoteCard from "../components/notes/noteCard";

export default function NotesScreen() {
  const router = useRouter();
  const { currentUser } = useAuth();

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotes = async () => {
    if (!currentUser) {
      setNotes([]);
      setLoading(false);
      return;
    }

    try {
      setError("");
      const savedNotes = await getUserNotes(currentUser.id);
      setNotes(savedNotes);
    } catch {
      setError("Unable to load your notes.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [currentUser?.id])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Notes</Text>
        <Text style={styles.subtitle}>
          All your saved notes in one place.
        </Text>
      </View>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.secondary} />
        ) : error ? (
          <Text style={styles.message}>{error}</Text>
        ) : notes.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No notes yet</Text>
            <Text style={styles.message}>
              Create your first note to get started.
            </Text>

            <Pressable
              style={styles.button}
              onPress={() => router.push("/addNote")}
            >
              <Text style={styles.buttonText}>+ Create Note</Text>
            </Pressable>
          </View>
        ) : (
          notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))
        )}
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
  },
  heading: {
    color: colors.white,
    fontSize: 27,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.secondary,
    fontSize: 14,
    marginTop: 8,
  },
  content: {
    padding: 24,
  },
  empty: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    color: colors.muted,
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 22,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});
