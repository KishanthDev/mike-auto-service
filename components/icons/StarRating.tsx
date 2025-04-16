'use client';

import { FC } from "react";
import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number; // e.g. 3.5
}

const StarRating: FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1 mt-1">
      {/* Full Stars */}
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
        ))}

      {/* Half Star */}
      {hasHalfStar && (
        <StarHalf className="w-5 h-5 fill-yellow-500 text-yellow-500" />
      )}

      {/* Empty Stars */}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`empty-${i}`} className="w-5 h-5 text-yellow-500" />
        ))}

      {/* Rating Number */}
      <span className="ml-2 text-sm font-medium text-gray-800 dark:text-gray-300">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default StarRating;
