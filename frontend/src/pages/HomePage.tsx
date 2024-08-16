import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/index";
import styled from "styled-components";
import { deleteNote, getNotes } from "../service/notes.service";
import type { NotesList } from "../shared/interfaces";
import { toast } from "react-toastify";

const HomePage: React.FC = () => {
  const [notes, setNotes] = useState<NotesList[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const response: any = await getNotes();
      setNotes(response?.data);
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await deleteNote(id);
    if (res?.code === 200) {
      toast.success("Note deleted successfully!");
    } else {
      if (res?.code === 422) {
        return toast.error(res?.message);
      } else {
        toast.error("Failed to delete note. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Content>
          <h1>Notes</h1>
          <NotesList>
            {notes?.map((note) => (
              <NoteCard key={note?._id}>
                <div>
                  <NoteTitle>{note?.title}</NoteTitle>
                  <NoteBody>{note?.content}</NoteBody>
                </div>
                <DeleteContainer onClick={() => handleDelete(note?._id)}>
                  <img
                    src="./assets/images/delete-icon.png"
                    alt="delete-icon"
                    style={{ width: "20px" }}
                  />
                </DeleteContainer>
              </NoteCard>
            ))}
          </NotesList>
        </Content>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f9;
  min-height: 100vh;
`;

const Content = styled.div`
  width: 80%;
  max-width: 900px;
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }
`;

const NotesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

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

const DeleteContainer = styled.div`
  display: flex;
  justify-content: end;
  cursor: pointer;
`;

export default HomePage;
