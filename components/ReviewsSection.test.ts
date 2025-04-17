import React from "react";
import { render, screen } from "@testing-library/react";
import ReviewsSection from "./ReviewsSection";
import { Review } from "@/types/data";

// Mock the Card components using React.createElement
jest.mock("@heroui/card", () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) =>
    React.createElement(
      "div",
      {
        className: `mock-card ${className}`,
        "data-testid": "card",
      },
      children,
    ),
  CardBody: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) =>
    React.createElement(
      "div",
      {
        className: `mock-card-body ${className}`,
        "data-testid": "card-body",
      },
      children,
    ),
}));

describe("ReviewsSection Component", () => {
  const mockReviews: Review[] = [
    {
      author: "John Doe",
      rating: 5,
      content: "Excellent service!",
    },
    {
      author: "Jane Smith",
      rating: 4,
      content: "Very professional team",
    },
  ];

  beforeEach(() => {
    render(React.createElement(ReviewsSection, { reviews: mockReviews }));
  });

  it("displays the correct heading", () => {
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Customer Reviews");
    expect(heading).toHaveClass("text-2xl");
    expect(heading).toHaveClass("border-b-2");
    expect(heading).toHaveClass("border-red-600");
  });

  it("renders all review cards", () => {
    const cards = screen.getAllByTestId("card");
    expect(cards).toHaveLength(mockReviews.length);
  });

  it("applies correct card styling", () => {
    const cards = screen.getAllByTestId("card");
    cards.forEach((card) => {
      expect(card).toHaveClass("bg-white");
      expect(card).toHaveClass("dark:bg-gray-800");
      expect(card).toHaveClass("border");
    });
  });

  it("displays correct review content", () => {
    mockReviews.forEach((review) => {
      expect(screen.getByText(review.author)).toBeInTheDocument();
      expect(screen.getByText(review.content)).toBeInTheDocument();
    });
  });

  it("displays correct star ratings", () => {
    const fiveStars = screen.getAllByText("★★★★★");
    const fourStars = screen.getAllByText("★★★★");

    expect(fiveStars.length).toBe(1);
    expect(fourStars.length).toBe(1);
    expect(fiveStars[0]).toHaveClass("text-yellow-400");
    expect(fourStars[0]).toHaveClass("text-yellow-400");
  });

  it("applies correct responsive classes", () => {
    const cardBodies = screen.getAllByTestId("card-body");
    cardBodies.forEach((body) => {
      expect(body).toHaveClass("p-4");
      expect(body).toHaveClass("md:p-6");
      expect(body).toHaveClass("text-sm");
      expect(body).toHaveClass("md:text-base");
    });
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      React.createElement(ReviewsSection, { reviews: mockReviews }),
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
