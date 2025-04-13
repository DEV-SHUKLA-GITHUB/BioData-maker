import React from 'react';

// Define types for formData and props
interface FormData {
  personalDetails: Record<string, string>;
  familyDetails: Record<string, string>;
  contactDetails: Record<string, string>;
  image?: File;
}

interface Template1Props {
  formData: FormData;
}

const Template1: React.FC<Template1Props> = ({ formData }) => (
  <div className="bg-white shadow-lg rounded-xl overflow-hidden">
    {/* Header Section */}
    <div className="bg-blue-800 text-white p-8">
      <h1 className="text-4xl font-bold">
        {formData.personalDetails?.name || 'Full Name'}
      </h1>
      <p className="text-xl mt-2">
        {formData.personalDetails?.work || 'Occupation'}
      </p>
    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      {/* Personal Details Column */}
      <div>
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          Personal Details
        </h2>
        {(Object.entries(formData.personalDetails) as [string, string][]).map(
          ([key, value]) => (
            <div key={key} className="mb-3">
              <span className="font-semibold">{key}:</span> {value}
            </div>
          )
        )}
      </div>

      {/* Contact Details Column */}
      <div>
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          Contact Details
        </h2>
        {(Object.entries(formData.contactDetails) as [string, string][]).map(
          ([key, value]) => (
            <div key={key} className="mb-3">
              <span className="font-semibold">{key}:</span> {value}
            </div>
          )
        )}
      </div>

      {/* Family Details Column */}
      <div>
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Family Details</h2>
        {(Object.entries(formData.familyDetails) as [string, string][]).map(
          ([key, value]) => (
            <div key={key} className="mb-3">
              <span className="font-semibold">{key}:</span> {value}
            </div>
          )
        )}
      </div>

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
    </div>
  </div>
);

export default Template1;
