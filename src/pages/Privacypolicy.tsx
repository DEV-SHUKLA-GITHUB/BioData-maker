// src/components/PrivacyPolicy.tsx

import React from "react";

const PrivacyPolicy: React.FC = () => (
  <div
    className="min-h-screen flex items-center justify-center px-4 py-8"
    style={{
      background: "linear-gradient(110deg, #657ced 0%, #ffa63d 100%)",
    }}
  >
    <div className="relative max-w-2xl w-full bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8">
      <h1 className="text-3xl font-extrabold text-center mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-400 bg-clip-text text-transparent">
        Privacy Policy
      </h1>
      <p className="text-gray-800 text-center mb-6">
        Your privacy matters to us. This page explains what data we collect and how we handle it.
      </p>

      <div className="space-y-5 text-gray-700 text-base">
        <section>
          <h2 className="font-semibold mb-1">1. Data Collection</h2>
          <p>
            We do <b>not</b> require you to create an account or provide personal information to use our site. All details you enter for biodata generation stay in your browser and are never saved on our servers.
          </p>
        </section>
        <section>
          <h2 className="font-semibold mb-1">2. No Data Storage</h2>
          <p>
            We do not store, sell, or share your biodata information. Once you generate and download your biodata, your data is not kept by us in any form. Your privacy is completely protected.
          </p>
        </section>
        <section>
          <h2 className="font-semibold mb-1">3. Cookies & Analytics</h2>
          <p>
            Our website may use cookies or analytics services (like Google Analytics) to understand website usage and improve your experience. These do not collect your biodata inputs or personal information.
          </p>
        </section>
        <section>
          <h2 className="font-semibold mb-1">4. Email Communication</h2>
          <p>
            If you contact us via our Contact Us page, your message is sent securely using EmailJS and is not stored on our website servers.
          </p>
        </section>
        <section>
          <h2 className="font-semibold mb-1">5. Third-Party Links</h2>
          <p>
            Our site may contain links to other websites. We are not responsible for their privacy practices, so please review their policies if you visit them.
          </p>
        </section>
        <section>
          <h2 className="font-semibold mb-1">6. Changes to Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted here, and your continued use of the site means you accept the updated policy.
          </p>
        </section>
        <section>
          <h2 className="font-semibold mb-1">7. Contact Us</h2>
          <p>
            For any questions about your privacy, please use our Contact Us page. We’ll respond promptly.
          </p>
        </section>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
