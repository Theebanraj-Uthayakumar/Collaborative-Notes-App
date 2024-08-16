import React, { useState } from "react";
import Navbar from "../components/Navbar/index";
import styled from "styled-components";
import AddNote from "../components/AddNotes";
import ListNotes from "../components/ListNotes";

const HomePage: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const handleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Content>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>Notes</h1>
            <AddButton type="submit" onClick={() => handleAddForm()}>
              {showAddForm ? "Close Form" : "Add New"}
            </AddButton>
          </div>
          <NotesListCom>
            {showAddForm && (
              <AddNote
                showAddForm={showAddForm}
                setShowAddForm={setShowAddForm}
              />
            )}
            <ListNotes />
          </NotesListCom>
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

const NotesListCom = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const AddButton = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049; /* Optional: Add a hover effect */
  }
`;

export default HomePage;
