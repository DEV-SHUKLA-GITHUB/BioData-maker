import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Download, LayoutGrid, ArrowLeft } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';
import Template4 from './Template4';
import Template5 from './Template5';
import Template6 from './Template6';
import Template7 from './Template7';
import preview1 from "../assets/template1Preview.png"
import preview2 from "../assets/template2Preview.png"
import preview3 from "../assets/template3Preview.png"
import preview4 from "../assets/template4Preview.png"
import preview5 from "../assets/template5Preview.png"
import preview6 from "../assets/template6Preview.png"
import preview7 from "../assets/template7Preview.png"

interface TemplateData {
  id: number;
  component: JSX.Element;
  preview: string;
  name: string;
  description: string;
  category: string;
}

// SEO Component for Template Page
const TemplatePageSEO = ({ 
  selectedTemplate, 
  templates 
}: { 
  selectedTemplate: number | null;
  templates: TemplateData[];
}) => {
  const currentTemplate = templates.find(t => t.id === selectedTemplate);
  const isGalleryView = selectedTemplate === null;
  
  const schemaData = {
    "@context": "https://schema.org",
    "@type": isGalleryView ? "CollectionPage" : "WebPage",
    "name": isGalleryView ? "Marriage Biodata Templates Gallery" : `${currentTemplate?.name} - Biodata Template`,
    "description": isGalleryView 
      ? "Choose from our collection of professional marriage biodata templates. Beautiful, customizable designs for your matrimonial profile."
      : `Preview and download the ${currentTemplate?.name} biodata template. ${currentTemplate?.description}`,
    "url": isGalleryView ? "https://yourdomain.com/templates" : `https://yourdomain.com/templates/${currentTemplate?.id}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://yourdomain.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Create Biodata",
          "item": "https://yourdomain.com/create-biodata"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": isGalleryView ? "Templates Gallery" : currentTemplate?.name,
          "item": isGalleryView ? "https://yourdomain.com/templates" : `https://yourdomain.com/templates/${currentTemplate?.id}`
        }
      ]
    },
    ...(isGalleryView && {
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": templates.map((template, index) => ({
          "@type": "CreativeWork",
          "position": index + 1,
          "name": template.name,
          "description": template.description,
          "image": `https://yourdomain.com${template.preview}`,
          "category": template.category
        }))
      }
    })
  };

  return (
    <Helmet>
      <title>
        {isGalleryView 
          ? "Marriage Biodata Templates - Choose Professional Designs" 
          : `${currentTemplate?.name} - Marriage Biodata Template`}
      </title>
      <meta 
        name="description" 
        content={isGalleryView 
          ? "Choose from our collection of professional marriage biodata templates. Beautiful, customizable designs for your matrimonial profile with instant download."
          : `Preview and download the ${currentTemplate?.name} biodata template. ${currentTemplate?.description}`}
      />
      <meta 
        name="keywords" 
        content={isGalleryView
          ? "marriage biodata templates, matrimonial templates, biodata designs, wedding biodata, professional biodata"
          : `${currentTemplate?.name}, biodata template, marriage biodata, matrimonial profile, ${currentTemplate?.category}`}
      />
      <link rel="canonical" href={isGalleryView ? "https://yourdomain.com/templates" : `https://yourdomain.com/templates/${currentTemplate?.id}`} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={isGalleryView ? "Marriage Biodata Templates Gallery" : `${currentTemplate?.name} - Biodata Template`} />
      <meta property="og:description" content={isGalleryView ? "Choose from beautiful marriage biodata templates" : `Preview the ${currentTemplate?.name} biodata template`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={isGalleryView ? "https://yourdomain.com/templates" : `https://yourdomain.com/templates/${currentTemplate?.id}`} />
      <meta property="og:image" content={isGalleryView ? "https://yourdomain.com/templates-gallery.jpg" : `https://yourdomain.com${currentTemplate?.preview}`} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={isGalleryView ? "Marriage Biodata Templates Gallery" : `${currentTemplate?.name} Template`} />
      <meta name="twitter:description" content={isGalleryView ? "Choose from beautiful marriage biodata templates" : currentTemplate?.description} />
      <meta name="twitter:image" content={isGalleryView ? "https://yourdomain.com/templates-gallery.jpg" : `https://yourdomain.com${currentTemplate?.preview}`} />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Marriage Biodata Maker" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

// Breadcrumb Component
const Breadcrumb = ({ selectedTemplate, templates }: { selectedTemplate: number | null; templates: TemplateData[] }) => {
  const navigate = useNavigate();
  const currentTemplate = templates.find(t => t.id === selectedTemplate);
  
  return (
    <nav aria-label="Breadcrumb navigation" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        <li>
          <button
            onClick={() => navigate('/')}
            className="hover:text-pink-600 transition-colors"
          >
            Home
          </button>
        </li>
        <li className="flex items-center space-x-2">
          <span>/</span>
          <button
            onClick={() => navigate('/create-biodata')}
            className="hover:text-pink-600 transition-colors"
          >
            Create Biodata
          </button>
        </li>
        <li className="flex items-center space-x-2">
          <span>/</span>
          <span className="text-gray-900 font-medium">
            {selectedTemplate ? currentTemplate?.name : 'Templates Gallery'}
          </span>
        </li>
      </ol>
    </nav>
  );
};

// Template Card Component
const TemplateCard = ({ 
  template, 
  onSelect 
}: { 
  template: TemplateData; 
  onSelect: (id: number) => void;
}) => {
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img
          src={template.preview}
          alt={`${template.name} - Professional marriage biodata template preview`}
          className="w-full h-64 object-contain cursor-pointer hover:scale-105 transition-transform"
          onClick={() => onSelect(template.id)}
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-pink-600 text-white px-2 py-1 rounded-full text-xs">
          {template.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{template.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
        <Button
          onClick={() => onSelect(template.id)}
          className="w-full text-white bg-blue-600 hover:bg-blue-700"
          aria-label={`Preview ${template.name} biodata template`}
        >
          Preview Template
        </Button>
      </div>
    </article>
  );
};

const BiodataTemplate = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const { formData } = location.state as { formData: any };
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [showTemplateGallery, setShowTemplateGallery] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedTemplate]);

  const templates: TemplateData[] = [
    { 
      id: 1, 
      component: <Template3 formData={formData} />, 
      preview: preview1,
      name: "Classic Professional",
      description: "Clean and professional design perfect for traditional families",
      category: "Professional"
    },
    { 
      id: 2, 
      component: <Template7 formData={formData} />, 
      preview: preview7,
      name: "Modern Elegant",
      description: "Contemporary design with elegant typography and layout",
      category: "Modern"
    },
    { 
      id: 3, 
      component: <Template4 formData={formData} />, 
      preview: preview4,
      name: "Traditional Heritage",
      description: "Traditional Indian design with cultural elements",
      category: "Traditional"
    },
    { 
      id: 4, 
      component: <Template6 formData={formData} />, 
      preview: preview6,
      name: "Minimalist Style",
      description: "Simple and clean design focusing on essential information",
      category: "Minimalist"
    },
    { 
      id: 5, 
      component: <Template5 formData={formData} />, 
      preview: preview5,
      name: "Floral Design",
      description: "Beautiful floral patterns perfect for wedding biodata",
      category: "Decorative"
    },
    { 
      id: 6, 
      component: <Template1 formData={formData} />, 
      preview: preview2,
      name: "Royal Classic",
      description: "Luxurious design with royal elements and gold accents",
      category: "Luxury"
    },
    { 
      id: 7, 
      component: <Template2 formData={formData} />, 
      preview: preview3,
      name: "Contemporary Chic",
      description: "Modern chic design with sophisticated typography",
      category: "Contemporary"
    },
  ];

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplate(templateId);
    setShowTemplateGallery(false);
  };

  const handleDownload = async (templateId: number) => {
    setIsDownloading(true);
    const element = document.getElementById(`template-${templateId}`);
    if (element) {
      try {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          logging: false,
          onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.getElementById(`template-${templateId}`);
            if (clonedElement) {
              clonedElement.style.width = '1000px';
              clonedElement.style.height = '1400px';
            }
          }
        });
        
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        
        const currentTemplate = templates.find(t => t.id === templateId);
        pdf.save(`${currentTemplate?.name.toLowerCase().replace(/\s+/g, '-')}-biodata.pdf`);
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
      } finally {
        setIsDownloading(false);
      }
    }
  };

  if (showTemplateGallery) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <TemplatePageSEO selectedTemplate={null} templates={templates} />
        
        <div className="max-w-6xl mx-auto">
          <Breadcrumb selectedTemplate={null} templates={templates} />
          
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
                onSelect={handleTemplateSelect}
              />
            ))}
          </section>
        </div>
      </div>
    );
  }

  const currentTemplate = templates.find(t => t.id === selectedTemplate);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <TemplatePageSEO selectedTemplate={selectedTemplate} templates={templates} />
      
      <div className="max-w-6xl mx-auto">
        <Breadcrumb selectedTemplate={selectedTemplate} templates={templates} />
        
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => setShowTemplateGallery(true)}
            className="text-white bg-gray-800 hover:bg-gray-700"
            aria-label="Back to templates gallery"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Button>
          
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-800">{currentTemplate?.name}</h1>
            <p className="text-gray-600">{currentTemplate?.description}</p>
          </div>
        </div>
        
        <main className="bg-white rounded-lg shadow-lg p-4">
          {templates.map((template) => (
            <div 
              key={template.id}
              id={`template-${template.id}`}
              className={`${selectedTemplate === template.id ? 'block' : 'hidden'} pdf-template`}
            >
              {template.component}
            </div>
          ))}
        </main>

        <div className="mt-6 flex justify-center">
          <Button 
            onClick={() => selectedTemplate && handleDownload(selectedTemplate)}
            disabled={isDownloading}
            className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 text-lg"
            aria-label={`Download ${currentTemplate?.name} biodata template as PDF`}
          >
            <Download className="mr-2 h-5 w-5" />
            {isDownloading ? 'Generating PDF...' : 'Download as PDF'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BiodataTemplate;
