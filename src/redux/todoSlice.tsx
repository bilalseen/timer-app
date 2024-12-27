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

interface TodosState {
  todos: Todo[];
  completed: Todo[];
}

const initialState: TodosState = {
  todos: [
    {
      id: "1",
      title: "First todo",
      content: "This is the first todo",
      date: "2021-09-01",
      isEdited: false,
      completed: false,
    },
    {
      id: "2",
      title: "Second todo",
      content: "This is the second todo",
      date: "2021-09-02",
      isEdited: false,
      completed: false,
    },
    {
      id: "3",
      title: "Third todo",
      content: "This is the third todo",
      date: "2021-09-03",
      isEdited: false,
      completed: false,
    },
  ],
  completed: [
    {
      id: "4",
      title: "Fourth todo",
      content: "This is the fourth todo",
      date: "2021-09-04",
      isEdited: false,
      completed: true,
    },
    {
      id: "5",
      title: "Fifth todo",
      content: "This is the fifth todo",
      date: "2021-09-05",
      isEdited: false,
      completed: true,
    },
    {
      id: "6",
      title: "Sixth todo",
      content: "This is the sixth todo",
      date: "2021-09-06",
      isEdited: false,
      completed: true,
    },
  ],
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
    editTodo: (state, action: PayloadAction<Todo>) => {
      const { id, title, content } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.title = title;
        todo.content = content;
        todo.isEdited = true;
      }
    },
    toggleCompleteTodoStatus: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        if (todo.completed) {
          todo.completed = false;
          state.todos.push(todo);
          state.todos = state.completed.filter(
            (todo) => todo.id !== action.payload
          );
        } else {
          todo.completed = true;
          state.completed.push(todo);
          state.todos = state.todos.filter(
            (todo) => todo.id !== action.payload
          );
        }
      }
    },
  },
});

export const { addTodo, editTodo, toggleCompleteTodoStatus } =
  todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectCompleted = (state: RootState) => state.todos.completed;
export const selectUncompleted = (state: RootState) => {
  return state.todos.todos.filter((todo) => !todo.completed);
};
export default todosSlice.reducer;
