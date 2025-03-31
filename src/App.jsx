import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Services from "@/pages/Services";

const App = () => {
  console.log("App is rendering"); // Debugging step

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;