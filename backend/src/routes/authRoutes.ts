import { Router } from "express";
import {
  register,
  login,
  refreshToken,
  getAllUsers,
} from "../controllers/authController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.get("/get-all-users", getAllUsers);

export default router;
