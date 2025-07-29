import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background: "linear-gradient(120deg, #7f53ac 0%, #657ced 40%, #43e97b 100%)"
      }}
    >
      {/* Animated Gradient Accent */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-tr from-orange-400 via-pink-500 to-violet-600 opacity-40 rounded-full blur-[90px] animate-pulse z-0"></div>
      
      <div className="relative max-w-xl w-full bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl shadow-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1 z-10">
        {/* Gradient border accent */}
        <div className="h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 animate-gradient-x"></div>
        
        <div className="p-8">
          <h1 className="text-4xl font-extrabold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
              About Us
            </span>
          </h1>
          <p className="text-gray-800 mb-6 text-center text-lg leading-relaxed">
            <b>Biodata Genie</b> is your free online biodata generator. Enter your details and get a beautifully designed biodata in minutes. Choose from <b>minimal, stylish, professional, or classic templates</b>—we have something for everyone!
          </p>
          <ul className="mb-6 space-y-3 text-[1.07rem]">
            <li className="flex items-center gap-2"><span role="img" aria-label="star" className="text-yellow-400 text-xl">★</span> Always <b>100% free</b>, no signup required</li>
            <li className="flex items-center gap-2"><span role="img" aria-label="rocket" className="text-blue-400 text-xl">🚀</span> Quick, easy & modern interface</li>
            <li className="flex items-center gap-2"><span role="img" aria-label="sparkles" className="text-pink-400 text-xl">✨</span> Templates to match every personality</li>
            <li className="flex items-center gap-2"><span role="img" aria-label="phone" className="text-green-400 text-xl">📱</span> Works great on desktop (preferred)</li>
            <li className="flex items-center gap-2"><span role="img" aria-label="shield" className="text-purple-400 text-xl">🛡️</span> No data stored—<b>your privacy matters!</b></li>
          </ul>
          <div className="text-center text-gray-700 mb-7 text-base">
            Making biodata creation simple, trusted, and accessible for everyone. Find your perfect template today!
          </div>
          <div className="text-center mt-2">
            <button
              onClick={() => navigate("/create-biodata")}
              className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 text-white px-8 py-3 rounded-full text-base font-semibold shadow-lg hover:scale-105 active:scale-97 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200"
            >
              Start making your biodata now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
