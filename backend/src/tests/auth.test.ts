import { Request, Response } from "express";
import { register, login, refreshToken } from "../controllers/authController";
import User from "../models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../services/jwtService";
import { successMessage, errorMessage } from "../utils/responseHandler";

// Mock the User model, jwtService, and responseHandler
jest.mock("../models/User");
jest.mock("../services/jwtService");
jest.mock("../utils/responseHandler");

const mockUser = {
  _id: "123",
  username: "testuser",
  email: "test@example.com",
  password: "hashedpassword",
  comparePassword: jest.fn(),
};

describe("Auth Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should return 400 if email already exists", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      req.body = {
        username: "testuser",
        email: "test@example.com",
        password: "password",
      };
      await register(req as Request, res as Response);

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(errorMessage).toHaveBeenCalledWith(
        res,
        "User already exists",
        400
      );
    });

    it("should return 400 if username already exists", async () => {
      (User.findOne as jest.Mock)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(mockUser);

      req.body = {
        username: "testuser",
        email: "newemail@example.com",
        password: "password",
      };
      await register(req as Request, res as Response);

      expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
      expect(errorMessage).toHaveBeenCalledWith(
        res,
        "Username already exists",
        400
      );
    });

    // it("should return 200 with user details, access token, and refresh token on success", async () => {
    //   (User.findOne as jest.Mock).mockResolvedValue(null);
    //   (User.prototype.save as jest.Mock).mockResolvedValue(mockUser);
    //   (generateAccessToken as jest.Mock).mockReturnValue("accessToken");
    //   (generateRefreshToken as jest.Mock).mockReturnValue("refreshToken");

    //   req.body = {
    //     username: "newuser",
    //     email: "newemail@example.com",
    //     password: "password",
    //   };
    //   await register(req as Request, res as Response);

    //   expect(successMessage).toHaveBeenCalledWith(
    //     {
    //       user: {
    //         id: mockUser._id,
    //         username: mockUser.username,
    //         email: mockUser.email,
    //       },
    //       accessToken: "accessToken",
    //       refreshToken: "refreshToken",
    //     },
    //     res,
    //     "User registered successfully"
    //   );
    // });

    it("should handle server errors gracefully", async () => {
      (User.findOne as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      req.body = {
        username: "testuser",
        email: "test@example.com",
        password: "password",
      };
      await register(req as Request, res as Response);

      expect(errorMessage).toHaveBeenCalledWith(res, "Server error", 500);
    });
  });

  describe("login", () => {
    it("should return 400 if email does not exist", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      req.body = { email: "nonexistent@example.com", password: "password" };
      await login(req as Request, res as Response);

      expect(errorMessage).toHaveBeenCalledWith(
        res,
        "Invalid credentials",
        400
      );
    });

    it("should return 400 if password is incorrect", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (mockUser.comparePassword as jest.Mock).mockResolvedValue(false);

      req.body = { email: "test@example.com", password: "wrongpassword" };
      await login(req as Request, res as Response);

      expect(errorMessage).toHaveBeenCalledWith(
        res,
        "Invalid credentials",
        400
      );
    });

    it("should return 200 with user details, access token, and refresh token on success", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (mockUser.comparePassword as jest.Mock).mockResolvedValue(true);
      (generateAccessToken as jest.Mock).mockReturnValue("accessToken");
      (generateRefreshToken as jest.Mock).mockReturnValue("refreshToken");

      req.body = { email: "test@example.com", password: "password" };
      await login(req as Request, res as Response);

      expect(successMessage).toHaveBeenCalledWith(
        {
          user: {
            id: mockUser._id,
            username: mockUser.username,
            email: mockUser.email,
          },
          accessToken: "accessToken",
          refreshToken: "refreshToken",
        },
        res
      );
    });

    it("should handle server errors gracefully", async () => {
      (User.findOne as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      req.body = { email: "test@example.com", password: "password" };
      await login(req as Request, res as Response);

      expect(errorMessage).toHaveBeenCalledWith(
        res,
        "Something went wrong while logging in",
        500
      );
    });
  });

  describe("refreshToken", () => {
    it("should return 401 if refresh token is not provided", () => {
      req.body = {};

      refreshToken(req as Request, res as Response);

      expect(errorMessage).toHaveBeenCalledWith(
        res,
        "Refresh token required",
        401
      );
    });

    it("should return 403 if refresh token is invalid", () => {
      (verifyRefreshToken as jest.Mock).mockImplementation(() => {
        throw new Error("Invalid token");
      });

      req.body = { refreshToken: "invalidtoken" };
      refreshToken(req as Request, res as Response);

      expect(errorMessage).toHaveBeenCalledWith(
        res,
        "Invalid refresh token",
        403
      );
    });

    it("should return 200 with new access token on success", () => {
      (verifyRefreshToken as jest.Mock).mockReturnValue(mockUser);
      (generateAccessToken as jest.Mock).mockReturnValue("newAccessToken");

      req.body = { refreshToken: "validtoken" };
      refreshToken(req as Request, res as Response);

      expect(successMessage).toHaveBeenCalledWith(
        { accessToken: "newAccessToken" },
        res
      );
    });
  });
});
