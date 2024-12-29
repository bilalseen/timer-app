interface Todo {
  id: string;
  title: string;
  content: string;
  date: string;
  isEdited: boolean;
  completed: boolean;
}

export default function parseNoteData(todos: Todo[]) {
  const date = new Date();
  const pastedTodos = todos.filter((todo) => {
    return todo.date < date.toISOString();
  });

  const notPastedTodos = todos.filter((todo) => {
    return todo.date >= date.toISOString();
  });

  const parsedPastedTodo = [...pastedTodos].sort((a, b) => {
    return b.date.localeCompare(a.date);
  });

  const parsedNotPastedTodo = [...notPastedTodos].sort((a, b) => {
    return a.date.localeCompare(b.date);
  });

  const filteredNotes = [...parsedNotPastedTodo, ...parsedPastedTodo];

  return filteredNotes;
}
