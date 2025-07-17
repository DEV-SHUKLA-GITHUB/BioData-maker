// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

// Declare global Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'exception',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

// Web Vitals reporting function
const reportWebVitals = (metric: any) => {
  try {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`${metric.name}:`, metric.value, `(${metric.rating})`);
    }

    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      });
    }
  } catch (error) {
    console.error('Error reporting web vitals:', error);
  }
};

// Initialize web vitals monitoring
const initWebVitals = () => {
  try {
    // Core Web Vitals
    onCLS(reportWebVitals);     // Cumulative Layout Shift
    onINP(reportWebVitals);     // Interaction to Next Paint
    onLCP(reportWebVitals);     // Largest Contentful Paint
    
    // Other important metrics
    onFCP(reportWebVitals);     // First Contentful Paint
    onTTFB(reportWebVitals);    // Time to First Byte
    
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Web Vitals monitoring initialized');
    }
  } catch (error) {
    console.error('❌ Failed to initialize web vitals:', error);
  }
};

// Initialize web vitals
initWebVitals();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
