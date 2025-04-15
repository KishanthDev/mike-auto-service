import data from "../data/data.json";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import CertificationsSection from "../components/CertificationsSection";
import ReviewsSection from "../components/ReviewsSection";
import GallerySection from "../components/GallerySection";
import ContactSection from "../components/ContactSection";
import BusinessHoursSection from "../components/BusinessHoursSection";
import AdditionalInfoSection from "../components/AdditionalInfoSection";
import Footer from "../components/Footer";

const { businessHours, certifications, images, reviews, services } = data;

export default function Home() {
  return (
    <div className="font-sans text-[#333] leading-relaxed">
      <HeroSection />
      <main className="max-w-6xl mx-auto p-4 md:p-6 grid md:grid-cols-3 gap-6 md:gap-8">
        <div className="md:col-span-2 space-y-10 md:space-y-12">
          <ServicesSection services={services} />
          <CertificationsSection certifications={certifications} />
          <ReviewsSection reviews={reviews} />
          <GallerySection images={images} />
        </div>
        <div className="space-y-10 md:space-y-12">
          <ContactSection />
          <BusinessHoursSection businessHours={businessHours} />
          <AdditionalInfoSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
