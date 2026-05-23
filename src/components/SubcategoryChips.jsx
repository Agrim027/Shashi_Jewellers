import React from 'react';

export default function SubcategoryChips({ activeMetal, activeCategory, activeSubcategory, onSubcategoryChange }) {
  // Define subcategories mapping based on Category
  const subcategoryMap = {
    gold: {
      all: [
        { id: 'all', label: 'All Items' },
        { id: 'jhumka', label: 'Jhumka' },
        { id: 'bali', label: 'Bali' },
        { id: 'haar', label: 'Bridal Haar' },
        { id: 'gentsring', label: 'Gents Rings' },
        { id: 'ladiesring', label: 'Ladies Rings' }
      ],
      earrings: [
        { id: 'all', label: 'All Earrings' },
        { id: 'bunda', label: 'Bunda' },
        { id: 'katia', label: 'Katia' },
        { id: 'tops', label: 'Tops Studs' },
        { id: 'bali', label: 'Bali Hoops' },
        { id: 'jhumka', label: 'Jhumka' },
        { id: 'jhala', label: 'Jhala' }
      ],
      rings: [
        { id: 'all', label: 'All Rings' },
        { id: 'ladiesring', label: 'Ladies Rings' },
        { id: 'gentsring', label: 'Gents Rings' }
      ],
      chains: [
        { id: 'all', label: 'All Chains' },
        { id: 'goldchain', label: 'Traditional Chains' }
      ],
      haar: [
        { id: 'all', label: 'All Haar' },
        { id: 'haar', label: 'Sita Haar' }
      ],
      mathbedi: [
        { id: 'all', label: 'All Mathbedi' }
      ],
      nosering: [
        { id: 'all', label: 'All Nose Rings' }
      ]
    },
    silver: {
      all: [
        { id: 'all', label: 'All Items' },
        { id: 'payal', label: 'Payal Anklets' },
        { id: 'bracelet', label: 'Silver Kada' },
        { id: 'bichhua', label: 'Bichhua' }
      ],
      payal: [
        { id: 'all', label: 'All Payal' },
        { id: 'payal', label: 'Ghungroo Payal' }
      ],
      bracelet: [
        { id: 'all', label: 'All Kada' },
        { id: 'bracelet', label: 'Engraved Kada' }
      ],
      chains: [
        { id: 'all', label: 'All Chains' },
        { id: 'silverchain', label: 'Silver Chains' }
      ],
      rings: [
        { id: 'all', label: 'All Rings' },
        { id: 'silverring', label: 'Rajasthani Rings' }
      ],
      bichhua: [
        { id: 'all', label: 'All Bichhua' },
        { id: 'bichhua', label: 'Lotus Bichhua' }
      ]
    }
  };

  const chips = subcategoryMap[activeMetal]?.[activeCategory] || [{ id: 'all', label: 'All Items' }];

  if (chips.length <= 1) return null; // No need to render a single "All" chip

  return (
    <div className="subcategory-chips-wrapper animate-fade-in">
      <div className="container subcategory-chips">
        {chips.map((chip) => (
          <button
            key={chip.id}
            className={`subcategory-chip-btn ${
              activeSubcategory === chip.id 
                ? activeMetal === 'gold' 
                  ? 'active-gold' 
                  : 'active-silver' 
                : ''
            }`}
            onClick={() => onSubcategoryChange(chip.id)}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
