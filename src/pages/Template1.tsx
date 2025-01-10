// BiodataTemplate.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import bg from '../assets/bg1.jpg';
import { div } from 'framer-motion/client';

const BiodataTemplate = () => {
  const location = useLocation();
  const { formData } = location.state as { formData: any };
  const bgImageUrl = `url(${bg})`;

  const handleDownload = async () => {
    const element = document.getElementById('biodata-template');
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('biodata.pdf');
    }
  };

  return (
   <div className='flex flex-col justify-center h-full content-center items-center bg-gray-50 ' > <div className="">
   <div className="max-w-4xl mx-auto">
     <Button 
       onClick={handleDownload}
       className="mb-4 bg-blue-600 hover:bg-blue-700"
     >
       <Download className="mr-2 h-4 w-4" />
       Download PDF
     </Button>

<div id="biodata-template" className='w-full' style={{ backgroundImage: bgImageUrl, backgroundSize: 'cover', width: '100%',height:'52rem', backgroundRepeat: 'no-repeat' }}>     <div  className="shadow-lg p-20 pl-10 pr-12 sm:pr-20 rounded-lg overflow-hidden" >
       {/* Header */}
       {/* <div className="flex items-center justify-between p-8">
         <div>
           <h1 className="text-3xl font-bold mb-2">{formData.personalDetails.name}</h1>
           <p className="text-lg opacity-90">{formData.personalDetails.work}</p>
         </div>
         {formData.image && (
           <img
             src={URL.createObjectURL(formData.image)}
             alt="Profile"
             className="w-32 h-32 rounded-full object-cover border-4 border-white"
           />
         )}
       </div> */}

       {/* Content Grid */}
       <div className="p-10 grid pt-10 grid-cols-2 gap-4">
         {/* Personal and Family Details Column */}
         <div className="space ">
           {/* Personal Details */}
           <div className="border-b pb-4 ">
             <h2 className="text-xl font-semibold text-blue-800 mb-4">Personal Details</h2>
             <div className="">
               {Object.entries(formData.personalDetails).map(([key, value]) => (
                 key !== 'image' && (
                  <p key={key} className='flex-wrap w-40'>
                  <span className="text-xs font-bold">
                    {key.split(/(?=[A-Z])/).join(' ').charAt(0).toUpperCase() + 
                     key.split(/(?=[A-Z])/).join(' ').slice(1)}:
                  </span>{' '}
                  <span className="break-words ">{value as string}</span>
                </p>
                 )
               ))}
             </div>
           </div>

           {/* Family Details */}
           <div className="border-b pb-4 ">
             <h2 className="text-xl font-semibold text-blue-800 mb-4">Family Details</h2>
             <div className="">
               {Object.entries(formData.familyDetails).map(([key, value]) => (
                  <p key={key} className='flex-wrap w-40'>
                  <span className="text-xs font-bold">
                    {key.split(/(?=[A-Z])/).join(' ').charAt(0).toUpperCase() + 
                     key.split(/(?=[A-Z])/).join(' ').slice(1)}:
                  </span>{' '}
                  <span className="break-words ">{value as string}</span>
                </p>
               ))}
             </div>
           </div>
         </div>

         {/* Image and Contact Details Column */}
         <div className="space-y-6">
            {/* Profile Image */}
            {formData.image ? (
  <img
    src={URL.createObjectURL(formData.image)}
    alt="Profile"
    className="w-40 h-60 object-cover border border-gray-300"
  />
) : (
  <div className="w-40 h-40 rounded-full border border-gray-300 flex items-center justify-center">
    <span className="text-gray-500">No Image</span>
  </div>
)}

           {/* Contact Details */}
           <div className="border-b pb-4">
             <h2 className="text-xl font-semibold text-blue-800 mb-4">Contact Details</h2>
             <div className="">
               {Object.entries(formData.contactDetails).map(([key, value]) => (
               <p key={key} className='flex-wrap w-40'>
               <span className="text-xs font-bold">
                 {key.split(/(?=[A-Z])/).join(' ').charAt(0).toUpperCase() + 
                  key.split(/(?=[A-Z])/).join(' ').slice(1)}:
               </span>{' '}
               <span className="break-words ">{value as string}</span>
             </p>
             
               ))}
             </div>
           </div>

          
         </div>
       </div></div>
     </div>
   </div>
 </div></div>
  );
};

export default BiodataTemplate;
