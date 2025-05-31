import React from 'react';
import bg from "../assets/bg3.jpg";

// Define types for formData and props
interface FormData {
  personalDetails?: Record<string, string>; // Make optional
  familyDetails?: Record<string, string>;   // Make optional
  contactDetails?: Record<string, string>;  // Make optional
  image?: File;
}

interface Template3Props { // Fixed interface name
  formData: FormData;
}

const Template3: React.FC<Template3Props> = ({ formData }) => {
  // Add default values to prevent undefined errors
  const personalDetails = formData?.personalDetails || {};
  const familyDetails = formData?.familyDetails || {};
  const contactDetails = formData?.contactDetails || {};

  return (
    <div className="relative rounded-lg template-container" style={{
      width: '100%',
      height: '100%',
      aspectRatio: '0.7',
      padding: '5%',
      maxWidth: '800px',
      margin: '0 auto',
      position: 'relative',
      color: 'black',
      backgroundColor: '#ffffff',
      border: '1px solid #ddd'
    }}>
      {/* Use an actual image element instead of background-image for better PDF compatibility */}
      <img 
        src={bg} 
        alt="Background" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          zIndex: 1
        }}
      />
      
      <div className="h-full overflow-y-auto pt-32 ps-16 relative" 
        style={{ 
          fontSize: '0.65rem',
          width:'40rem',
          height:'62rem',
          position: 'relative',
          zIndex: 2
        }}>
        {/* Header Section with Image and Name */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-4">
          {/* Profile Image */}
          {formData?.image && <div className="w-28 h-28 overflow-hidden">
            {formData.image ? (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Profile"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-700 text-xs">No Image</span>
              </div>
            )}
          </div>}
          
          {/* Name and Basic Info */}
          <div className={`flex ${formData?.image ? "" : "justify-center items-center"} h-full w-full`}>
            <div className="flex flex-col justify-center mr-8">
              <h1 className="text-2xl font-bold">
                {personalDetails?.name || 'Mahima Jain Aggarwal'}
              </h1>
              <p className="mt-1 text-sm">
                Date of Birth: {personalDetails?.dateOfBirth || '03 November 1995'}
              </p>
              <p className="text-sm">
                Place of Birth: {personalDetails?.placeOfBirth || 'New Delhi'}
              </p>
            </div>
          </div>
        </div>

        {/* Details Sections */}
        <div className="space-y-4">
          {/* Personal Details Section */}
          {Object.keys(personalDetails).length > 0 && (
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-amber-500 text-white font-semibold mb-2 pb-4 text-sm">
                PERSONAL DETAILS
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                {Object.entries(personalDetails)
                  .filter(([key]) => !['name', 'dateOfBirth', 'placeOfBirth'].includes(key))
                  .map(([key, value]) => (
                    <div key={key} className="flex leading-relaxed py-1">
                      <span className="w-1/2 font-semibold">{key}</span>
                      <span className="w-1/2">{value}</span>
                    </div>              
                  ))}
              </div>
            </div>
          )}

          {/* Family Details Section */}
          {Object.keys(familyDetails).length > 0 && (
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-amber-500 text-white font-semibold mb-2 pb-4 text-sm">
                FAMILY DETAILS
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                {Object.entries(familyDetails).map(([key, value]) => (
                  <div key={key} className="flex leading-relaxed py-1">
                    <span className="w-1/2 font-semibold">{key}</span>
                    <span className="w-1/2">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Contact Details Section */}
          {Object.keys(contactDetails).length > 0 && (
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-amber-500 text-white font-semibold mb-2 pb-4 text-sm">
                CONTACT DETAILS
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                {Object.entries(contactDetails).map(([key, value]) => (
                  <div key={key} className="flex leading-relaxed py-1">
                    <span className="w-1/2 font-semibold">{key}</span>
                    <span className="w-1/2">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template3;
