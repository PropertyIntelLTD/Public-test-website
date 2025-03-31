
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img  
            className="w-full h-full object-cover"
            alt="Modern property exterior" src="https://images.unsplash.com/photo-1529405730888-1e9ce6b74bc3" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Professional Property Management
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Streamline your property investments with our comprehensive management solutions
          </p>
          <Button
            size="lg"
            className="bg-white text-black hover:bg-white/90"
          >
            Explore Services <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
