import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { getData, removeData } from "../services/storage";
import { User } from "../types/noteAppModels";

type AuthContextType = {
  currentUser: User | null;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = async () => {
    const userId = await getData<string | null>(STORAGE_KEYS.SESSION, null);

    const users = await getData<User[]>(STORAGE_KEYS.USERS, []);

    const user = users.find((item) => item.id === userId);

    setCurrentUser(user || null);
  };

  const logout = async () => {
    await removeData(STORAGE_KEYS.SESSION);
    setCurrentUser(null);
  };

  useEffect(() => {
    const loadSession = async () => {
      try {
        await refreshSession();
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        refreshSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
