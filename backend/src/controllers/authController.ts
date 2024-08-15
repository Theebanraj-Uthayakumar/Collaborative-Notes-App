import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../services/jwtService";
import { successMessage, errorMessage } from "../utils/responseHandler";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return errorMessage(res, "User already exists", 400);
    }

    user = await User.findOne({ username });
    if (user) {
      return errorMessage(res, "Username already exists", 400);
    }

    user = new User({ username, email, password });
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const userDetails = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    return successMessage(
      { userDetails, accessToken, refreshToken },
      res,
      "User registered successfully"
    );
  } catch (err) {
    return errorMessage(res, "Server error", 500);
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
      { userDetails, accessToken, refreshToken },
      res
    );
  } catch (err) {
    return errorMessage(res, "Something went wrong while logging in", 500);
  }
};

export const refreshToken = (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return errorMessage(res, "Refresh token required", 401);
  }

  try {
    const user = verifyRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken(user as IUser);

    return successMessage({ accessToken: newAccessToken }, res);
  } catch (error) {
    console.error(error);
    return errorMessage(res, "Invalid refresh token", 403);
  }
};
