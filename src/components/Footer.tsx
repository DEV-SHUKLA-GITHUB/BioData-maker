import { Heart } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <Heart className="w-8 h-8 text-pink-500" />
          </div>

          <h3 className="text-2xl font-bold mb-4">Marriage Biodata Maker</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Creating beautiful and professional marriage biodata has never been easier.
            Join thousands of happy families who trust our platform.
          </p>

          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://www.facebook.com/" className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Facebook">
              <FaFacebook size={24} />
            </a>
            <a href="https://x.com/" className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Twitter">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.instagram.com/" className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/" className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </a>
          </div>

          <nav className="mb-8">
            <ul className="flex flex-wrap justify-center space-x-8 text-sm">
              <li><a href="/" className="text-gray-400 hover:text-pink-500 transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-pink-500 transition-colors">About Us</a></li>
              {/* <li><a href="/templates" className="text-gray-400 hover:text-pink-500 transition-colors">Templates</a></li> */}
              <li><a href="/contact" className="text-gray-400 hover:text-pink-500 transition-colors">Contact</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-pink-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </nav>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-400 mb-2">
              &copy; {currentYear} Marriage Biodata Maker. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Contact us: freebiodatagenerator@gmail.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer