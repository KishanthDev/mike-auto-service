"use client"
import Link from "next/link";
import { Category, Subcategory } from "@/types/category";
import { slugify } from "@/app/lib/slugify";
import { usePathname } from "next/navigation";
import { LayoutList } from "lucide-react";

interface BreadcrumbProps {
    category?: Category;
    subcategory?: Subcategory;
}

export default function Breadcrumb({ category, subcategory }: BreadcrumbProps) {
    const pathname = usePathname()
    if (!category) {
        return (
            <nav aria-label="Breadcrumb" className="flex items-center text-sm mb-6">
                <Link
                    href="/"
                    className="hover:underline text-blue-600 dark:text-blue-400"
                >
                    🏡 Home
                </Link>
                <span className="mx-2 text-gray-400">›</span>
                <span
                    className="flex items-center gap-2 text-gray-900 dark:text-white"
                    aria-current="page"
                >
                    <LayoutList size={16} />
                    Categories
                </span>
            </nav>
        );
    }
    const categorySlug = slugify(category.category);
    const isCategoryPage = pathname === `/subcategory/${categorySlug}`;
    return (
        <nav aria-label="Breadcrumb" className="flex items-center text-sm mb-6">
            <Link
                href="/"
                className="hover:underline text-blue-600 dark:text-blue-400"
            >
                🏡 Home
            </Link>
            <span className="mx-2 text-gray-400">›</span>
            <Link
                href="/category"
                className="flex items-center gap-2 hover:underline text-blue-600 dark:text-blue-400"
            >
                <LayoutList size={16} />
                Categories
            </Link>
            <span className="mx-2 text-gray-400">›</span>
            {isCategoryPage ? (
                <span
                    className="text-gray-900 dark:text-white"
                    aria-current="page"
                >
                    {category.category}
                </span>
            ) : (
                <Link
                    href={`/subcategory/${categorySlug}`}
                    className="hover:underline text-blue-600 dark:text-blue-400"
                >
                    {category.category}
                </Link>
            )}
            {subcategory && (
                <>
                    <span className="mx-2 text-gray-400">›</span>
                    <span className="text-gray-900 dark:text-white">
                        {subcategory.name}
                    </span>
                </>
            )}
        </nav>
    );
}