import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./CategoryPage";
import categoriesData from "../data/detailed_categories_with_subcategories.json";

// Mock the next/link component
jest.mock("next/link", () => {
    const MockedLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
      return React.createElement("a", { href }, children);
    };
    MockedLink.displayName = "MockedLink";
    return MockedLink;
  });
  
jest.mock("@/app/lib/slugify", () => ({
  slugify: jest.fn((str) => str.toLowerCase().replace(/\s+/g, "-")),
}));

jest.mock("./breadcrumb/Breadcrumb", () => {
  return () => React.createElement("div", null, "Mocked Breadcrumb");
});

describe("Home Component", () => {
  it("renders the main layout structure", () => {
    render(React.createElement(Home));

    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass(
      "flex-1",
      "p-6",
      "overflow-y-auto",
      "scrollbar-hide",
    );
  });

  it("displays the breadcrumb component", () => {
    render(React.createElement(Home));
    expect(screen.getByText("Mocked Breadcrumb")).toBeInTheDocument();
  });

  it("renders the search input", () => {
    render(React.createElement(Home));

    const searchInput = screen.getByPlaceholderText(
      "Search categories, businesses, or services...",
    );
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveClass(
      "w-full p-2 border rounded-md shadow-md dark:bg-gray-800 dark:border-gray-600",
    );
  });

  it('displays the "Explore Categories" heading', () => {
    render(React.createElement(Home));

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Explore Categories");
    expect(heading).toHaveClass("text-2xl", "font-semibold", "mb-6");
  });

  it("renders all categories from the data", () => {
    render(React.createElement(Home));

    categoriesData.forEach((category: any) => {
      expect(screen.getByText(category.category)).toBeInTheDocument();
    });
  });

  it("renders up to MAX_VISIBLE_SUBCATS subcategories per category", () => {
    render(React.createElement(Home));

    categoriesData.forEach((category: any) => {
      const visibleSubcats = category.subcategories.slice(0, 4);
      visibleSubcats.forEach((subcat: any) => {
        expect(screen.getByText(subcat.name)).toBeInTheDocument();
      });
    });
  });

  it("applies correct styling to subcategory tags", () => {
    render(React.createElement(Home));

    const firstSubcategory = categoriesData[0].subcategories[0];
    const subcategoryTag = screen.getByText(firstSubcategory.name);

    expect(subcategoryTag).toHaveClass(
      "text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full",
    );
  });

  it("generates correct links for categories", () => {
    render(React.createElement(Home));

    const firstCategory = categoriesData[0];
    const categoryLink = screen.getByText(firstCategory.category).closest("a");

    expect(categoryLink).toHaveAttribute(
      "href",
      `/subcategory/${firstCategory.category.toLowerCase().replace(/\s+/g, "-")}`,
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(React.createElement(Home));
    expect(asFragment()).toMatchSnapshot();
  });
});
