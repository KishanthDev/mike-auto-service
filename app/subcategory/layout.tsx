"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

import categoriesData from "../../data/category and subcategory.json";

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
};

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop() || "";

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <aside className="w-48 md:w-64 h-full sticky top-0 overflow-y-auto p-4 border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-black shadow-md no-scrollbar">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Categories</h2>
        <div className="space-y-2">
          {categoriesData.map((category, index) => {
            const categorySlug = slugify(category.category);
            const isActive = currentSlug === categorySlug;

            return (
              <Link
                key={index}
                className={`block text-left w-full px-3 md:px-4 py-2 rounded-md text-sm md:text-base ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                href={`/subcategory/${categorySlug}`}
              >
                {category.category}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Scrollable Main Content with hidden scrollbar */}
      <main className="flex-1 overflow-y-auto no-scrollbar">{children}</main>
    </div>
  );
}