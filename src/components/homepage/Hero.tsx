import { motion } from 'framer-motion';
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Users } from 'lucide-react';
import logo from "../../assets/logo.webp";
import swastik from "../../assets/swastik.webp";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = useCallback(() => {
    navigate('/create-biodata');
  }, [navigate]);

  return (
    <>
      <section className="relative bg-gradient-to-br from-[#f59e0b] via-[#b91c1c] to-[#d97706] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div
            className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
          ></div>
        </div>

        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-1 w-full items-center">
            {/* Left Column - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center text-left"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-gradient-to-br from-[#f59e0b] via-[#b91c1c] to-[#d97706] shadow-lg"
              >
                <img src={swastik} className="w-80 h-auto" alt="logo" />
                <img src={logo} className="w-20 h-20" alt="logo" />
                <img src={swastik} className="w-80 h-auto" alt="logo" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-md">
                Create Your Perfect{' '}
                <span className="text-yellow-300">Marriage Biodata</span>
              </h1>

              <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-sm">
                Craft your story with elegance and style using our professional
                templates. Trusted by thousands of families worldwide.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={handleGetStarted}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>10,000+ Happy Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>4.9/5 Rating</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
