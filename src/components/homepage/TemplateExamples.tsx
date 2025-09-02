import { motion } from 'framer-motion';
import React, {useState,useCallback, useMemo } from 'react';
import img1 from '../../../public/assets/template1Preview.webp';
import img2 from '../../../public/assets/template2Preview.webp';
import img3 from '../../../public/assets/template7Preview.webp';
// import img4 from '../../public/assets/template4Preview.webp';
import img5 from '../../../public/assets/template5Preview.webp';
const TemplateExamples: React.FC = () => {
  // const navigate = useNavigate();

  const templates = useMemo(() => [
    {
      image: img1,
      title: "Professional Classic",
      description: "Perfect for traditional families",
      category: "Professional"
    },
    {
      image: img2,
      title: "Modern Elegant",
      description: "Contemporary design with style",
      category: "Modern"
    },
    {
      image: img3,
      title: "Traditional Heritage",
      description: "Cultural elements and patterns",
      category: "Traditional"
    },
    {
      image: img5,
      title: "Minimalist Chic",
      description: "Clean and sophisticated",
      category: "Minimalist"
    },
  ], []);
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}> = ({ src, alt, className = '', loading = 'lazy' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded"></div>
      )}

      <img
        src={src}
        alt={alt}
        loading={loading}
        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        onLoad={handleLoad}
        onError={handleError}
      />

      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
          Failed to load image
        </div>
      )}
    </div>
  );
};
  // const handlePreviewTemplate = useCallback(() => {
  //   navigate('/template');
  // }, [navigate]);

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Beautiful Marriage Biodata Templates
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of professionally designed templates.
            Each template is crafted with attention to detail and cultural sensitivity.
          </p>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {templates.map((template) => (
            <motion.article
              key={template.title}
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="relative overflow-hidden">
                <OptimizedImage
                  src={template.image}
                  alt={`${template.title} - ${template.description}`}
                  className="w-full h-100 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-pink-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {template.category}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{template.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                {/* <button 
                  onClick={handlePreviewTemplate}
                  className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Preview Template
                </button> */}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TemplateExamples