"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import reviews from "../data/reviews.json";

export default function ReviewsSection() {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold border-b-2 border-red-600 pb-2 text-[#1a3c6e] dark:text-white">
        Customer Reviews
      </h2>

      <div className="space-y-4 mt-4 md:mt-6">
        {reviews.map((review, idx) => (
          <Card
            key={idx}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          >
            <CardBody className="p-4 md:p-6 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-2">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {review.author}
                </span>
                <div className="text-yellow-400">
                  {"★".repeat(review.rating)}
                </div>
              </div>
              <p>{review.content}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
