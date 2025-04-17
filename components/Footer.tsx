"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#1a3c6e] dark:bg-gray-900 text-white text-center p-6 mt-8 md:mt-12">
      <p className="text-sm md:text-base">
        © 2025 Mike&apos;s Auto Service - All Rights Reserved
      </p>

      <p className="mt-2 md:mt-3 text-sm md:text-base">We accept:</p>

      <div className="flex justify-center gap-4 mt-2 md:mt-3">
        {["V", "M", "A"].map((card, idx) => (
          <div
            key={idx}
            data-testid="payment-icon"
            className="w-8 h-8 md:w-10 md:h-10 bg-white text-black dark:bg-gray-200 dark:text-gray-900 flex items-center justify-center rounded text-xs md:text-sm font-bold shadow-sm"
          >
            {card}
          </div>
        ))}
      </div>
    </footer>
  );
}
