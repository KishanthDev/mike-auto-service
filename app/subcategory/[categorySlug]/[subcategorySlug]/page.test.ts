// tests/lib/categoryHelpers.test.ts
import { slugify } from "@/app/lib/slugify";
import categoriesData from "@/data/detailed_categories_with_subcategories.json";
import { Category, Subcategory } from "@/types/category";

export function getStaticParams() {
  const params: { categorySlug: string; subcategorySlug: string }[] = [];

  categoriesData.forEach((category: Category) => {
    category.subcategories.forEach((subcategory: Subcategory) => {
      params.push({
        categorySlug: slugify(category.category),
        subcategorySlug: slugify(subcategory.name),
      });
    });
  });

  return params;
}

export function getCategoryAndSubcategory(
  categorySlug: string,
  subcategorySlug: string,
) {
  const category = categoriesData.find(
    (cat: Category) => slugify(cat.category) === categorySlug,
  );

  const subcategory = category?.subcategories.find(
    (sub: Subcategory) => slugify(sub.name) === subcategorySlug,
  );

  return { category, subcategory };
}

describe("categoryHelpers", () => {
  test("generate correct static params", () => {
    const params = getStaticParams();
    expect(params.length).toBeGreaterThan(0);

    // Check that slugs are correct
    const first = params[0];
    const category = categoriesData[0];
    const sub = category.subcategories[0];
    expect(first.categorySlug).toBe(slugify(category.category));
    expect(first.subcategorySlug).toBe(slugify(sub.name));
  });

  test("find category and subcategory by slug", () => {
    const category = categoriesData[0];
    const sub = category.subcategories[0];

    const result = getCategoryAndSubcategory(
      slugify(category.category),
      slugify(sub.name),
    );

    expect(result.category).toBeDefined();
    expect(result.subcategory).toBeDefined();
    expect(result.category?.category).toBe(category.category);
    expect(result.subcategory?.name).toBe(sub.name);
  });

  test("return undefined for invalid slugs", () => {
    const result = getCategoryAndSubcategory("invalid", "slug");
    expect(result.category).toBeUndefined();
    expect(result.subcategory).toBeUndefined();
  });
});
