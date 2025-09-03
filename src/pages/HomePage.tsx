import { memo, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import img1 from '/assets/template1Preview.webp';
import img2 from '/assets/template2Preview.webp';
import img3 from '/assets/template7Preview.webp';
import HeroSection from '../components/homepage/Hero';
import TemplateExamples from '../components/homepage/TemplateExamples';
import Features from '../components/homepage/Features';
import Testimonials from '../components/homepage/Testimonials';
import FAQs from '../components/homepage/FAQ';

// Enhanced SEO component with comprehensive keyword optimization
const HomepageSEO = memo(() => {
  const enhancedSchemaData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free Biodata Generator - Marriage Biodata Maker Online",
    "alternateName": [
      "Free Marriage Biodata Maker",
      "Free Biodata Maker",
      "Online Biodata Generator",
      "Matrimonial Biodata Creator"
    ],
    "description": "Create professional marriage biodata online for free. Easy-to-use biodata maker with beautiful templates for Hindu, Muslim, Christian marriages. Instant PDF download, no registration required.",
    "url": "https://www.freebiodatagenerator.com",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "creator": {
      "@type": "Organization",
      "name": "Free Biodata Generator",
      "url": "https://www.freebiodatagenerator.com",
      "logo": "https://www.freebiodatagenerator.com/logo.png"
    },
    "featureList": [
      "Free marriage biodata maker online",
      "Professional biodata templates for all communities",
      "Instant PDF biodata download",
      "Mobile-responsive biodata creator",
      "Multi-language biodata support",
      "No registration matrimonial biodata maker",
      "Customizable biodata fields",
      "Hindu Muslim Christian biodata formats"
    ],
    "screenshot": "https://www.freebiodatagenerator.com/biodata-maker-screenshot.jpg",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2847",
      "bestRating": "5",
      "worstRating": "1"
    },
    "category": [
      "Marriage",
      "Matrimonial",
      "Biodata",
      "Wedding",
      "Profile Creator"
    ]
  }), []);

  const preloadImages = useMemo(() => [img1, img2, img3], []);

  return (
    <Helmet>
      {/* Enhanced Primary Title with Target Keywords */}
      <title>Free Marriage Biodata Maker Online | Create Biodata Generator - freebiodatagenerator.com</title>
      
      {/* Optimized Meta Description with Long-tail Keywords */}
      <meta
        name="description"
        content="Create professional marriage biodata online for free with our easy biodata maker. Choose from beautiful templates for Hindu, Muslim, Christian marriages. Instant PDF download, no registration required. Best matrimonial biodata generator 2025."
      />
      
      {/* Comprehensive Keywords including Long-tail and Semantic Variations */}
      <meta
        name="keywords"
        content="free marriage biodata maker, biodata generator online, matrimonial biodata creator, marriage biodata format, wedding biodata maker, biodata templates free, online biodata maker, biodata creation tool, marriage biodata generator, free biodata maker online, biodata format for marriage, hindu marriage biodata, muslim marriage biodata, christian biodata format, biodata maker no registration, instant biodata generator, professional marriage biodata, biodata templates download, matrimonial profile creator, wedding resume maker, marriage profile generator, biodata format for boy, biodata format for girl, shadi biodata maker, marriage biodata pdf"
      />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://www.freebiodatagenerator.com" />

      {/* Enhanced Open Graph Tags */}
      <meta property="og:title" content="Free Marriage Biodata Maker Online | Create Professional Biodata" />
      <meta property="og:description" content="Create stunning marriage biodata online for free. Easy-to-use templates for all communities. Instant PDF download. No registration required!" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.freebiodatagenerator.com" />
      <meta property="og:image" content="https://www.freebiodatagenerator.com/marriage-biodata-maker-og.jpg" />
      <meta property="og:image:alt" content="Free Marriage Biodata Maker - Create Professional Biodata Online" />
      <meta property="og:site_name" content="Free Biodata Generator" />
      <meta property="og:locale" content="en_US" />

      {/* Enhanced Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Marriage Biodata Maker Online | Professional Templates" />
      <meta name="twitter:description" content="Create beautiful marriage biodata for free. Easy templates for Hindu, Muslim, Christian marriages. Instant download!" />
      <meta name="twitter:image" content="https://www.freebiodatagenerator.com/biodata-maker-twitter.jpg" />
      <meta name="twitter:image:alt" content="Marriage Biodata Maker Templates" />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="Free Biodata Generator Team" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Mobile and Performance Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="theme-color" content="#4F46E5" />
      
      {/* DNS Prefetch and Preconnect for Performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Preload Critical Images */}
      {preloadImages.map((src, index) => (
        <link 
          key={index} 
          rel="preload" 
          as="image" 
          href={src} 
          type="image/webp"
        />
      ))}

      {/* Alternative Language/Region Pages */}
      <link rel="alternate" hrefLang="en" href="https://www.freebiodatagenerator.com" />
      <link rel="alternate" hrefLang="hi" href="https://www.freebiodatagenerator.com/hi" />
      <link rel="alternate" hrefLang="x-default" href="https://www.freebiodatagenerator.com" />

      {/* Enhanced Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(enhancedSchemaData)}
      </script>

      {/* Additional Schema for FAQ Section */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How to create marriage biodata online for free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Use our free marriage biodata maker to create professional biodata online. Simply choose a template, fill in your details, and download instantly as PDF. No registration required."
              }
            },
            {
              "@type": "Question", 
              "name": "Is the biodata maker really free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our marriage biodata generator is completely free to use. Create unlimited biodata with professional templates and download as PDF without any charges."
              }
            }
          ]
        })}
      </script>

      {/* BreadcrumbList Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.freebiodatagenerator.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Free Marriage Biodata Maker",
              "item": "https://www.freebiodatagenerator.com"
            }
          ]
        })}
      </script>
    </Helmet>
  );
});

HomepageSEO.displayName = 'HomepageSEO';

const Homepage = memo(() => {
  return (
    <div className="min-h-screen">
      <HomepageSEO />
      <HeroSection />
      <TemplateExamples />
      <Features />
      <Testimonials />
      <FAQs />
    </div>
  );
});

Homepage.displayName = 'Homepage';

export default Homepage;
