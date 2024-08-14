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

router.post("/", createNote);
router.get("/", getNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.post("/:id/share", shareNote);

export default router;
