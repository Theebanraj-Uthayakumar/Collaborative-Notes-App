import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Note {
  _id: string;
  title: string;
  content: string;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes = action.payload;
    },
    editNote: (state, action: PayloadAction<Note>) => {
      const { _id, title, content } = action.payload;
      const existingNote = state.notes.find((note) => note._id === _id);
      if (existingNote) {
        existingNote.title = title;
        existingNote.content = content;
      }
    },
    deleteNotes: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note._id !== action.payload);
    },
    addNewNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
  },
});

export const { addNote, editNote, deleteNotes, addNewNote } =
  notesSlice.actions;
export default notesSlice.reducer;
