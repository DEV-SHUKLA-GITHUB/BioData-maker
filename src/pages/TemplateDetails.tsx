import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  memo
} from 'react';
import { Helmet } from 'react-helmet';
import {
  useParams,
  useLocation,
  useNavigate
} from 'react-router-dom';
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
import preview1 from '/assets/template1Preview.webp';
import preview2 from '/assets/template2Preview.webp';
import preview3 from '/assets/template3Preview.webp';
import preview4 from '/assets/template4Preview.webp';
import preview5 from '/assets/template5Preview.webp';
import preview6 from '/assets/template6Preview.webp';
import preview7 from '/assets/template7Preview.webp';

interface TemplateData {
  id: number;
  component: JSX.Element;
  preview: string;
  name: string;
  description: string;
  category: string;
  designStyle: string;
  community: string;
  seoKeywords: string[];
}

// SEO Component for Template Detail
const TemplateDetailSEO = memo(({ template }: { template?: TemplateData }) => {
  if (!template) return null;

  const enhancedSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": ["WebPage", "CreativeWork"],
    name: `${template.name} Marriage Biodata Template - Free Download PDF`,
    alternateName: [
      `${template.name} Biodata Template`,
      `${template.category} Marriage Biodata`,
      `${template.designStyle} Biodata Format`
    ],
    description: `Download ${template.name} marriage biodata template free. ${template.description} Professional PDF format with customizable fields. Perfect for ${template.community} matrimonial profiles.`,
    url: `https://www.freebiodatagenerator.com/template-detail/${template.id}`,
    category: [template.category, "Marriage", "Matrimonial", "Biodata Template"],
    keywords: template.seoKeywords.join(", "),
    creator: {
      "@type": "Organization",
      name: "Free Biodata Generator",
      url: "https://www.freebiodatagenerator.com"
    },
    dateModified: new Date().toISOString(),
    inLanguage: "en",
    isAccessibleForFree: true,
    usageInfo: "Free for personal matrimonial use",
    audience: {
      "@type": "Audience",
      audienceType: "Marriage seekers, Matrimonial profiles"
    },
    about: {
      "@type": "Thing",
      name: "Marriage Biodata Template",
      description: `${template.designStyle} biodata template for ${template.community} matrimonial purposes`
    },
    mainEntity: {
      "@type": "DigitalDocument",
      name: `${template.name} Biodata Template PDF`,
      encodingFormat: "application/pdf",
      genre: "Matrimonial Document",
      downloadUrl: `https://www.freebiodatagenerator.com/download/${template.id}`,
      fileFormat: "PDF"
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.freebiodatagenerator.com" },
        { "@type": "ListItem", position: 2, name: "Create Biodata", item: "https://www.freebiodatagenerator.com/create-biodata" },
        { "@type": "ListItem", position: 3, name: "Templates", item: "https://www.freebiodatagenerator.com/templates" },
        {
          "@type": "ListItem",
          position: 4,
          name: `${template.name} Template`,
          item: `https://www.freebiodatagenerator.com/template-detail/${template.id}`
        }
      ]
    },
    potentialAction: {
      "@type": "DownloadAction",
      target: `https://www.freebiodatagenerator.com/template-detail/${template.id}`,
      object: {
        "@type": "DigitalDocument",
        name: `${template.name} Biodata Template`
      }
    }
  }), [template]);

  const dynamicKeywords = useMemo(() => {
    const base = [
      `${template.name.toLowerCase()} biodata template`,
      `${template.category.toLowerCase()} marriage biodata`,
      `${template.designStyle.toLowerCase()} biodata format`,
      `free ${template.name.toLowerCase()} template download`,
      `${template.community.toLowerCase()} biodata template`,
      "marriage biodata template PDF",
      "matrimonial biodata download",
      "wedding biodata format"
    ];
    return [...base, ...template.seoKeywords].join(", ");
  }, [template]);

  return (
    <Helmet>
      <title>
        {template.name} Biodata Template - Free Marriage Biodata Download PDF |{" "}
        {template.category}
      </title>
      <meta
        name="description"
        content={`Download ${template.name} marriage biodata template free. ${template.description} Professional PDF format with customizable fields. Perfect for ${template.community} matrimonial profiles. Instant download available.`}
      />
      <meta name="keywords" content={dynamicKeywords} />
      <link
        rel="canonical"
        href={`https://www.freebiodatagenerator.com/template-detail/${template.id}`}
      />

      {/* Open Graph */}
      <meta
        property="og:title"
        content={`${template.name} Marriage Biodata Template - Free Download`}
      />
      <meta
        property="og:description"
        content={`Preview and download ${template.name} biodata template. ${template.description} Professional PDF format for matrimonial use.`}
      />
      <meta
        property="og:url"
        content={`https://www.freebiodatagenerator.com/template-detail/${template.id}`}
      />
      <meta
        property="og:image"
        content={`https://www.freebiodatagenerator.com${template.preview}`}
      />
      <meta property="og:image:alt" content={`${template.name} Template Preview`} />
      <meta property="og:site_name" content="Free Biodata Generator" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={`${template.name} Biodata Template - Free Download`}
      />
      <meta
        name="twitter:description"
        content={`${template.description} Download free PDF biodata template.`}
      />
      <meta
        name="twitter:image"
        content={`https://www.freebiodatagenerator.com${template.preview}`}
      />
      <meta name="twitter:image:alt" content={`${template.name} Template`} />

      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="author" content="Free Biodata Generator Team" />
      <meta name="language" content="English" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />

      <meta name="template-category" content={template.category} />
      <meta name="template-style" content={template.designStyle} />
      <meta name="template-community" content={template.community} />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="theme-color" content="#4F46E5" />

      <link
        rel="preload"
        as="image"
        href={template.preview}
        type="image/webp"
      />

      <script type="application/ld+json">
        {JSON.stringify(enhancedSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: `How to download ${template.name} biodata template?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `Click Download to save the ${template.name} biodata template as a PDF.`
              }
            },
            {
              "@type": "Question",
              name: `Is ${template.name} template suitable for ${template.community} marriages?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `Yes, designed specifically for ${template.community} matrimonial purposes.`
              }
            },
            {
              "@type": "Question",
              name: `Can I customize the ${template.name} biodata template?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `Yes, you can customize all fields before downloading as PDF.`
              }
            }
          ]
        })}
      </script>
    </Helmet>
  );
});

TemplateDetailSEO.displayName = 'TemplateDetailSEO';

const Breadcrumb = memo(({ template }: { template?: TemplateData }) => {
  const navigate = useNavigate();
  const goHome = useCallback(() => navigate('/'), [navigate]);
  const goCreate = useCallback(() => navigate('/create-biodata'), [navigate]);
  const goTemplates = useCallback(() => navigate('/templates'), [navigate]);

  return (
    <nav
      aria-label="Biodata template navigation breadcrumb"
      className="mb-4 md:mb-6"
    >
      <ol className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm text-gray-600 flex-wrap">
        <li>
          <button onClick={goHome} aria-label="Navigate to home page">
            Home
          </button>
        </li>
        <li className="flex items-center space-x-1 md:space-x-2">
          <span>/</span>
          <button
            onClick={goCreate}
            aria-label="Navigate to create biodata page"
          >
            Create Biodata
          </button>
        </li>
        <li className="flex items-center space-x-1 md:space-x-2">
          <span>/</span>
          <button
            onClick={goTemplates}
            aria-label="Navigate to templates gallery"
          >
            Templates
          </button>
        </li>
        <li className="flex items-center space-x-1 md:space-x-2">
          <span>/</span>
          <span
            className="text-gray-900 font-medium truncate"
            aria-current="page"
          >
            {template?.name || 'Template Detail'} Biodata Template
          </span>
        </li>
      </ol>
    </nav>
  );
});
Breadcrumb.displayName = 'Breadcrumb';

const StylesComponent = memo(() => (
  <Helmet>
    <style type="text/css">{`
      @media (max-width:768px){
        .pdf-template *{pointer-events:none}
        .template-container{overflow-x:auto}
      }
    `}</style>
  </Helmet>
));
StylesComponent.displayName = 'StylesComponent';

const TemplateDetail = memo(() => {
  const { templateId } =
    useParams<{ templateId: string }>();
  const { state } = useLocation();
  const { formData } = (state as any) || {};
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!formData) navigate('/create-biodata');
  }, [formData, navigate]);

  const templates: TemplateData[] = useMemo(
    () => [
      {
        id: 1,
        component: <Template3 formData={formData} />,
        preview: preview1,
        name: 'Classic Professional',
        description:
          'Clean and professional design perfect for traditional families',
        category: 'Professional',
        designStyle: 'Professional',
        community: 'Traditional',
        seoKeywords: [
          'clean professional design',
          'traditional family biodata',
          'formal biodata layout',
          'corporate style biodata'
        ]
      },
      {
        id: 2,
        component: <Template7 formData={formData} />,
        preview: preview7,
        name: 'Modern Elegant',
        description: 'Contemporary design with elegant typography',
        category: 'Modern',
        designStyle: 'Contemporary',
        community: 'Modern',
        seoKeywords: [
          'contemporary biodata design',
          'elegant typography biodata',
          'modern matrimonial template',
          'stylish biodata format'
        ]
      },
      {
        id: 3,
        component: <Template4 formData={formData} />,
        preview: preview4,
        name: 'Traditional Heritage',
        description: 'Traditional Indian design with cultural elements',
        category: 'Traditional',
        designStyle: 'Traditional',
        community: 'Indian',
        seoKeywords: [
          'traditional Indian biodata',
          'cultural biodata elements',
          'heritage biodata design',
          'ethnic biodata template'
        ]
      },
      {
        id: 4,
        component: <Template6 formData={formData} />,
        preview: preview6,
        name: 'Minimalist Style',
        description:
          'Simple and clean design focusing on essential information',
        category: 'Minimalist',
        designStyle: 'Minimalist',
        community: 'Contemporary',
        seoKeywords: [
          'minimalist biodata design',
          'simple biodata template',
          'clean biodata format',
          'minimal matrimonial template'
        ]
      },
      {
        id: 5,
        component: <Template5 formData={formData} />,
        preview: preview5,
        name: 'Floral Design',
        description: 'Beautiful floral patterns perfect for wedding biodata',
        category: 'Decorative',
        designStyle: 'Decorative',
        community: 'Traditional',
        seoKeywords: [
          'floral biodata template',
          'decorative marriage biodata',
          'wedding biodata with flowers',
          'ornamental biodata format'
        ]
      },
      {
        id: 6,
        component: <Template1 formData={formData} />,
        preview: preview2,
        name: 'Royal Classic',
        description:
          'Luxurious design with royal elements and gold accents',
        category: 'Luxury',
        designStyle: 'Luxury',
        community: 'Traditional',
        seoKeywords: [
          'royal biodata template',
          'luxury marriage biodata',
          'gold accent biodata',
          'premium biodata design'
        ]
      },
      {
        id: 7,
        component: <Template2 formData={formData} />,
        preview: preview3,
        name: 'Contemporary Chic',
        description:
          'Modern chic design with sophisticated typography',
        category: 'Contemporary',
        designStyle: 'Chic',
        community: 'Urban',
        seoKeywords: [
          'contemporary biodata design',
          'chic marriage biodata',
          'sophisticated biodata template',
          'stylish contemporary format'
        ]
      }
    ],
    [formData]
  );

  const current = useMemo(
    () => templates.find(
      (t) => t.id === parseInt(templateId || '0')
    ),
    [templates, templateId]
  );

  const [isDownloading, setIsDownloading] =
    useState(false);

  const handleDownload = useCallback(async () => {
    if (!current) return;
    setIsDownloading(true);
    await new Promise((r) => setTimeout(r, 100));
    const el = document.getElementById(
      `template-${current.id}`
    );
    if (el) {
      try {
        const canvas = await html2canvas(el, {
          scale: 2,
          useCORS: true,
          backgroundColor: null
        });
        const imgData = canvas.toDataURL(
          'image/jpeg',
          1.0
        );
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        const imgWidth = 210;
        const imgHeight =
          (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(
          imgData,
          'JPEG',
          0,
          0,
          imgWidth,
          imgHeight
        );
        pdf.save(
          `${current.name
            .toLowerCase()
            .replace(/\s+/g, '-')}-biodata.pdf`
        );
      } catch (e) {
        console.error(e);
        alert(
          'Error generating PDF. Please try again.'
        );
      } finally {
        setIsDownloading(false);
      }
    }
  }, [current]);

  const backToTemplates = useCallback(() => {
    navigate('/templates', { state: { formData } });
  }, [navigate, formData]);

  if (!formData || !current) return null;

  return (
    <>
      <StylesComponent />
      <div className="min-h-screen bg-gray-50 p-2 md:p-8">
        <TemplateDetailSEO template={current} />
        <div className="max-w-6xl mx-auto">
          <Breadcrumb template={current} />

          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <Button
              onClick={backToTemplates}
              className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2"
              aria-label="Back to templates gallery"
            >
              <ArrowLeft className="mr-2" />
              Back to Templates
            </Button>

            <div className="text-left md:text-right">
              <h1 className="text-2xl font-bold text-gray-800">
                {current.name} Marriage Biodata Template
              </h1>
              <p className="text-base text-gray-600">
                {current.description} –{' '}
                {current.category}{' '}
                {current.designStyle} Design
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Free PDF Download •{' '}
                {current.community} Community •
                Customizable Format
              </p>
            </div>
          </div>

          <main
            className={`bg-white rounded-lg shadow-lg overflow-hidden template-container ${
              isDownloading ? 'downloading' : ''
            }`}
          >
            <div className="md:p-4">
              <div
                id={`template-${current.id}`}
                className={`pdf-template w-[130rem] h-[1300px] md:w-full md:h-auto transform scale-[0.4] md:scale-100 -mx-[240px] -my-[336px] md:mx-0 md:my-0 overflow-visible print:scale-100`}
              >
                {current.component}
              </div>
            </div>
          </main>

          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3"
              aria-label={`Download ${current.name} Template PDF for ${current.community} matrimonial use`}
            >
              <Download className="mr-2" />
              {isDownloading
                ? 'Generating PDF...'
                : `Download ${current.name} PDF`}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
});

TemplateDetail.displayName = 'TemplateDetail';
export default TemplateDetail;
