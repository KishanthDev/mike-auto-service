"use client";

import Image from "next/image";
import React from "react";

export default function ContactSection() {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold border-b-2 border-red-600 pb-2 text-[#1a3c6e] dark:text-white">
        Contact & Location
      </h2>

      <div className="mt-4 md:mt-6 space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <p>
          <strong>Address:</strong>
          <br />
          1234 Auto Drive
          <br />
          Springfield, IL 62701
        </p>

        <div className="w-full h-[200px] md:h-[250px] bg-gray-200 dark:bg-gray-700 rounded mt-3 overflow-hidden">
          <Image
            src="/api/placeholder/400/250"
            alt="Map"
            width={400}
            height={250}
            className="w-full h-full object-cover"
          />
        </div>

        <p className="mt-3">
          <strong>Phone:</strong> (555) 123-4567
        </p>

        <p>
          <strong>Email:</strong> service@mikesauto.com
        </p>

        <p>
          <strong>Website:</strong>{" "}
          <a
            href="https://www.mikesauto.com"
            className="text-blue-600 dark:text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.mikesauto.com
          </a>
        </p>
      </div>
    </section>
  );
}
