// src/components/ContactUs.tsx

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

export const ContactUs: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    if (!form.current) return;

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(
        () => {
          setSuccess("Your message was sent! Thank you.");
          form.current?.reset();
        },
        () => {
          setError("Sorry, your message could not be sent. Please try again.");
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background: "linear-gradient(110deg, #657ced 0%, #ffa63d 100%)",
      }}
    >
      <div className="relative max-w-md w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-400 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Got questions, feedback, or ideas? Reach out and we’ll get back to you!
        </p>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className="text-gray-600 font-medium mb-1 block">
              Name
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition"
              type="text"
              name="name"
              required
              disabled={loading}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-gray-600 font-medium mb-1 block">
              Email
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition"
              type="email"
              name="email"
              required
              disabled={loading}
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="text-gray-600 font-medium mb-1 block">
              Message
            </label>
            <textarea
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none resize-none transition"
              name="message"
              rows={5}
              required
              disabled={loading}
              placeholder="How can we help you?"
            ></textarea>
          </div>
          {success && (
            <div className="text-green-600 font-semibold text-center">{success}</div>
          )}
          {error && (
            <div className="text-red-600 font-semibold text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 text-white font-bold px-4 py-2 rounded-full mt-2 shadow-md hover:scale-105 transition-transform duration-100"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
