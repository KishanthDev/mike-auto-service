"use client";

import { useState } from "react";
import { GridIcon, ListIcon } from "lucide-react";

interface SubcategoryPageProps {
  category: {
    category: string;
    subcategories: string[];
  };
}

export default function SubcategoryPage({ category }: SubcategoryPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="p-6 bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Category: {category.category}
        </h1>
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
