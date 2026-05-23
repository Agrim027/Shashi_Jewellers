import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, delay = 0, duration = '0.8s', threshold = 0.1 }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          // Once revealed, we can stop observing this element
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element fully enters
      }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal ${isRevealed ? 'is-visible' : ''}`}
      style={{
        transitionDuration: duration,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}
