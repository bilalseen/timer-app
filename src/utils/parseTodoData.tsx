interface Todo {
  id: string;
  title: string;
  content: string;
  date: string;
  isEdited: boolean;
  completed: boolean;
}

export default function parseNoteData(todos: Todo[]) {
  const filteredNotes = [...todos].sort((a, b) => {
    return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
  });

  return filteredNotes;
}
