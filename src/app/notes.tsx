
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
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
import { getUserCategories } from "../services/categoryService";
import { getUserNotes } from "../services/notesService";
import { colors } from "../styles/colors";
import { Category, Note } from "../types/noteAppModels";

export default function NotesScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category?: string }>();
  const { currentUser } = useAuth();

  const [notes, setNotes] = useState<Note[]>([]);
  const [userCategories, setUserCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const selectedCategory =
    typeof category === "string" ? category : "";

  const loadNotes = async () => {
    if (!currentUser) {
      setNotes([]);
      setUserCategories([]);
      setLoading(false);
      return;
    }

    try {
      setError("");
      setLoading(true);

      const [savedNotes, savedCategories] = await Promise.all([
        getUserNotes(currentUser.id),
        getUserCategories(currentUser.id),
      ]);

      setNotes(savedNotes);
      setUserCategories(savedCategories);
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

  const categoryColor = (categoryName: string) => {
    return (
      userCategories.find(
        (item) => item.name.toLowerCase() === categoryName.toLowerCase(),
      )?.color || colors.secondary
    );
  };

  const categoryNotes = notes.filter((note) => {
    return (
      !selectedCategory ||
      note.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  });

  const searchText = search.toLowerCase().trim();

  const filteredNotes = categoryNotes.filter((note) => {
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
        <Text style={styles.heading}>
          {selectedCategory || "All Notes"}
        </Text>

        <Text style={styles.subtitle}>
          {selectedCategory
            ? `Notes saved in ${selectedCategory}`
            : "All your saved notes in one place."}
        </Text>

        {selectedCategory ? (
          <Pressable
            style={styles.allNotesButton}
            onPress={() => router.replace("/notes")}
          >
            <Text style={styles.allNotesText}>View All Notes</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search your notes..."
          placeholderTextColor={colors.muted}
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by date:</Text>

          <View style={styles.sortButtons}>
            <Pressable
              style={[
                styles.sortButton,
                sortOrder === "newest" && styles.activeSortButton,
              ]}
              onPress={() => setSortOrder("newest")}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortOrder === "newest" && styles.activeSortText,
                ]}
              >
                Newest
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.sortButton,
                sortOrder === "oldest" && styles.activeSortButton,
              ]}
              onPress={() => setSortOrder("oldest")}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortOrder === "oldest" && styles.activeSortText,
                ]}
              >
                Oldest
              </Text>
            </Pressable>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={colors.secondary} />
        ) : error ? (
          <Text style={styles.message}>{error}</Text>
        ) : (
          <View style={styles.notesContainer}>
            <View style={styles.notesHeader}>
              <Text style={styles.notesCount}>
                {sortedNotes.length}{" "}
                {sortedNotes.length === 1 ? "Note" : "Notes"}
              </Text>

              <Pressable
                style={styles.addButton}
                onPress={() => router.push("/addNote")}
              >
                <Text style={styles.addButtonText}>+ Add Note</Text>
              </Pressable>
            </View>

            {sortedNotes.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>
                  {notes.length === 0
                    ? "No notes yet"
                    : "No matching notes"}
                </Text>

                <Text style={styles.message}>
                  {notes.length === 0
                    ? "Create your first note to get started."
                    : "Try another search or category."}
                </Text>

                <Pressable
                  style={styles.createButton}
                  onPress={() => router.push("/addNote")}
                >
                  <Text style={styles.createButtonText}>
                    + Create Note
                  </Text>
                </Pressable>
              </View>
            ) : (
              sortedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  categoryColor={categoryColor(note.category)}
                  onDelete={(noteId) => {
                    setNotes((previousNotes) =>
                      previousNotes.filter((item) => item.id !== noteId),
                    );
                  }}
                />
              ))
            )}
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
  allNotesButton: {
    alignSelf: "flex-start",
    marginTop: 15,
  },
  allNotesText: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: "bold",
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
  emptyContainer: {
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
  createButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 22,
  },
  createButtonText: {
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
  sortContainer: {
    marginBottom: 20,
  },
  sortLabel: {
    color: colors.muted,
    fontSize: 13,
    marginBottom: 10,
  },
  sortButtons: {
    flexDirection: "row",
    gap: 10,
  },
  sortButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 18,
  },
  activeSortButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sortButtonText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "600",
  },
  activeSortText: {
    color: colors.white,
  },
});
