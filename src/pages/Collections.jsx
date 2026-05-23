import React, { useState, useEffect } from 'react';
import MetalToggle from '../components/MetalToggle';
import CategoryTabs from '../components/CategoryTabs';
import SubcategoryChips from '../components/SubcategoryChips';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import ProductSkeleton from '../components/ProductSkeleton';
import { api } from '../services/api';
import { SlidersHorizontal, RefreshCcw } from 'lucide-react';

export default function Collections({ selectedProduct, onSelectProduct, onCloseModal }) {
  const [activeMetal, setActiveMetal] = useState('gold');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // Fetch products dynamically
  const fetchProducts = async () => {
    try {
      const data = await api.products.getAll();
      setProducts(data);
    } catch (e) {
      console.error('Failed to load products in Collections:', e);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [isLoading]);

  const triggerLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 450);
  };

  // Change Metal (Level 1) & Reset Level 2 & 3
  const handleMetalChange = (metal) => {
    triggerLoading();
    setActiveMetal(metal);
    setActiveCategory('all');
    setActiveSubcategory('all');
  };

  // Change Category (Level 2) & Reset Level 3
  const handleCategoryChange = (category) => {
    triggerLoading();
    setActiveCategory(category);
    setActiveSubcategory('all');
  };

  // Change Subcategory (Level 3)
  const handleSubcategoryChange = (subcat) => {
    triggerLoading();
    setActiveSubcategory(subcat);
  };

  // Reset all filters to default (Gold + All + All)
  const handleResetFilters = () => {
    triggerLoading();
    setActiveMetal('gold');
    setActiveCategory('all');
    setActiveSubcategory('all');
  };

  // COMBINED FILTERING LOGIC
  const filteredProducts = products.filter((product) => {
    const matchesMetal = product.metal === activeMetal;
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSubcategory = activeSubcategory === 'all' || product.subcategory === activeSubcategory;
    return matchesMetal && matchesCategory && matchesSubcategory;
  });

  return (
    <section className="collections-section">
      <div className="container">
        
        {/* Page Header */}
        <div className="section-header animate-fade-in">
          <span className="section-subtitle">Curated Showroom Ornaments</span>
          <h2 className="section-title">Our Jewellery Showcase</h2>
          <div className="title-gold-divider"></div>
        </div>

        {/* Level 1 Filter: Centered Metal Toggle (Gold vs Silver) */}
        <MetalToggle 
          activeMetal={activeMetal} 
          onMetalChange={handleMetalChange} 
        />

        {/* Level 2 Filter: Category Tabs */}
        <CategoryTabs 
          activeMetal={activeMetal}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Level 3 Filter: Subcategory Chips */}
        <SubcategoryChips 
          activeMetal={activeMetal}
          activeCategory={activeCategory}
          activeSubcategory={activeSubcategory}
          onSubcategoryChange={handleSubcategoryChange}
        />

        {/* Filter Operations Info Bar */}
        <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid rgba(44, 26, 17, 0.08)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Showing {filteredProducts.length} certified masterpieces
          </span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Clear Filters Button */}
            {(activeCategory !== 'all' || activeSubcategory !== 'all' || activeMetal !== 'gold') && (
              <button 
                onClick={handleResetFilters}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--maroon-accent)', 
                  fontSize: '0.8rem', 
                  fontWeight: 600, 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  padding: '4px 8px',
                  borderRadius: '2px',
                  transition: 'var(--transition-fast)'
                }}
                className="hover-gold-glow"
              >
                <RefreshCcw size={13} />
                <span>Reset Filters</span>
              </button>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <SlidersHorizontal size={14} />
              <span>Combined Showroom Filters</span>
            </div>
          </div>
        </div>

        {/* Product Grid Container (Set to stable min-height to prevent layout jump) */}
        <div className="product-grid animate-fade-in" style={{ minHeight: '480px' }}>
          {isLoading ? (
            Array.from({ length: Math.max(filteredProducts.length, 3) }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onProductClick={onSelectProduct}
              />
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', padding: '6rem 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                No items found for selected filter
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Try resetting your selections or modifying your category filters.
              </p>
              <button className="btn-primary" onClick={handleResetFilters}>
                Reset to Default Collection
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={onCloseModal}
        />
      )}
    </section>
  );
}
