import { notFound } from "next/navigation";
import { Metadata } from "next";
import categoriesData from "../../../../data/detailed_categories_with_subcategories.json";
import { slugify } from "@/app/lib/slugify";
import { Category,Subcategory } from "@/types/category";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";

export async function generateStaticParams() {
  const params: { categorySlug: string; subcategorySlug: string }[] = [];

  categoriesData.forEach((category: Category) => {
    category.subcategories.forEach((subcategory) => {
      const param = {
        categorySlug: slugify(category.category),
        subcategorySlug: slugify(subcategory.name),
      };
      params.push(param);
    });
  });

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string; subcategorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug, subcategorySlug } = await params;
  const category = categoriesData.find(
    (cat: Category) => slugify(cat.category) === categorySlug
  );
  const subcategory = category?.subcategories.find(
    (sub: Subcategory) => slugify(sub.name) === subcategorySlug
  );

  return {
    title: subcategory
      ? `${subcategory.name} Businesses - ${category!.category}`
      : "Businesses Not Found",
  };
}

export default async function SubcategoryBusinessesPage({
  params,
}: {
  params: Promise<{ categorySlug: string; subcategorySlug: string }>;
}) {
  const { categorySlug, subcategorySlug } = await params;

  const category = categoriesData.find(
    (cat: Category) => slugify(cat.category) === categorySlug
  );
  const subcategory = category?.subcategories.find(
    (sub: Subcategory) => slugify(sub.name) === subcategorySlug
  );

  if (!category || !subcategory) {
    notFound();
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-black min-h-screen">
      <Breadcrumb category={category} subcategory={subcategory} />
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {subcategory.name} Businesses in {category.category}
      </h1>
      {subcategory.businesses.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No businesses found for this subcategory.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subcategory.businesses.map((business) => (
            <div
              key={business.id}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {business.businessName}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {business.description}
              </p>
              <div className="mt-3 flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1 text-gray-700 dark:text-gray-200">
                  {business.ratings.toFixed(1)}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Phone:</span>{" "}
                  <a
                    href={`tel:${business.contact.phone}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {business.contact.phone}
                  </a>
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Website:</span>{" "}
                  <a
                    href={business.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Visit Website
                  </a>
                </p>
              </div>
              <div className="mt-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Highlights:
                </h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {business.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <a
                  href={business.cta.bookUrl}
                  className="inline-block bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}