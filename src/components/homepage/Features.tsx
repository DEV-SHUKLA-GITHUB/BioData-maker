import React, { useMemo } from 'react';
import { FileText, Download, Paintbrush } from 'lucide-react';

const Features: React.FC = () => {
  const features = useMemo(() => [
    {
      icon: FileText,
      title: "Easy Input",
      description: "Simple forms to fill your matrimonial details quickly and efficiently",
      color: "bg-blue-500"
    },
    {
      icon: Paintbrush,
      title: "Customizable Design",
      description: "Personalize colors, fonts, and styles to match your preferences",
      color: "bg-purple-500"
    },
    {
      icon: Download,
      title: "Instant Download",
      description: "Get your professional biodata in PDF format within seconds",
      color: "bg-green-500"
    }
  ], []);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Marriage Biodata Maker
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform combines ease of use with professional quality,
            making it the perfect choice for creating your matrimonial profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <article
              key={index}
              className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className={`w-16 h-16 mx-auto mb-4 ${feature.color} rounded-full flex items-center justify-center`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
