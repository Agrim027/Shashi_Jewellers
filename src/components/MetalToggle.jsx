import React from 'react';

export default function MetalToggle({ activeMetal, onMetalChange }) {
  return (
    <div className="metal-toggle-container animate-fade-in">
      <div className="metal-toggle-track">
        {/* Slider element */}
        <div className={`metal-toggle-slider ${activeMetal === 'gold' ? 'gold-active' : 'silver-active'}`}></div>
        
        <button
          className={`metal-toggle-btn ${activeMetal === 'gold' ? 'active' : ''}`}
          onClick={() => onMetalChange('gold')}
        >
          Gold Collection
        </button>
        <button
          className={`metal-toggle-btn ${activeMetal === 'silver' ? 'active silver-text' : ''}`}
          onClick={() => onMetalChange('silver')}
        >
          Silver Collection
        </button>
      </div>
    </div>
  );
}
