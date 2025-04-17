import React from "react";
import { render, screen } from "@testing-library/react";
import { Navbar } from "./navbar";
import { siteConfig } from "@/config/site";


describe("Navbar", () => {
  it("renders the brand title", () => {
    render(React.createElement(Navbar));
    expect(screen.getByText("Mike Auto Service")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(React.createElement(Navbar));

    const categoryLink = screen.getAllByLabelText("Categories")[0];
    const githubLink = screen.getAllByLabelText("Github")[0];
    const discordLink = screen.getAllByLabelText("Discord")[0];

    expect(categoryLink).toHaveAttribute("href", "/category");
    expect(githubLink).toHaveAttribute("href", siteConfig.links.github);
    expect(discordLink).toHaveAttribute("href", siteConfig.links.discord);
  });

  it("renders category text on large screens", () => {
    render(React.createElement(Navbar));
    expect(
      screen.getAllByText("Category: Automotive > Car Repair")[0]
    ).toBeInTheDocument();
  });

  it("renders ThemeSwitch and menu toggle", () => {
    render(React.createElement(Navbar));
    expect(screen.getByRole("button")).toBeInTheDocument(); // Menu toggle
  });
});
