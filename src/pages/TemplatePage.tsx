import { useEffect, useCallback, useMemo, memo } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { LayoutGrid } from 'lucide-react';
import preview1 from "/assets/template1Preview.webp";
import preview2 from "/assets/template2Preview.webp";
import preview3 from "/assets/template3Preview.webp";
import preview4 from "/assets/template4Preview.webp";
import preview5 from "/assets/template5Preview.webp";
import preview6 from "/assets/template6Preview.webp";
import preview7 from "/assets/template7Preview.webp";

interface TemplateData {
  id: number;
  preview: string;
  name: string;
  description: string;
  category: string;
  designStyle: string;
  community: string;
  seoKeywords: string[];
  features: string[];
}

// Enhanced static template data with SEO properties
const TEMPLATES: TemplateData[] = [
  {
    id: 1,
    preview: preview1,
    name: "Classic Professional",
    description: "Clean and professional design perfect for traditional families",
    category: "Professional",
    designStyle: "Professional",
    community: "Traditional",
    seoKeywords: [
      "professional biodata template",
      "clean professional design",
      "traditional family biodata",
      "formal biodata layout",
      "corporate style biodata"
    ],
    features: ["Clean Layout", "Professional Design", "Traditional Format"]
  },
  {
    id: 2,
    preview: preview7,
    name: "Modern Elegant",
    description: "Contemporary design with elegant typography and layout",
    category: "Modern",
    designStyle: "Contemporary",
    community: "Modern",
    seoKeywords: [
      "modern biodata template",
      "contemporary biodata design",
      "elegant typography biodata",
      "modern matrimonial template",
      "stylish biodata format"
    ],
    features: ["Contemporary Style", "Elegant Typography", "Modern Layout"]
  },
  {
    id: 3,
    preview: preview4,
    name: "Traditional Heritage",
    description: "Traditional Indian design with cultural elements",
    category: "Traditional",
    designStyle: "Traditional",
    community: "Indian",
    seoKeywords: [
      "traditional biodata template",
      "traditional Indian biodata",
      "cultural biodata elements",
      "heritage biodata design",
      "ethnic biodata template",
      "Hindu marriage biodata"
    ],
    features: ["Cultural Elements", "Traditional Design", "Heritage Style"]
  },
  {
    id: 4,
    preview: preview6,
    name: "Minimalist Style",
    description: "Simple and clean design focusing on essential information",
    category: "Minimalist",
    designStyle: "Minimalist",
    community: "Contemporary",
    seoKeywords: [
      "minimalist biodata template",
      "minimalist biodata design",
      "simple biodata template",
      "clean biodata format",
      "minimal matrimonial template"
    ],
    features: ["Clean Design", "Simple Layout", "Essential Information"]
  },
  {
    id: 5,
    preview: preview5,
    name: "Floral Design",
    description: "Beautiful floral patterns perfect for wedding biodata",
    category: "Decorative",
    designStyle: "Decorative",
    community: "Traditional",
    seoKeywords: [
      "floral biodata template",
      "decorative biodata template",
      "floral marriage biodata",
      "wedding biodata with flowers",
      "beautiful biodata design",
      "ornamental biodata format"
    ],
    features: ["Floral Patterns", "Wedding Style", "Decorative Elements"]
  },
  {
    id: 6,
    preview: preview2,
    name: "Royal Classic",
    description: "Luxurious design with royal elements and gold accents",
    category: "Luxury",
    designStyle: "Luxury",
    community: "Traditional",
    seoKeywords: [
      "royal biodata template",
      "luxury biodata template",
      "luxury marriage biodata",
      "gold accent biodata",
      "premium biodata design",
      "elegant royal biodata"
    ],
    features: ["Royal Elements", "Gold Accents", "Luxury Design"]
  },
  {
    id: 7,
    preview: preview3,
    name: "Contemporary Chic",
    description: "Modern chic design with sophisticated typography",
    category: "Contemporary",
    designStyle: "Chic",
    community: "Urban",
    seoKeywords: [
      "contemporary biodata template",
      "contemporary biodata design",
      "chic marriage biodata",
      "sophisticated biodata template",
      "modern urban biodata",
      "stylish contemporary format"
    ],
    features: ["Chic Design", "Sophisticated Style", "Urban Appeal"]
  }
];

