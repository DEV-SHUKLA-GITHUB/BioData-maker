import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Download, LayoutGrid } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Template1 from './Template1';
// import Template2 from '../components/templates/Template2';
// import Template3 from '../components/templates/Template3';

const BiodataTemplate = () => {
  const location = useLocation();
  const { formData } = location.state as { formData: any };
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [showTemplateGallery, setShowTemplateGallery] = useState(true);

  const templates = [
    { id: 1, component: <Template1 formData={formData} />, preview: '/template1-preview.jpg' },
    // { id: 2, component: <Template2 formData={formData} />, preview: '/template2-preview.jpg' },
    // { id: 3, component: <Template3 formData={formData} />, preview: '/template3-preview.jpg' },
  ];

  const handleDownload = async (templateId: number) => {
    const element = document.getElementById(`template-${templateId}`);
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
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
                  className="w-full h-64 object-cover cursor-pointer"
                  onClick={() => {
                    setSelectedTemplate(template.id);
                    setShowTemplateGallery(false);
                  }}
                />
                <div className="p-4">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(template.id);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Template {template.id}
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
          className="mb-6 bg-gray-800 hover:bg-gray-700"
        >
          ← Back to Templates
        </Button>
        
        {templates.map((template) => (
          <div 
            key={template.id}
            id={`template-${template.id}`}
            className={`${selectedTemplate === template.id ? 'block' : 'hidden'}`}
          >
            {template.component}
          </div>
        ))}

        <div className="mt-6">
          <Button 
            onClick={() => selectedTemplate && handleDownload(selectedTemplate)}
            className="bg-blue-600 hover:bg-blue-700"
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
