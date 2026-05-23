import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Collections from './pages/Collections';
import About from './pages/About';
import Booking from './pages/Booking';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import RatesBooking from './pages/RatesBooking';
import { api } from './services/api';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Scroll to top of viewport when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  // Navigate to Collections and open modal directly for featured items (synced with local DB)
  const handleSelectFeaturedProduct = async (product) => {
    try {
      const allProducts = await api.products.getAll();
      const latest = allProducts.find(p => p.id === product.id) || product;
      setSelectedProduct(latest);
    } catch (e) {
      setSelectedProduct(product);
    }
    setActivePage('collections');
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return (
          <Home 
            onNavigate={setActivePage} 
            onSelectFeaturedProduct={handleSelectFeaturedProduct}
          />
        );
      case 'collections':
        return (
          <Collections 
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
            onCloseModal={() => setSelectedProduct(null)}
          />
        );
      case 'about':
        return <About />;
      case 'booking':
        return <Booking />;
      case 'rates':
        return <RatesBooking />;
      case 'login':
        return <Login onNavigate={setActivePage} />;
      case 'profile':
        return <Profile onNavigate={setActivePage} />;
      case 'admin-login':
        return <AdminLogin onNavigate={setActivePage} />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={setActivePage} />;
      default:
        return (
          <Home 
            onNavigate={setActivePage} 
            onSelectFeaturedProduct={handleSelectFeaturedProduct}
          />
        );
    }
  };

  return (
    <>
      {/* Global Navbar */}
      <Navbar 
        activePage={activePage} 
        onNavigate={setActivePage} 
      />

      {/* Main View Container */}
      <main style={{ flexGrow: 1, position: 'relative' }}>
        {renderActivePage()}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={setActivePage} />
    </>
  );
}

export default App;
