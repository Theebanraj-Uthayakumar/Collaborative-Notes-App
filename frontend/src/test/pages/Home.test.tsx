import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "../../pages/HomePage";

jest.mock("../../components/Navbar/index", () => () => <div>Navbar Mock</div>);
jest.mock("../../components/AddNotes", () => ({
  __esModule: true,
  default: ({ showAddForm }: { showAddForm: boolean }) =>
    showAddForm ? <div>AddNote Mock</div> : null,
}));
jest.mock("../../components/ListNotes", () => () => <div>ListNotes Mock</div>);

describe("HomePage", () => {
  it("renders without crashing", () => {
    render(<HomePage />);
    expect(screen.getByText("Notes")).toBeInTheDocument();
    expect(screen.getByText("Navbar Mock")).toBeInTheDocument();
    expect(screen.getByText("ListNotes Mock")).toBeInTheDocument();
    expect(screen.getByText("Add New")).toBeInTheDocument();
  });

  it("toggles the AddNote form", () => {
    render(<HomePage />);

    expect(screen.queryByText("AddNote Mock")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Add New"));
    expect(screen.getByText("Close Form")).toBeInTheDocument();
    expect(screen.getByText("AddNote Mock")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close Form"));
    expect(screen.getByText("Add New")).toBeInTheDocument();
    expect(screen.queryByText("AddNote Mock")).not.toBeInTheDocument();
  });
});
