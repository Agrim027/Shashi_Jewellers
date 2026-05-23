import React from 'react';

export default function ProductSkeleton() {
  return (
    <div className="product-card skeleton-card">
      <div className="card-img-container skeleton-shimmer" style={{ borderBottom: 'none' }}>
        {/* Placeholder for product image */}
      </div>
      <div className="card-info" style={{ gap: '0.5rem', flexGrow: 1 }}>
        <div className="skeleton-line skeleton-shimmer" style={{ width: '30%', height: '12px' }}></div>
        <div className="skeleton-line skeleton-shimmer" style={{ width: '80%', height: '22px', margin: '0.2rem 0' }}></div>
        
        <div className="card-specs" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: '0.6rem 0' }}>
          <div className="skeleton-line skeleton-shimmer" style={{ width: '100%', height: '14px' }}></div>
          <div className="skeleton-line skeleton-shimmer" style={{ width: '100%', height: '14px' }}></div>
        </div>
        
        <div className="skeleton-line skeleton-shimmer" style={{ width: '55%', height: '10px', alignSelf: 'center', marginBottom: '0.5rem' }}></div>
        
        <div className="skeleton-line skeleton-shimmer" style={{ width: '100%', height: '38px', marginTop: 'auto' }}></div>
      </div>
    </div>
  );
}
