import React from 'react';
import { X, ShieldCheck, MapPin, Award } from 'lucide-react';

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  const whatsappNumber = '919452352020';

  const formatString = (str) => {
    if (!str) return '';
    const dict = {
      gentsring: 'Gents Ring',
      ladiesring: 'Ladies Ring',
      goldchain: 'Gold Chain',
      silverchain: 'Silver Chain',
      silverring: 'Silver Ring',
      nosering: 'Nose Ring',
      mathbedi: 'Mathabedi'
    };
    return dict[str.toLowerCase()] || (str.charAt(0).toUpperCase() + str.slice(1));
  };

  const getWhatsAppLink = () => {
    const metalName = formatString(product.metal);
    const categoryName = formatString(product.category);
    const subcategoryName = formatString(product.subcategory);

    const text = `Hello Shashi Jewellers, I am interested in the following item:

Product: ${product.name}
Category: ${categoryName}
Subcategory: ${subcategoryName}
Metal: ${metalName}
Purity: ${product.purity}
Weight: ${product.weight}

Please share more details.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const isSilver = product.metal === 'silver';

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div 
        className={`modal-content ${isSilver ? 'silver-modal' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-grid">
          {/* Left: Product Image */}
          <div className="modal-image-wrapper">
            <img src={product.image} alt={product.name} className="modal-image" />
          </div>

          {/* Right: Product Details */}
          <div className="modal-details">
            <span className={`modal-category ${isSilver ? 'silver-text' : ''}`}>
              {product.category} • {product.subcategory}
            </span>
            <h2 className="modal-title">{product.name}</h2>
            <p className={`modal-purity ${isSilver ? 'silver-text' : ''}`}>{product.purity}</p>
            
            <div className={`modal-divider ${isSilver ? 'silver-divider' : ''}`}></div>
            
            <p className="modal-description">{product.description}</p>
            
            {/* Spec Table */}
            <div className={`specs-table ${isSilver ? 'silver-table' : ''}`}>
              <div className="spec-row">
                <span className="spec-label">Metal Purity:</span>
                <span className="spec-value">{product.purity}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Approximate Weight:</span>
                <span className="spec-value">{product.weight}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Certification:</span>
                <span className="spec-value">BIS Hallmarked Jewellery</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Buyback & Exchange:</span>
                <span className="spec-value">Showroom Policy Applicable</span>
              </div>
            </div>

            {/* Actions */}
            <div className="modal-actions-container" style={{ marginBottom: '1.5rem' }}>
              <div className="whatsapp-action-container" style={{ alignItems: 'flex-start' }}>
                <a 
                  href={getWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-whatsapp-premium"
                  style={{ padding: '0.85rem 1.5rem', borderRadius: '2px', width: 'auto', display: 'inline-flex' }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ flexShrink: 0 }}>
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.419 9.86-9.86.002-2.636-1.02-5.115-2.879-6.973-1.858-1.859-4.339-2.882-6.98-2.884-5.443 0-9.863 4.42-9.865 9.861 0 1.682.44 3.319 1.282 4.757l-.545 1.995 2.046-.536zm10.744-7.405c-.29-.145-1.72-.848-1.986-.944-.267-.097-.461-.145-.655.145-.194.29-.752.944-.922 1.138-.17.194-.34.218-.63.073-.29-.145-1.226-.452-2.335-1.44-.863-.77-1.447-1.72-1.616-2.011-.17-.29-.018-.447.127-.591.13-.13.29-.34.436-.509.145-.17.194-.29.291-.485.097-.194.048-.364-.024-.509-.073-.145-.655-1.577-.898-2.16-.236-.569-.477-.491-.655-.5h-.56c-.194 0-.509.073-.776.364-.267.29-1.02 1.02-1.02 2.487 0 1.467 1.067 2.885 1.213 3.08.145.194 2.099 3.206 5.086 4.494.71.306 1.264.489 1.696.626.714.227 1.364.195 1.879.118.573-.085 1.72-.703 1.962-1.382.242-.679.242-1.261.17-1.382-.072-.12-.267-.194-.557-.339z"/>
                  </svg>
                  Enquire on WhatsApp
                </a>
                <span className="whatsapp-helper-text" style={{ marginLeft: '4px' }}>
                  Get price & details instantly
                </span>
              </div>
            </div>

            {/* Guarantees */}
            <div className="modal-guarantees" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid rgba(44, 26, 17, 0.06)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <ShieldCheck size={16} className="text-maroon" />
                <span>Government Certified BIS 916 Hallmark</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <Award size={16} style={{ color: 'var(--gold-primary)' }} />
                <span>Showroom Guarantee of Purity Since 1995</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <MapPin size={16} style={{ color: 'var(--gold-primary)' }} />
                <span>Available for pick-up in Goshainganj, Ayodhya</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
