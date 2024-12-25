import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "date-fns";
interface Note {
  id: string;
  title: string;
  content: string;
  categories: string[];
  lastCategories: string[];
  image: string | null;
  date: string;
  isEdited: boolean;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

interface NotesState {
  notes: Note[];
  categories: Category[];
  activeCategories: string[];
}

const initialState: NotesState = {
  notes: [],
  categories: [],
  activeCategories: [],
};

const storeData = async (value: Note[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("notes", jsonValue);
  } catch (e) {}
};

const storeCategories = async (value: Category[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("categories", jsonValue);
  } catch (e) {}
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Omit<Note, "id">>) => {
      const newId = uuidv4();
      const newNote = { id: newId, ...action.payload };
      state.notes.push(newNote);

      newNote.categories.forEach((categoryName) => {
        const existingCategory = state.categories.find(
          (category) => category.name === categoryName
        );

        if (existingCategory) {
          existingCategory.count++;
        } else {
          state.categories.push({
            id: uuidv4(),
            name: categoryName,
            count: 1,
          });
        }
      });
      storeData(state.notes);
      storeCategories(state.categories);
    },
    setAsyncStorageData: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    setAsyncStorageCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    editNote: (
      state,
      action: PayloadAction<{ id: string; note: Partial<Note> }>
    ) => {
      const { id, note } = action.payload;

      state.notes = state.notes.map((existingNote) =>
        existingNote.id === id ? { ...existingNote, ...note } : existingNote
      );

      note.lastCategories?.forEach((categoryName) => {
        const existingCategory = state.categories.find(
          (category) => category.name === categoryName
        );

        if (existingCategory) {
          existingCategory.count--;

          if (existingCategory.count === 0) {
            state.categories = state.categories.filter(
              (category) => category.name !== categoryName
            );
          }
        }
      });

      note.categories?.forEach((categoryName) => {
        const existingCategory = state.categories.find(
          (category) => category.name === categoryName
        );

        if (existingCategory) {
          existingCategory.count++;
        } else {
          state.categories.push({
            id: uuidv4(),
            name: categoryName,
            count: 1,
          });
        }
      });
      storeData(state.notes);
      storeCategories(state.categories);
    },

    deleteNote: (
      state,
      action: PayloadAction<{ id: string; noteCategories: string[] }>
    ) => {
      const { id, noteCategories } = action.payload;
      state.notes = state.notes.filter((note) => note.id !== id);
      noteCategories?.forEach((categoryName) => {
        const existingCategory = state.categories.find(
          (category) => category.name === categoryName
        );

        if (existingCategory) {
          existingCategory.count--;

          if (existingCategory.count === 0) {
            state.categories = state.categories.filter(
              (category) => category.name !== categoryName
            );
          }
        }
      });
      storeData(state.notes);
      storeCategories(state.categories);
    },
    setActiveCategories: (state, action: PayloadAction<string[]>) => {
      if (
        JSON.stringify(state.activeCategories) !==
        JSON.stringify(action.payload)
      ) {
        state.activeCategories = action.payload;
      }
    },
  },
});

export const {
  addNote,
  editNote,
  deleteNote,
  setActiveCategories,
  setAsyncStorageData,
  setAsyncStorageCategories,
} = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes.notes;
export const selectCategories = (state: RootState) => state.notes.categories;
export const selectActiveCategories = (state: RootState) =>
  state.notes.activeCategories;
export const selectNoteById = (state: RootState, id: string) =>
  state.notes.notes.find((note) => note.id === id);

export default notesSlice.reducer;
