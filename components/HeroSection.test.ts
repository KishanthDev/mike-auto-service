import React from "react";
import { render, screen } from "@testing-library/react";
import HeroSection from "./HeroSection";

// Mock the Button component using React.createElement
jest.mock("@heroui/button", () => ({
  Button: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => React.createElement("button", { className }, children),
}));

describe("HeroSection Component", () => {
  beforeEach(() => {
    render(React.createElement(HeroSection));
  });

  it("displays the correct heading", () => {
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Mike's Auto Service");
    expect(heading).toHaveClass("text-3xl");
  });

  it("displays the correct description text", () => {
    const description = screen.getByText(
      /Full-service auto repair shop specializing in domestic and foreign vehicles since 1985/i,
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass("text-base");
  });

  it("displays the correct rating information", () => {
    const stars = screen.getByText("★★★★★");
    const ratingText = screen.getByText(/4.8\/5 based on 127 reviews/i);

    expect(stars).toBeInTheDocument();
    expect(stars).toHaveClass("text-yellow-400");
    expect(ratingText).toBeInTheDocument();
  });

  describe("Buttons", () => {
    it("renders both buttons", () => {
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2);
    });

    it("has a Schedule Service button with correct styling", () => {
      const scheduleButton = screen.getByText("Schedule Service");
      expect(scheduleButton).toBeInTheDocument();
      expect(scheduleButton).toHaveClass("bg-red-600");
    });

    it("has a Request Quote button with correct styling", () => {
      const quoteButton = screen.getByText("Request Quote");
      expect(quoteButton).toBeInTheDocument();
      expect(quoteButton).toHaveClass("bg-white");
    });
  });

  it("has correct overlay styling", () => {
    const overlay = screen.getByTestId("hero-overlay");
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass("bg-black");
    expect(overlay).toHaveClass("bg-opacity-50");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(React.createElement(HeroSection));
    expect(asFragment()).toMatchSnapshot();
  });
});
