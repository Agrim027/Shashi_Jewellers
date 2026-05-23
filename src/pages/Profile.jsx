import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { User, Phone, Mail, Heart, ShoppingBag, Calendar } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function Profile({ onNavigate }) {
  const { currentUser, userWishlist, logout } = useAuth();
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadWishlistDetails = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const allProducts = await api.products.getAll();
      const filtered = allProducts.filter(p => userWishlist.includes(p.id));
      setWishlistProducts(filtered);
    } catch (e) {
      console.error('Failed to load wishlist items:', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!currentUser) {
      onNavigate('login');
      return;
    }
    loadWishlistDetails();
  }, [currentUser, userWishlist]);

  const handleProfileLogout = () => {
    logout();
    onNavigate('home');
  };

  if (!currentUser) return null;

  return (
    <div style={{ backgroundColor: 'var(--cream-bg)', padding: '5rem 0', minHeight: '85vh' }}>
      <div className="container">
        
        {/* Page Header */}
        <ScrollReveal duration="0.8s">
          <div className="section-header">
            <span className="section-subtitle">Customer Account</span>
            <h2 className="section-title">My Showroom Profile</h2>
            <div className="title-gold-divider"></div>
          </div>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '3.5rem', marginTop: '3.5rem', alignItems: 'flex-start' }}>
          
          {/* Left: User Profile Card */}
          <ScrollReveal delay={100} duration="0.9s">
            <div className="login-card glass-card" style={{ padding: '2.5rem', position: 'sticky', top: '100px' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(197, 155, 39, 0.08)', display: 'flex', alignItems: 'center', justify: 'center', margin: '0 auto 1rem', color: 'var(--gold-primary)', border: '1px solid var(--border-medium)' }}>
                  <User size={32} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', margin: 0 }}>{currentUser.name}</h3>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                  Member Since {new Date().getFullYear()}
                </span>
              </div>

              {/* User Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', fontSize: '0.8rem', borderBottom: '1px solid rgba(44, 26, 17, 0.06)', paddingBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={16} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
                  <span style={{ wordBreak: 'break-all', textAlign: 'left' }}>{currentUser.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Phone size={16} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
                  <span>+91 {currentUser.phone}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button 
                  onClick={() => onNavigate('collections')} 
                  className="btn-primary" 
                  style={{ width: '100%', fontSize: '0.75rem', padding: '0.75rem' }}
                >
                  <ShoppingBag size={14} style={{ marginRight: '6px' }} />
                  Browse Collections
                </button>
                
                <button 
                  onClick={handleProfileLogout} 
                  className="btn-secondary" 
                  style={{ width: '100%', fontSize: '0.75rem', padding: '0.75rem', color: 'var(--maroon-accent)', borderColor: 'var(--maroon-accent)' }}
                >
                  Logout Account
                </button>
              </div>

            </div>
          </ScrollReveal>

          {/* Right: Wishlist Display */}
          <ScrollReveal delay={250} duration="0.9s">
            <div style={{ backgroundColor: 'var(--cream-panel)', padding: '3rem', border: '1px solid var(--border-light)', borderRadius: '4px', minHeight: '520px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem', borderBottom: '1px solid rgba(44, 26, 17, 0.08)', paddingBottom: '1rem' }}>
                <Heart size={20} style={{ color: 'var(--maroon-accent)' }} fill="var(--maroon-accent)" />
                <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', margin: 0 }}>My Wishlist ({wishlistProducts.length} saved)</h3>
              </div>

              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '6rem 0' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Loading saved items...</p>
                </div>
              ) : wishlistProducts.length > 0 ? (
                <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '2rem' }}>
                  {wishlistProducts.map((prod) => (
                    <ProductCard 
                      key={prod.id} 
                      product={prod} 
                      onProductClick={setSelectedProduct}
                    />
                  ))}
                </div>
              ) : (
                <div style={{ padding: '6rem 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  <Heart size={44} style={{ color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.4 }} />
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    Your wishlist is empty
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '360px', margin: '0 auto 2rem' }}>
                    Love an ornament but not ready to enquire yet? Save it to your wishlist to view or inquire later.
                  </p>
                  <button className="btn-primary" onClick={() => onNavigate('collections')}>
                    Explore Showroom Catalog
                  </button>
                </div>
              )}

            </div>
          </ScrollReveal>

        </div>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
