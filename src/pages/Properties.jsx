
import React from "react";
import { motion } from "framer-motion";
import { useProperties } from "@/hooks/useProperties";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { AuthModal } from "@/components/auth/AuthModal";
import { useToast } from "@/components/ui/use-toast";
import { createInquiry } from "@/lib/supabase";

const Properties = () => {
  const { properties, loading } = useProperties();
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [selectedProperty, setSelectedProperty] = React.useState(null);
  const { toast } = useToast();

  const handleInquiry = async (propertyId) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      await createInquiry({
        property_id: propertyId,
        user_id: user.id,
        message: "I'm interested in this property.",
      });

      toast({
        title: "Success",
        description: "Your inquiry has been sent successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Loading properties...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-6">Available Properties</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover your perfect property from our carefully curated listings
          </p>
        </motion.div>

        {properties.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-muted-foreground">No properties available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-lg overflow-hidden shadow-lg"
              >
                <img 
                  className="w-full h-48 object-cover"
                  alt={`${property.title} property`}
                 src="https://images.unsplash.com/photo-1701202779560-80aa8df53ae1" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <p className="text-muted-foreground mb-4">{property.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">
                      ${property.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {property.location}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                    <span>{property.bedrooms} beds</span>
                    <span>{property.bathrooms} baths</span>
                    <span>{property.area} sqft</span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleInquiry(property.id)}
                  >
                    Inquire Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Properties;
