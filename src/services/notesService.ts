import { Note } from "../types/noteAppModels";
import { getAllNotes, saveAllNotes } from "./noteStorage";

export const getUserNotes = async (userId: string): Promise<Note[]> => {
  const notes = await getAllNotes();

  return notes.filter((note) => note.userId === userId);
};

export const saveUserNotes = async (userId: string, userNotes: Note[]) => {
  const allNotes = await getAllNotes();

  const otherUsersNotes = allNotes.filter((note) => note.userId !== userId);

  await saveAllNotes([...otherUsersNotes, ...userNotes]);
};
