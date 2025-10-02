import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { getAccentHexForProduct } from '~/lib/accents';

interface Product {
  id: string;
  handle: string;
  title: string;
  description?: string;
  tags: string[];
  featuredImage?: {
    url: string;
    altText?: string;
  };
  metafields: Array<{
    key: string;
    value: string;
    namespace: string;
  }>;
}

interface AutoPlayProductCarouselProps {
  products: Product[];
  autoPlayInterval?: number;
}

export function AutoPlayProductCarousel({ 
  products, 
  autoPlayInterval = 4000 
}: AutoPlayProductCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Auto-play functionality
  useEffect(() => {
    if (!isPaused && products.length > 3) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIndex = Math.max(0, products.length - 3); // Show 3 cards at once
          return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
      }, autoPlayInterval);
      
      return () => clearInterval(timer);
    }
  }, [isPaused, autoPlayInterval, products.length]);

  // Handle mouse events
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Calculate transform for smooth sliding
  const cardWidth = 320; // Width of each card
  const gap = 24; // Gap between cards (1.5rem = 24px)
  const translateX = -(currentIndex * (cardWidth + gap));

  if (products.length === 0) return null;

  return (
    <section style={{
      width: '100%',
      padding: '6rem 0',
      background: '#000'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 900,
          textTransform: 'uppercase',
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
          marginBottom: '4rem',
          color: '#fff'
        }}>
          You may also like
        </h2>
        
        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          style={{
            width: '100%',
            overflow: 'hidden',
            position: 'relative'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Cards Container */}
          <div 
            style={{
              display: 'flex',
              gap: `${gap}px`,
              transform: `translateX(${translateX}px)`,
              transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              alignItems: 'stretch'
            }}
          >
            {products.map((product) => {
              const color = getAccentHexForProduct(product.handle, product.title, product.tags, product.metafields);
              
              return (
                <Link 
                  key={product.id}
                  to={`/products/${product.handle}`}
                  className="bodyarmor-product-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.4s ease',
                    alignItems: 'center',
                    gap: '1.5rem',
                    minWidth: `${cardWidth}px`,
                    maxWidth: `${cardWidth}px`
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector('img') as HTMLElement;
                    const placeholder = e.currentTarget.querySelector('.placeholder-bottle') as HTMLElement;
                    
                    if (img) {
                      img.style.transform = 'translateY(-2px) scale(1.1)';
                      img.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    }
                    if (placeholder) {
                      placeholder.style.transform = 'translateY(-2px) scale(1.1)';
                      placeholder.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector('img') as HTMLElement;
                    const placeholder = e.currentTarget.querySelector('.placeholder-bottle') as HTMLElement;
                    
                    if (img) {
                      img.style.transform = 'translateY(-2px) scale(1)';
                      img.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    }
                    if (placeholder) {
                      placeholder.style.transform = 'translateY(0) scale(1)';
                      placeholder.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    }
                  }}
                >
                  {/* Card Container - BodyArmor Style */}
                  <div 
                    className="product-card-container"
                    style={{
                      minWidth: '270px',
                      width: '270px',
                      height: '360px',
                      border: '12px solid #ffffff',
                      borderRadius: '0px',
                      overflow: 'hidden',
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.35), 0 4px 16px rgba(0, 0, 0, 0.2)',
                      position: 'relative',
                      transition: 'all 0.4s ease'
                    }}
                  >
                    {/* Product Image with Colored Background */}
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(135deg, ${color} 0%, ${color}ee 50%, ${color}bb 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {/* Background pattern overlay */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
                        zIndex: 1
                      }} />
                      
                      {/* Product Image */}
                      <img 
                        src={product.featuredImage?.url}
                        alt={product.featuredImage?.altText || product.title}
                        style={{
                          width: '82%',
                          height: '82%',
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 6px 18px rgba(0, 0, 0, 0.4)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2))',
                          zIndex: 2,
                          transform: 'translateY(-2px)'
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const placeholder = e.currentTarget.parentElement?.querySelector('.placeholder-bottle');
                          if (placeholder) {
                            (placeholder as HTMLElement).style.display = 'flex';
                          }
                        }}
                      />
                      
                      {/* Fallback Placeholder Bottle */}
                      <div 
                        className="placeholder-bottle"
                        style={{
                          display: 'none',
                          width: '65%',
                          height: '88%',
                          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 100%)',
                          borderRadius: '25px 25px 12px 12px',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          color: '#fff',
                          fontSize: '0.8rem',
                          fontWeight: 900,
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          lineHeight: 1.2,
                          padding: '1.5rem 0.8rem',
                          zIndex: 2,
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                          border: '2px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        {/* Bottle cap */}
                        <div style={{
                          position: 'absolute',
                          top: '-8px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '30px',
                          height: '16px',
                          background: '#333',
                          borderRadius: '4px'
                        }} />
                        
                        <div>
                          <div style={{ fontSize: '0.6rem', marginBottom: '0.25rem' }}>DRINKSIP</div>
                          <div style={{ fontSize: '0.5rem', lineHeight: 1.1 }}>
                            {product.title.replace('DrinkSip ', '').toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Title - BodyArmor Style */}
                  <div style={{
                    textAlign: 'center',
                    width: '270px',
                    minHeight: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '900',
                      color: '#fff',
                      margin: 0,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      lineHeight: 0.85,
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontStretch: 'ultra-condensed'
                    }}>
                      {product.title.replace('DrinkSip ', '')}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Indicators */}
        {products.length > 3 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '2rem'
          }}>
            {Array.from({ length: Math.max(0, products.length - 2) }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                style={{
                  width: i === currentIndex ? '32px' : '8px',
                  height: '4px',
                  borderRadius: '2px',
                  border: 'none',
                  background: i === currentIndex ? '#fff' : 'rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease'
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Play/Pause Indicator */}
        <div style={{
          textAlign: 'center',
          marginTop: '1rem',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '0.8rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 600
        }}>
          {isPaused ? '⏸ Paused - Move cursor away to resume' : '▶ Auto-playing - Hover to pause'}
        </div>
      </div>
    </section>
  );
}
