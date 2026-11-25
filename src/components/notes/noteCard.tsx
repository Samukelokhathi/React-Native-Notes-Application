
import { StyleSheet, Text, View } from "react-native";
import { Note } from "../../types/noteAppModels";
import { colors } from "../../styles/colors";

type NoteCardProps = {
  note: Note;
};

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.category}>{note.category}</Text>
      </View>

      <Text style={styles.content} numberOfLines={3}>
        {note.content}
      </Text>

      <Text style={styles.date}>
        {new Date(note.createdAt).toLocaleDateString()}
      </Text>
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
  date: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 14,
  },
});
