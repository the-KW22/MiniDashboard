import { create } from 'zustand';
import { Note } from './types';
import { storage } from './storage';

const STORAGE_KEY = 'mini-dashboard-notes';

interface NoteStore {
    notes: Note[];
    addNote: (title: string, content: string) => void;
    updateNote: (id: string, title: string, content: string) => void;
    deleteNote: (id: string) => void;
    loadNotes: () => void;
    clearAllNotes: () => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  
  loadNotes: () => {
    const savedNotes = storage.get<Note[]>(STORAGE_KEY);
    if (savedNotes) {
      set({ notes: savedNotes });
    }
  },
  
  addNote: (title, content) =>
    set((state) => {
      const now = Date.now();
      const newNotes = [
        {
          id: crypto.randomUUID(),
          title,
          content,
          createdAt: now,
          updatedAt: now,
        },
        ...state.notes, // New notes at the top
      ];
      storage.set(STORAGE_KEY, newNotes);
      return { notes: newNotes };
    }),
  
  updateNote: (id, title, content) =>
    set((state) => {
      const newNotes = state.notes.map((note) =>
        note.id === id
          ? { ...note, title, content, updatedAt: Date.now() }
          : note
      );
      storage.set(STORAGE_KEY, newNotes);
      return { notes: newNotes };
    }),
  
  deleteNote: (id) =>
    set((state) => {
      const newNotes = state.notes.filter((note) => note.id !== id);
      storage.set(STORAGE_KEY, newNotes);
      return { notes: newNotes };
    }),
  
  clearAllNotes: () => {
    storage.remove(STORAGE_KEY);
    set({ notes: [] });
  },
}));