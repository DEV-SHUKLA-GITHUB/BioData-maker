import { motion,AnimatePresence } from 'framer-motion';
import React, {useState,useCallback, useMemo } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

const FAQs: React.FC = () => {
  const faqs = useMemo(() => [
    {
      question: "How do I create a marriage biodata?",
      answer: "Simply click the 'Get Started' button, fill in your personal details, choose a template, and download your professional biodata instantly."
    },
    {
      question: "Are the templates customizable?",
      answer: "Yes! You can customize colors, fonts, add or remove fields, and personalize the layout to match your preferences."
    },
    {
      question: "Is the service free to use?",
      answer: "Yes, our basic biodata maker is completely free. You can create and download professional biodata without any cost."
    },
    {
      question: "What format is the final biodata?",
      answer: "Your biodata will be generated as a high-quality PDF file that you can print or share digitally."
    }
  ], []);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = useCallback((index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  }, [openIndex]);

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
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our biodata maker service.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full bg-white rounded-lg shadow-md p-6 text-left hover:shadow-lg transition-shadow flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-pink-500 flex-shrink-0" />
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white px-6 pb-6 pt-2 ml-6 border-l-2 border-pink-500">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs