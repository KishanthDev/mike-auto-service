"use client";

import { useState } from "react";
import { Filter } from "lucide-react";

const filterOptions = [
  "Open Now",
  "Top Rated",
  "Within 2 miles",
  "Free Estimates",
  "Price: $$$",
];

export const FiltersBar = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mb-6">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-200">
          <Filter className="w-4 h-4" />
          Filters:
        </div>
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => toggleFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${
                activeFilters.includes(filter)
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};
