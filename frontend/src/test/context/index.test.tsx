import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
} from "../../service/user.service";
import { getUserDetails } from "../../shared/utils/helpers";

jest.mock("../../service/user.service", () => ({
  login: jest.fn(),
  register: jest.fn(),
  logout: jest.fn(),
  isAuthenticated: jest.fn(),
}));

jest.mock("../../shared/utils/helpers", () => ({
  getUserDetails: jest.fn(),
}));

describe("AuthContext", () => {
  const TestComponent = () => {
    const { login, register, logout, userDetails } = useAuth();

    return (
      <div>
        <button onClick={() => login("test@example.com", "password123")}>
          Login
        </button>
        <button
          onClick={() =>
            register("username", "password123", "test@example.com")
          }
        >
          Register
        </button>
        <button onClick={logout}>Logout</button>
        <div data-testid="userDetails">{userDetails?.email}</div>
      </div>
    );
  };

  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<AuthProvider>{ui}</AuthProvider>);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with null userDetails", () => {
    renderWithProvider(<TestComponent />);
    expect(screen.queryByTestId("userDetails")).toBeEmptyDOMElement();
  });

  it("should login and set userDetails", async () => {
    (loginApi as jest.Mock).mockResolvedValueOnce({
      id: 1,
      username: "testuser",
      email: "test@example.com",
    });

    renderWithProvider(<TestComponent />);

    screen.getByText("Login").click();

    await waitFor(() =>
      expect(screen.getByTestId("userDetails").textContent).toBe(
        "test@example.com"
      )
    );
  });

  it("should register and set userDetails", async () => {
    (registerApi as jest.Mock).mockResolvedValueOnce({
      id: 1,
      username: "testuser",
      email: "test@example.com",
    });

    renderWithProvider(<TestComponent />);

    screen.getByText("Register").click();

    await waitFor(() =>
      expect(screen.getByTestId("userDetails").textContent).toBe(
        "test@example.com"
      )
    );
  });

  it("should logout and clear userDetails", async () => {
    (getUserDetails as jest.Mock).mockReturnValue({
      id: 1,
      username: "testuser",
      email: "test@example.com",
    });

    renderWithProvider(<TestComponent />);

    screen.getByText("Logout").click();

    await waitFor(() =>
      expect(screen.queryByTestId("userDetails")).toBeEmptyDOMElement()
    );
    expect(logoutApi).toHaveBeenCalled();
  });

  it("should get user details from local storage on mount", () => {
    (getUserDetails as jest.Mock).mockReturnValue({
      id: 1,
      username: "testuser",
      email: "test@example.com",
    });

    renderWithProvider(<TestComponent />);

    expect(screen.getByTestId("userDetails").textContent).toBe(
      "test@example.com"
    );
  });
});
