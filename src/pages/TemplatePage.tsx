import { useEffect, useCallback, useMemo, memo } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { LayoutGrid } from 'lucide-react';
import preview1 from "/assets/template1Preview.webp"
import preview2 from "/assets/template2Preview.webp"
import preview3 from "/assets/template3Preview.webp"
import preview4 from "/assets/template4Preview.webp"
import preview5 from "/assets/template5Preview.webp"
import preview6 from "/assets/template6Preview.webp"
import preview7 from "/assets/template7Preview.webp"

interface TemplateData {
  id: number;
  preview: string;
  name: string;
  description: string;
  category: string;
}

// Memoized static template data to prevent recreation
const TEMPLATES: TemplateData[] = [
  {
    id: 1,
    preview: preview1,
    name: "Classic Professional",
    description: "Clean and professional design perfect for traditional families",
    category: "Professional"
  },
  {
    id: 2,
    preview: preview7,
    name: "Modern Elegant",
    description: "Contemporary design with elegant typography and layout",
    category: "Modern"
  },
  {
    id: 3,
    preview: preview4,
    name: "Traditional Heritage",
    description: "Traditional Indian design with cultural elements",
    category: "Traditional"
  },
  {
    id: 4,
    preview: preview6,
    name: "Minimalist Style",
    description: "Simple and clean design focusing on essential information",
    category: "Minimalist"
  },
  {
    id: 5,
    preview: preview5,
    name: "Floral Design",
    description: "Beautiful floral patterns perfect for wedding biodata",
    category: "Decorative"
  },
  {
    id: 6,
    preview: preview2,
    name: "Royal Classic",
    description: "Luxurious design with royal elements and gold accents",
    category: "Luxury"
  },
  {
    id: 7,
    preview: preview3,
    name: "Contemporary Chic",
    description: "Modern chic design with sophisticated typography",
    category: "Contemporary"
  },
];

// Memoized SEO Component
const TemplatePageSEO = memo(({ templates }: { templates: TemplateData[] }) => {
  const schemaData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Marriage Biodata Templates Gallery",
    "description": "Choose from our collection of professional marriage biodata templates. Beautiful, customizable designs for your matrimonial profile.",
    "url": "https://www.freebiodatagenerator.com/templates",
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
      "itemListElement": templates.map((template, index) => ({
        "@type": "CreativeWork",
        "position": index + 1,
        "name": template.name,
        "description": template.description,
        "image": `https://www.freebiodatagenerator.com${template.preview}`,
        "category": template.category
      }))
    }
  }), [templates]);

  return (
    <Helmet>
      <title>Marriage Biodata Templates - Choose Professional Designs</title>
      <meta
        name="description"
        content="Choose from our collection of professional marriage biodata templates. Beautiful, customizable designs for your matrimonial profile with instant download."
      />
      <meta
        name="keywords"
        content="marriage biodata templates, matrimonial templates, biodata designs, wedding biodata, professional biodata"
      />
      <link rel="canonical" href="https://www.freebiodatagenerator.com/templates" />
      <meta property="og:title" content="Marriage Biodata Templates Gallery" />
      <meta property="og:description" content="Choose from beautiful marriage biodata templates" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.freebiodatagenerator.com/templates" />
      <meta property="og:image" content="https://www.freebiodatagenerator.com/templates-gallery.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Marriage Biodata Templates Gallery" />
      <meta name="twitter:description" content="Choose from beautiful marriage biodata templates" />
      <meta name="twitter:image" content="https://www.freebiodatagenerator.com/templates-gallery.jpg" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Marriage Biodata Maker" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
});

TemplatePageSEO.displayName = 'TemplatePageSEO';

// Memoized Breadcrumb Component
const Breadcrumb = memo(() => {
  const navigate = useNavigate();

  const handleHomeClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleCreateBiodataClick = useCallback(() => {
    navigate('/create-biodata');
  }, [navigate]);

  return (
    <nav aria-label="Breadcrumb navigation" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        <li>
          <button
            onClick={handleHomeClick}
            className="hover:text-pink-600 transition-colors"
          >
            Home
          </button>
        </li>
        <li className="flex items-center space-x-2">
          <span>/</span>
          <button
            onClick={handleCreateBiodataClick}
            className="hover:text-pink-600 transition-colors"
          >
            Create Biodata
          </button>
        </li>
        <li className="flex items-center space-x-2">
          <span>/</span>
          <span className="text-gray-900 font-medium">Templates Gallery</span>
        </li>
      </ol>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

// Memoized Template Card Component
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
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img
          src={template.preview}
          alt={`${template.name} - Professional marriage biodata template preview`}
          className="w-full h-64 object-contain cursor-pointer hover:scale-105 transition-transform"
          onClick={handleImageClick}
          loading="lazy"
          width="300"
          height="256"
        />
        <div className="absolute top-2 right-2 bg-pink-600 text-white px-2 py-1 rounded-full text-xs">
          {template.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{template.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
        <Button
          onClick={handleButtonClick}
          className="w-full text-white bg-blue-600 hover:bg-blue-700"
          aria-label={`View details of ${template.name} biodata template`}
        >
          View Details
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

  if (!formData) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <TemplatePageSEO templates={templates} />

      <div className="max-w-6xl mx-auto">
        <Breadcrumb />

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <LayoutGrid className="w-8 h-8" />
            Marriage Biodata Templates
          </h1>
          <p className="text-gray-600 text-lg">
            Choose from our collection of professional biodata templates. Each design is crafted to showcase your profile beautifully.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onViewDetails={handleViewDetails}
            />
          ))}
        </section>
      </div>
    </div>
  );
});

TemplatePage.displayName = 'TemplatePage';

export default TemplatePage;