// Enhanced SEO Component for Templates Gallery
const TemplatePageSEO = memo(({ templates }: { templates: TemplateData[] }) => {
  const enhancedSchemaData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Free Marriage Biodata Templates Gallery - Professional Designs",
    "alternateName": [
      "Biodata Templates Collection",
      "Marriage Biodata Designs Gallery",
      "Matrimonial Templates Collection"
    ],
    "description": "Choose from 7+ professional marriage biodata templates. Free download, customizable designs for Hindu, Muslim, Christian matrimonial profiles. Modern, traditional, minimalist styles available.",
    "url": "https://www.freebiodatagenerator.com/templates",
    "keywords": [
      "marriage biodata templates",
      "matrimonial templates",
      "biodata designs",
      "wedding biodata templates",
      "professional biodata formats",
      "free biodata templates",
      "biodata template gallery",
      "marriage biodata collection"
    ].join(", "),
    "audience": {
      "@type": "Audience",
      "audienceType": "Marriage seekers, Matrimonial profiles, Wedding planners"
    },
    "about": {
      "@type": "Thing",
      "name": "Marriage Biodata Templates",
      "description": "Professional collection of customizable marriage biodata templates for matrimonial purposes"
    },
    "breadcrumb": {
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
          "name": "Create Biodata",
          "item": "https://www.freebiodatagenerator.com/create-biodata"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Templates Gallery",
          "item": "https://www.freebiodatagenerator.com/templates"
        }
      ]
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": templates.length,
      "itemListElement": templates.map((template, index) => ({
        "@type": "CreativeWork",
        "position": index + 1,
        "name": `${template.name} Marriage Biodata Template`,
        "description": `${template.description} - ${template.category} ${template.designStyle} design for ${template.community} community`,
        "image": `https://www.freebiodatagenerator.com${template.preview}`,
        "category": [template.category, "Marriage Biodata", "Matrimonial Template"],
        "keywords": template.seoKeywords.join(", "),
        "audience": {
          "@type": "Audience",
          "audienceType": `${template.community} marriage seekers`
        },
        "genre": "Matrimonial Document Template",
        "isAccessibleForFree": true,
        "inLanguage": "en",
        "url": `https://www.freebiodatagenerator.com/template-detail/${template.id}`
      }))
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "description": "Free marriage biodata templates with instant download"
    },
    "provider": {
      "@type": "Organization",
      "name": "Free Biodata Generator",
      "url": "https://www.freebiodatagenerator.com"
    }
  }), [templates]);

  // Generate comprehensive keywords from all templates
  const allKeywords = useMemo(() => {
    const baseKeywords = [
      "marriage biodata templates",
      "matrimonial templates gallery",
      "biodata designs collection",
      "wedding biodata templates",
      "professional biodata formats",
      "free biodata templates download",
      "biodata template gallery",
      "marriage biodata collection",
      "customizable biodata templates",
      "biodata templates for marriage"
    ];

    const templateKeywords = templates.flatMap(t => t.seoKeywords);
    const categoryKeywords = templates.map(t => `${t.category.toLowerCase()} biodata template`);
    const communityKeywords = templates.map(t => `${t.community.toLowerCase()} marriage biodata`);

    return [...baseKeywords, ...templateKeywords, ...categoryKeywords, ...communityKeywords]
      .filter((keyword, index, arr) => arr.indexOf(keyword) === index) // Remove duplicates
      .join(", ");
  }, [templates]);

  return (
    <Helmet>
      {/* Enhanced Title with Multiple Target Keywords */}
      <title>Marriage Biodata Templates Gallery - Free Professional Designs | Download PDF</title>
      
      {/* Comprehensive Meta Description */}
      <meta
        name="description"
        content="Choose from 7+ professional marriage biodata templates. Free download, customizable designs for Hindu, Muslim, Christian matrimonial profiles. Modern, traditional, minimalist, luxury styles. Instant PDF generation."
      />
      
      {/* Comprehensive Keywords from All Templates */}
      <meta
        name="keywords"
        content={allKeywords}
      />
      
      <link rel="canonical" href="https://www.freebiodatagenerator.com/templates" />

      {/* Enhanced Open Graph Tags */}
      <meta property="og:title" content="Free Marriage Biodata Templates Gallery - Professional Designs" />
      <meta property="og:description" content="Choose from 7+ professional marriage biodata templates. Modern, traditional, minimalist designs for all communities. Free download." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.freebiodatagenerator.com/templates" />
      <meta property="og:image" content="https://www.freebiodatagenerator.com/biodata-templates-gallery.jpg" />
      <meta property="og:image:alt" content="Marriage Biodata Templates Gallery - Professional Designs Collection" />
      <meta property="og:site_name" content="Free Biodata Generator" />

      {/* Enhanced Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Marriage Biodata Templates Gallery - Free Professional Designs" />
      <meta name="twitter:description" content="7+ professional marriage biodata templates. Modern, traditional, minimalist designs. Free download." />
      <meta name="twitter:image" content="https://www.freebiodatagenerator.com/biodata-templates-gallery.jpg" />
      <meta name="twitter:image:alt" content="Professional Marriage Biodata Templates Collection" />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="author" content="Free Biodata Generator Team" />
      <meta name="language" content="English" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Template Collection Specific Meta Tags */}
      <meta name="template-count" content={templates.length.toString()} />
      <meta name="template-categories" content={[...new Set(templates.map(t => t.category))].join(", ")} />
      <meta name="template-styles" content={[...new Set(templates.map(t => t.designStyle))].join(", ")} />
      
      {/* Mobile and Performance */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="theme-color" content="#4F46E5" />

      {/* Preload Critical Template Images */}
      <link rel="preload" as="image" href={preview1} type="image/webp" />
      <link rel="preload" as="image" href={preview7} type="image/webp" />
      <link rel="preload" as="image" href={preview4} type="image/webp" />

      {/* Enhanced Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(enhancedSchemaData)}
      </script>

      {/* FAQ Schema for Templates Gallery */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How many marriage biodata templates are available?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `We offer ${templates.length} professional marriage biodata templates including ${[...new Set(templates.map(t => t.category))].join(', ')} designs suitable for all communities.`
              }
            },
            {
              "@type": "Question",
              "name": "Are the biodata templates free to download?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, all our marriage biodata templates are completely free to download as PDF. No registration or payment required."
              }
            },
            {
              "@type": "Question",
              "name": "Which communities can use these biodata templates?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `Our templates are designed for all communities including ${[...new Set(templates.map(t => t.community))].join(', ')} families. Each template can be customized for your specific requirements.`
              }
            },
            {
              "@type": "Question",
              "name": "What design styles are available in the templates?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `We offer various design styles including ${[...new Set(templates.map(t => t.designStyle))].join(', ')} to suit different preferences and occasions.`
              }
            }
          ]
        })}
      </script>
    </Helmet>
  );
});

