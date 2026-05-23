import React, { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { Phone, MapPin, Clock, Calendar, ShieldCheck, Mail } from 'lucide-react';

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    metalPref: 'gold',
    interest: 'earrings',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert('Please fill out Name, Phone and Preferred Date.');
      return;
    }
    setSubmitted(true);
  };

  const handleInputChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  return (
    <section className="booking-section">
      <div className="container booking-container">
        
        {/* Left Side: Store Coordinates & Info */}
        <ScrollReveal delay={100} duration="0.8s">
          <div className="booking-info">
            <span className="section-subtitle">Exclusivity Redefined</span>
            <h2 className="booking-info-title">Plan Your Showroom Visit</h2>
            <div className="title-gold-divider" style={{ margin: '0 0 2rem' }}></div>
            <p className="booking-info-desc">
              Skip the queue and schedule a private shopping session at our Goshainganj showroom. Consult directly with our family jeweler to discuss custom designs, sizing, and gold weight specifications.
            </p>

            <div className="booking-contacts">
              <div className="booking-contact-item">
                <MapPin size={20} className="booking-contact-icon" />
                <div>
                  <h4>Ayodhya Showroom</h4>
                  <p>Infront of Primary School, Near Town Area Office, Goshainganj, Ayodhya, Uttar Pradesh - 224141</p>
                </div>
              </div>
              
              <div className="booking-contact-item">
                <Phone size={18} className="booking-contact-icon" />
                <div>
                  <h4>Direct Showroom Line</h4>
                  <p>+91 94523 52020</p>
                </div>
              </div>

              <div className="booking-contact-item">
                <Clock size={18} className="booking-contact-icon" />
                <div>
                  <h4>Operating Hours</h4>
                  <p>Saturday - Thursday: 10:00 AM - 7:00 PM (Friday Closed)</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              <ShieldCheck size={18} style={{ color: 'var(--gold-primary)' }} />
              <span>BIS Hallmarking & Lifetime Buyback Applies to All Sales</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Side: Appointment Booking Form */}
        <ScrollReveal delay={250} duration="0.8s">
          <div className="booking-card glass-card">
            {submitted ? (
              <div className="form-success animate-fade-in">
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(94, 25, 20, 0.06)', border: '1px solid var(--maroon-accent)', display: 'flex', alignItems: 'center', justify: 'center', margin: '0 auto 1.5rem' }}>
                  <Calendar size={28} className="text-maroon" />
                </div>
                <h3 className="form-success-title">Showroom Visit Requested</h3>
                <p className="form-success-msg">
                  Thank you, <strong>{formData.name}</strong>. We have received your appointment request for <strong>{formData.date}</strong>. Our showroom manager will contact you on <strong>{formData.phone}</strong> within 12 hours to confirm your private slot.
                </p>
                <button 
                  className="btn-primary" 
                  style={{ marginTop: '2rem', width: '100%' }}
                  onClick={() => setSubmitted(false)}
                >
                  Schedule Another Visit
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="booking-form">
                <h3 className="form-title">Schedule Showroom Visit</h3>
                <p className="form-subtitle">Personalized shopping experience</p>

                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Shashi Kant Gupta"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 94523 XXXXX"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Preferred Date</label>
                    <input 
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Metal Interest</label>
                    <select 
                      value={formData.metalPref}
                      onChange={(e) => handleInputChange('metalPref', e.target.value)}
                      className="form-select"
                    >
                      <option value="gold">Gold Jewellery</option>
                      <option value="silver">Silver Jewellery</option>
                      <option value="both">Both Gold & Silver</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Ornament Category</label>
                    <select 
                      value={formData.interest}
                      onChange={(e) => handleInputChange('interest', e.target.value)}
                      className="form-select"
                    >
                      <option value="earrings">Earrings (Jhumka/Bali)</option>
                      <option value="rings">Rings (Ladies/Gents)</option>
                      <option value="chains">Gold / Silver Chains</option>
                      <option value="haar">Traditional Haar</option>
                      <option value="payal">Payal Anklets</option>
                      <option value="kada">Kada & Bracelets</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Special Inquiries (Optional)</label>
                  <textarea 
                    placeholder="e.g. Inquiring about a custom weight Sita Haar, specific ring sizing, etc."
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="form-textarea"
                    rows="3"
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary form-submit-btn">
                  Request Appointment
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
