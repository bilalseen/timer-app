import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "./store";

interface Todo {
  id: string;
  title: string;
  content: string;
  date: string;
  isEdited: boolean;
  completed: boolean;
}

interface UpadeteTodo {
  id: string;
  title: string;
  content: string;
}

interface TodosState {
  todos: Todo[];
  completed: Todo[];
}

const initialState: TodosState = {
  todos: [],
  completed: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, "id">>) => {
      const newId = uuidv4();
      const newTodo = { id: newId, ...action.payload };
      state.todos.push(newTodo);
    },
    editTodo: (state, action: PayloadAction<UpadeteTodo>) => {
      const { id, title, content } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.title = title;
        todo.content = content;
        todo.isEdited = true;
        todo.date = new Date().toISOString();
      }
    },
    toggleCompleteTodoStatus: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        if (todo.completed) {
          todo.completed = false;
          state.completed = state.completed.filter(
            (completedTodo) => completedTodo.id !== action.payload
          );
          state.todos.push({ ...todo });
        } else {
          todo.completed = true;
          state.todos = state.todos.filter(
            (uncompletedTodo) => uncompletedTodo.id !== action.payload
          );
          state.completed.push({ ...todo });
        }
      } else {
        const completedTodo = state.completed.find(
          (completedTodo) => completedTodo.id === action.payload
        );
        if (completedTodo) {
          completedTodo.completed = false;
          state.completed = state.completed.filter(
            (completedTodo) => completedTodo.id !== action.payload
          );
          state.todos.push({ ...completedTodo });
        }
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      state.completed = state.completed.filter(
        (todo) => todo.id !== action.payload
      );
    },
    deleteAllCompleted: (state) => {
      state.completed = [];
    },
  },
});

export const {
  addTodo,
  editTodo,
  toggleCompleteTodoStatus,
  deleteTodo,
  deleteAllCompleted,
} = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectCompleted = (state: RootState) => state.todos.completed;
export const selectUncompleted = (state: RootState) => {
  return state.todos.todos.filter((todo) => !todo.completed);
};
export const selectTodoById = (state: RootState, id: string) => {
  state.todos.todos.find((todo) => todo.id === id);
};
export default todosSlice.reducer;
