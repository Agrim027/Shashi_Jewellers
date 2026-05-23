import React from 'react';
import { ShieldCheck, MapPin, Award } from 'lucide-react';

export default function Hero({ onNavigate }) {
  return (
    <section className="hero-section">
      <div className="hero-gradient-overlay"></div>
      <div className="hero-img-bg"></div>

      <div className="container hero-container animate-fade-in">
        <div className="hero-content">
          <span className="hero-tag">Estd. 1995 • Shashi Jewellers</span>
          <h1 className="hero-title">
            Crafting Heritage, <br />
            <span className="text-gold-gradient">Wearing Elegance</span>
          </h1>
          <p className="hero-description">
            Experience the allure of hand-carved 18-karat gold and pure silver ornaments. At Shashi Jewellers, each ornament is a bespoke testament to timeless beauty, legacy craftsmanship, and absolute purity.
          </p>
          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => onNavigate('collections')}
            >
              Explore Collections
            </button>
            <button
              className="btn-secondary"
              onClick={() => onNavigate('booking')}
            >
              Visit Showroom
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
