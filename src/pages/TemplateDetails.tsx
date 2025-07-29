// TemplateDetail.tsx - Corrected version
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Download, ArrowLeft } from 'lucide-react';
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

// SEO Component for Template Detail
const TemplateDetailSEO = ({ template }: { template: TemplateData | undefined }) => {
  if (!template) return null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${template.name} - Biodata Template`,
    "description": `Preview and download the ${template.name} biodata template. ${template.description}`,
    "url": `https://www.freebiodatagenerator.com/template-detail/${template.id}`,
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
          "name": "Templates",
          "item": "https://www.freebiodatagenerator.com/templates"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": template.name,
          "item": `https://www.freebiodatagenerator.com/template-detail/${template.id}`
        }
      ]
    }
  };

  return (
    <Helmet>
      <title>{template.name} - Marriage Biodata Template</title>
      <meta
        name="description"
        content={`Preview and download the ${template.name} biodata template. ${template.description}`}
      />
      <meta
        name="keywords"
        content={`${template.name}, biodata template, marriage biodata, matrimonial profile, ${template.category}`}
      />
      <link rel="canonical" href={`https://www.freebiodatagenerator.com/template-detail/${template.id}`} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={`${template.name} - Biodata Template`} />
      <meta property="og:description" content={`Preview the ${template.name} biodata template`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://www.freebiodatagenerator.com/template-detail/${template.id}`} />
      <meta property="og:image" content={`https://www.freebiodatagenerator.com${template.preview}`} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${template.name} Template`} />
      <meta name="twitter:description" content={template.description} />
      <meta name="twitter:image" content={`https://www.freebiodatagenerator.com${template.preview}`} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

// Breadcrumb Component
const Breadcrumb = ({ template }: { template: TemplateData | undefined }) => {
  const navigate = useNavigate();

  return (
    <nav aria-label="Breadcrumb navigation" className="mb-4 md:mb-6">
      <ol className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm text-gray-600 flex-wrap">
        <li>
          <button
            onClick={() => navigate('/')}
            className="hover:text-pink-600 transition-colors"
          >
            Home
          </button>
        </li>
        <li className="flex items-center space-x-1 md:space-x-2">
          <span>/</span>
          <button
            onClick={() => navigate('/create-biodata')}
            className="hover:text-pink-600 transition-colors"
          >
            Create Biodata
          </button>
        </li>
        <li className="flex items-center space-x-1 md:space-x-2">
          <span>/</span>
          <button
            onClick={() => navigate('/templates')}
            className="hover:text-pink-600 transition-colors"
          >
            Templates
          </button>
        </li>
        <li className="flex items-center space-x-1 md:space-x-2">
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">
            {template?.name || 'Template Detail'}
          </span>
        </li>
      </ol>
    </nav>
  );
};

const TemplateDetail = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state as { formData: any } || {};
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If no form data, redirect to create biodata page
  useEffect(() => {
    if (!formData) {
      navigate('/create-biodata');
    }
  }, [formData, navigate]);

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

  const currentTemplate = templates.find(t => t.id === parseInt(templateId || '0'));

  const handleDownload = async () => {
    if (!currentTemplate) return;
    
    setIsDownloading(true);
    
    // Wait for the DOM to update
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const element = document.getElementById(`template-${currentTemplate.id}`);
    if (element) {
      try {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          logging: false,
          onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.getElementById(`template-${currentTemplate.id}`);
            if (clonedElement) {
              // Remove all mobile-specific styles for PDF generation
              clonedElement.style.width = '1000px';
              clonedElement.style.height = '1400px';
              clonedElement.style.paddingLeft = '0';
              clonedElement.style.paddingTop = '0';
              clonedElement.style.paddingLeft = '0';
              clonedElement.style.transform = 'none';
              clonedElement.style.scale = '1';
              clonedElement.style.margin = '0';
              clonedElement.classList.remove('ps-[8rem]', 'pt-[55rem]');
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

        pdf.save(`${currentTemplate.name.toLowerCase().replace(/\s+/g, '-')}-biodata.pdf`);
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handleBackToTemplates = () => {
    navigate('/templates', { state: { formData } });
  };

  if (!formData || !currentTemplate) {
    return null; // Will redirect via useEffect
  }

  return (
    <>
      {/* Mobile-specific styles using Helmet for global CSS */}
      <Helmet>
        <style type="text/css">{`
          @media (max-width: 768px) {
            .pdf-template * {
              pointer-events: none;
            }
            
            .pdf-template {
              font-size: inherit !important;
              line-height: inherit !important;
            }
            
            .pdf-template img,
            .pdf-template [style*="background"] {
              display: block !important;
              visibility: visible !important;
            }
            
            .template-container {
              overflow-x: auto;
              overflow-y: hidden;
              -webkit-overflow-scrolling: touch;
              scrollbar-width: none;
              -ms-overflow-style: none;
            }
            
            .template-container::-webkit-scrollbar {
              display: none;
            }
            
            /* Remove padding styles when downloading */
            .downloading .pdf-template {
              padding-left: 0 !important;
              padding-top: 0 !important;
              padding-inline-start: 0 !important;
            }
          }
        `}</style>
      </Helmet>

      <div className="min-h-screen bg-gray-50 p-2 md:p-8">
        <TemplateDetailSEO template={currentTemplate} />

        <div className="max-w-6xl mx-auto">
          <Breadcrumb template={currentTemplate} />

          {/* Header Section - Responsive */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-4">
            <Button
              onClick={handleBackToTemplates}
              className="text-white bg-gray-800 hover:bg-gray-700 text-sm md:text-base px-3 py-2 md:px-4 md:py-2"
              aria-label="Back to templates gallery"
            >
              <ArrowLeft className="mr-2 h-3 w-3 md:h-4 md:w-4" />
              Back to Templates
            </Button>

            <div className="text-left md:text-right">
              <h1 className="text-lg md:text-2xl font-bold text-gray-800">{currentTemplate.name}</h1>
              <p className="text-sm md:text-base text-gray-600">{currentTemplate.description}</p>
            </div>
          </div>

          {/* Template Preview Container - Key Mobile Optimizations */}
          <main className={`bg-white rounded-lg shadow-lg overflow-hidden template-container ${isDownloading ? 'downloading' : ''}`}>
            <div className="md:p-4">
              <div 
                id={`template-${currentTemplate.id}`} 
                className={`pdf-template 
                  w-[130rem] h-[1300px] md:w-full md:h-auto 
                  transform-gpu origin-top-left
                  scale-[0.4] md:scale-100
                  -mx-[240px] -my-[336px] md:mx-0 md:my-0
                  overflow-visible
                  print:w-[210mm] print:h-[297mm] print:scale-100 print:mx-0 print:my-0
                  ${!isDownloading ? "max-md:ps-[8rem] max-md:pt-[55rem]" : ""}`}
                style={{
                  paddingLeft: isDownloading ? '0' : undefined,
                  paddingTop: isDownloading ? '0' : undefined,
                  paddingInlineStart: isDownloading ? '0' : undefined,
                }}
              >
                {currentTemplate.component}
              </div>
            </div>
          </main>

          {/* Download Button - Responsive */}
          <div className="mt-4 md:mt-6 flex justify-center">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 md:px-8 md:py-3 text-base md:text-lg w-full md:w-auto"
              aria-label={`Download ${currentTemplate.name} biodata template as PDF`}
            >
              <Download className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              {isDownloading ? 'Generating PDF...' : 'Download as PDF'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateDetail;
