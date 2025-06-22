  import { useState,useEffect } from 'react';
  import { useLocation } from 'react-router-dom';
  import { Button } from '../components/ui/button';
  import { Download, LayoutGrid } from 'lucide-react';
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

  const BiodataTemplate = () => {
    const location = useLocation();
    const { formData } = location.state as { formData: any };
    const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
    const [showTemplateGallery, setShowTemplateGallery] = useState(true);
useEffect(() => {
  window.scrollTo(0, 0);
}, []);
    const templates = [
      { id: 1, component: <Template3 formData={formData} />, preview: preview1 },
      { id: 2, component: <Template7 formData={formData} />, preview: preview7 },
      { id: 3, component: <Template4 formData={formData} />, preview: preview4 },
      { id: 4, component: <Template6 formData={formData} />, preview: preview6 },
      { id: 5, component: <Template5 formData={formData} />, preview: preview5 },
      { id: 6, component: <Template1 formData={formData} />, preview: preview2 },
      { id: 7, component: <Template2 formData={formData} />, preview: preview3 },
    ];

    const handleDownload = async (templateId: number) => {
      const element = document.getElementById(`template-${templateId}`);
      if (element) {
        // Set options for better quality and to capture background images
        const canvas = await html2canvas(element, {
          scale: 2, // Higher scale for better quality
          useCORS: true, // Enable CORS to load external images
          allowTaint: true, // Allow cross-origin images
          backgroundColor: null, // Transparent background  
          logging: true, // For debugging
          onclone: (clonedDoc) => {
            // Force background image to be loaded in the cloned document
            const clonedElement = clonedDoc.getElementById(`template-${templateId}`);
            if (clonedElement) {
              clonedElement.style.width = '1000px'; // A4 width in pixels at 96 DPI
              clonedElement.style.height = '1900px'; // A4 height in pixels at 96 DPI
            }
          }
        });
        
        // Get dimensions with the right aspect ratio
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Create PDF with A4 dimensions
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        // Add the image to the PDF, maintaining aspect ratio
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        
        pdf.save(`biodata-template-${templateId}.pdf`);
      }
    };

    if (showTemplateGallery) {
      return (
        <div className="min-h-screen bg-gray-50 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
              <LayoutGrid className="w-8 h-8" />
              Choose a Template
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.map((template) => (
                <div 
                  key={template.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <img
                    src={template.preview}
                    alt={`Template ${template.id}`}
                    className="w-full h-64 object-contain cursor-pointer"
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      setShowTemplateGallery(false);
                    }}
                  />
                  <div className="p-4">
                    <Button
    onClick={(e) => {
      e.stopPropagation();
      setSelectedTemplate(template.id);
      setShowTemplateGallery(false); // <-- Add this line to show the template!
    }}
    className="w-full text-white bg-blue-600 hover:bg-blue-700"
  >
    View Template
  </Button>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <Button
            onClick={() => setShowTemplateGallery(true)}
            className="mb-6 text-white bg-gray-800 hover:bg-gray-700"
          >
            ← Back to Templates
          </Button>
          
          {templates.map((template) => (
            <div 
              key={template.id}
              id={`template-${template.id}`}
              className={`${selectedTemplate === template.id ? 'block' : 'hidden'} pdf-template`}
            >
              {template.component}
            </div>
          ))}

          <div className="mt-6">
            <Button 
              onClick={() => selectedTemplate && handleDownload(selectedTemplate)}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Current Template
            </Button>
          </div>
        </div>
      </div>
    );
  };

  export default BiodataTemplate;
