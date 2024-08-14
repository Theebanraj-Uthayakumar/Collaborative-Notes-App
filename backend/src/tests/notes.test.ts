import { Request, Response } from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  shareNote,
} from "../controllers/noteController";
import Note from "../models/Note";
import { errorMessage, successMessage } from "../utils/responseHandler";

jest.mock("../models/Note");
jest.mock("../utils/responseHandler");

describe("Note Controller", () => {
  let req: any;
  let res: Partial<Response>;
  let mockNote: any;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      user: { id: "userId" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNote = {
      save: jest.fn(),
      _id: "noteId",
      user: "userId",
      sharedWith: [],
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createNote", () => {
    it("should create a new note and return success message", async () => {
      req.body = { title: "Test Title", content: "Test Content" };
      (Note as jest.Mocked<any>).mockImplementation(() => mockNote);
      (successMessage as jest.Mock).mockImplementation((data, res) =>
        res.json(data)
      );

      await createNote(req as Request, res as Response);

      expect(Note).toHaveBeenCalledWith({
        title: "Test Title",
        content: "Test Content",
        user: "userId",
      });
      expect(mockNote.save).toHaveBeenCalled();
      expect(successMessage).toHaveBeenCalledWith(mockNote, res);
    });

    it("should return error message on failure", async () => {
      (Note as jest.Mocked<any>).mockImplementation(() => {
        throw new Error("Server error");
      });
      (errorMessage as jest.Mock).mockImplementation((res, message, status) =>
        res.status(status).json({ message })
      );

      await createNote(req as Request, res as Response);

      expect(errorMessage).toHaveBeenCalledWith(res, "Server error", 500);
    });
  });

  describe("getNotes", () => {
    it("should return notes for the user", async () => {
      (Note.find as jest.Mock).mockResolvedValue([mockNote]);
      (successMessage as jest.Mock).mockImplementation((data, res) =>
        res.json(data)
      );

      await getNotes(req as Request, res as Response);

      expect(Note.find).toHaveBeenCalledWith({
        $or: [{ user: "userId" }, { sharedWith: "userId" }],
      });
      expect(successMessage).toHaveBeenCalledWith([mockNote], res);
    });

    it("should return error message on failure", async () => {
      (Note.find as jest.Mock).mockRejectedValue(new Error("Server error"));
      (errorMessage as jest.Mock).mockImplementation((res, message, status) =>
        res.status(status).json({ message })
      );

      await getNotes(req as Request, res as Response);

      expect(errorMessage).toHaveBeenCalledWith(res, "Server error", 500);
    });
  });

  describe("updateNote", () => {
    it("should update the note and return success message", async () => {
      req.params = { id: "noteId" };
      req.body = { title: "Updated Title", content: "Updated Content" };
      (Note.findById as jest.Mock).mockResolvedValue(mockNote);
      (successMessage as jest.Mock).mockImplementation((data, res) =>
        res.json(data)
      );

      await updateNote(req as Request, res as Response);

      expect(Note.findById).toHaveBeenCalledWith("noteId");
      expect(mockNote.save).toHaveBeenCalled();
      expect(successMessage).toHaveBeenCalledWith(mockNote, res);
    });

    it("should return error message if note not found", async () => {
      req.params = { id: "noteId" };
      (Note.findById as jest.Mock).mockResolvedValue(null);
      (errorMessage as jest.Mock).mockImplementation((res, message, status) =>
        res.status(status).json({ message })
      );

      await updateNote(req as Request, res as Response);

      expect(errorMessage).toHaveBeenCalledWith(res, "Note not found", 404);
    });

    it("should return error message on failure", async () => {
      req.params = { id: "noteId" };
      (Note.findById as jest.Mock).mockRejectedValue(new Error("Server error"));
      (errorMessage as jest.Mock).mockImplementation((res, message, status) =>
        res.status(status).json({ message })
      );

      await updateNote(req as Request, res as Response);

      expect(errorMessage).toHaveBeenCalledWith(res, "Server error", 500);
    });
  });

  describe("deleteNote", () => {
    // it("should delete the note and return success message", async () => {
    //   req.params = { id: "noteId" };
    //   (Note.findByIdAndDelete as jest.Mock).mockResolvedValue(mockNote);
    //   (successMessage as jest.Mock).mockImplementation((data, res) =>
    //     res.json(data)
    //   );

    //   await deleteNote(req as Request, res as Response);

    //   expect(Note.findByIdAndDelete).toHaveBeenCalledWith("noteId");
    //   expect(successMessage).toHaveBeenCalledWith(mockNote, res);
    // });

    // it("should return error message if note not found", async () => {
    //   req.params = { id: "noteId" };
    //   (Note.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
    //   (errorMessage as jest.Mock).mockImplementation((res, message, status) =>
    //     res.status(status).json({ message })
    //   );

    //   await deleteNote(req as Request, res as Response);

    //   expect(errorMessage).toHaveBeenCalledWith(res, "Note not found", 404);
    // });

    it("should return error message on failure", async () => {
      req.params = { id: "noteId" };
      (Note.findByIdAndDelete as jest.Mock).mockRejectedValue(
        new Error("Server error")
      );
      (errorMessage as jest.Mock).mockImplementation((res, message, status) =>
        res.status(status).json({ message })
      );

      await deleteNote(req as Request, res as Response);

      expect(errorMessage).toHaveBeenCalledWith(res, "Server error", 500);
    });
  });

  describe("shareNote", () => {
    // it("should share the note with another user and return success message", async () => {
    //   req.params = { id: "noteId" };
    //   req.body = { userId: "sharedUserId" };
    //   (Note.findById as jest.Mock).mockResolvedValue(mockNote);
    //   (successMessage as jest.Mock).mockImplementation((data, res) =>
    //     res.json(data)
    //   );

    //   await shareNote(req as Request, res as Response);

    //   expect(Note.findById).toHaveBeenCalledWith("noteId");
    //   expect(mockNote.save).toHaveBeenCalled();
    //   expect(successMessage).toHaveBeenCalledWith(mockNote, res);
    // });

    it("should return error message if note not found", async () => {
      req.params = { id: "noteId" };
      req.body = { userId: "sharedUserId" };
      (Note.findById as jest.Mock).mockResolvedValue(null);
      (errorMessage as jest.Mock).mockImplementation((res, message, status) =>
        res.status(status).json({ message })
      );

      await shareNote(req as Request, res as Response);

      expect(errorMessage).toHaveBeenCalledWith(res, "Note not found", 404);
    });

    it("should return error message on failure", async () => {
      req.params = { id: "noteId" };
      req.body = { userId: "sharedUserId" };
      (Note.findById as jest.Mock).mockRejectedValue(new Error("Server error"));
      (errorMessage as jest.Mock).mockImplementation((res, message, status) =>
        res.status(status).json({ message })
      );

      await shareNote(req as Request, res as Response);

      expect(errorMessage).toHaveBeenCalledWith(res, "Server error", 500);
    });
  });
});
