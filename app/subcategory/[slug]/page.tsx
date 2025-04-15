import { notFound } from "next/navigation";

import categoriesData from "../../../data/category and subcategory.json";

const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
};

export async function generateStaticParams() {
  return categoriesData.map((category) => ({
    slug: createSlug(category.category),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const foundCategory = categoriesData.find(
    (cat) => createSlug(cat.category) === params.slug,
  );

  return {
    title: foundCategory
      ? `${foundCategory.category} Subcategories`
      : "Category Not Found",
  };
}

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const foundCategory = categoriesData.find(
    (cat) => createSlug(cat.category) === params.slug,
  );

  if (!foundCategory) {
    notFound();
  }

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-black text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">
        Category: {foundCategory.category}
      </h1>
      <h2 className="text-xl font-semibold mb-4">{foundCategory.category}</h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foundCategory.subcategories.map((sub, idx) => (
          <li
            key={idx}
            className="border border-gray-300 dark:border-gray-700 p-6 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all"
          >
            <div className="font-bold">{sub}</div>
            <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Browse local {sub} businesses
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
