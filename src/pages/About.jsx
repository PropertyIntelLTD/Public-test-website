
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are dedicated to providing exceptional property management services
            with a focus on client satisfaction and property value optimization.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img 
              className="rounded-lg w-full h-[400px] object-cover"
              alt="Our team at work"
             src="https://images.unsplash.com/photo-1690565914436-9a09ea223c38" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded with a vision to revolutionize property management, we have
              grown to become a trusted partner for property owners and tenants
              alike.
            </p>
            <p className="text-muted-foreground">
              Our team of experienced professionals is committed to delivering
              personalized solutions that meet the unique needs of each client,
              ensuring maximum returns on their investments.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-12">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={member.name} className="text-center">
                <img 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  alt={`${member.name} profile picture`}
                 src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const team = [
  {
    name: "Sarah Johnson",
    role: "Managing Director",
    imageDescription:
      "Professional headshot of Sarah Johnson, a woman in her 40s wearing a business suit",
  },
  {
    name: "Michael Chen",
    role: "Property Manager",
    imageDescription:
      "Professional headshot of Michael Chen, a man in his 30s wearing a business casual outfit",
  },
  {
    name: "Emily Williams",
    role: "Client Relations",
    imageDescription:
      "Professional headshot of Emily Williams, a woman in her 30s with a warm smile",
  },
];

export default About;
