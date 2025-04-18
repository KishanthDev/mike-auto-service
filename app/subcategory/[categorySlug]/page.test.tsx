import React from "react";
import { render } from "@testing-library/react";
import { notFound } from "next/navigation";

import categoriesData from "data/detailed_categories_with_subcategories.json";
import { slugify } from "@/app/lib/slugify";
import {
  generateStaticParams,
  generateMetadata,
  default as Page,
} from "./page";

// Mock the slugify utility
jest.mock("@/app/lib/slugify", () => ({
  slugify: jest.fn((str: string) => str.toLowerCase().replace(/\s+/g, "-")),
}));

// Mock notFound from next/navigation
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

describe("Category Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should generate correct static params", async () => {
    const result = await generateStaticParams();
    const expected = categoriesData.map((cat) => ({
      categorySlug: slugify(cat.category),
    }));
    expect(result).toEqual(expected);
  });

  it("should generate metadata for found category", async () => {
    const category = categoriesData[0];
    const slug = slugify(category.category);

    const metadata = await generateMetadata({
      params: Promise.resolve({ categorySlug: slug }),
    });

    expect(metadata).toEqual({
      title: `${category.category} Subcategories`,
    });
  });

  it("should generate metadata for non-existent category", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ categorySlug: "non-existent" }),
    });

    expect(metadata).toEqual({
      title: "Category Not Found",
    });
  });

  it("should call notFound if category is not found", async () => {
    await Page({
      params: Promise.resolve({ categorySlug: "non-existent" }),
    });

    expect(notFound).toHaveBeenCalled();
  });

  it("should render SubcategoryPage if category is found", async () => {
    const category = categoriesData[0];
    const slug = slugify(category.category);

    const Component = await Page({
      params: Promise.resolve({ categorySlug: slug }),
    });

    const { getByText } = render(Component);
    expect(getByText(category.category)).toBeInTheDocument();
  });
});
