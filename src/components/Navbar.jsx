import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Phone } from 'lucide-react';
import LiveRates from './LiveRates';

export default function Navbar({ activePage, onNavigate }) {
  const { currentUser, userWishlist, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll level to shrink header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'collections', label: 'Collections' },
    { id: 'about', label: 'About Us' },
    { id: 'rates', label: 'Rates & Booking' }
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo / Brand Name */}
        <a 
          href="#" 
          className="navbar-brand-container" 
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="navbar-logo-img" style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(197, 155, 39, 0.2)' }}>
            <defs>
              <linearGradient id="navGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E6C565" />
                <stop offset="50%" stopColor="#C59B27" />
                <stop offset="100%" stopColor="#8B6914" />
              </linearGradient>
            </defs>
            <rect width="100" height="100" rx="20" fill="#1A0E08" />
            <text x="50" y="68" fontFamily="serif" fontSize="50" fontWeight="bold" fill="url(#navGold)" textAnchor="middle">SJ</text>
          </svg>
          <div className="navbar-logo-text">
            SHASHI JEWELLERS
            <span className="logo-sub">ESTD. 1995 • AYODHYA</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${activePage === link.id ? 'active-link' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.id);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions - Call Showroom Button & Authentication */}
        <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          
          {/* Hide live rates on very small screens for space */}
          <div style={{ display: window.innerWidth > 992 ? 'block' : 'none' }}>
            <LiveRates compact={true} />
          </div>

          <a href="tel:+919452352020" className="nav-contact-badge">
            <Phone size={14} className="text-maroon" />
            <span>+91 94523 52020</span>
          </a>

          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {currentUser.role === 'admin' && (
                <button 
                  onClick={() => handleNavClick('admin-dashboard')}
                  className="btn-secondary"
                  style={{ padding: '0.5rem 0.9rem', fontSize: '0.68rem', display: 'flex', alignItems: 'center', gap: '4px', borderColor: 'var(--gold-primary)', color: 'var(--gold-primary)' }}
                >
                  Admin Panel
                </button>
              )}
              
              <button 
                onClick={() => handleNavClick('profile')}
                className={`nav-profile-btn ${activePage === 'profile' ? 'active-profile' : ''}`}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  color: 'var(--text-primary)' 
                }}
              >
                <span>{currentUser.name.split(' ')[0]}</span>
                {userWishlist.length > 0 && (
                  <span className="nav-wishlist-count" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--maroon-accent)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '0.62rem',
                    fontWeight: 700
                  }}>
                    {userWishlist.length}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => { logout(); handleNavClick('home'); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--maroon-accent)', fontWeight: 600 }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => handleNavClick('login')}
              className="btn-primary"
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.7rem' }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <nav className="mobile-nav">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="mobile-nav-link"
                style={activePage === link.id ? { color: 'var(--gold-primary)', fontWeight: '700' } : {}}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
              >
                {link.label}
              </a>
            ))}

            <div style={{ margin: '1.5rem 0', borderTop: '1px solid rgba(44, 26, 17, 0.08)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {currentUser ? (
                <>
                  {currentUser.role === 'admin' && (
                    <a 
                      href="#admin-dashboard" 
                      className="mobile-nav-link" 
                      style={{ color: 'var(--gold-primary)', fontWeight: 600 }}
                      onClick={(e) => { e.preventDefault(); handleNavClick('admin-dashboard'); }}
                    >
                      Admin Panel
                    </a>
                  )}
                  <a 
                    href="#profile" 
                    className="mobile-nav-link" 
                    style={{ fontWeight: 600 }}
                    onClick={(e) => { e.preventDefault(); handleNavClick('profile'); }}
                  >
                    My Profile {userWishlist.length > 0 && `(${userWishlist.length})`}
                  </a>
                  <button 
                    onClick={() => { logout(); handleNavClick('home'); }}
                    style={{ background: 'none', border: 'none', display: 'block', textAlign: 'left', padding: '0.75rem 0.5rem', fontSize: '0.9rem', color: 'var(--maroon-accent)', fontWeight: 600, width: '100%', cursor: 'pointer' }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <a 
                  href="#login" 
                  className="btn-primary" 
                  style={{ textAlign: 'center', display: 'block' }}
                  onClick={(e) => { e.preventDefault(); handleNavClick('login'); }}
                >
                  Sign In
                </a>
              )}

              <a 
                href="tel:+919452352020" 
                className="btn-secondary" 
                style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Phone size={14} />
                Call Showroom
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
