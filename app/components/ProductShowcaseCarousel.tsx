import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';

interface ProductShowcaseSlide {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  color: string;
  image: string;
}

interface ProductShowcaseCarouselProps {
  products: ProductShowcaseSlide[];
}

export function ProductShowcaseCarousel({ products }: ProductShowcaseCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 7000); // Slower than hero for better reading
    return () => clearInterval(timer);
  }, [products.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const currentProduct = products[currentSlide];

  if (!currentProduct) return null;

  return (
    <section 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        background: currentProduct.color, // Full flat color background
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        transition: 'background 1s ease',
        overflow: 'hidden',
        touchAction: 'pan-y', // Allow vertical scrolling but handle horizontal swipes
        margin: '0',
        padding: '0',
        boxSizing: 'border-box'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Content Container */}
      <div style={{
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '8rem 2rem', // Increased padding for more consistent layout
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '6rem',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
        minHeight: '700px' // Fixed minimum height for entire content area
      }}>
        {/* Left: Product Image */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}>
          <img 
            src={currentProduct.image} 
            alt={currentProduct.title}
            style={{
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
              filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4))',
              transition: 'all 1s ease',
              transform: 'scale(1.1)'
            }}
          />
        </div>

        {/* Right: Product Content - FLEXIBLE GRID APPROACH */}
        <div style={{
          display: 'grid',
          gridTemplateRows: 'auto auto 1fr auto auto', // Let title be auto-sized!
          gap: '1.5rem',
          minHeight: '600px', // Minimum height for stability
          padding: '2rem 0'
        }}>
          {/* Subtitle */}
          <div style={{
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            opacity: 0.9,
            fontWeight: 600
          }}>
            {currentProduct.subtitle}
          </div>
          
          {/* Title - AUTO HEIGHT! */}
          <div>
            <h2 style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', // Slightly larger since we have space
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 0.9, // Better line height for readability
              letterSpacing: '-0.02em',
              color: '#fff',
              margin: 0,
              wordWrap: 'break-word' // Smart word wrapping
            }}>
              {currentProduct.title}
            </h2>
          </div>

          {/* Description */}
          <div>
            <p style={{
              fontSize: '1.2rem',
              lineHeight: 1.5,
              opacity: 0.95,
              maxWidth: '500px',
              margin: 0
            }}>
              {currentProduct.description}
            </p>
          </div>

          {/* Features List - FLEXIBLE */}
          <div>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {currentProduct.features.map((feature, index) => (
                <li key={index} style={{
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: '0.95rem',
                  letterSpacing: '0.08em',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                  paddingBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    background: '#fff',
                    borderRadius: '50%',
                    flexShrink: 0
                  }} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <Link to={`/products/${currentProduct.handle}`} style={{
              padding: '1.2rem 2.5rem',
              border: '3px solid #fff',
              background: '#fff',
              color: currentProduct.color,
              textDecoration: 'none',
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              display: 'inline-block',
              textAlign: 'center'
            }}>
              Learn Why It Works
            </Link>
            <Link to="/collections/all" style={{
              padding: '1.2rem 2.5rem',
              border: '3px solid #fff',
              background: 'transparent',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              display: 'inline-block',
              textAlign: 'center'
            }}>
              See All Flavors
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div style={{
        position: 'absolute',
        bottom: '3rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        zIndex: 10
      }}>
        {/* Previous Button */}
        <button 
          onClick={prevSlide}
          style={{
            width: '50px',
            height: '50px',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.borderColor = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
          }}
        >
          ←
        </button>

        {/* Slide Indicators */}
        <div style={{display: 'flex', gap: '1rem'}}>
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: index === currentSlide ? '40px' : '12px',
                height: '6px',
                borderRadius: '3px',
                border: 'none',
                background: index === currentSlide ? '#fff' : 'rgba(255, 255, 255, 0.4)',
                cursor: 'pointer',
                transition: 'all 0.4s ease'
              }}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button 
          onClick={nextSlide}
          style={{
            width: '50px',
            height: '50px',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.borderColor = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
          }}
        >
          →
        </button>
      </div>

      {/* Slide Counter */}
      <div style={{
        position: 'absolute',
        top: '3rem',
        right: '3rem',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '1rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        zIndex: 10
      }}>
        {String(currentSlide + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
      </div>
    </section>
  );
}
