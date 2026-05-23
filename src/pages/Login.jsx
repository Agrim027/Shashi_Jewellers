import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Phone, User, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function Login({ onNavigate }) {
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  
  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  // Register fields
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  
  // UI states
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setError('Please fill in all fields.');
      return;
    }
    
    setError('');
    setLoading(true);
    try {
      await login(loginEmail, loginPassword);
      setLoading(false);
      onNavigate('home');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to login.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!regName || !regPhone || !regEmail || !regPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    
    setError('');
    setLoading(true);
    try {
      await register(regName, regPhone, regEmail, regPassword);
      setLoading(false);
      onNavigate('collections');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to register account.');
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setError('');
  };

  return (
    <div className="auth-page">
      {/* Decorative gold corner accents */}
      <div className="auth-corner-accent auth-corner-tl" />
      <div className="auth-corner-accent auth-corner-br" />

      <div className="auth-wrapper">
        <div className="auth-card">
          
          {/* Decorative top gold line */}
          <div className="auth-card-gold-strip" />

          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 className="auth-title">Welcome to Shashi Jewellers</h1>
            <p className="auth-subtitle">
              {activeTab === 'login' 
                ? 'Sign in to explore premium collections' 
                : 'Create an account to save your favorites'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${activeTab === 'login' ? 'auth-tab-active' : ''}`}
              onClick={() => switchTab('login')}
            >
              Login
            </button>
            <button 
              className={`auth-tab ${activeTab === 'register' ? 'auth-tab-active' : ''}`}
              onClick={() => switchTab('register')}
            >
              Register
            </button>
            <div 
              className="auth-tab-indicator" 
              style={{ transform: activeTab === 'register' ? 'translateX(100%)' : 'translateX(0)' }} 
            />
          </div>

          {/* Error Banner */}
          {error && (
            <div className="auth-error">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          {/* Forms */}
          <div className="auth-form-area">
            {activeTab === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="auth-form auth-form-enter" key="login-form">
                
                <div className="auth-field">
                  <label className="auth-label">Email Address</label>
                  <div className="auth-input-wrap">
                    <Mail size={16} className="auth-input-icon" />
                    <input 
                      type="email" 
                      placeholder="e.g. rahul@gmail.com" 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="auth-input"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label">Password</label>
                  <div className="auth-input-wrap">
                    <Lock size={16} className="auth-input-icon" />
                    <input 
                      type={showLoginPassword ? 'text' : 'password'}
                      placeholder="Enter your password" 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="auth-input"
                      autoComplete="current-password"
                      required
                    />
                    <button 
                      type="button" 
                      className="auth-toggle-pw"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      tabIndex={-1}
                    >
                      {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="auth-submit-btn" 
                  disabled={loading}
                >
                  <span className="auth-submit-shine" />
                  {loading ? (
                    <span className="auth-loading-dots">
                      <span>Signing in</span>
                      <span className="auth-dot-bounce">.</span>
                      <span className="auth-dot-bounce auth-dot-2">.</span>
                      <span className="auth-dot-bounce auth-dot-3">.</span>
                    </span>
                  ) : 'Sign In'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="auth-form auth-form-enter" key="register-form">

                <div className="auth-field">
                  <label className="auth-label">Full Name</label>
                  <div className="auth-input-wrap">
                    <User size={16} className="auth-input-icon" />
                    <input 
                      type="text" 
                      placeholder="e.g. Rahul Sharma" 
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="auth-input"
                      autoComplete="name"
                      required
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label">Phone Number</label>
                  <div className="auth-input-wrap">
                    <Phone size={16} className="auth-input-icon" />
                    <input 
                      type="tel" 
                      placeholder="e.g. 98765 43210" 
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="auth-input"
                      autoComplete="tel"
                      required
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label">Email Address</label>
                  <div className="auth-input-wrap">
                    <Mail size={16} className="auth-input-icon" />
                    <input 
                      type="email" 
                      placeholder="e.g. rahul@gmail.com" 
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="auth-input"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label">Password</label>
                  <div className="auth-input-wrap">
                    <Lock size={16} className="auth-input-icon" />
                    <input 
                      type={showRegPassword ? 'text' : 'password'}
                      placeholder="Min 6 characters" 
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="auth-input"
                      autoComplete="new-password"
                      required
                    />
                    <button 
                      type="button" 
                      className="auth-toggle-pw"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      tabIndex={-1}
                    >
                      {showRegPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="auth-submit-btn" 
                  disabled={loading}
                >
                  <span className="auth-submit-shine" />
                  {loading ? (
                    <span className="auth-loading-dots">
                      <span>Creating account</span>
                      <span className="auth-dot-bounce">.</span>
                      <span className="auth-dot-bounce auth-dot-2">.</span>
                      <span className="auth-dot-bounce auth-dot-3">.</span>
                    </span>
                  ) : 'Create Account'}
                </button>
              </form>
            )}
          </div>

          {/* Divider */}
          <div className="auth-divider">
            <span className="auth-divider-line" />
            <span className="auth-divider-text">or</span>
            <span className="auth-divider-line" />
          </div>

          {/* Admin portal link */}
          <div className="auth-admin-link-wrap">
            <button 
              onClick={() => onNavigate('admin-login')} 
              className="auth-admin-link"
            >
              Access Admin Portal →
            </button>
          </div>

        </div>

        {/* Bottom trust badge */}
        <p className="auth-trust-text">
          🔒 Your data stays secure — stored only on your device
        </p>
      </div>
    </div>
  );
}
