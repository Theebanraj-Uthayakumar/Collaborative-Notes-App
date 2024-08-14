import { Request, Response } from "express";
import Note from "../models/Note";

interface AuthRequest extends Request {
  user?: any;
}

export const createNote = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
      user: req.user.id,
    });
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getNotes = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateNote = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    if (note.user.toString() !== req.user.id) {
      res.status(401).json({ message: "User not authorized" });
      return;
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    await note.save();

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteNote = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    if (note.user.toString() !== req.user.id) {
      res.status(401).json({ message: "User not authorized" });
      return;
    }

    await Note.deleteOne({ _id: note._id });
    res.json({ message: "Note removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const shareNote = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    if (note.user.toString() !== req.user.id) {
      res.status(401).json({ message: "User not authorized" });
      return;
    }

    note.sharedWith.push(req.body.userId);
    await note.save();

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
