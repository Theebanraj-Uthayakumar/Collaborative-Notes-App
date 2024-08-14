import { Router } from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  shareNote,
} from "../controllers/noteController";
import authenticateToken from "../middleware/auth";

const router = Router();

router.use(authenticateToken);

router.post("/create-note", createNote);
router.get("/get-notes", getNotes);
router.put("/update-note/:id", updateNote);
router.delete("/delete-note/:id", deleteNote);
router.post("/share/:id", shareNote);

export default router;
