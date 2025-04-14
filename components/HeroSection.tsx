import { Button } from "@heroui/button";
import React from "react";

const HeroSection = () => {
  return (
    <section className="h-[300px] md:h-[400px] bg-cover bg-center bg-[url('/api/placeholder/1200/300')] relative flex flex-col justify-center items-center text-white text-center px-4 dark:text-gray-200">
      <div className="bg-black bg-opacity-50 absolute inset-0 z-0" />
      <div className="relative z-10 max-w-4xl px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4">Mike's Auto Service</h1>
        <p className="text-base sm:text-lg md:text-xl max-w-[800px]">
          Full-service auto repair shop specializing in domestic and foreign vehicles since 1985
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center mt-4 md:mt-6 gap-2">
          <span className="text-yellow-400 text-2xl mr-2">★★★★★</span>
          <span>4.8/5 based on 127 reviews</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
          <Button className="bg-red-600 text-white w-full sm:w-auto">Schedule Service</Button>
          <Button className="bg-white text-[#333] dark:bg-gray-100 dark:text-black w-full sm:w-auto">Request Quote</Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;