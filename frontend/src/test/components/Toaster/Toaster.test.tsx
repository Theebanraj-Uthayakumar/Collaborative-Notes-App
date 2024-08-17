import React from "react";
import { render } from "@testing-library/react";
import Toaster from "../../../components/Toaster";

describe("Toaster Component", () => {
  it("should render the ToastContainer", () => {
    const { container } = render(<Toaster />);
    expect(container.querySelector(".Toastify")).toBeInTheDocument();
  });
});
