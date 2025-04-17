import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactSection from "./ContactSection";

// Mock the next/image component
jest.mock("next/image", () => {
    const MockedImage = ({ src, alt, width, height, className }: any) => {
      return React.createElement("img", {
        src,
        alt,
        width,
        height,
        className,
        "data-testid": "mock-image",
      });
    };
    MockedImage.displayName = "MockedNextImage"; // 👈 Fixes the error
    return MockedImage;
  });
  

describe("ContactSection", () => {
  it("renders the section with correct heading", () => {
    render(React.createElement(ContactSection));

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Contact & Location");
    expect(heading).toHaveClass(
      "text-2xl",
      "md:text-3xl",
      "font-bold",
      "border-b-2",
      "border-red-600",
      "pb-2",
      "text-[#1a3c6e]",
      "dark:text-white",
    );
  });

  it("renders the address information correctly", () => {
    render(React.createElement(ContactSection));

    const addressLabel = screen.getByText("Address:");
    expect(addressLabel).toBeInTheDocument();
    expect(addressLabel.tagName).toBe("STRONG");
  });

  it("renders the map image container", () => {
    render(React.createElement(ContactSection));

    const mapContainer = screen.getByTestId("mock-image").parentElement;
    expect(mapContainer).toHaveClass(
      "w-full",
      "h-[200px]",
      "md:h-[250px]",
      "bg-gray-200",
      "dark:bg-gray-700",
      "rounded",
      "mt-3",
      "overflow-hidden",
    );

    const image = screen.getByTestId("mock-image");
    expect(image).toHaveAttribute("src", "/api/placeholder/400/250");
    expect(image).toHaveAttribute("alt", "Map");
    expect(image).toHaveClass("w-full", "h-full", "object-cover");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(React.createElement(ContactSection));
    expect(asFragment()).toMatchSnapshot();
  });
});
