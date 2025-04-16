import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Category } from "@/types/category";

import categoriesData from "../../../data/detailed_categories_with_subcategories.json";
import { slugify } from "../../lib/slugify";
import SubcategoryPage from "./SubcategoryPage";

export async function generateStaticParams(): Promise<
  { categorySlug: string }[]
> {
  return categoriesData.map((category: Category) => ({
    categorySlug: slugify(category.category),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const foundCategory = categoriesData.find(
    (cat: Category) => slugify(cat.category) === categorySlug,
  );

  return {
    title: foundCategory
      ? `${foundCategory.category} Subcategories`
      : "Category Not Found",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const foundCategory = categoriesData.find(
    (cat: Category) => slugify(cat.category) === categorySlug,
  );

  if (!foundCategory) notFound();

  return <SubcategoryPage category={foundCategory} />;
}
