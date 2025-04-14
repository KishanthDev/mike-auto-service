"use client";

import React from "react";
import data from "../data/data.json";
import type { Data } from "../types/data";

const { businessHours } = data as Data

export default function BusinessHoursSection() {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold border-b-2 border-red-600 pb-2 text-[#1a3c6e] dark:text-white">
        Business Hours
      </h2>

      <div className="mt-4 md:mt-6 space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        {businessHours.map((day, idx) => (
          <div
            key={idx}
            className="flex justify-between border-b py-2 border-gray-200 dark:border-gray-600"
          >
            <span>{day.day}</span>
            <span>{day.hours}</span>
          </div>
        ))}
        <p className="mt-3 font-semibold text-red-600 dark:text-red-400">
          24/7 Emergency Towing Available
        </p>
      </div>
    </section>
  );
}
