import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Clock, RefreshCw, AlertCircle } from 'lucide-react';

const DEFAULT_RATES = {
  gold18k: "₹ 5,662.50/g",
  gold24k: "₹ 7,500.00/g",
  silver: "₹ 90.00/g"
};

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function LiveRates({ compact = false }) {
  const [rates, setRates] = useState({ gold18k: null, gold24k: null, silver: null });
  const [prevRates, setPrevRates] = useState({ gold18k: null, gold24k: null, silver: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const hasFetchedInitially = useRef(false);

  const fetchRates = async () => {
    try {
      setIsRefreshing(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/live-rates`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
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
      setError('Live rates temporarily unavailable. Please try again later.');
      
      // Fallback logic
      if (!rates.gold18k) {
        setRates(DEFAULT_RATES);
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedInitially.current) {
      fetchRates();
      hasFetchedInitially.current = true;
    }
    
    // Auto refresh every 5 minutes (300000 ms)
    const interval = setInterval(fetchRates, 300000);
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

  // Skeleton Loader for compact view
  if (compact) {
    if (loading && !rates.gold18k) return (
      <div className="nav-live-rates animate-pulse" style={{ display: 'flex', gap: '15px' }}>
        <div style={{ height: '20px', width: '80px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px' }}></div>
        <div style={{ height: '20px', width: '80px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px' }}></div>
      </div>
    );

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

      {error && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#c42936', padding: '1rem', background: 'rgba(196,41,54,0.05)', borderRadius: '8px', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={18} />
            <span style={{ fontSize: '0.9rem' }}>{error}</span>
          </div>
          <button 
            onClick={fetchRates} 
            disabled={isRefreshing}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: '1px solid #c42936', color: '#c42936', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
          >
            <RefreshCw size={12} className={isRefreshing ? "animate-spin" : ""} />
            RETRY
          </button>
        </div>
      )}

      {loading && !rates.gold18k ? (
        <div className="rate-cards-grid animate-pulse">
          <div className="rate-card" style={{ height: '100px', background: 'rgba(0,0,0,0.02)' }}></div>
          <div className="rate-card" style={{ height: '100px', background: 'rgba(0,0,0,0.02)' }}></div>
          <div className="rate-card" style={{ height: '100px', background: 'rgba(0,0,0,0.02)' }}></div>
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
