import React from 'react';
import { Phone, MapPin, Mail, Clock, ShieldCheck, Award, Heart } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer style={{ marginTop: 'auto', width: '100%' }}>
      {/* Trust Badges Bar */}
      <section style={{ backgroundColor: 'var(--cream-panel)', padding: '2.5rem 0', borderTop: '2px solid var(--gold-primary)', borderBottom: '1px solid rgba(44, 26, 17, 0.08)' }}>
        <div className="container trust-banner-grid">
          <div className="trust-card">
            <ShieldCheck size={32} className="trust-card-icon" />
            <h4 className="trust-card-title">BIS Hallmarked</h4>
            <p className="trust-card-desc">100% certified gold and silver ornaments ensuring absolute purity and value.</p>
          </div>
          <div className="trust-card">
            <Award size={32} className="trust-card-icon" />
            <h4 className="trust-card-title">Trusted Since 1995</h4>
            <p className="trust-card-desc">Decorating families across Ayodhya with sparkling trust and legacy for over 30 years.</p>
          </div>
          <div className="trust-card">
            <Heart size={32} className="trust-card-icon" />
            <h4 className="trust-card-title">Ayodhya Heritage</h4>
            <p className="trust-card-desc">Showcasing traditional ornaments representing the local culture and craftsmanship.</p>
          </div>
        </div>
      </section>

      {/* Main Corporate Footer */}
      <section className="footer-section">
        <div className="container footer-grid">
          
          {/* Brand Column */}
          <div className="footer-brand-col">
            <h3 className="footer-brand-title">SHASHI JEWELLERS</h3>
            <p className="footer-brand-desc">
              Defining high luxury, authenticity, and gold craftsmanship in Ayodhya since 1995. Curators of certified traditional and daily wear gold and silver ornaments.
            </p>
            <div className="footer-social-links">
              <a 
                href="https://www.facebook.com/shashikant.gupta.169" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-icon" 
                aria-label="Facebook"
              >
                {/* Inline Facebook SVG */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a 
                href="https://www.instagram.com/shashijewellery/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-icon" 
                aria-label="Instagram"
              >
                {/* Inline Instagram SVG */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-link-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-list">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home Showcase</a></li>
              <li><a href="#collections" onClick={(e) => { e.preventDefault(); onNavigate('collections'); }}>Collections</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>About Our Legacy</a></li>
              <li><a href="#booking" onClick={(e) => { e.preventDefault(); onNavigate('booking'); }}>Book Consultation</a></li>
            </ul>
          </div>

          {/* Business Hours Column */}
          <div className="footer-link-col">
            <h4 className="footer-col-title">Showroom Timings</h4>
            <ul className="footer-list" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8rem', gap: '0.5rem' }}>
              <li style={{ display: 'flex', gap: '8px' }}>
                <Clock size={14} className="footer-contact-icon" style={{ marginTop: '2px' }} />
                <div>
                  <p style={{ fontWeight: 600, color: '#fff' }}>Saturday - Thursday</p>
                  <p>10:00 AM - 7:00 PM</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '8px' }}>
                <Clock size={14} className="footer-contact-icon" style={{ color: 'var(--maroon-accent)', marginTop: '2px' }} />
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--gold-light)' }}>Friday Closed</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Showroom Contacts Column */}
          <div className="footer-link-col">
            <h4 className="footer-col-title">Visit Showroom</h4>
            <ul className="footer-list">
              <li className="footer-contact-item">
                <MapPin size={16} className="footer-contact-icon" />
                <span>Infront of Primary School, Near Town Area Office, Goshainganj, Ayodhya, Uttar Pradesh - 224141</span>
              </li>
              <li className="footer-contact-item">
                <Phone size={14} className="footer-contact-icon" />
                <span>+91 94523 52020</span>
              </li>
              <li className="footer-contact-item">
                <Mail size={14} className="footer-contact-icon" />
                <span>info@shashijewellers.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="container footer-bottom">
          <div className="footer-bottom-divider"></div>
          <div className="footer-bottom-flex">
            <p>© {new Date().getFullYear()} Shashi Jewellers. All Rights Reserved. Pure Gold & Silver Ornaments.</p>
            <div className="footer-policies">
              <span>Visit our showroom for live metal pricing and bespoke orders.</span>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
