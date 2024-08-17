export interface UserDetails {
  id: string;
  username: string;
  email: string;
}

export interface Notes {
  title: string;
  content: string;
}

export interface NotesList {
  _id: string;
  title: string;
  content: string;
}

export interface NoteEditDetails {
  noteId: string;
  username: string;
}
