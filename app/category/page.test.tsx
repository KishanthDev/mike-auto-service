import React from "react";
import { render, screen } from "@testing-library/react";

// Mock layout and components
jest.mock("../subcategory/layout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-layout">{children}</div>
  ),
}));

jest.mock("@/components/CategoryPage", () => ({
  __esModule: true,
  default: () => <div data-testid="categories">Mocked Categories</div>,
}));

import Page from "../category/page"; // Update the path if needed

describe("Category Page", () => {
  it("renders layout and categories", () => {
    render(<Page />);
    expect(screen.getByTestId("sidebar-layout")).toBeInTheDocument();
    expect(screen.getByTestId("categories")).toBeInTheDocument();
    expect(screen.getByText("Mocked Categories")).toBeInTheDocument();
  });
});
