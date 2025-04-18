import { render, screen, fireEvent } from "@testing-library/react";
import SubcategoryPage from "./SubcategoryPage";
import { slugify } from "../../lib/slugify";

// Mock dependencies
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock("lucide-react", () => ({
  GridIcon: ({ className, onClick }: { className: string; onClick: () => void }) => (
    <span data-testid="grid-icon" className={className} onClick={onClick}>
      Grid
    </span>
  ),
  ListIcon: ({ className, onClick }: { className: string; onClick: () => void }) => (
    <span data-testid="list-icon" className={className} onClick={onClick}>
      List
    </span>
  ),
}));

jest.mock("../../lib/slugify", () => ({
  slugify: jest.fn((str: string) => str.toLowerCase().replace(/\s+/g, "-")),
}));

// Mock Breadcrumb component
jest.mock("../../../components/breadcrumb/Breadcrumb", () => {
  return function Breadcrumb({ category }: { category: any }) {
    return <div data-testid="breadcrumb">{category.category}</div>;
  };
});

describe("SubcategoryPage", () => {
  const mockCategory = {
    category: "Electronics",
    subcategories: [
      { name: "Phones", businesses: [] },
      { name: "Laptops", businesses: [] },
    ],
  };

  const specialCategory = {
    category: "Electronics & Gadgets",
    subcategories: [
      { name: "Smart Watches & Bands", businesses: [] },
    ],
  };

  const emptyCategory = {
    category: "Empty Category",
    subcategories: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders subcategories with correct links", () => {
    render(<SubcategoryPage category={mockCategory} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/subcategory/electronics/phones");
    expect(links[0]).toHaveTextContent("Phones");
    expect(links[1]).toHaveAttribute("href", "/subcategory/electronics/laptops");
    expect(links[1]).toHaveTextContent("Laptops");
    expect(slugify).toHaveBeenCalledWith("Electronics");
    expect(slugify).toHaveBeenCalledWith("Phones");
    expect(slugify).toHaveBeenCalledWith("Laptops");
  });

  it("renders subcategories in grid view by default", () => {
    render(<SubcategoryPage category={mockCategory} />);
    const ul = screen.getByRole("list");
    expect(ul).toHaveClass("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3");
    expect(screen.getByTestId("grid-icon")).toHaveClass("text-blue-500");
    expect(screen.getByTestId("list-icon")).toHaveClass("text-gray-500");
  });

  it("toggles to list view when ListIcon is clicked", () => {
    render(<SubcategoryPage category={mockCategory} />);
    fireEvent.click(screen.getByTestId("list-icon"));
    const ul = screen.getByRole("list");
    expect(ul).toHaveClass("flex flex-col");
    expect(screen.getByTestId("grid-icon")).toHaveClass("text-gray-500");
    expect(screen.getByTestId("list-icon")).toHaveClass("text-blue-500");
  });

  it("toggles back to grid view when GridIcon is clicked", () => {
    render(<SubcategoryPage category={mockCategory} />);
    fireEvent.click(screen.getByTestId("list-icon"));
    fireEvent.click(screen.getByTestId("grid-icon"));
    const ul = screen.getByRole("list");
    expect(ul).toHaveClass("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3");
    expect(screen.getByTestId("grid-icon")).toHaveClass("text-blue-500");
    expect(screen.getByTestId("list-icon")).toHaveClass("text-gray-500");
  });

  it("handles special characters in category and subcategory names", () => {
    render(<SubcategoryPage category={specialCategory} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      "/subcategory/electronics-&-gadgets/smart-watches-&-bands"
    );
    expect(link).toHaveTextContent("Smart Watches & Bands");
    expect(slugify).toHaveBeenCalledWith("Electronics & Gadgets");
    expect(slugify).toHaveBeenCalledWith("Smart Watches & Bands");
  });

  it("applies correct dark mode classes", () => {
    render(<SubcategoryPage category={mockCategory} />);
    const container = screen.getByRole("list").parentElement;
    expect(container).toHaveClass("dark:bg-black dark:text-white");
    const subcategoryItem = screen.getAllByRole("listitem")[0];
    expect(subcategoryItem).toHaveClass("dark:border-gray-700 dark:bg-gray-800");
    const description = screen.getByText("Browse local Phones businesses");
    expect(description).toHaveClass("dark:text-gray-400");
  });
});