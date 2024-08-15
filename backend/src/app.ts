import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import noteRoutes from "./routes/noteRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(morgan("combined"));
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000" }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", noteRoutes);

// Error Handling Middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Server error" });
  }
);

export default app;
