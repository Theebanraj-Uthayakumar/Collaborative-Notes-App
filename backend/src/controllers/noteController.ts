import { Request, Response } from "express";
import Note from "../models/Note";
import { errorMessage, successMessage } from "../utils/responseHandler";

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

    return successMessage(note, res);
  } catch (err) {
    return errorMessage(res, "Server error", 500);
  }
};

export const getNotes = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user.id;

    const notes = await Note.find({
      $or: [{ user: userId }, { sharedWith: userId }],
    });

    return successMessage(notes, res);
  } catch (err) {
    return errorMessage(res, "Server error", 500);
  }
};

export const updateNote = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return errorMessage(res, "Note not found", 404);
    }

    const userId = req.user.id;
    const isOwner = note.user.toString() === userId;
    const isSharedWithUser = note.sharedWith.includes(userId);

    if (!isOwner && !isSharedWithUser) {
      return errorMessage(res, "User not authorized", 401);
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    await note.save();

    return successMessage(note, res);
  } catch (err) {
    return errorMessage(res, "Server error", 500);
  }
};

export const deleteNote = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return errorMessage(res, "Note not found", 404);
    }

    if (note.user.toString() !== req.user.id) {
      return errorMessage(
        res,
        "You cannot delete this resource due to insufficient permissions.",
        422
      );
    }

    await Note.deleteOne({ _id: note._id });
    return successMessage(note, res, "Note deleted");
  } catch (err) {
    return errorMessage(res, "Server error", 500);
  }
};

export const shareNote = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return errorMessage(res, "Note not found", 404);
    }

    if (note.user.toString() !== req.user.id) {
      return errorMessage(res, "User not authorized", 401);
    }

    note.sharedWith.push(req.body.userId);
    await note.save();

    return successMessage(note, res, "Note shared");
  } catch (err) {
    return errorMessage(res, "Server error", 500);
  }
};
