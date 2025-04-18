import { notFound } from "next/navigation";
import { Metadata } from "next";
import categoriesData from "../../../../data/detailed_categories_with_subcategories.json";
import { slugify } from "@/app/lib/slugify";
import { Category, Subcategory } from "@/types/category";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { FiltersBar } from "@/components/filter/FiltersBar";
import { Share2, Heart, Phone, Globe, MapPin } from "lucide-react";
import StarRating from "@/components/icons/StarRating";

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
  params: { categorySlug: string; subcategorySlug: string };
}): Promise<Metadata> {
  const { categorySlug, subcategorySlug } = params; // No need to await
  const category = categoriesData.find(
    (cat: Category) => slugify(cat.category) === categorySlug,
  );
  const subcategory = category?.subcategories.find(
    (sub: Subcategory) => slugify(sub.name) === subcategorySlug,
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
  params: { categorySlug: string; subcategorySlug: string };
}) {
  const { categorySlug, subcategorySlug } = params;

  const category = categoriesData.find(
    (cat: Category) => slugify(cat.category) === categorySlug,
  );
  const subcategory = category?.subcategories.find(
    (sub: Subcategory) => slugify(sub.name) === subcategorySlug,
  );

  if (!category || !subcategory) {
    notFound();
  }

  return (
    <div className="p-5 bg-gray-100 dark:bg-black">
      <Breadcrumb category={category} subcategory={subcategory} />
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {subcategory.name} Businesses in {category.category}
      </h1>
      <FiltersBar />
      {subcategory.businesses.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No businesses found for this subcategory.
        </p>
      ) : (
        <div className="space-y-6">
          {subcategory.businesses.map((business) => (
            <div
              key={business.id}
              className="relative flex flex-col sm:flex-row bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Top-right floating buttons */}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <button
                  aria-label="Share"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  aria-label="Like"
                  className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Left: Image */}
              <div className="sm:w-1/3 w-full h-56 sm:h-auto relative">
                <img
                  src={business.gallery[0]}
                  alt={business.businessName}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Right: Details */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {business.businessName}
                  </h2>
                  <div className="flex items-center gap-2">
                    <StarRating rating={business.ratings} />
                    <span className="text-gray-800 dark:text-gray-300 text-sm">
                      ({business.reviews.length})
                    </span>
                  </div>
                  <p className="mt-3 text-gray-700 dark:text-gray-300">
                    {business.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {business.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 text-sm px-2 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-end mt-6 flex-wrap gap-4">
                  {/* CTA + Icons with Lucide */}
                  <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
                    <a
                      href={`tel:${business.contact.phone}`}
                      aria-label="Call"
                      className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {business.contact.phone}
                    </a>

                    <a
                      href={business.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Website"
                      className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      {business.contact.website}
                    </a>

                    <a
                      href={business.cta.getDirections}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Directions"
                      className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
