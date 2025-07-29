// pages/HomePage.tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, FileText, Download, Paintbrush, HelpCircle, ArrowRight, Star, Users, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

// Import images - These should be optimized (WebP format preferred)
import img1 from '../assets/template1Preview.png';
import img2 from '../assets/template2Preview.png';
import img3 from '../assets/template7Preview.png';
// import img4 from '../assets/template4Preview.png';
import img5 from '../assets/template5Preview.png';
import logo from "../assets/logo.png"
import Header from '../components/Header';
// Preload critical images
const preloadImages = [img1, img2, img3];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// OptimizedImage Component (inline to fix import issue)
const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}> = ({ src, alt, className = '', loading = 'lazy' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded"></div>
      )}

      <img
        src={src}
        alt={alt}
        loading={loading}
        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        onLoad={handleLoad}
        onError={handleError}
      />

      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
          Failed to load image
        </div>
      )}
    </div>
  );
};

// SEO Component
const HomepageSEO: React.FC = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Marriage Biodata Maker",
    "description": "Create beautiful marriage biodata with professional templates. Easy to use, customizable, and instant download.",
    "url": "https://www.freebiodatagenerator.com",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Marriage Biodata Maker",
      "url": "https://www.freebiodatagenerator.com"
    },
    "featureList": [
      "Professional biodata templates",
      "Easy-to-use form builder",
      "Instant PDF download",
      "Mobile responsive design",
      "Customizable fields"
    ],
    "screenshot": "https://www.freebiodatagenerator.com/screenshot.jpg"
  };

  return (
    <Helmet>
      <title>Marriage Biodata Maker - Create Beautiful Biodata Templates Online</title>
      <meta
        name="description"
        content="Create professional marriage biodata with beautiful templates. Easy to use, customizable designs, and instant download. Perfect for matrimonial profiles."
      />
      <meta
        name="keywords"
        content="marriage biodata, matrimonial profile, biodata maker, marriage resume, wedding biodata, biodata templates, Indian marriage biodata"
      />
      <link rel="canonical" href="https://www.freebiodatagenerator.com" />

      {/* Preload critical resources */}
      {preloadImages.map((src, index) => (
        <link key={index} rel="preload" as="image" href={src} />
      ))}

      {/* Open Graph Tags */}
      <meta property="og:title" content="Marriage Biodata Maker - Create Beautiful Biodata Templates" />
      <meta property="og:description" content="Create professional marriage biodata with beautiful templates. Easy to use and instant download." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.freebiodatagenerator.com" />
      <meta property="og:image" content="https://www.freebiodatagenerator.com/og-image.jpg" />
      <meta property="og:site_name" content="Marriage Biodata Maker" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Marriage Biodata Maker - Create Beautiful Biodata Templates" />
      <meta name="twitter:description" content="Create professional marriage biodata with beautiful templates" />
      <meta name="twitter:image" content="https://www.freebiodatagenerator.com/twitter-image.jpg" />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Marriage Biodata Maker" />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="7 days" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

// Hero Section Component
const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = useCallback(() => {
    navigate('/create-biodata');
  }, [navigate]);

  // const handleViewTemplates = useCallback(() => {
  //   navigate('/templates');
  // }, [navigate]);

  return (<>
    <section className="relative bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-1 w-100  items-center ">
          {/* Left Column - Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center text-left"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6"
            >
              {/* <Heart className="w-8 h-8 text-white" /> */}
              <img src={logo} className="w-50 text-white"  alt='logo'/>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Create Your Perfect{' '}
              <span className="text-yellow-300">Marriage Biodata</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-white/90 ">
              Craft your story with elegance and style using our professional templates.
              Trusted by thousands of families worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center ">
              <motion.button
                onClick={handleGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              {/* <motion.button
                onClick={handleViewTemplates}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                View Templates
              </motion.button> */}
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

          {/* Right Column - Template Preview */}
          {/* <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <OptimizedImage
                  src={img1}
                  alt="Professional marriage biodata template preview"
                  className="w-full h-48 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  loading="eager"
                />
                <OptimizedImage
                  src={img2}
                  alt="Elegant marriage biodata template preview"
                  className="w-full h-32 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  loading="lazy"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-4 mt-8"
              >
                <OptimizedImage
                  src={img3}
                  alt="Modern marriage biodata template preview"
                  className="w-full h-32 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  loading="lazy"
                />
                <OptimizedImage
                  src={img4}
                  alt="Traditional marriage biodata template preview"
                  className="w-full h-48 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section></>
  );
};

// Template Examples Component
const TemplateExamples: React.FC = () => {
  // const navigate = useNavigate();

  const templates = useMemo(() => [
    {
      image: img1,
      title: "Professional Classic",
      description: "Perfect for traditional families",
      category: "Professional"
    },
    {
      image: img2,
      title: "Modern Elegant",
      description: "Contemporary design with style",
      category: "Modern"
    },
    {
      image: img3,
      title: "Traditional Heritage",
      description: "Cultural elements and patterns",
      category: "Traditional"
    },
    {
      image: img5,
      title: "Minimalist Chic",
      description: "Clean and sophisticated",
      category: "Minimalist"
    },
  ], []);

  // const handlePreviewTemplate = useCallback(() => {
  //   navigate('/template');
  // }, [navigate]);

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Beautiful Marriage Biodata Templates
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of professionally designed templates.
            Each template is crafted with attention to detail and cultural sensitivity.
          </p>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {templates.map((template) => (
            <motion.article
              key={template.title}
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="relative overflow-hidden">
                <OptimizedImage
                  src={template.image}
                  alt={`${template.title} - ${template.description}`}
                  className="w-full h-100 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-pink-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {template.category}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{template.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                {/* <button 
                  onClick={handlePreviewTemplate}
                  className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Preview Template
                </button> */}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Features Component
const Features: React.FC = () => {
  const features = useMemo(() => [
    {
      icon: FileText,
      title: "Easy Input",
      description: "Simple forms to fill your matrimonial details quickly and efficiently",
      color: "bg-blue-500"
    },
    {
      icon: Paintbrush,
      title: "Customizable Design",
      description: "Personalize colors, fonts, and styles to match your preferences",
      color: "bg-purple-500"
    },
    {
      icon: Download,
      title: "Instant Download",
      description: "Get your professional biodata in PDF format within seconds",
      color: "bg-green-500"
    }
  ], []);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Marriage Biodata Maker
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform combines ease of use with professional quality,
            making it the perfect choice for creating your matrimonial profile.
          </p>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.article
              key={feature.title}
              variants={fadeInUp}
              className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
            >
              <motion.div
                className={`w-16 h-16 mx-auto mb-4 ${feature.color} rounded-full flex items-center justify-center`}
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// FAQ Component
const FAQs: React.FC = () => {
  const faqs = useMemo(() => [
    {
      question: "How do I create a marriage biodata?",
      answer: "Simply click the 'Get Started' button, fill in your personal details, choose a template, and download your professional biodata instantly."
    },
    {
      question: "Are the templates customizable?",
      answer: "Yes! You can customize colors, fonts, add or remove fields, and personalize the layout to match your preferences."
    },
    {
      question: "Is the service free to use?",
      answer: "Yes, our basic biodata maker is completely free. You can create and download professional biodata without any cost."
    },
    {
      question: "What format is the final biodata?",
      answer: "Your biodata will be generated as a high-quality PDF file that you can print or share digitally."
    }
  ], []);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = useCallback((index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  }, [openIndex]);

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our biodata maker service.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full bg-white rounded-lg shadow-md p-6 text-left hover:shadow-lg transition-shadow flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-pink-500 flex-shrink-0" />
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white px-6 pb-6 pt-2 ml-6 border-l-2 border-pink-500">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Component
const Testimonials: React.FC = () => {
  const testimonials = useMemo(() => [
    {
      name: "Priya Sharma",
      location: "Mumbai, India",
      rating: 5,
      text: "The biodata templates are beautiful and professional. It made creating my matrimonial profile so much easier!"
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi, India",
      rating: 5,
      text: "Excellent service! The templates are customizable and the download process is instant. Highly recommended."
    },
    {
      name: "Sneha Patel",
      location: "Bangalore, India",
      rating: 5,
      text: "User-friendly interface and stunning templates. Perfect for creating professional biodata quickly."
    }
  ], []);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who have created their perfect biodata with our platform.
          </p>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={fadeInUp}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Footer Component
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <Heart className="w-8 h-8 text-pink-500" />
          </div>

          <h3 className="text-2xl font-bold mb-4">Marriage Biodata Maker</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Creating beautiful and professional marriage biodata has never been easier.
            Join thousands of happy families who trust our platform.
          </p>

          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://www.facebook.com/" className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Facebook">
              <FaFacebook size={24} />
            </a>
            <a href="https://x.com/" className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Twitter">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.instagram.com/" className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/" className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </a>
          </div>

          <nav className="mb-8">
            <ul className="flex flex-wrap justify-center space-x-8 text-sm">
              <li><a href="/" className="text-gray-400 hover:text-pink-500 transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-pink-500 transition-colors">About Us</a></li>
              {/* <li><a href="/templates" className="text-gray-400 hover:text-pink-500 transition-colors">Templates</a></li> */}
              <li><a href="/contact" className="text-gray-400 hover:text-pink-500 transition-colors">Contact</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-pink-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </nav>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-400 mb-2">
              &copy; {currentYear} Marriage Biodata Maker. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Contact us: techsoftwaresolutionlimited@gmail.com | +91 8103531353
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

// Main Homepage Component
// Main Homepage Component
const Homepage: React.FC = () => {
  useEffect(() => {
    // Preload critical images for better performance
    const preloadImage = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = src;
      });
    };

    const imagePromises = preloadImages.map(preloadImage);

    Promise.all(imagePromises)
      .then(() => {
        console.log('Critical images preloaded successfully');
      })
      .catch(error => {
        console.error('Error preloading images:', error);
      });
  }, []);

  return (
    <div className="min-h-screen">
      <HomepageSEO />
      <Header />
      <HeroSection />
      <TemplateExamples />
      <Features />
      <Testimonials />
      <FAQs />
      <Footer />
    </div>
  );
};

export default Homepage;
