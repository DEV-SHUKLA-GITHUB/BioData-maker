// import React from 'react';
import { motion } from 'framer-motion';
import { Heart, FileText, Download, Paintbrush,HelpCircle } from 'lucide-react';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/template1Preview.png'
import img2 from '../assets/template2Preview.png'
import img3 from '../assets/template7Preview.png'
import img4 from '../assets/template4Preview.png'
import img5 from '../assets/template5Preview.png'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const tiltAnimation = {
  initial: { rotate: -10, scale: 0.9 },
  animate: { rotate: 0, scale: 1 },
  transition: { duration: 0.5 }
};

// Hero Section Component
const HeroSection = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/biodata');
  };

  return (
    <motion.div 
      className="relative bg-gradient-to-r from-pink-400 to-purple-500 text-white p-16 text-center overflow-hidden flex justify-between items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
    >
      <div className="flex flex-col items-start">
        <motion.div className="mb-4" {...tiltAnimation}>
          <img src={img1} alt="Image 1" className="w-32 h-48 object-cover rounded-lg shadow-lg" />
        </motion.div>
        <motion.div {...tiltAnimation}>
          <img src={img2} alt="Image 2" className="w-32 h-48 object-cover rounded-lg shadow-lg" />
        </motion.div>
      </div>

      <motion.div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3 }}
        >
          <Heart className="w-16 h-16 mx-auto mb-6 text-white" />
        </motion.div>
        <motion.h1 
          className="text-5xl font-bold mb-6"
          {...fadeIn}
        >
          Create Your Perfect Marriage Biodata
        </motion.h1>
        <motion.p 
          className="text-xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          Craft your story with elegance and style
        </motion.p>
        <motion.button
          className="bg-white text-pink-500 px-8 py-3 rounded-full font-semibold hover:bg-pink-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
        >
          Get Started
        </motion.button>
      </motion.div>

      <div className="flex flex-col items-end">
        <motion.div className="mb-4" {...tiltAnimation}>
          <img src={img3} alt="Image 3" className="w-32 h-48 object-cover rounded-lg shadow-lg" />
        </motion.div>
        <motion.div {...tiltAnimation}>
          <img src={img4} alt="Image 4" className="w-32 h-48 object-cover rounded-lg shadow-lg" />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Template Examples Component
const TemplateExamples = () => {
  const templates = [
    { image: img1 },
    { image: img2 },
    { image: img3 },
    // { image: img4 },
    { image: img5 },
  ];

  return (
    <div className="p-16 bg-light">
      <motion.h2 
        className="text-3xl font-semibold text-center mb-12 text-dark"
        {...fadeIn}
      >
        Beautiful Templates
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {templates.map((template, index) => (
          <motion.div
            key={template.image}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
              <img src={template.image} alt="template" className="object-cover" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Features Component
const Features = () => {
  const features = [
    { icon: FileText, title: "Easy Input", description: "Simple forms to fill your details" },
    { icon: Paintbrush, title: "Customizable", description: "Personalize colors and styles" },
    { icon: Download, title: "Instant Download", description: "Get your biodata in seconds" }
  ];

  return (
    <div className="p-16 bg-white">
      <motion.h2 
        className="text-3xl font-semibold text-center mb-12 text-dark"
        {...fadeIn}
      >
        Why Choose Us
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="text-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <feature.icon className="w-8 h-8 text-pink-500" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2 text-dark">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// FAQ Component
const FAQs = () => {
  return (
    <div className="p-16 bg-light">
      <motion.h2 
        className="text-3xl font-semibold text-center mb-12 text-dark"
        {...fadeIn}
      >
        Frequently Asked Questions
      </motion.h2>
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 mb-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center">
            <HelpCircle className="w-6 h-6 text-pink-500 mr-3" />
            <h3 className="font-semibold text-dark">How do I get started?</h3>
          </div>
          <p className="mt-2 text-gray-600 pl-9">
            Simply click the "Get Started" button and follow our easy step-by-step process.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <Heart className="w-8 h-8 mx-auto mb-4 text-pink-500" />
        <p className="mb-4">&copy; {new Date().getFullYear()} Marriage Biodata Maker. All rights reserved.</p>
        
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-white hover:text-pink-500 transition-colors">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-white hover:text-pink-500 transition-colors">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-white hover:text-pink-500 transition-colors">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-white hover:text-pink-500 transition-colors">
            <FaLinkedin size={24} />
          </a>
        </div>

        <nav className="mb-4">
          <ul className="flex justify-center space-x-6">
            <li><a href="#" className="text-white hover:text-pink-500 transition-colors">Home</a></li>
            <li><a href="#" className="text-white hover:text-pink-500 transition-colors">About Us</a></li>
            <li><a href="#" className="text-white hover:text-pink-500 transition-colors">Services</a></li>
            <li><a href="#" className="text-white hover:text-pink-500 transition-colors">Contact</a></li>
          </ul>
        </nav>

        <p className="text-sm">Contact us: info@marriagebiodatamaker.com | +1 (234) 567-8901</p>
      </motion.div>
    </footer>
  );
};

// Main Homepage Component
const Homepage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TemplateExamples />
      <Features />
      <FAQs />
      <Footer />
    </div>
  );
};

export default Homepage;