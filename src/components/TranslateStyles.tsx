// components/GlobalGoogleTranslateStyles.tsx
import { useEffect } from 'react';

const GlobalGoogleTranslateStyles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      iframe.skiptranslate {
        display: none !important;
        visibility: hidden !important;
      }
      .goog-te-banner-frame.skiptranslate {
        display: none !important;
        visibility: hidden !important;
      }
      body {
        top: 0px !important;
        padding-top: 0 !important;
        margin-top: 0 !important;
      }
      #goog-gt-tt, .goog-te-balloon-frame, .goog-tooltip {
        display: none !important;
        visibility: hidden !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return null;
};

export default GlobalGoogleTranslateStyles;
