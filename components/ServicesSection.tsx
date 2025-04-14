import { Card, CardHeader } from "@heroui/card";
import services from "../data/services.json";

export default function ServicesSection() {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold border-b-2 border-red-600 pb-2 text-[#1a3c6e]">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 md:mt-6">
        {services.map((service, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-transform hover:-translate-y-1">
            <CardHeader className="p-4 md:p-6 space-y-3">
              <h3 className="text-lg md:text-xl font-semibold text-[#1a3c6e]">{service.title}</h3>
              <p className="text-sm md:text-base">{service.description}</p>
              <p className="font-bold text-red-600">{service.price}</p>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
