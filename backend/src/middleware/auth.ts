import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwtService";
import User, { IUser } from "../models/User";
import { errorMessage } from "../utils/responseHandler";

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
    return errorMessage(res, "No token, authorization denied", 401);
  }

  try {
    const decoded = verifyToken(token); // Ensure this returns the decoded payload
    req.user = (await User.findById(decoded.id).select("-password")) as
      | IUser
      | undefined;
    next();
  } catch (err) {
    return errorMessage(res, "Invalid token", 403);
  }
}

export default authenticateToken;
