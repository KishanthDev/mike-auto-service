import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorComponent from "./error";

global.console.error = jest.fn();

describe("ErrorComponent", () => {
  it("renders error message and 'Try again' button", () => {
    const mockReset = jest.fn();

    render(<ErrorComponent error={new Error("Test error")} reset={mockReset} />);

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();

    expect(screen.getByText("Try again")).toBeInTheDocument();
  });

  it("logs the error to the console", () => {
    const mockReset = jest.fn();

    render(<ErrorComponent error={new Error("Test error")} reset={mockReset} />);

    expect(console.error).toHaveBeenCalledWith(new Error("Test error"));
  });

  it("calls reset function when 'Try again' button is clicked", () => {
    const mockReset = jest.fn();

    render(<ErrorComponent error={new Error("Test error")} reset={mockReset} />);

    fireEvent.click(screen.getByText("Try again"));

    expect(mockReset).toHaveBeenCalled();
  });
});
