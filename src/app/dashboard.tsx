
import { StyleSheet, Text, View, ScrollView } from "react-native";
import CategoryCard from "../components/dashboard/categoryCard";
import { categories } from "../constants/categories";
import { colors } from "../styles/colors";

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>NoteSpace</Text>
        <Text style={styles.subtitle}>Your personal notes space</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.heading}>My Notes</Text>

        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              color={category.color}
              noteCount={0}
            />
          ))}
        </View>
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
  content: {
    padding: 24,
  },
  welcome: {
    color: colors.muted,
    fontSize: 15,
  },
  heading: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 22,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
