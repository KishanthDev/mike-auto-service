"use client";

import React from "react";

export default function AdditionalInfoSection() {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold border-b-2 border-red-600 pb-2 text-[#1a3c6e] dark:text-white">
        Additional Information
      </h2>

      <div className="mt-4 md:mt-6 space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <p>
          <strong>Makes Serviced:</strong> All domestic and foreign vehicles
        </p>
        <p>
          <strong>Warranty:</strong> 24-month / 24,000 mile warranty on parts
          and labor
        </p>
        <p>
          <strong>Shuttle Service:</strong> Available within 5 miles
        </p>
        <p>
          <strong>Loaner Cars:</strong> Available for major repairs (reservation
          required)
        </p>
        <p>
          <strong>Languages:</strong> English, Spanish
        </p>
      </div>
    </section>
  );
}
