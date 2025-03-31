
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic will be added later
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch with our team for any inquiries about our property
            management services
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card p-8 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 rounded-md border border-input bg-background"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 rounded-md border border-input bg-background"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full p-2 rounded-md border border-input bg-background"
                  required
                ></textarea>
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Office</h2>
              <img 
                className="w-full h-48 object-cover rounded-lg mb-4"
                alt="Office building"
               src="https://images.unsplash.com/photo-1681288918527-03212b22e9ab" />
              <p className="text-muted-foreground">
                123 Property Street
                <br />
                Business District
                <br />
                City, State 12345
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Contact Info</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@propertymanager.com</p>
                <p>Hours: Mon-Fri 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
