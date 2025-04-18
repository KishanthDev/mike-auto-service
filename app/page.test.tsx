import { render, screen } from "@testing-library/react";
import Home from "./page"; // Adjust path as necessary

// Mock components that are imported into the Home component
jest.mock("../components/HeroSection", () => ({
  HeroSection: jest.fn(() => <div>HeroSection</div>),
}));
jest.mock("../components/ServicesSection", () => ({
  ServicesSection: jest.fn(({ services }) => (
    <div>{services.length} ServicesSection</div>
  )),
}));
jest.mock("../components/CertificationsSection", () => ({
  CertificationsSection: jest.fn(({ certifications }) => (
    <div>{certifications.length} CertificationsSection</div>
  )),
}));
jest.mock("../components/ReviewsSection", () => ({
  ReviewsSection: jest.fn(({ reviews }) => (
    <div>{reviews.length} ReviewsSection</div>
  )),
}));
jest.mock("../components/GallerySection", () => ({
  GallerySection: jest.fn(({ images }) => (
    <div>{images.length} GallerySection</div>
  )),
}));
jest.mock("../components/ContactSection", () => ({
  ContactSection: jest.fn(() => <div>ContactSection</div>),
}));
jest.mock("../components/BusinessHoursSection", () => ({
  BusinessHoursSection: jest.fn(({ businessHours }) => (
    <div>{businessHours.length} BusinessHoursSection</div>
  )),
}));
jest.mock("../components/AdditionalInfoSection", () => ({
  AdditionalInfoSection: jest.fn(() => <div>AdditionalInfoSection</div>),
}));
jest.mock("../components/Footer", () => ({
  Footer: jest.fn(() => <div>Footer</div>),
}));

describe("Home", () => {
  const mockData = {
    businessHours: ["9 AM - 5 PM", "Closed on weekends"],
    certifications: ["ISO 9001", "CE Marking"],
    images: ["image1.jpg", "image2.jpg"],
    reviews: ["Excellent", "Very Good"],
    services: ["Web Development", "App Development"],
  };

  it("renders all sections correctly", () => {
    render(<Home />);

    // Check if HeroSection is rendered
    expect(screen.getByText("HeroSection")).toBeInTheDocument();

    // Check if ServicesSection is rendered and receives the correct data
    expect(screen.getByText("2 ServicesSection")).toBeInTheDocument();

    // Check if CertificationsSection is rendered and receives the correct data
    expect(screen.getByText("2 CertificationsSection")).toBeInTheDocument();

    // Check if ReviewsSection is rendered and receives the correct data
    expect(screen.getByText("2 ReviewsSection")).toBeInTheDocument();

    // Check if GallerySection is rendered and receives the correct data
    expect(screen.getByText("2 GallerySection")).toBeInTheDocument();

    // Check if ContactSection is rendered
    expect(screen.getByText("ContactSection")).toBeInTheDocument();

    // Check if BusinessHoursSection is rendered and receives the correct data
    expect(screen.getByText("2 BusinessHoursSection")).toBeInTheDocument();

    // Check if AdditionalInfoSection is rendered
    expect(screen.getByText("AdditionalInfoSection")).toBeInTheDocument();

    // Check if Footer is rendered
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
