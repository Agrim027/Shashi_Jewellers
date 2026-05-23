import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Clock, RefreshCw, AlertCircle } from 'lucide-react';

export default function LiveRates({ compact = false }) {
  const [rates, setRates] = useState({ gold18k: null, gold24k: null, silver: null });
  const [prevRates, setPrevRates] = useState({ gold18k: null, gold24k: null, silver: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchRates = async () => {
    try {
      setIsRefreshing(true);
      setError(null);
      // Fetching from Spring Boot Backend
      const response = await fetch('http://localhost:8080/api/live-rates');
      if (!response.ok) throw new Error('Failed to fetch live rates');
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setPrevRates(rates);
      setRates({
        gold18k: data.gold18k,
        gold24k: data.gold24k,
        silver: data.silver
      });
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching rates:', err);
      setError('Live rates currently unavailable');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRates();
    // Auto refresh every 1 second
    const interval = setInterval(fetchRates, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (current, previous) => {
    if (!current || !previous) return <TrendingUp size={14} className="rate-trend neutral" />;
    
    const currVal = parseFloat(current.replace(/[^0-9.-]+/g,""));
    const prevVal = parseFloat(previous.replace(/[^0-9.-]+/g,""));
    
    if (currVal > prevVal) return <TrendingUp size={14} className="rate-trend up" />;
    if (currVal < prevVal) return <TrendingDown size={14} className="rate-trend down" />;
    return <TrendingUp size={14} className="rate-trend neutral" />;
  };

  const getTrendClass = (current, previous) => {
    if (!current || !previous) return 'neutral';
    const currVal = parseFloat(current.replace(/[^0-9.-]+/g,""));
    const prevVal = parseFloat(previous.replace(/[^0-9.-]+/g,""));
    if (currVal > prevVal) return 'up';
    if (currVal < prevVal) return 'down';
    return 'neutral';
  };

  if (compact) {
    if (loading) return <div className="nav-live-rates"><RefreshCw size={14} className="animate-spin" /> Loading rates...</div>;
    if (error) return null; // Hide in nav if error

    return (
      <div className="nav-live-rates animate-fade-in">
        <div className="nav-rate-item">
          <span className="nav-rate-label">18K Gold</span>
          <span className="number-transition" key={rates.gold18k}>{rates.gold18k}</span>
        </div>
        <div className="nav-rate-item">
          <span className="nav-rate-label" style={{color: '#888'}}>Silver</span>
          <span className="number-transition" key={rates.silver}>{rates.silver}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="live-rates-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', margin: 0 }}>Live Market Rates</h3>
          <div className="live-indicator">
            <div className="live-dot"></div>
            LIVE
          </div>
        </div>
      </div>

      {error ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c42936', padding: '1rem', background: 'rgba(196,41,54,0.05)', borderRadius: '8px' }}>
          <AlertCircle size={18} />
          <span style={{ fontSize: '0.9rem' }}>{error}</span>
        </div>
      ) : loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <RefreshCw size={24} className="animate-spin" style={{ color: 'var(--gold-primary)' }} />
        </div>
      ) : (
        <>
          <div className="rate-cards-grid">
            <div className="rate-card gold-card">
              <span className="rate-title">18K Gold (75.5%)</span>
              <span className="rate-value number-transition" key={rates.gold18k}>{rates.gold18k}</span>
              <div className={`rate-trend ${getTrendClass(rates.gold18k, prevRates.gold18k)}`}>
                {getTrendIcon(rates.gold18k, prevRates.gold18k)}
                <span>vs last update</span>
              </div>
            </div>

            <div className="rate-card gold-card">
              <span className="rate-title">24K Gold (99.9%)</span>
              <span className="rate-value number-transition" key={rates.gold24k}>{rates.gold24k}</span>
              <div className={`rate-trend ${getTrendClass(rates.gold24k, prevRates.gold24k)}`}>
                {getTrendIcon(rates.gold24k, prevRates.gold24k)}
                <span>vs last update</span>
              </div>
            </div>

            <div className="rate-card silver-card">
              <span className="rate-title">Silver (99.9%)</span>
              <span className="rate-value number-transition" key={rates.silver}>{rates.silver}</span>
              <div className={`rate-trend ${getTrendClass(rates.silver, prevRates.silver)}`}>
                {getTrendIcon(rates.silver, prevRates.silver)}
                <span>vs last update</span>
              </div>
            </div>
          </div>
          
          {lastUpdated && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1.25rem', justifyContent: 'center' }}>
              <Clock size={12} />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
