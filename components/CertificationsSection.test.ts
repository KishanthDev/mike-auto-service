import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CertificationsSection from "./CertificationsSection";
import type { Certification } from "@/types/data";

describe("CertificationsSection", () => {
  const mockCertifications: Certification[] = [
    "ASE Certified",
    "Ford Master Tech",
    "Toyota Specialist",
    "Hyundai Certified",
    "GM World Class",
  ];

  it("renders the section with correct heading", () => {
    render(
      React.createElement(CertificationsSection, {
        certifications: mockCertifications,
      }),
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Certifications & Expertise");
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

  it("renders the description text", () => {
    render(
      React.createElement(CertificationsSection, {
        certifications: mockCertifications,
      }),
    );

    const description = screen.getByText(
      /Our technicians are specially trained and certified to work on all major vehicle makes and models/i,
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass(
      "text-sm",
      "md:text-base",
      "text-gray-700",
      "dark:text-gray-300",
      "mt-2",
    );
  });

  it("handles empty certifications array", () => {
    render(React.createElement(CertificationsSection, { certifications: [] }));

    // Heading and description should still render
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(
      screen.getByText(/Our technicians are specially trained/i),
    ).toBeInTheDocument();

    // No badges should be rendered
    expect(screen.queryAllByTestId("certification-badge")).toHaveLength(0);
  });

  it("matches snapshot with certifications", () => {
    const { asFragment } = render(
      React.createElement(CertificationsSection, {
        certifications: mockCertifications,
      }),
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with empty certifications", () => {
    const { asFragment } = render(
      React.createElement(CertificationsSection, { certifications: [] }),
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