TemplatePageSEO.displayName = 'TemplatePageSEO';

// Enhanced Breadcrumb Component with SEO-friendly navigation
const Breadcrumb = memo(() => {
  const navigate = useNavigate();

  const handleHomeClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleCreateBiodataClick = useCallback(() => {
    navigate('/create-biodata');
  }, [navigate]);

  return (
    <nav aria-label="Marriage biodata templates navigation breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        <li>
          <button
            onClick={handleHomeClick}
            className="hover:text-pink-600 transition-colors"
            aria-label="Navigate to home page"
          >
            Home
          </button>
        </li>
        <li className="flex items-center space-x-2">
          <span>/</span>
          <button
            onClick={handleCreateBiodataClick}
            className="hover:text-pink-600 transition-colors"
            aria-label="Navigate to create biodata page"
          >
            Create Biodata
          </button>
        </li>
        <li className="flex items-center space-x-2">
          <span>/</span>
          <span className="text-gray-900 font-medium" aria-current="page">
            Templates Gallery
          </span>
        </li>
      </ol>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

// Enhanced Template Card Component with SEO optimization
const TemplateCard = memo(({
  template,
  onViewDetails
}: {
  template: TemplateData;
  onViewDetails: (id: number) => void;
}) => {
  const handleImageClick = useCallback(() => {
    onViewDetails(template.id);
  }, [template.id, onViewDetails]);

  const handleButtonClick = useCallback(() => {
    onViewDetails(template.id);
  }, [template.id, onViewDetails]);

  return (
    <article 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
      itemScope 
      itemType="https://schema.org/CreativeWork"
    >
      <div className="relative">
        <img
          src={template.preview}
          alt={`${template.name} - ${template.category} marriage biodata template for ${template.community} matrimonial profiles`}
          className="w-full h-64 object-contain cursor-pointer hover:scale-105 transition-transform"
          onClick={handleImageClick}
          loading="lazy"
          width="300"
          height="256"
          itemProp="image"
        />
        <div className="absolute top-2 right-2 bg-pink-600 text-white px-2 py-1 rounded-full text-xs">
          {template.category}
        </div>
        <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
          {template.community}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2" itemProp="name">
          {template.name} Marriage Biodata Template
        </h3>
        <p className="text-sm text-gray-600 mb-2" itemProp="description">
          {template.description}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {template.features.map((feature, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
            >
              {feature}
            </span>
          ))}
        </div>
        <Button
          onClick={handleButtonClick}
          className="w-full text-white bg-blue-600 hover:bg-blue-700"
          aria-label={`View details and download ${template.name} ${template.category} biodata template for ${template.community} marriage`}
        >
          Preview & Download Template
        </Button>
      </div>
    </article>
  );
});

TemplateCard.displayName = 'TemplateCard';

const TemplatePage = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if no form data
  useEffect(() => {
    if (!formData) {
      navigate('/create-biodata');
    }
  }, [formData, navigate]);

  // Memoized callback for handling template selection
  const handleViewDetails = useCallback((templateId: number) => {
    navigate(`template-detail/${templateId}`, {
      state: { formData }
    });
  }, [navigate, formData]);

  // Memoized templates to prevent unnecessary re-renders
  const templates = useMemo(() => TEMPLATES, []);

  // Memoized template categories for filtering display
  const templateCategories = useMemo(() => {
    return [...new Set(templates.map(t => t.category))];
  }, [templates]);

  if (!formData) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <TemplatePageSEO templates={templates} />

      <div className="max-w-6xl mx-auto">
        <Breadcrumb />

        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 md:w-8 md:h-8" />
            Free Marriage Biodata Templates Gallery
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-4">
            Choose from our collection of {templates.length} professional marriage biodata templates. 
            Each design is crafted for different communities and occasions with instant PDF download.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-600">Available Categories:</span>
            {templateCategories.map((category, index) => (
              <span 
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </header>

        <section 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          aria-label="Marriage biodata templates collection"
        >
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onViewDetails={handleViewDetails}
            />
          ))}
        </section>

        <footer className="mt-12 text-center">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Why Choose Our Marriage Biodata Templates?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <strong>Free Download:</strong> All templates are completely free with instant PDF generation
              </div>
              <div>
                <strong>Professional Design:</strong> Crafted by designers for matrimonial purposes
              </div>
              <div>
                <strong>Customizable:</strong> Easily modify fields, content, and layout before download
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
});

TemplatePage.displayName = 'TemplatePage';

export default TemplatePage;