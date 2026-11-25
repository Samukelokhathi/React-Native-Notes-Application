
import { STORAGE_KEYS } from "../constants/storageKeys";
import { getData, saveData } from "./storage";
import { Note } from "../types/noteAppModels";

export const getAllNotes = async (): Promise<Note[]> => {
  return await getData<Note[]>(STORAGE_KEYS.NOTES, []);
};

export const saveAllNotes = async (notes: Note[]) => {
  await saveData(STORAGE_KEYS.NOTES, notes);
};
