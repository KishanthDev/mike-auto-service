// GallerySection.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import GallerySection from "./GallerySection";
import { GalleryImage } from "@/types/data";

// Proper mock for next/image
jest.mock("next/image", () => {
  return function MockImage(props: any) {
    return React.createElement("img", {
      src: props.src,
      alt: props.alt,
      className: props.className,
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    });
  };
});

describe("GallerySection Component", () => {
  const mockImages: GalleryImage[] = [
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg",
    "/image4.jpg",
    "/image5.jpg",
    "/image6.jpg",
  ];

  beforeEach(() => {
    render(React.createElement(GallerySection, { images: mockImages }));
  });

  it("displays the correct heading", () => {
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Our Shop Gallery");
  });

  it("renders all provided images", () => {
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(mockImages.length);

    images.forEach((image, index) => {
      expect(image).toHaveAttribute("src", mockImages[index]);
      expect(image).toHaveAttribute("alt", `Gallery ${index + 1}`);
    });
  });

  it("applies correct grid layout classes", () => {
    const grid = screen.getByTestId("gallery-grid");
    expect(grid).toHaveClass("grid");
    expect(grid).toHaveClass("grid-cols-2");
    expect(grid).toHaveClass("sm:grid-cols-4");
  });

  it("applies correct image container styles", () => {
    const containers = screen.getAllByTestId("image-container");
    containers.forEach((container) => {
      expect(container).toHaveClass("aspect-square");
      expect(container).toHaveClass("rounded-lg");
    });
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      React.createElement(GallerySection, { images: mockImages }),
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
