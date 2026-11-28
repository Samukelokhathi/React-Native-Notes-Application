import * as SecureStore from "expo-secure-store";
import { STORAGE_KEYS } from "../components/constants/storageKeys";
import { User } from "../types/noteAppModels";
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

export const updateUserProfile = async (
  userId: string,
  name: string,
  email: string,
) => {
  const users = await getData<User[]>(STORAGE_KEYS.USERS, []);

  const normalizedEmail = email.trim().toLowerCase();

  if (!name.trim()) {
    throw new Error("Name is required");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error("Enter a valid email address");
  }

  const emailExists = users.some(
    (user) => user.email === normalizedEmail && user.id !== userId,
  );

  if (emailExists) {
    throw new Error("This email is already registered");
  }

  const updatedUsers = users.map((user) =>
    user.id === userId
      ? {
          ...user,
          name: name.trim(),
          email: normalizedEmail,
        }
      : user,
  );

  const userExists = users.some((user) => user.id === userId);

  if (!userExists) {
    throw new Error("User account not found");
  }

  await saveData(STORAGE_KEYS.USERS, updatedUsers);

  return updatedUsers.find((user) => user.id === userId)!;
};

export const updateUserPassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
) => {
  const savedPassword = await SecureStore.getItemAsync(
    `notespace_password_${userId}`,
  );

  if (savedPassword !== currentPassword) {
    throw new Error("Current password is incorrect");
  }

  if (newPassword.length < 8) {
    throw new Error("New password must contain at least 8 characters");
  }

  await SecureStore.setItemAsync(`notespace_password_${userId}`, newPassword);
};
