import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Omit<Note, "id">>) => {
      const newId = uuidv4();
      state.notes.push({ id: newId, ...action.payload });
    },
    editNote: (
      state,
      action: PayloadAction<{ id: string; note: Partial<Note> }>
    ) => {
      const { id, note } = action.payload;
      state.notes = state.notes.map((existingNote) =>
        existingNote.id === id ? { ...existingNote, ...note } : existingNote
      );
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const { addNote, editNote, deleteNote } = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes.notes;
export const selectNoteById = (state: RootState, id: string) =>
  state.notes.notes.find((note) => note.id === id);

export default notesSlice.reducer;
