// App.tsx - Updated with better code splitting
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load components
const Homepage = lazy(() => import('./pages/HomePage'));
const BiodataForm = lazy(() => import('./pages/BiodataMaker'));
const TemplatePage = lazy(() => import('./pages/TemplatePage'));

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/create-biodata" element={<BiodataForm />} />
            <Route path="/templates" element={<TemplatePage />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
