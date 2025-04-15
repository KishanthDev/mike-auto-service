// pages/index.tsx

import Link from 'next/link';
import categoriesData from '../data/category and subcategory.json';

interface CategoryType {
  category: string;
  subcategories: string[];
}

const MAX_VISIBLE_SUBCATS = 4;

// Helper to slugify category names for clean URLs
const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const Home = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
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

        <h2 className="text-2xl font-semibold mb-6">Explore Categories</h2>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categoriesData.map((category: CategoryType, index: number) => {
            const visibleSubcats = category.subcategories.slice(0, MAX_VISIBLE_SUBCATS);
            const remainingCount = category.subcategories.length - visibleSubcats.length;

            return (
              <Link
                key={index}
                href={`/subcategory/${slugify(category.category)}`}
                className="block bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 rounded-md hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold mb-2">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {visibleSubcats.map((subcat, subIndex) => (
                    <span
                      key={subIndex}
                      className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full"
                    >
                      {subcat}
                    </span>
                  ))}
                  {remainingCount > 0 && (
                    <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                      +{remainingCount}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;
