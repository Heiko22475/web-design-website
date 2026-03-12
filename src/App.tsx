import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import ProcessStepPage from './pages/ProcessStepPage';
import ProductsPage from './pages/ProductsPage';

const ScrollToHash: React.FC = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    const id = hash.replace('#', '');
    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      }
      return false;
    };

    if (scrollToTarget()) {
      return;
    }

    const timeoutId = window.setTimeout(scrollToTarget, 0);
    return () => window.clearTimeout(timeoutId);
  }, [hash, pathname]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projektablauf/:stepSlug" element={<ProcessStepPage />} />
        <Route path="/produkte" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
