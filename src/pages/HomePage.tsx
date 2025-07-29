// pages/HomePage.tsx
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import img1 from '../assets/template1Preview.png';
import img2 from '../assets/template2Preview.png';
import img3 from '../assets/template7Preview.png';
import HeroSection from '../components/homepage/Hero';
import TemplateExamples from '../components/homepage/TemplateExamples';
import Features from '../components/homepage/Features';
import Testimonials from '../components/homepage/Testimonials';
import FAQs from '../components/homepage/FAQ';
const preloadImages = [img1, img2, img3];

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

const Homepage: React.FC = () => {
  useEffect(() => {
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
      <HeroSection/>
      <TemplateExamples />
      <Features />
      <Testimonials />
      <FAQs />
    </div>
  );
};

export default Homepage;
