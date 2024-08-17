import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import { login as loginApi } from "../../service/user.service";

jest.mock("../../service/user.service", () => ({
  login: jest.fn(),
  register: jest.fn(),
  logout: jest.fn(),
  isAuthenticated: jest.fn(),
}));

describe("AuthContext - Login", () => {
  const TestComponent = () => {
    const { login, userDetails } = useAuth();

    return (
      <div>
        <button onClick={() => login("test@example.com", "password123")}>
          Login
        </button>
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

    expect(loginApi).toHaveBeenCalledWith("test@example.com", "password123");
  });
});
