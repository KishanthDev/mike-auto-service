import React from "react";
import { render, screen } from "@testing-library/react";
import ServicesSection from "./ServicesSection";
import { Service } from "@/types/data";

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
        "data-testid": "service-card",
      },
      children,
    ),
  CardHeader: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) =>
    React.createElement(
      "div",
      {
        className: `mock-card-header ${className}`,
        "data-testid": "card-header",
      },
      children,
    ),
}));

describe("ServicesSection Component", () => {
  const mockServices: Service[] = [
    {
      title: "Oil Change",
      description: "Complete oil and filter replacement",
      price: "$49.99",
    },
    {
      title: "Brake Service",
      description: "Brake inspection and pad replacement",
      price: "$129.99",
    },
  ];

  beforeEach(() => {
    render(React.createElement(ServicesSection, { services: mockServices }));
  });


  it("displays the correct heading", () => {
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Our Services");
    expect(heading).toHaveClass("text-2xl");
    expect(heading).toHaveClass("border-b-2");
    expect(heading).toHaveClass("border-red-600");
    expect(heading).toHaveClass("text-[#2765c3]");
  });

  it("renders all service cards", () => {
    const cards = screen.getAllByTestId("service-card");
    expect(cards).toHaveLength(mockServices.length);
  });

  it("applies correct card styling and hover effects", () => {
    const cards = screen.getAllByTestId("service-card");
    cards.forEach((card) => {
      expect(card).toHaveClass("hover:shadow-lg");
      expect(card).toHaveClass("transition-transform");
      expect(card).toHaveClass("hover:-translate-y-1");
    });
  });

  it("displays correct service information", () => {
    mockServices.forEach((service) => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
      expect(screen.getByText(service.description)).toBeInTheDocument();
      expect(screen.getByText(service.price)).toBeInTheDocument();
    });
  });

  it("applies correct responsive grid layout", () => {
    const grid = screen.getByTestId("services-grid");
    expect(grid).toHaveClass("grid");
    expect(grid).toHaveClass("grid-cols-1");
    expect(grid).toHaveClass("sm:grid-cols-2");
    expect(grid).toHaveClass("gap-4");
  });

  it("applies correct header styling", () => {
    const headers = screen.getAllByTestId("card-header");
    headers.forEach((header) => {
      expect(header).toHaveClass("p-4");
      expect(header).toHaveClass("md:p-6");
      expect(header).toHaveClass("flex");
      expect(header).toHaveClass("flex-col");
    });
  });

  it("applies correct title styling", () => {
    const titles = screen.getAllByRole("heading", { level: 3 });
    titles.forEach((title) => {
      expect(title).toHaveClass("text-lg");
      expect(title).toHaveClass("md:text-xl");
      expect(title).toHaveClass("text-[#2765c3]");
    });
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      React.createElement(ServicesSection, { services: mockServices }),
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
