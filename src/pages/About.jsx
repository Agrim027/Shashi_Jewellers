import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { ShieldCheck, Landmark, CheckCircle, Heart } from 'lucide-react';

export default function About() {
  return (
    <div style={{ backgroundColor: 'var(--cream-bg)', padding: '5rem 0' }}>
      <div className="container">
        
        {/* Page Header */}
        <ScrollReveal duration="0.8s">
          <div className="section-header">
            <span className="section-subtitle">Our Legacy</span>
            <h2 className="section-title">About Shashi Jewellers</h2>
            <div className="title-gold-divider"></div>
          </div>
        </ScrollReveal>

        {/* Story Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center', marginBottom: '5rem' }}>
          <ScrollReveal delay={100} duration="0.9s">
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', marginBottom: '1.25rem' }}>
                Serving Families of Goshainganj, Ayodhya Since 1995
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                Shashi Jewellers was established in the year 1995 in Goshainganj, Ayodhya, with a vision to provide authentic, highly finished gold and silver ornaments. Over the past three decades, we have had the privilege of decorating brides and families across generations, becoming a household name trusted for purity.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                We understand that jewelry in India is not merely an accessory; it is an emotion, an heirloom, and a secure financial investment. That is why we maintain strict compliance with government standards, offering only hallmarked jewelry.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'var(--cream-panel)', padding: '1.5rem', borderLeft: '3px solid var(--gold-primary)' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <CheckCircle size={18} style={{ color: 'var(--maroon-accent)' }} />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Government Certified BIS Hallmarking</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <CheckCircle size={18} style={{ color: 'var(--maroon-accent)' }} />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Lifetime Buyback & Exchange Guarantee</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <CheckCircle size={18} style={{ color: 'var(--maroon-accent)' }} />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>100% Handcrafted by Master Karigars</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Showroom replica/concept visual */}
          <ScrollReveal delay={250} duration="0.9s">
            <div className="showroom-wood-backing" style={{ padding: '3.5rem', borderRadius: '4px', boxShadow: 'var(--shadow-warm)' }}>
              <div style={{ background: 'var(--cream-bg)', color: 'var(--text-primary)', padding: '2.5rem', borderRadius: '2px', textAlign: 'center', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)' }}>
                <Landmark size={40} style={{ color: 'var(--gold-primary)', marginBottom: '1rem' }} />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Shashi jewellers</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Visit our physical store in Goshainganj, Ayodhya to browse our extensive inventory of heavy sita haars, payals, kadas, and daily-wear gold tops under warm showroom lights.
                </p>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--maroon-accent)', borderTop: '1px solid rgba(44,26,17,0.08)', paddingTop: '1rem' }}>
                  Infront of Primary School, Goshainganj, Ayodhya
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Heritage Trust Core Values Section */}
        <ScrollReveal delay={200} duration="0.9s">
          <div style={{ backgroundColor: 'var(--cream-panel)', padding: '4rem 3rem', border: '1px solid var(--border-light)', borderRadius: '4px' }}>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', marginBottom: '2rem', textAlign: 'center' }}>
              Our Showroom Philosophy
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(197,155,39,0.08)', display: 'flex', alignItems: 'center', justify: 'center', marginBottom: '1rem', color: 'var(--gold-primary)' }}>
                  <ShieldCheck size={20} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                  1. 100% Transparency
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  We weigh, test, and declare purities in front of our customers. The net weight of gold and silver is stamped on every invoice.
                </p>
              </div>
              
              <div style={{ textAlign: 'left' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(197,155,39,0.08)', display: 'flex', alignItems: 'center', justify: 'center', marginBottom: '1rem', color: 'var(--gold-primary)' }}>
                  <Heart size={20} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                  2. Community First
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  As a family jeweller, our relations go beyond transactions. We help you pick appropriate designs and metals for wedding sub-functions within your desired budgets.
                </p>
              </div>

              <div style={{ textAlign: 'left' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(197,155,39,0.08)', display: 'flex', alignItems: 'center', justify: 'center', marginBottom: '1rem', color: 'var(--gold-primary)' }}>
                  <Landmark size={20} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                  3. Preserving Karigar Art
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  We support traditional local craftsmen (karigars) who specialize in chasing, engraving, and casting regional patterns, helping keep traditional Indian jewelry forms alive.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
