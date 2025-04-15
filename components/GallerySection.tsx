"use client";

import React from "react";
import Image from "next/image";

import { GalleryImage } from "@/types/data";

interface GallerySectionProps {
  images: GalleryImage[];
}

export default function GallerySection({ images }: GallerySectionProps) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold border-b-2 border-red-600 pb-2 text-[#1a3c6e] dark:text-white">
        Our Shop Gallery
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 shadow-md"
          >
            <Image
              alt={`Gallery ${idx + 1}`}
              className="w-full h-full object-cover transition-transform hover:scale-105"
              height={200}
              src={src}
              width={200}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
