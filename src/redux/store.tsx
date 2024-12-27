import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";
import todosReducer from "./todoSlice";

const store = configureStore({
  reducer: {
    notes: notesReducer,
    todos: todosReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
