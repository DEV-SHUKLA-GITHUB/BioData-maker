// components/Header.tsx
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import logo from "../assets/logo2.webp";
import GoogleTranslate from './GoogleTranslate';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleCreateBiodata = useCallback(() => {
    navigate('/create-biodata');
    setIsMobileMenuOpen(false);
  }, [navigate]);

  const navigationLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
  ];

  return (
    <header className="relative  bg-gradient-to-br from-[#f59e0b] via-[#b91c1c] to-[#d97706] text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20 flex-wrap md:flex-nowrap">

          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <img src={logo} className="w-8 h-8 lg:w-10 lg:h-10" alt="Marriage Biodata Maker Logo" />
              </div>
              <div className="hidden sm:block min-w-0">
                <h1 className="text-lg lg:text-xl font-bold truncate">Biodata Generator</h1>
                <p className="text-xs text-white/80 truncate">Create Beautiful Biodata</p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 flex-grow ml-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-white/90 hover:text-white hover:underline transition-colors duration-200 font-medium whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Controls: Language Selector + Buttons */}
          <div className="flex items-center space-x-4 ml-auto">

            {/* Google Translate selector: hide on xs, show sm+ */}

            {/* Create Biodata Button */}
            <motion.button
              onClick={handleCreateBiodata}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex bg-white text-pink-600 px-6 py-2 lg:px-8 lg:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg items-center space-x-2 whitespace-nowrap"
            >
              <Heart className="w-4 h-4" />
              <span>Create Biodata</span>
            </motion.button>
            <div className="hidden sm:block">
              <GoogleTranslate />
            </div>

            {/* Mobile Create Biodata Button */}
            <motion.button
              onClick={handleCreateBiodata}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="sm:hidden bg-white text-pink-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              aria-label="Create Biodata"
            >
              <Heart className="w-4 h-4" />
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/10 backdrop-blur-sm border-t border-white/20"
          >
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/90 hover:text-white py-2 font-medium transition-colors block"
                >
                  {link.label}
                </Link>
              ))}

              {/* Move GoogleTranslate inside mobile menu below links for better UX */}
              <div className="pt-4 border-t border-white/30">
                <GoogleTranslate />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
