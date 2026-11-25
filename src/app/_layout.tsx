import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/authContext";

function Navigation() {
  const { currentUser, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
