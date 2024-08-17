import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { createNote } from "../../service/notes.service";
import socket from "../../socket";

const AddNote = ({
  showAddForm,
  setShowAddForm,
}: {
  showAddForm: boolean;
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const noteCardRef = useRef<HTMLDivElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (errorMessage) {
      setErrorMessage("");
    }
    setContent(e.target.value);
  };

  const handleSave = async () => {
    const res = await createNote({
      title,
      content,
    });

    if (res?.code === 200) {
      setTitle("");
      setContent("");
      setShowAddForm(false);
      socket.emit("newNote", res?.data);
    } else {
      setErrorMessage("Failed to save note. Please try again.");
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      noteCardRef.current &&
      !noteCardRef.current.contains(event.target as Node)
    ) {
      if (title && content) {
        handleSave();
      } else {
        setErrorMessage("Title and content cannot be empty.");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [title, content]);

  return (
    <NoteCard ref={noteCardRef}>
      <form>
        <NoteTitle
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter note title ..."
        />
        <NoteBody
          value={content}
          onChange={handleContentChange}
          placeholder="Enter note content ..."
        />
      </form>
      <ErroMessage>{errorMessage}</ErroMessage>
    </NoteCard>
  );
};

export default AddNote;

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

const NoteTitle = styled.input`
  font-size: 1rem;
  width: -webkit-fill-available;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
  font-family: "Poppins", sans-serif;

  &:focus {
    border-color: #4caf50;
  }

  &::placeholder {
    color: #bbb;
  }
`;

const NoteBody = styled.textarea`
  font-size: 1rem;
  width: -webkit-fill-available;
  border: none;
  padding: 10px;
  resize: none;
  outline: none;
  border-radius: 5px;
  transition: border-color 0.3s;
  font-family: "Poppins", sans-serif;

  &:focus {
    border-color: #4caf50;
  }

  &::placeholder {
    color: #bbb;
  }
`;

const ErroMessage = styled.div`
  color: red;
  padding: 5px;
  margin-bottom: 12px;
  font-size: 14px;
`;
