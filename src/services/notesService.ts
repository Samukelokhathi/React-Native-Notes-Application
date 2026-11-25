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

type NewNote = Pick<Note, "title" | "content" | "category">;

export const createNote = async (
  userId: string,
  noteData: NewNote,
): Promise<Note> => {
  const notes = await getAllNotes();

  const newNote: Note = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    userId,
    title: noteData.title,
    content: noteData.content,
    category: noteData.category,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await saveAllNotes([...notes, newNote]);

  return newNote;
};
