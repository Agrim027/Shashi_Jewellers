import React, { useRef, useState } from 'react';

export default function Tilt({ children, className = '', style = {}, maxRotation = 12, scale = 1.03 }) {
  const ref = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const card = ref.current;
    const rect = card.getBoundingClientRect();
    
    // Mouse coordinates relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized coordinates (-0.5 to 0.5)
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    
    // RotateX is driven by Y coordinate (moving mouse up tilts it backward/up, down tilts forward/down)
    // RotateY is driven by X coordinate (moving right tilts it right, left tilts left)
    const rotateX = (-normalizedY * maxRotation).toFixed(2);
    const rotateY = (normalizedX * maxRotation).toFixed(2);
    
    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  };

  return (
    <div
      ref={ref}
      className={`tilt-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: transformStyle,
        transition: transformStyle ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
}
