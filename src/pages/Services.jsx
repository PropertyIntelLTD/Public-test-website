
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-6">Our Services</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive property management solutions tailored for landlords,
              tenants, and investors
            </p>
          </motion.div>

          {/* For Landlords */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8">For Landlords</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {landlordServices.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>
          </div>

          {/* For Tenants */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8">For Tenants</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tenantServices.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>
          </div>

          {/* For Investors */}
          <div>
            <h2 className="text-2xl font-bold mb-8">For Investors</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {investorServices.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServiceCard = ({ service, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2 }}
    className="bg-white rounded-lg overflow-hidden shadow-lg"
  >
    <img
      className="w-full h-48 object-cover"
      alt={service.title}
      src={service.image}
    />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <Link to={service.link}>
        <Button className="w-full">
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  </motion.div>
);

const landlordServices = [
  {
    title: "Property Management",
    description:
      "Complete property management services including tenant screening, rent collection, and maintenance coordination.",
    link: "/services/property-management",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  },
  {
    title: "Maintenance & Repairs",
    description:
      "Regular maintenance and emergency repair services to keep your property in optimal condition.",
    link: "/services/maintenance",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  },
  {
    title: "Tenant Sourcing",
    description:
      "Comprehensive tenant screening and placement services to ensure quality tenants.",
    link: "/services/tenant-sourcing",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  },
];

const tenantServices = [
  {
    title: "Property Search",
    description: "Find your perfect home with our extensive property listings.",
    link: "/services/property-search",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  },
  {
    title: "Maintenance Requests",
    description: "Quick and efficient handling of maintenance requests.",
    link: "/services/maintenance-requests",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  },
  {
    title: "End of Tenancy",
    description: "Smooth transition services for end of tenancy periods.",
    link: "/services/end-of-tenancy",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  },
];

const investorServices = [
  {
    title: "Investment Management",
    description: "Strategic investment management to maximize returns.",
    link: "/services/investment-management",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  },
  {
    title: "Portfolio Management",
    description: "Comprehensive portfolio management and optimization.",
    link: "/services/portfolio-management",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  },
  {
    title: "Market Analysis",
    description: "In-depth market analysis and investment opportunities.",
    link: "/services/market-analysis",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  },
];

export default Services;
