import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface Note {
  title: string;
  content: string;
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
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },

    deleteNote: (state, action: PayloadAction<number>) => {
      state.notes.splice(action.payload, 1);
    },
  },
});

export const { addNote, deleteNote } = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes.notes;

export default notesSlice.reducer;
