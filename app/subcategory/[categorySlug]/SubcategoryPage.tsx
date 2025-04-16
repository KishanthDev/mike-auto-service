"use client";

import { useState } from "react";
import Link from "next/link";
import { GridIcon, ListIcon } from "lucide-react";

import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import { slugify } from "../../lib/slugify";
import { Category } from "@/types/category";

interface SubcategoryPageProps {
  category: Category;
}

export default function SubcategoryPage({ category }: SubcategoryPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const categorySlug = slugify(category.category);

  return (
    <div className="bg-white p-6 text-gray-900 dark:bg-black dark:text-white">
      <Breadcrumb category={category} />

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">{category.category}</h1>

        <div className="flex gap-2">
          <GridIcon
            className={`cursor-pointer ${
              viewMode === "grid" ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setViewMode("grid")}
          />
          <ListIcon
            className={`cursor-pointer ${
              viewMode === "list" ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setViewMode("list")}
          />
        </div>
      </div>

      <h2 className="mb-4 font-medium">Subcategories</h2>

      <ul
        className={`gap-6 ${
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            : "flex flex-col"
        }`}
      >
        {category.subcategories.map((sub, idx) => (
          <li
            key={idx}
            className="rounded-lg border border-gray-300 bg-gray-50 p-6 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <Link
              className="block"
              href={`/subcategory/${categorySlug}/${slugify(sub.name)}`}
            >
              <div className="font-bold">{sub.name}</div>
              <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                Browse local {sub.name} businesses
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
