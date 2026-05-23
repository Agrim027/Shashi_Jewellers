import React from 'react';
import Hero from '../components/Hero';
import ScrollReveal from '../components/ScrollReveal';
import Tilt from '../components/Tilt';
import LiveRates from '../components/LiveRates';
import { ShieldCheck, MapPin, Sparkles, TrendingUp, Heart, Award, Gem, Scale } from 'lucide-react';

export default function Home({ onNavigate, onSelectFeaturedProduct }) {
  // Curated featured products for the Hexagonal niche display (inspired by photo cabinet niches)
  const featuredNiches = [
    {
      id: 'g1',
      name: 'Royal Heritage Jhumka',
      badge: '18K Gold',
      image: '/images/gold_jhumka.png',
      product: {
        id: 'g1',
        name: 'Royal Heritage Jhumka',
        category: 'earrings',
        subcategory: 'jhumka',
        purity: '18KT Gold',
        weight: '18g - 24g',
        tagBadge: '18K Traditional',
        image: '/images/gold_jhumka.png',
        description: 'Stunning handcrafted 18KT gold jhumkas displaying fine filigree patterns, granular gold beads (ghungroos), and a traditional dome design. A timeless bridal masterpiece.'
      }
    },
    {
      id: 'g7',
      name: 'Imperial Sita Haar',
      badge: '18K Gold',
      image: '/images/gold_haar.png',
      product: {
        id: 'g7',
        name: 'Imperial Sita Haar',
        category: 'haar',
        subcategory: 'haar',
        purity: '18KT Gold',
        weight: '45g - 65g',
        tagBadge: '18K Traditional',
        image: '/images/gold_haar.png',
        description: 'A grand multi-layered Sita Haar crafted in pure 18kt gold. The pendant showcases magnificent floral filigree work and a polished antique gold finish.'
      }
    },
    {
      id: 'g2',
      name: 'Classic Engraved Bali',
      badge: '18K Gold',
      image: '/images/gold_bali.png',
      product: {
        id: 'g2',
        name: 'Classic Engraved Bali',
        category: 'earrings',
        subcategory: 'bali',
        purity: '18KT Gold',
        weight: '6g - 10g',
        tagBadge: '18K Traditional',
        image: '/images/gold_bali.png',
        description: 'Traditional crescent-shaped gold balis featuring hand-chased ethnic patterns. Highly polished 18kt yellow gold for a rich, warm glow.'
      }
    }
  ];

  return (
    <div>
      {/* 1. Hero Header Banner */}
      <Hero onNavigate={onNavigate} />

      {/* 2. Premium Horizontal Trust Strip */}
      <ScrollReveal delay={100} duration="0.8s">
        <section className="trust-strip-section">
          <div className="container trust-strip-container">
            <div className="trust-strip-item">
              <ShieldCheck size={18} className="trust-strip-icon" />
              <span className="trust-strip-text">BIS Hallmarked Jewellery</span>
            </div>
            <div className="trust-strip-item">
              <Heart size={17} className="trust-strip-icon" />
              <span className="trust-strip-text">Trusted by Families Since 1995</span>
            </div>
            <div className="trust-strip-item">
              <Scale size={18} className="trust-strip-icon" />
              <span className="trust-strip-text">100% Transparent Weights</span>
            </div>
            <div className="trust-strip-item">
              <Sparkles size={17} className="trust-strip-icon" />
              <span className="trust-strip-text">Visit Store for Best Pricing</span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 3. Showroom Spotlight Niches (Inspired by physical photos) */}
      <section className="showroom-wood-backing" style={{ padding: '6rem 0' }}>
        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <ScrollReveal duration="0.9s">
            <div className="section-header" style={{ color: '#fff' }}>
              <span className="section-subtitle" style={{ color: 'var(--gold-light)' }}>Featured Ornaments</span>
              <h2 className="section-title" style={{ color: '#fff' }}>Showroom Niche Showcase</h2>
              <p style={{ maxWidth: '580px', margin: '1rem auto 0', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', fontWeight: 300, lineHeight: 1.6 }}>
                Directly inspired by the glowing hexagonal displays of our physical store in Ayodhya. Hover to activate 3D showroom perspective and click to view absolute purity specifications.
              </p>
              <div className="title-gold-divider" style={{ backgroundColor: 'var(--gold-light)' }}></div>
            </div>
          </ScrollReveal>

          <div className="niche-showcase-container">
            {featuredNiches.map((niche, idx) => (
              <ScrollReveal key={niche.id} delay={idx * 150} duration="0.8s">
                <Tilt scale={1.04} maxRotation={12} style={{ display: 'inline-block' }}>
                  <div 
                    className="hex-niche"
                    onClick={() => onSelectFeaturedProduct(niche.product)}
                  >
                    <img src={niche.image} alt={niche.name} className="hex-niche-image" />
                    <h3 className="hex-niche-title">{niche.name}</h3>
                    <span className="hex-niche-badge">{niche.badge}</span>
                  </div>
                </Tilt>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={300} duration="0.8s">
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <button className="btn-secondary" style={{ color: '#fff', borderColor: 'var(--gold-light)' }} onClick={() => onNavigate('collections')}>
                Explore Showroom Ornaments
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3.5. Showroom Photo Gallery Portfolio Section */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--cream-panel)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="section-subtitle">Real Showroom Experience</span>
              <h2 className="section-title">Step Inside Shashi Jewellers</h2>
              <p style={{ maxWidth: '580px', margin: '1rem auto 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Explore our newly designed showroom located in Goshainganj, Ayodhya. Meticulously designed displays and specialized lighting showcase our gold and silver collections in their truest purity.
              </p>
              <div className="title-gold-divider"></div>
            </div>
          </ScrollReveal>

          <div className="showroom-gallery-grid">
            <ScrollReveal delay={100} duration="0.9s">
              <Tilt maxRotation={6} scale={1.01} className="showroom-gallery-card">
                <div className="showroom-img-wrapper">
                  <img src="/images/showroom_niche.jpg" alt="Shashi Jewellers Spotlight Hexagonal Niches" className="showroom-gallery-image" />
                  <div className="showroom-gallery-overlay">
                    <span className="gallery-badge">Spotlight Display</span>
                    <h3>Handcrafted Showcase Niches</h3>
                    <p>Designed with polished wood veneers and dedicated focus lights to highlight the intricate details of our bridal sita haars and traditional jhumkas.</p>
                  </div>
                </div>
              </Tilt>
            </ScrollReveal>

            <ScrollReveal delay={250} duration="0.9s">
              <Tilt maxRotation={6} scale={1.01} className="showroom-gallery-card">
                <div className="showroom-img-wrapper">
                  <img src="/images/showroom_counter.jpg" alt="Shashi Jewellers Showroom Counter" className="showroom-gallery-image" />
                  <div className="showroom-gallery-overlay">
                    <span className="gallery-badge">Customer Lounge</span>
                    <h3>Purity & Consultation Counters</h3>
                    <p>Comfortable consultation areas where families can negotiate, inspect BIS Hallmark stamps, and review net weights with our family jewelers.</p>
                  </div>
                </div>
              </Tilt>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Live Metal Board & Showroom Invite */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--cream-bg)', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          
          {/* Live Rate Board */}
          <ScrollReveal delay={100} duration="1s">
            <LiveRates />
          </ScrollReveal>

          {/* Invitation Copy */}
          <ScrollReveal delay={250} duration="1s">
            <div style={{ textAlign: 'left' }}>
              <span className="section-subtitle">Since 1995</span>
              <h2 className="section-title" style={{ fontSize: '2.4rem', lineHeight: '1.2' }}>Pure Ornaments, Uncompromised Trust</h2>
              <div className="title-gold-divider" style={{ margin: '0 0 2rem' }}></div>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.7', fontWeight: 300 }}>
                Shashi Jewellers was founded on a simple promise: providing the families of Ayodhya with ornaments of unquestionable purity. Every gold and silver ornament we craft carries official BIS Hallmarking, giving you peace of mind with your investments.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2.5rem', lineHeight: '1.7', fontWeight: 300 }}>
                We invite you to experience our warm hospitality at our showroom. Browse the full collection of authentic Indian designs under comfortable, warm lights, and consult with our family jewelers for custom bridal configurations.
              </p>

              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={() => onNavigate('booking')}>
                  Book Showroom Visit
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold-primary)' }}>
                  <ShieldCheck size={18} />
                  <span>BIS 916 Certified Store</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </div>
  );
}
