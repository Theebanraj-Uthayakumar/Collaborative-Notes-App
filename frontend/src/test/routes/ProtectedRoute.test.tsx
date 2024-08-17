import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../routes/ProtectedRoute";
import { isAuthenticated } from "../../service/user.service";

jest.mock("../../service/user.service", () => ({
  isAuthenticated: jest.fn(),
}));

const TestComponent = () => <div>Protected Content</div>;

describe("ProtectedRoute Component", () => {
  it("should render the children if authenticated", () => {
    (isAuthenticated as jest.Mock).mockReturnValue(true);

    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("should redirect to /signin if not authenticated", () => {
    (isAuthenticated as jest.Mock).mockReturnValue(false);

    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TestComponent />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<div>Sign In Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Sign In Page")).toBeInTheDocument();
  });
});
