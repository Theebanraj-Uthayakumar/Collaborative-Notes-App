import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwtService";
import User, { IUser } from "../models/User";

interface AuthRequest extends Request {
  user?: IUser;
}

async function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token from the header

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    const decoded = verifyToken(token); // Ensure this returns the decoded payload
    req.user = (await User.findById(decoded.id).select("-password")) as
      | IUser
      | undefined;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
    return;
  }
}

export default authenticateToken;
