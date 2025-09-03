import React from 'react';
import { Helmet } from 'react-helmet';
import bg from "/assets/bg1.jpg";

interface FormData {
  PersonalDetails?: Record<string, string>;
  FamilyDetails?: Record<string, string>;
  ContactDetails?: Record<string, string>;
  image?: File;
}

interface Template1Props {
  formData: FormData;
}

// SEO Component for Template1
const Template1SEO = ({ formData }: { formData: FormData }) => {
  const personName = formData?.PersonalDetails?.Name || "Professional";
  
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": personName,
    "description": `Marriage biodata for ${personName} - Professional matrimonial profile`,
    "image": formData?.image ? URL.createObjectURL(formData.image) : undefined,
    "birthDate": formData?.PersonalDetails?.DateofBirth,
    "birthPlace": formData?.PersonalDetails?.PlaceofBirth,
    "jobTitle": formData?.PersonalDetails?.Occupation,
    "alumniOf": formData?.PersonalDetails?.Education,
    "height": formData?.PersonalDetails?.Height,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": formData?.ContactDetails?.ContactNumber,
      "email": formData?.ContactDetails?.EmailId,
      "contactType": "personal"
    }
  };

  return (
    <Helmet>
      <title>Royal Classic Biodata Template - {personName} Marriage Profile</title>
      <meta 
        name="description" 
        content={`Professional marriage biodata for ${personName} using Royal Classic template. Luxurious design with royal elements and gold accents.`}
      />
      <meta 
        name="keywords" 
        content={`${personName}, marriage biodata, matrimonial profile, royal classic template, luxury biodata design`}
      />
      
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

// Helper: Add space before each capital letter (except the first)
function addSpaceBeforeCapitals(str: string): string {
  return str.replace(/([A-Z])/g, ' $1').replace(/^ /, '');
}

const Template1: React.FC<Template1Props> = ({ formData }) => {
  const PersonalDetails = formData?.PersonalDetails || {};
  const FamilyDetails = formData?.FamilyDetails || {};
  const ContactDetails = formData?.ContactDetails || {};

  // Parse biodataForm from localStorage
  const localDataRaw = localStorage.getItem('biodataForm');
  const localData = localDataRaw ? JSON.parse(localDataRaw) : undefined;
  const localImage = localData?.imagePreview;

  // Filter out unwanted fields from personal details
  const personalEntries = Object.entries(PersonalDetails)
    .filter(([key, value]) => 
      !['Name', 'DateofBirth', 'PlaceofBirth'].includes(key) && value && value.trim() !== ''
    );

  const familyEntries = Object.entries(FamilyDetails)
    .filter(([, value]) => value && value.trim() !== '');
  const contactEntries = Object.entries(ContactDetails)
    .filter(([, value]) => value && value.trim() !== '');

  // Merge all entries into one array with section labels
  const allItems: [string, string, string][] = [
    ...personalEntries.map(([key, value]) => [key, value, 'PERSONAL DETAILS'] as [string, string, string]),
    ...familyEntries.map(([key, value]) => [key, value, 'FAMILY DETAILS'] as [string, string, string]),
    ...contactEntries.map(([key, value]) => [key, value, 'CONTACT DETAILS'] as [string, string, string])
  ];

  // Single Page component
  const Page = ({
    items,
    showHeader = false
  }: {
    items: [string, string, string][];
    showHeader?: boolean;
  }) => {
    const LINE_WRAP_THRESHOLD = 40;

    return (
      <div 
        className="relative rounded-lg template-container" 
        style={{
          width: '100%',
          minHeight: '100vh',
          aspectRatio: '0.7',
          padding: '0',
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative',
          color: 'black',
          backgroundColor: '#ffffff',
          border: '1px solid #ddd',
          overflow: 'hidden'
        }}
        role="document"
        aria-label="Marriage biodata template"
      >
        {/* Background image */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 1
          }}
          aria-hidden="true"
        />

        {/* Content overlay */}
        <div className="h-full relative"
          style={{
            fontSize: '0.75rem',
            position: 'relative',
            zIndex: 2,
            paddingLeft: '10rem',
            paddingRight: '10rem',
            paddingTop: showHeader ? '3rem' : '3rem',
            paddingBottom: '3rem',
            color: 'black',
            lineHeight: '1rem'
          }}>

          {/* Header Section */}
          {showHeader && (
            <header className="flex flex-row items-center gap-8 mb-8 mt-40 rounded-lg p-6 shadow-lg backdrop-blur-sm">
              {/* Profile Image */}
              {(formData?.image || localImage) && (
                <div className="w-32 h-32 overflow-hidden rounded-full shadow-lg border-4 border-white flex-shrink-0">
                  <img
                    src={
                      formData.image
                        ? URL.createObjectURL(formData.image)
                        : localImage || ""
                    }
                    alt={`Profile photo of ${PersonalDetails?.Name || 'Individual'}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {/* Name and Basic Info */}
              <div className="flex flex-col justify-center text-left">
                {PersonalDetails?.Name && PersonalDetails.Name.trim() !== '' && (
                  <h1 className="text-3xl font-bold mb-2 text-gray-800">
                    {PersonalDetails.Name}
                  </h1>
                )}
                {PersonalDetails?.DateofBirth && PersonalDetails.DateofBirth.trim() !== '' && (
                  <p className="text-lg mb-1 text-gray-700">
                    <span className="font-semibold">Date of Birth:</span> 
                    <time dateTime={PersonalDetails.DateofBirth}>{PersonalDetails.DateofBirth}</time>
                  </p>
                )}
                {PersonalDetails?.PlaceofBirth && PersonalDetails.PlaceofBirth.trim() !== '' && (
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">Place of Birth:</span> {PersonalDetails.PlaceofBirth}
                  </p>
                )}
              </div>
            </header>
          )}

          {/* Data Layout */}
          <main className="space-y-3">
            {items.map((item, index) => {
              const [key, value, section] = item;
              if (!value || value.trim() === "") return null;

              const isNewSection = index === 0 || items[index - 1][2] !== section;
              const isMultiLine = value.length > LINE_WRAP_THRESHOLD;

              return (
                <div key={`${section}-${key}-${index}`}>
                  {/* Section Header */}
                  {isNewSection && (
                    <div className="mb-4 mt-6">
                      <h2 className="inline-block px-6 py-2 rounded-full bg-amber-500 pb-5 text-white font-semibold text-sm shadow-lg">
                        {section}
                      </h2>
                    </div>
                  )}
                  {/* Data Row */}
                  <div
                    className={`flex justify-between items-start ${isMultiLine ? "" : "py-2"}`}
                    style={{
                      lineHeight: isMultiLine ? '1.5' : '.1rem',
                    }}
                  >
                    <dt
                      className="font-semibold w-1/4 text-black text-base mr-4 flex-shrink-0"
                      style={{ lineHeight: isMultiLine ? '1.5' : '.1rem' }}
                    >
                      {addSpaceBeforeCapitals(key)}:
                    </dt>
                    <dd
                      className="text-black w-1/2 text-base text-start"
                      style={{
                        lineHeight: isMultiLine ? '1.2' : '.1rem',
                      }}
                    >
                      {value}
                    </dd>
                  </div>
                </div>
              );
            })}
          </main>

          {/* Page Number */}
          <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs text-gray-600 shadow-md">
            Page 1 of 1
          </div>
        </div>
      </div>
    );
  };

  return (
    <article className="biodata-template">
      <Template1SEO formData={formData} />
      <Page items={allItems} showHeader={true} />
    </article>
  );
};

export default Template1;
