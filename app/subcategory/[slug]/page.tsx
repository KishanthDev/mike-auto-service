import { notFound } from 'next/navigation';
import categoriesData from '../../../data/category and subcategory.json';

const deslugify = (slug: string) =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

interface Props {
  params: {
    slug: string;
  };
}

const CategoryPage = ({ params }: Props) => {
  const readableCategory = deslugify(params.slug);

  const foundCategory = categoriesData.find(
    (cat) => cat.category.toLowerCase() === readableCategory.toLowerCase()
  );

  if (!foundCategory) {
    notFound();
  }

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-black text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Category: {readableCategory}</h1>

      {/* Heading for subcategories */}
      <h2 className="text-xl font-semibold mb-4">
        {readableCategory}
      </h2>

      {/* Subcategory List with Grid and Borders */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foundCategory.subcategories.map((sub, idx) => (
          <li
            key={idx}
            className="border border-gray-300 dark:border-gray-700 p-6 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all"
          >
            <div className="font-bold">{sub}</div>

            {/* Small gray text for 'Browse local {sub} businesses' */}
            <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Browse local {sub} businesses
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
