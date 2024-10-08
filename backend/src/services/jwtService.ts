import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

export function generateAccessToken(user: Partial<IUser>): string {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
}

export function verifyToken(token: string): any {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}

export function verifyRefreshToken(token: string): any {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
}

export function generateRefreshToken(user: IUser) {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
}
