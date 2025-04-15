"use client"
import { useState } from 'react';
import categoriesData from '../data/category and subcategory.json';

interface CategoryType {
  category: string;
  subcategories: string[];
}

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prev => (prev === category ? null : category));
  };

  const filteredSubcategories = selectedCategory
    ? categoriesData.find(cat => cat.category === selectedCategory)?.subcategories || []
    : categoriesData.flatMap(cat =>
        cat.subcategories.map(sub => ({
          sub,
          parent: cat.category,
        }))
      );

  return (
    <div className="flex min-h-screen p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 pr-4 border-r border-gray-300 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="space-y-2">
          {categoriesData.map((category: CategoryType, index: number) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category.category)}
              className={`block text-left w-full px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
                selectedCategory === category.category ? 'bg-blue-500 text-white' : ''
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search categories, businesses, or services..."
              className="w-full p-2 border rounded-md shadow-md dark:bg-gray-800 dark:border-gray-600"
            />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          {selectedCategory ? `Subcategories of ${selectedCategory}` : 'All Subcategories'}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredSubcategories.map((subcat: any, index: number) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-sm"
            >
              <h3 className="text-lg font-bold">
                {selectedCategory ? subcat : subcat.sub}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Browse local {(selectedCategory ? subcat : subcat.sub).toLowerCase()} businesses
              </p>
              {!selectedCategory && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Category: {subcat.parent}
                </span>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
