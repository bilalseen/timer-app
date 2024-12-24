interface Note {
  id: string;
  title: string;
  content: string;
  categories: string[];
  lastCategories: string[];
  date: string;
  isEdited: boolean;
}

export default function parseNoteData(notes: Note[]) {
  const filteredNotes = [...notes].sort((a, b) => {
    return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
  });

  return filteredNotes;
}
