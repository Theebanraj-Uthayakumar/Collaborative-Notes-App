import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addNote,
  editNote,
  deleteNotes,
  addNewNote,
} from "../../store/apps/notesSlice";
import { NoteEditDetails, NotesList } from "../../shared/interfaces";
import {
  deleteNote,
  getNotes,
  updateNote,
  shareNote,
} from "../../service/notes.service";
import { Popover, OverlayTrigger, Dropdown } from "react-bootstrap";
import { getUser } from "../../service/user.service";
import { setUsers } from "../../store/apps/usersSlice";
import socket from "../../socket";
import { getUserDetails } from "../../shared/utils/helpers";

const ListNotes = () => {
  const notesList = useSelector((state: any) => state.notes.notes);
  const usersList = useSelector((state: any) => state.users.users);

  const [notes, setNotes] = useState<NotesList[]>(notesList);
  const [userList, setUserList] = useState<any[]>(usersList);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [noteEditDetails, setNoteEditDetails] = useState<NoteEditDetails>({
    noteId: "",
    username: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (notesList.length === 0) {
      fetchNotes();
    } else {
      setNotes(notesList);
    }
  }, [notesList]);

  useEffect(() => {
    if (usersList.length === 0) {
      getAllUsersList();
    } else {
      setUserList(usersList);
    }
  }, [usersList]);

  // Fetch initial notes
  const fetchNotes = async () => {
    const response: any = await getNotes();
    setNotes(response?.data);
    dispatch(addNote(response?.data));
  };

  // Fetch initial users
  const getAllUsersList = async () => {
    const response: any = await getUser();
    setUserList(response?.data);
    dispatch(setUsers(response?.data));
  };

  // Handle WebSocket events
  const isListenersAttached = useRef(false);

  useEffect(() => {
    if (!isListenersAttached.current) {
      const handleNewNote = (newNote: any) => {
        dispatch(addNewNote(newNote));
      };

      const handleNoteDeleted = (deletedNoteId: any) => {
        dispatch(deleteNotes(deletedNoteId));
      };

      const handleNoteUpdated = (updatedNote: any) => {
        dispatch(editNote(updatedNote));
      };

      const handleEditingDetails = (details: any) => {
        setNoteEditDetails(details);
      };

      socket.on("newNote", handleNewNote);
      socket.on("noteDeleted", handleNoteDeleted);
      socket.on("noteUpdated", handleNoteUpdated);
      socket.on("editingDetails", handleEditingDetails);

      isListenersAttached.current = true;

      // Cleanup function
      return () => {
        socket.off("newNote", handleNewNote);
        socket.off("noteDeleted", handleNoteDeleted);
        socket.off("noteUpdated", handleNoteUpdated);
        socket.off("editingDetails", handleEditingDetails);
        isListenersAttached.current = false;
      };
    }
  }, [dispatch]);

  // Handle edit mode
  const handleEdit = (note: NotesList) => {
    const userDetails = getUserDetails();

    const editingDetails = {
      noteId: note._id,
      username: userDetails?.username,
    };

    console.log(editingDetails);

    socket.emit("editingDetails", editingDetails);
    setEditMode(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  // Save edited note
  const handleUpdate = async (id: string) => {
    const updatedNote = { _id: id, title: editTitle, content: editContent };
    const res = await updateNote(id, updatedNote);

    const editingDetails = {
      noteId: "",
      username: "",
    };

    if (res?.code === 200) {
      socket.emit("noteUpdated", updatedNote);
      socket.emit("editingDetails", editingDetails);
      setEditMode(null);
      toast.success("Note updated successfully!");
    } else {
      toast.error("Failed to update note. Please try again.");
    }
  };

  // Delete a note
  const handleDelete = async (id: string) => {
    const res = await deleteNote(id);
    if (res?.code === 200) {
      // dispatch(deleteNotes(id));
      socket.emit("noteDeleted", id);
      toast.success("Note deleted successfully!");
    } else {
      toast.error("Failed to delete note. Please try again.");
    }
  };

  // Share a note
  const handleShare = async (id: string, userId: string) => {
    const res = await shareNote(id, userId);
    if (res?.code === 200) {
      toast.success(`Note shared successfully!`);
      setSelectedUserId("");
    } else {
      toast.error("Failed to share note. Please try again.");
    }
  };

  const cancelEdit = () => {
    setEditMode(null);
    setEditTitle("");
    setEditContent("");

    const editingDetails = {
      noteId: "",
      username: "",
    };

    socket.emit("editingDetails", editingDetails);
  };

  const renderSharePopover = (noteId: string) => (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Share Note</Popover.Header>
      <Popover.Body>
        <Dropdown onSelect={(e) => setSelectedUserId(e || "")}>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {userList.find((user) => user._id === selectedUserId)?.username ||
              "Select User"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {userList.map((user, index) => (
              <Dropdown.Item key={index} eventKey={user._id}>
                {user.username}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <ShareButton
          onClick={() => handleShare(noteId, selectedUserId)}
          style={{ marginTop: "10px" }}
        >
          Share
        </ShareButton>
      </Popover.Body>
    </Popover>
  );

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
                <SaveButton onClick={() => handleUpdate(note._id)}>
                  Update
                </SaveButton>
                <CancelButton onClick={() => cancelEdit()}>Cancel</CancelButton>
              </ActionsContainer>
            </>
          ) : (
            <>
              <div>
                <NoteTitle>{note?.title}</NoteTitle>
                <NoteBody>{note?.content}</NoteBody>
              </div>
              <ActionsContainer
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {noteEditDetails.noteId === note._id &&
                    `${noteEditDetails.username} is editing this note`}
                </div>
                <div style={{ display: "flex", gap: "5px" }}>
                  <EditButton onClick={() => handleEdit(note)}>Edit</EditButton>
                  <DeleteButton onClick={() => handleDelete(note?._id)}>
                    Delete
                  </DeleteButton>
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={renderSharePopover(note._id)}
                  >
                    <ShareButton>Share</ShareButton>
                  </OverlayTrigger>
                </div>
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

const ShareButton = styled.button`
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
