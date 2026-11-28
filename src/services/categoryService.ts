import { categories as defaultCategories } from "../constants/categories";
import { Category } from "../types/noteAppModels";
import { getData, saveData } from "./storage";

const CATEGORY_STORAGE_KEY = "notespace_categories";

type SavedCategories = {
  [userId: string]: Category[];
};

export const getUserCategories = async (
  userId: string,
): Promise<Category[]> => {
  const savedCategories = await getData<SavedCategories>(
    CATEGORY_STORAGE_KEY,
    {},
  );

  return [...defaultCategories, ...(savedCategories[userId] || [])];
};

export const addUserCategory = async (
  userId: string,
  categoryName: string,
): Promise<Category> => {
  const name = categoryName.trim();

  if (!name) {
    throw new Error("Category name is required");
  }

  const savedCategories = await getData<SavedCategories>(
    CATEGORY_STORAGE_KEY,
    {},
  );

  const userCategories = [
    ...defaultCategories,
    ...(savedCategories[userId] || []),
  ];

  const alreadyExists = userCategories.some(
    (category) => category.name.toLowerCase() === name.toLowerCase(),
  );

  if (alreadyExists) {
    throw new Error("This category already exists");
  }

  const availableColors = [
    "#EC4899",
    "#F97316",
    "#14B8A6",
    "#A78BFA",
    "#EAB308",
    "#60A5FA",
    "#F43F5E",
    "#84CC16",
  ];

  const usedColors = userCategories.map((category) => category.color);

  const color =
    availableColors.find((item) => !usedColors.includes(item)) ||
    availableColors[userCategories.length % availableColors.length];

  const newCategory: Category = {
    name,
    color,
  };

  savedCategories[userId] = [...(savedCategories[userId] || []), newCategory];

  await saveData(CATEGORY_STORAGE_KEY, savedCategories);

  return newCategory;
};
