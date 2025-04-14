import { Card, CardHeader } from "@heroui/card";
import services from "../data/services.json";

export default function ServicesSection() {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold border-b-2 border-red-600 pb-2 text-[#2765c3]">
        Our Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 md:mt-6">
        {services.map((service, idx) => (
          <Card
            key={idx}
            className="hover:shadow-lg transition-transform hover:-translate-y-1"
          >
            <CardHeader className="p-4 md:p-6 flex flex-col justify-between h-full">
              <h3 className="text-lg mb-3 md:text-xl font-semibold text-[#2765c3]">
                {service.title}
              </h3>

              <div className="flex-grow" />

              <p className="text-sm mb-3 md:text-base">{service.description}</p>

              <p className="font-bold mt-2 md:mt-3 text-red-600">
                {service.price}
              </p>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
