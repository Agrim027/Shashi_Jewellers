import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import LiveRates from '../components/LiveRates';
import { Phone, MapPin, Calculator, ShieldCheck } from 'lucide-react';

export default function RatesBooking() {
  return (
    <div style={{ backgroundColor: 'var(--cream-bg)', minHeight: '100vh', padding: '5rem 0' }}>
      <div className="container">
        
        <ScrollReveal duration="0.8s">
          <div className="section-header">
            <span className="section-subtitle">Transparent Pricing</span>
            <h2 className="section-title">Rates & Booking</h2>
            <div className="title-gold-divider"></div>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '1rem auto' }}>
              We believe in 100% transparency. Our gold and silver rates are updated in real-time. Book your orders confidently with our live pricing system.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div style={{ maxWidth: '900px', margin: '0 auto 4rem auto' }}>
            <LiveRates />
          </div>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          
          <ScrollReveal delay={200}>
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-light)', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: 'var(--maroon-accent)' }}>
                <Calculator size={24} />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', margin: 0 }}>How Pricing Works</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: 'var(--gold-primary)', fontWeight: 'bold' }}>•</span>
                  <span><strong>Gold Rate:</strong> Based on daily MCX / IBJA real-time rates.</span>
                </li>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: 'var(--gold-primary)', fontWeight: 'bold' }}>•</span>
                  <span><strong>Making Charges:</strong> Varies from 8% to 22% depending on the intricacy of the karigari (craftsmanship).</span>
                </li>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: 'var(--gold-primary)', fontWeight: 'bold' }}>•</span>
                  <span><strong>GST:</strong> 3% flat government tax on the total value of jewelry.</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-light)', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: 'var(--maroon-accent)' }}>
                <Phone size={24} />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', margin: 0 }}>Book an Order</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                To lock in the current live rate, you can visit our showroom or contact our booking desk on WhatsApp. An advance payment is required to confirm rate locking.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href="https://wa.me/919452352020" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.8rem 1rem', background: '#25D366', color: '#fff', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, justifyContent: 'center' }}>
                  <Phone size={18} /> Contact Booking Desk
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-muted)', justifyContent: 'center' }}>
                  <MapPin size={14} /> Shashi Jewellers, Goshainganj, Ayodhya
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </div>
  );
}
