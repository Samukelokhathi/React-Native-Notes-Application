import { useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/authContext";
import { deleteNote } from "../../services/notesService";
import { colors } from "../../styles/colors";
import { Note } from "../../types/noteAppModels";

type NoteCardProps = {
  note: Note;
};

export default function NoteCard({ note }: NoteCardProps) {
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

          await deleteNote(currentUser.id, note.id);
        },
      },
    ]);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.category}>{note.category}</Text>
      </View>

      <Text style={styles.content} numberOfLines={3}>
        {note.content}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </Text>

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/editNote",
              params: { id: note.id },
            })
          }
        >
          <Text style={styles.edit}>Edit</Text>
        </Pressable>
        <Pressable onPress={handleDelete}>
          <Text style={styles.delete}>Delete</Text>
        </Pressable>
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
    color: colors.secondary,
    fontSize: 12,
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
    marginTop: 14,
  },
  date: {
    color: colors.muted,
    fontSize: 11,
  },
  edit: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: "bold",
  },
  delete: {
    color: colors.danger,
    fontWeight: "bold",
  },
});
