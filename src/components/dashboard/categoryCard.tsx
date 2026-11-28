import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../styles/colors";

type CategoryCardProps = {
  name: string;
  color: string;
  noteCount: number;
  onPress: () => void;
};

export default function CategoryCard({
  name,
  color,
  noteCount,
  onPress,
}: CategoryCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={[styles.indicator, { backgroundColor: color }]} />

      <Text style={styles.name}>{name}</Text>

      <Text style={styles.count}>
        {noteCount} {noteCount === 1 ? "note" : "notes"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 14,
    width: "48%",
    marginBottom: 14,
  },
  pressed: {
    opacity: 0.7,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 14,
  },
  name: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "bold",
  },
  count: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 8,
  },
});
