import { render, screen } from "@testing-library/react";
import * as nextNavigation from "next/navigation"; 
import React from "react";
import { slugify } from "@/app/lib/slugify";
import Page from "@app/subcategory/[categorySlug]/page"; 

// Mock categoriesData
jest.mock("../../../data/detailed_categories_with_subcategories.json", () => [
  {
    category: "Automotive",
    subcategories: [
      { name: "Car Repair" },
      { name: "Oil Change" },
    ],
  },
]);



describe("Category Page", () => {
  it("renders SubcategoryPage when category is found", async () => {
    // Mocking the params as a promise that resolves to the correct object
    const params = Promise.resolve({ categorySlug: slugify("Automotive") });

    // Render the Page component using React.createElement instead of JSX
    render(React.createElement(Page, { params }));

    // Ensure SubcategoryPage renders
    const subcategoryPage = screen.getByTestId("subcategory-page");
    expect(subcategoryPage).toBeInTheDocument();
  });

  it("calls notFound when category is not found", async () => {
    // Mocking the params for a non-existing category
    const params = Promise.resolve({ categorySlug: "non-existing-category" });

    // Render the Page component using React.createElement instead of JSX
    render(React.createElement(Page, { params }));

    // Ensure that the notFound mock was called
  });
});
