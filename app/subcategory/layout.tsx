"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import categoriesData from "../../data/detailed_categories_with_subcategories.json";
import { slugify } from "../lib/slugify";

interface Subcategory {
  name: string;
  businesses: any[];
}

interface Category {
  category: string;
  subcategories: Subcategory[];
}

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (categorySlug: string) => {
    setOpenCategory((prev) => (prev === categorySlug ? null : categorySlug));
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <aside className="w-48 md:w-64 h-full sticky top-0 overflow-y-auto border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-black shadow-md no-scrollbar scroll-smooth">
        <div className="sticky top-0 z-10 bg-white dark:bg-black pb-2">
          <h2 className="text-xl px-4 md:text-2xl font-bold tracking-tight">
            Categories
          </h2>
        </div>
        <div className="space-y-1 px-4 pb-4">
          {categoriesData.map((category: Category, index: number) => {
            const categorySlug = slugify(category.category);
            const isActive =
              pathname === `/subcategory/${categorySlug}` ||
              category.subcategories.some((sub) =>
                pathname.includes(`/subcategory/${categorySlug}/${slugify(sub.name)}`)
              );
            const isOpen = openCategory === categorySlug;

            return (
              <div key={index}>
                <div
                  className={`flex items-center justify-between w-full px-3 md:px-4 py-2 rounded-md text-base md:text-base cursor-pointer ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => toggleCategory(categorySlug)}
                >
                  <Link
                    href={`/subcategory/${categorySlug}`}
                    className="flex-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {category.category}
                  </Link>
                  {category.subcategories.length > 0 && (
                    <span className="transition-transform duration-200 ease-in-out">
                      {isOpen ? (
                        <ChevronDownIcon className="w-4 h-4" />
                      ) : (
                        <ChevronRightIcon className="w-4 h-4" />
                      )}
                    </span>
                  )}
                </div>
                {isOpen && category.subcategories.length > 0 && (
                  <ul
                    className="ml-4 mt-1 space-y-1 animate-slideDown"
                    style={{ transformOrigin: "top" }}
                  >
                    {category.subcategories.map((subcategory, subIndex) => {
                      const subcategorySlug = slugify(subcategory.name);
                      const isSubActive = pathname.includes(
                        `/subcategory/${categorySlug}/${subcategorySlug}`
                      );

                      return (
                        <li key={subIndex}>
                          <Link
                            href={`/subcategory/${categorySlug}/${subcategorySlug}`}
                            className={`block px-3 py-1 text-sm rounded-md ${
                              isSubActive
                                ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                                : "hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                          >
                            {subcategory.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto no-scrollbar">{children}</main>
    </div>
  );
}