// App.tsx - Updated with conditional Header and Footer
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import AboutUs from './pages/Aboutus';
import ContactUs from './pages/Contactus';
import PrivacyPolicy from './pages/Privacypolicy';
import Layout from './Layout';

// Lazy load components
const Homepage = lazy(() => import('./pages/HomePage'));
const BiodataForm = lazy(() => import('./pages/BiodataMaker'));
const TemplatePage = lazy(() => import('./pages/TemplatePage'));
const TemplateDetail = lazy(() => import('./pages/TemplateDetails'));

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/create-biodata" element={<BiodataForm />} />
              <Route path="/templates" element={<TemplatePage />} />
              <Route path="templates/template-detail/:templateId" element={<TemplateDetail />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
