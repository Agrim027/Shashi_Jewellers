import React, { useMemo } from 'react';

// Same key used in AdminDashboard
const CUSTOM_CATS_KEY = 'shashi_custom_categories';

export default function CategoryTabs({ activeMetal, activeCategory, onCategoryChange }) {
  // Define built-in categories based on selected metal
  const goldCategories = [
    { id: 'all', label: 'All Ornaments' },
    { id: 'earrings', label: 'Earrings (Jhumka/Bali)' },
    { id: 'rings', label: 'Rings (Ladies/Gents)' },
    { id: 'chains', label: 'Gold Chains' },
    { id: 'haar', label: 'Haar (Necklaces)' },
    { id: 'mathbedi', label: 'Mathbedi' },
    { id: 'nosering', label: 'Nose Rings' }
  ];

  const silverCategories = [
    { id: 'all', label: 'All Ornaments' },
    { id: 'payal', label: 'Payal (Anklets)' },
    { id: 'bracelet', label: 'Kada & Bracelets' },
    { id: 'chains', label: 'Silver Chains' },
    { id: 'rings', label: 'Silver Rings' },
    { id: 'bichhua', label: 'Bichhua (Toe Rings)' }
  ];

  // Merge built-in + custom categories
  const categories = useMemo(() => {
    const builtIn = activeMetal === 'gold' ? goldCategories : silverCategories;
    
    try {
      const customData = JSON.parse(localStorage.getItem(CUSTOM_CATS_KEY) || '{}');
      const customForMetal = customData.categories?.[activeMetal] || [];
      const customTabs = customForMetal.map(c => ({ id: c.value, label: c.label }));
      return [...builtIn, ...customTabs];
    } catch {
      return builtIn;
    }
  }, [activeMetal]);

  return (
    <div className="category-tabs-wrapper animate-fade-in">
      <div className="container category-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-tab-btn ${
              activeCategory === cat.id 
                ? activeMetal === 'gold' 
                  ? 'active-gold' 
                  : 'active-silver' 
                : ''
            }`}
            onClick={() => onCategoryChange(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
