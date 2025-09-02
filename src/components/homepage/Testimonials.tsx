// import { motion, } from 'framer-motion';
import React, { useMemo } from 'react';
import { Star} from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = useMemo(() => [
    {
      name: "Priya Sharma",
      location: "Mumbai, India",
      rating: 5,
      text: "The biodata templates are beautiful and professional. It made creating my matrimonial profile so much easier!"
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi, India",
      rating: 5,
      text: "Excellent service! The templates are customizable and the download process is instant. Highly recommended."
    },
    {
      name: "Sneha Patel",
      location: "Bangalore, India",
      rating: 5,
      text: "User-friendly interface and stunning templates. Perfect for creating professional biodata quickly."
    }
  ], []);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who have created their perfect biodata with our platform.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <div
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials