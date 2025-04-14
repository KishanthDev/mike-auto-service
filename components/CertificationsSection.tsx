"use client";

import React from "react";
import type { Certification } from "@/types/data";

interface CertificateSectionProps {
  certifications: Certification[];
}

export default function CertificationsSection({certifications}:CertificateSectionProps) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold border-b-2 border-red-600 pb-2 text-[#1a3c6e] dark:text-white">
        Certifications & Expertise
      </h2>

      <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mt-2">
        Our technicians are specially trained and certified to work on all major
        vehicle makes and models.
      </p>

      <div className="flex flex-wrap gap-4 mt-4 md:mt-6 justify-center sm:justify-start">
        {certifications.map((badge, idx) => (
          <div
            key={idx}
            className="w-16 h-16 md:w-20 md:h-20 flex justify-center items-center rounded-full 
                       bg-gray-100 dark:bg-gray-800 border dark:border-gray-600 
                       text-sm md:text-base font-semibold text-gray-900 dark:text-white"
          >
            {badge}
          </div>
        ))}
      </div>
    </section>
  );
}
