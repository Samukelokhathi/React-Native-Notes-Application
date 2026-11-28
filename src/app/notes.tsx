import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import NoteCard from "../components/notes/noteCard";
import { useAuth } from "../context/authContext";
import { getUserNotes } from "../services/notesService";
import { colors } from "../styles/colors";
import { Note } from "../types/noteAppModels";

export default function NotesScreen() {
  const router = useRouter();
  const { currentUser } = useAuth();

  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
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
      setLoading(true);

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
    }, [currentUser?.id]),
  );
  const filteredNotes = notes.filter((note) => {
    const searchText = search.toLowerCase().trim();

    return (
      note.title.toLowerCase().includes(searchText) ||
      note.content.toLowerCase().includes(searchText) ||
      note.category.toLowerCase().includes(searchText)
    );
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={styles.heading}>My Notes</Text>
        <Text style={styles.subtitle}>All your saved notes in one place.</Text>
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search your notes..."
          placeholderTextColor={colors.muted}
          value={search}
          onChangeText={setSearch}
        />
        {loading ? (
          <ActivityIndicator size="large" color={colors.secondary} />
        ) : error ? (
          <Text style={styles.message}>{error}</Text>
        ) : filteredNotes.length === 0 ? (
          <View style={styles.emptyTitle}>
            <Text style={styles.emptyTitle}>
              {notes.length === 0 ? "No notes yet" : "No matching notes"}
            </Text>

            <Text style={styles.message}>
              {notes.length === 0
                ? "Create your first note to get started."
                : "Try another search term."}
            </Text>

            <Pressable
              style={styles.button}
              onPress={() => router.push("/addNote")}
            >
              <Text style={styles.buttonText}>+ Create Note</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.notesContainer}>
            <View style={styles.notesHeader}>
              <Text style={styles.notesCount}>
                {notes.length} {notes.length === 1 ? "Note" : "Notes"}
              </Text>

              <Pressable
                style={styles.addButton}
                onPress={() => router.push("/addNote")}
              >
                <Text style={styles.addButtonText}>+ Add Note</Text>
              </Pressable>
            </View>

            {sortedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={(noteId) => {
                  setNotes((previousNotes) =>
                    previousNotes.filter((item) => item.id !== noteId),
                  );
                }}
              />
            ))}
          </View>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
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
  notesContainer: {
    gap: 16,
  },
  notesHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  notesCount: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "600",
  },
  addButton: {
    borderWidth: 1,
    borderColor: colors.secondary,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  addButtonText: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: "bold",
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
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 22,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  searchInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 14,
    color: colors.white,
    fontSize: 14,
    marginBottom: 22,
  },
});
