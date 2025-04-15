import categoriesData from '../../data/category and subcategory.json';
import Link from 'next/link';

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      
      {/* Sidebar (scrollable, but no scroll animation) */}
      <aside className="w-64 h-full overflow-y-auto p-4 border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-black shadow-md">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="space-y-2">
          {categoriesData.map((category, index) => (
            <Link
              key={index}
              href={`/subcategory/${slugify(category.category)}`}
              className="block text-left w-full px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {category.category}
            </Link>
          ))}
        </div>
      </aside>

      {/* Main content scrollable (independent) */}
      <main className="flex-1 h-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
