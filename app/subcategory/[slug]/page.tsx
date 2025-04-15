import { notFound } from "next/navigation";
import { Metadata } from "next";
import categoriesData from "../../../data/category and subcategory.json";
import SubcategoryPage from "./SubcategoryPage";

const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return categoriesData.map((category) => ({
    slug: createSlug(category.category),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const foundCategory = categoriesData.find(
    (cat) => createSlug(cat.category) === slug
  );

  return {
    title: foundCategory
      ? `${foundCategory.category} Subcategories`
      : "Category Not Found",
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const foundCategory = categoriesData.find(
    (cat) => createSlug(cat.category) === params.slug
  );

  if (!foundCategory) notFound();

  return <SubcategoryPage category={foundCategory} />;
}
