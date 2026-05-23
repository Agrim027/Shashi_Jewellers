import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Mail, Lock, AlertTriangle, ArrowLeft } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function AdminLogin({ onNavigate }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const userProfile = await login(email, password);
      setLoading(false);
      
      // Access Control: Double check if user has admin role
      if (userProfile.role !== 'admin') {
        setError('Unauthorized access. This area is reserved for administrators only.');
        // Log out immediately to prevent session hijacking
        localStorage.removeItem('shashi_current_user');
        return;
      }
      
      onNavigate('admin-dashboard');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to authenticate admin credentials.');
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--cream-bg)', padding: '5rem 0', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '440px' }}>
        <ScrollReveal duration="0.8s">
          
          {/* Back button */}
          <button 
            onClick={() => onNavigate('login')}
            style={{ 
              background: 'none', 
              border: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontSize: '0.8rem', 
              color: 'var(--text-secondary)', 
              cursor: 'pointer', 
              marginBottom: '1rem',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={14} />
            Back to User Login
          </button>

          <div className="login-card glass-card" style={{ borderTop: '4px solid var(--maroon-accent)' }}>
            
            {/* Header Icon */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(94, 25, 20, 0.08)', display: 'flex', alignItems: 'center', justify: 'center', margin: '0 auto 1rem', color: 'var(--maroon-accent)' }}>
                <ShieldAlert size={24} />
              </div>
              <span className="section-subtitle" style={{ color: 'var(--maroon-accent)' }}>Showroom Administration</span>
              <h2 className="form-title" style={{ fontSize: '1.4rem', marginTop: '0.2rem' }}>Secure Admin Access</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                Enter backend database credentials to manage stock, rates, and registered users.
              </p>
            </div>

            {/* Error banner */}
            {error && (
              <div className="login-error-banner" style={{ background: 'rgba(94, 25, 20, 0.05)', color: 'var(--maroon-accent)', borderColor: 'rgba(94, 25, 20, 0.15)' }}>
                <AlertTriangle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleAdminSubmit} className="login-form">
              <div className="form-group">
                <label className="form-label" style={{ color: 'var(--text-secondary)' }}>Admin Email</label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-icon" />
                  <input 
                    type="email" 
                    placeholder="sashikantgo@gmail.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: 'var(--text-secondary)' }}>Admin Password</label>
                <div className="input-with-icon">
                  <Lock size={16} className="input-icon" />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary form-submit-btn" 
                style={{ width: '100%', marginTop: '1.5rem', background: 'var(--maroon-gradient)' }}
                disabled={loading}
              >
                {loading ? 'Authenticating...' : 'Enter Control Panel'}
              </button>
            </form>

            <div style={{ background: 'rgba(197, 155, 39, 0.04)', padding: '1rem', borderLeft: '3px solid var(--gold-primary)', marginTop: '1.5rem', fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              <strong>Notice:</strong> All dashboard activities, product edits, and database operations are logged locally for showroom audit security.
            </div>

          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
