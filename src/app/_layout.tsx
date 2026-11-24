import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/authContext";

function Navigation() {
  const { currentUser, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const inAuth = segments[0] === "auth";
    const inApp = segments[0] === "(app)";

    if (!currentUser && inApp) {
      router.replace("/auth/login");
    }

    if (currentUser && (inAuth || segments.length === 0)) {
      router.replace("/dashboard");
    }
  }, [currentUser, isLoading, segments]);

  if (isLoading) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
