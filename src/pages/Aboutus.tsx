import React from 'react';
import { 
  Users, 
  Zap, 
  Heart, 
  Download, 
  Palette, 
  Settings, 
  Shield,
  Clock,
  Star,
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const AboutUs:React.FC = () => {
  const Navigate = useNavigate()
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Built with modern React, TypeScript, and Vite for blazing-fast performance"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Beautiful Templates",
      description: "From traditional to modern, professional to minimal - we have it all"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Fully Customizable",
      description: "Add, remove, or reorder sections to create your perfect biodata"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Instant Download",
      description: "Generate and download high-quality PDF biodatas in seconds"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy First",
      description: "Your data stays with you - no registration or data collection required"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Completely Free",
      description: "All features available at no cost, forever"
    }
  ];

  const stats = [
    { number: "10+", label: "Template Styles", icon: <Palette className="w-5 h-5" /> },
    { number: "1000+", label: "Happy Users", icon: <Users className="w-5 h-5" /> },
    { number: "< 2min", label: "Average Creation Time", icon: <Clock className="w-5 h-5" /> },
    { number: "100%", label: "Free & Open Source", icon: <Star className="w-5 h-5" /> }
  ];

  const techStack = [
    { name: "React 18", color: "bg-blue-100 text-blue-800" },
    { name: "TypeScript", color: "bg-blue-100 text-blue-800" },
    { name: "Tailwind CSS", color: "bg-cyan-100 text-cyan-800" },
    { name: "Vite", color: "bg-purple-100 text-purple-800" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <Globe className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Free Biodata Generator
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We believe creating a professional biodata shouldn't be complicated or expensive. 
              Our mission is to provide a simple, fast, and completely free solution for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                In today's digital world, having a well-crafted biodata is essential. However, 
                many existing solutions are either too expensive, too complicated, or lack the 
                customization options people need.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                That's why we created the Free Biodata Generator - a modern, intuitive platform 
                that puts the power of professional biodata creation in everyone's hands, 
                completely free of charge.
              </p>
              <div className="flex items-center space-x-2 text-blue-600">
                <Heart className="w-5 h-5" />
                <span className="font-semibold">Made with love for the community</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why We're Different</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>No hidden fees or premium features</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>No account registration required</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Your privacy is our priority</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Built with modern, reliable technology</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Makes Us Special</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every feature is designed with simplicity and user experience in mind
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 ml-3">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">By the Numbers</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-center mb-3 text-blue-600">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built with Modern Technology</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We use cutting-edge tools to ensure fast performance, maintainable code, and excellent user experience
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <span key={index} className={`px-4 py-2 rounded-full font-semibold ${tech.color}`}>
                {tech.name}
              </span>
            ))}
          </div>
          <div className="mt-12 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Why These Technologies?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Performance First</h4>
                <p className="text-gray-600">React 18 and Vite ensure lightning-fast loading and smooth interactions</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Type Safety</h4>
                <p className="text-gray-600">TypeScript helps us catch errors early and maintain reliable code</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Beautiful Design</h4>
                <p className="text-gray-600">Tailwind CSS enables consistent, responsive, and modern styling</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Developer Experience</h4>
                <p className="text-gray-600">Modern tooling makes the codebase maintainable and scalable</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Create Your Biodata?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who have already created their professional biodatas with our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={()=>Navigate("/create-biodata")} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Now
            </button>
            {/* <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View Templates
            </button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs
