import * as SecureStore from "expo-secure-store";
import { STORAGE_KEYS } from "../components/constants/storageKeys";
import { User } from "../types/users";
import { getData, saveData } from "./storage";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const users = await getData<User[]>(STORAGE_KEYS.USERS, []);

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = users.find((user) => user.email === normalizedEmail);

  if (existingUser) {
    throw new Error("This email is already registered");
  }

  const newUser: User = {
    id: `${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    createdAt: new Date().toISOString(),
  };

  await SecureStore.setItemAsync(`notespace_password_${newUser.id}`, password);

  await saveData(STORAGE_KEYS.USERS, [...users, newUser]);

  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const users = await getData<User[]>(STORAGE_KEYS.USERS, []);

  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find((item) => item.email === normalizedEmail);

  if (!user) {
    throw new Error("Account not found");
  }

  const savedPassword = await SecureStore.getItemAsync(
    `notespace_password_${user.id}`,
  );

  if (savedPassword !== password) {
    throw new Error("Incorrect password");
  }

  await saveData(STORAGE_KEYS.SESSION, user.id);

  return user;
};
