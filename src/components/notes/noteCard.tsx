import { useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/authContext";
import { deleteNote } from "../../services/notesService";
import { colors } from "../../styles/colors";
import { Note } from "../../types/noteAppModels";

type NoteCardProps = {
  note: Note;
  categoryColor: string;
  onDelete: (noteId: string) => void;
};

export default function NoteCard({
  note,
  categoryColor,
  onDelete,
}: NoteCardProps) {
  const router = useRouter();
  const { currentUser } = useAuth();

  const handleDelete = () => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          if (!currentUser) return;

          try {
            await deleteNote(currentUser.id, note.id);
            onDelete(note.id);
          } catch {
            Alert.alert("Error", "Unable to delete this note.");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{note.title}</Text>

        <Text
          style={[
            styles.category,
            {
              color: categoryColor,
              borderColor: categoryColor,
            },
          ]}
        >
          {note.category}
        </Text>
      </View>

      <Text style={styles.content} numberOfLines={3}>
        {note.content}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </Text>

        <View style={styles.actions}>
          <Pressable
            style={styles.editButton}
            onPress={() =>
              router.push({
                pathname: "/editNote",
                params: { id: note.id },
              })
            }
          >
            <Text style={styles.edit}>Edit</Text>
          </Pressable>

          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.delete}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
  },
  category: {
    fontSize: 12,
    fontWeight: "bold",
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  content: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },
  date: {
    color: colors.muted,
    fontSize: 11,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  editButton: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 7,
    paddingVertical: 7,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 7,
    paddingVertical: 7,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  edit: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: "bold",
  },
  delete: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "bold",
  },
});
