import { Link } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import landingImg from "../../assets/";

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Logo */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>N</Text>
        </View>

        <Text style={styles.logoName}>NoteSpace</Text>
      </View>

      {/* Hero section */}
      <View style={styles.hero}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>YOUR IDEAS, YOUR SPACE</Text>
        </View>

        <Text style={styles.title}>
          Make space for{"\n"}
          <Text style={styles.highlight}>your thoughts.</Text>
        </Text>

        <Text style={styles.subtitle}>
          Capture your ideas, organize your notes, and keep everything important
          in one simple place.
        </Text>

        {/* Local landing image */}
        <Image
          source={require("../../assets/images/note.png")}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Actions */}
        <Link href="/auth/register" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
            <Text style={styles.arrow}>→</Text>
          </Pressable>
        </Link>

        <Link href="/auth/login" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>
              Already have an account? Log In
            </Text>
          </Pressable>
        </Link>
      </View>

      {/* Features */}
      <View style={styles.features}>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>✎</Text>
          <Text style={styles.featureTitle}>Create</Text>
          <Text style={styles.featureText}>Write down your ideas</Text>
        </View>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>▤</Text>
          <Text style={styles.featureTitle}>Organize</Text>
          <Text style={styles.featureText}>Keep notes in categories</Text>
        </View>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>⌕</Text>
          <Text style={styles.featureTitle}>Find</Text>
          <Text style={styles.featureText}>Search your notes easily</Text>
        </View>
      </View>

      <Text style={styles.footer}>A little space for every big idea.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15182B",
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 55,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 45,
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#8175F5",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },
  logoName: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
  },
  hero: {
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#20243A",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 20,
  },
  badgeText: {
    color: "#A69CFF",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 44,
  },
  highlight: {
    color: "#A69CFF",
  },
  subtitle: {
    color: "#9298AD",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 25,
  },
  heroImage: {
    width: "100%",
    height: 210,
    borderRadius: 20,
    marginBottom: 28,
    backgroundColor: "#20243A",
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#8175F5",
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  arrow: {
    color: "#FFFFFF",
    fontSize: 20,
    marginLeft: 10,
  },
  secondaryButton: {
    paddingVertical: 18,
  },
  secondaryButtonText: {
    color: "#A69CFF",
    fontSize: 14,
    fontWeight: "600",
  },
  features: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
    gap: 10,
  },
  feature: {
    flex: 1,
    backgroundColor: "#20243A",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
  },
  featureIcon: {
    color: "#A69CFF",
    fontSize: 24,
    marginBottom: 8,
  },
  featureTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },
  featureText: {
    color: "#9298AD",
    fontSize: 10,
    textAlign: "center",
    marginTop: 5,
  },
  footer: {
    color: "#9298AD",
    fontSize: 12,
    textAlign: "center",
    marginTop: 30,
  },
});
