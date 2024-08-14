import { Request, Response } from "express";
import User from "../models/User";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/jwtService";
import { successMessage, errorMessage } from "../utils/responseHandler";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    user = new User({ username, email, password });
    await user.save();

    const token = generateAccessToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return errorMessage(res, "Invalid credentials", 400);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorMessage(res, "Invalid credentials", 400);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const userDetails = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    return successMessage(
      { user: userDetails, accessToken, refreshToken },
      res
    );
  } catch (err) {
    return errorMessage(res, "Something went wrong while logging in", 500);
  }
};
