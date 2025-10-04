import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';

interface MobileShowcaseProduct {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  color: string;
  image: string;
}

interface MobileKillerShowcaseProps {
  products: MobileShowcaseProduct[];
}

export function MobileKillerShowcase({ products }: MobileKillerShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const currentProduct = products[currentIndex] || products[0];

  // Cinematic auto-advance
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % products.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [products.length, isDragging]);

  // Scroll progress animation
  useEffect(() => {
    const timer = setInterval(() => {
      setScrollProgress(prev => prev >= 100 ? 0 : prev + (100 / 60)); // 6 second cycle
    }, 100);
    return () => clearInterval(timer);
  }, [currentIndex]);

  // Ultra-smooth touch
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    setTranslateX(-diff * 0.2); // Ultra-smooth resistance
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    if (Math.abs(translateX) > 40) {
      if (translateX > 0) {
        setCurrentIndex(prev => (prev + 1) % products.length);
      } else {
        setCurrentIndex(prev => (prev - 1 + products.length) % products.length);
      }
    }
    
    setIsDragging(false);
    setTranslateX(0);
    setScrollProgress(0);
  };

  return (
    <>
      {/* Mobile Only */}
      <style>
        {`
          @media (min-width: 768px) {
            .luxury-showcase {
              display: none !important;
            }
          }
        `}
      </style>

      <section
        ref={sectionRef}
        className="luxury-showcase"
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          background: `linear-gradient(180deg, ${currentProduct.color} 0%, ${currentProduct.color}e6 100%)`,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'background 2s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          touchAction: 'pan-y',
          margin: '0',
          padding: '0',
          boxSizing: 'border-box'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Cinematic Content */}
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '3rem 2rem 2rem 2rem',
          boxSizing: 'border-box',
          transform: `translateX(${translateX}px)`,
          transition: isDragging ? 'none' : 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>

          {/* Minimal Header */}
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '2rem'
          }}>
            {/* Series Indicator */}
            <div style={{
              fontSize: '0.7rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              opacity: 0.7,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
            }}>
              {currentProduct.subtitle}
            </div>

            {/* Progress Bar */}
            <div style={{
              width: '60px',
              height: '2px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '1px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${scrollProgress}%`,
                height: '100%',
                background: '#fff',
                borderRadius: '1px',
                transition: 'width 0.1s linear'
              }} />
            </div>
          </div>

          {/* Hero Product */}
          <div style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: '400px',
            position: 'relative'
          }}>
            {/* Product Title - Massive */}
            <h1 style={{
              fontSize: 'clamp(3rem, 12vw, 5rem)',
              fontWeight: 100,
              textTransform: 'uppercase',
              lineHeight: 0.8,
              letterSpacing: '-0.05em',
              margin: '0 0 3rem 0',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              textAlign: 'center',
              opacity: 0.95
            }}>
              {currentProduct.title}
            </h1>

            {/* Product Image - Cinematic */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '3rem'
            }}>
              <img 
                src={currentProduct.image} 
                alt={currentProduct.title}
                style={{
                  width: '100%',
                  maxWidth: '280px',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.3))',
                  animation: 'luxuryFloat 10s ease-in-out infinite'
                }}
              />

              {/* Invisible Navigation */}
              <div 
                onClick={() => setCurrentIndex(prev => (prev - 1 + products.length) % products.length)}
                style={{
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  width: '40%',
                  height: '100%',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              />
              <div 
                onClick={() => setCurrentIndex(prev => (prev + 1) % products.length)}
                style={{
                  position: 'absolute',
                  right: '0',
                  top: '0',
                  width: '40%',
                  height: '100%',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              />
            </div>

            {/* Minimal Description */}
            <p style={{
              fontSize: '1rem',
              fontWeight: 300,
              lineHeight: 1.6,
              opacity: 0.8,
              textAlign: 'center',
              maxWidth: '300px',
              margin: '0',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
            }}>
              {currentProduct.description}
            </p>
          </div>

          {/* Bottom Actions */}
          <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem'
          }}>
            {/* Feature Tags - Horizontal */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              width: '100%'
            }}>
              {currentProduct.features.slice(0, 2).map((feature, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    opacity: 0.6,
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {feature}
                </div>
              ))}
            </div>

            {/* Luxury CTA */}
            <Link 
              to={`/products/${currentProduct.handle}`} 
              style={{
                display: 'inline-block',
                padding: '1rem 3rem',
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 400,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                borderRadius: '0',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                textAlign: 'center',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>
                Discover More
              </span>
              
              {/* Hover Fill */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.1)',
                transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 1
              }} />
            </Link>

            {/* Minimal Dots */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem'
            }}>
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    width: index === currentIndex ? '20px' : '4px',
                    height: '1px',
                    border: 'none',
                    background: index === currentIndex ? '#fff' : 'rgba(255, 255, 255, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Luxury Animations */}
        <style>
          {`
            @keyframes luxuryFloat {
              0%, 100% { 
                transform: translateY(0px) rotateZ(0deg);
              }
              33% { 
                transform: translateY(-8px) rotateZ(0.5deg);
              }
              66% { 
                transform: translateY(-4px) rotateZ(-0.5deg);
              }
            }
            
            .luxury-showcase * {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              text-rendering: optimizeLegibility;
            }
            
            .luxury-showcase a:hover {
              border-color: rgba(255, 255, 255, 0.8);
              background: rgba(255, 255, 255, 0.05);
            }
            
            .luxury-showcase a:hover div {
              left: 0 !important;
            }
            
            .luxury-showcase a:active {
              transform: scale(0.98);
            }
            
            /* Ultra-smooth performance */
            .luxury-showcase {
              will-change: background;
              contain: layout style paint;
            }
            
            .luxury-showcase img {
              will-change: transform;
              backface-visibility: hidden;
            }
          `}
        </style>
      </section>
    </>
  );
}
