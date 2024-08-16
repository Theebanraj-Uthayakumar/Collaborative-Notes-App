import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addNote, editNote, deleteNotes } from "../../store/apps/notesSlice";
import { NotesList } from "../../shared/interfaces";
import { deleteNote, getNotes, updateNote } from "../../service/notes.service";

const ListNotes = () => {
  const notesList = useSelector((state: any) => state.notes.notes);

  const [notes, setNotes] = useState<NotesList[]>(notesList);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (notesList.length === 0) {
      fetchNotes();
    } else {
      setNotes(notesList);
    }
  }, [notesList]);

  const fetchNotes = async () => {
    const response: any = await getNotes();
    setNotes(response?.data);
    dispatch(addNote(response?.data));
  };

  const handleEdit = (note: NotesList) => {
    setEditMode(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleSave = async (id: string) => {
    const updatedNote = {
      _id: id,
      title: editTitle,
      content: editContent,
    };

    const res = await updateNote(id, updatedNote);

    if (res?.code === 200) {
      dispatch(editNote(updatedNote));
      setEditMode(null);
      toast.success("Note updated successfully!");
    } else {
      toast.error("Failed to update note. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteNote(id);
    if (res?.code === 200) {
      dispatch(deleteNotes(id));
      toast.success("Note deleted successfully!");
    } else {
      toast.error("Failed to delete note. Please try again.");
    }
  };

  return (
    <>
      {notes?.map((note, index) => (
        <NoteCard key={index}>
          {editMode === note._id ? (
            <>
              <NoteTitleInput
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <NoteBodyInput
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <ActionsContainer>
                <SaveButton onClick={() => handleSave(note._id)}>
                  Save
                </SaveButton>
                <CancelButton onClick={() => setEditMode(null)}>
                  Cancel
                </CancelButton>
              </ActionsContainer>
            </>
          ) : (
            <>
              <div>
                <NoteTitle>{note?.title}</NoteTitle>
                <NoteBody>{note?.content}</NoteBody>
              </div>
              <ActionsContainer>
                <EditButton onClick={() => handleEdit(note)}>Edit</EditButton>
                <DeleteButton onClick={() => handleDelete(note?._id)}>
                  Delete
                </DeleteButton>
              </ActionsContainer>
            </>
          )}
        </NoteCard>
      ))}
    </>
  );
};

export default ListNotes;

const NoteCard = styled.div`
  background-color: #e3e4e8;
  padding: 15px;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #d1d2d6;
  }
`;

const NoteTitle = styled.h2`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 10px;
`;

const NoteBody = styled.p`
  color: #666;
  font-size: 1rem;
`;

const NoteTitleInput = styled.input`
  font-size: 1.2rem;
  width: -webkit-fill-available;
  padding: 8px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  outline: none;
  font-family: "Poppins", sans-serif;

  &:focus {
    border-color: #4caf50;
  }
`;

const NoteBodyInput = styled.textarea`
  font-size: 1rem;
  width: -webkit-fill-available;
  padding: 8px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  outline: none;
  font-family: "Poppins", sans-serif;
  resize: none;

  &:focus {
    border-color: #4caf50;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const EditButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e53935;
  }
`;

const SaveButton = styled.button`
  background-color: #008cba;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #007bb5;
  }
`;

const CancelButton = styled.button`
  background-color: #f1f1f1;
  color: #333;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #e0e0e0;
  }
`;
