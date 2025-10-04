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
  const sectionRef = useRef<HTMLElement>(null);

  const currentProduct = products[currentIndex] || products[0];

  // Auto-advance
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % products.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [products.length, isDragging]);

  // Touch handlers - MOBILE ONLY, NO HORIZONTAL SHIFT
  const handleTouchStart = (e: React.TouchEvent) => {
    // Only handle vertical swipes for mobile
    return;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Disabled to prevent horizontal shifting
    return;
  };

  const handleTouchEnd = () => {
    // Disabled to prevent horizontal shifting
    return;
  };

  return (
    <>
        {/* NEXT-LEVEL MOBILE OPTIMIZATION - ALL DEVICES */}
        <style>
          {`
            .drinksip-showcase {
              /* Base Mobile Variables - Design First */
              --container-max-width: min(90vw, 400px);
              --image-size: min(70vw, 280px);
              --title-size: clamp(1.6rem, 6vw, 2.8rem);
              --subtitle-size: clamp(0.7rem, 2vw, 0.9rem);
              --description-size: clamp(0.9rem, 2.5vw, 1.1rem);
              --feature-size: clamp(0.7rem, 2.2vw, 0.9rem);
              --button-padding: clamp(1rem, 3vw, 1.4rem) clamp(1.5rem, 4vw, 2.2rem);
              --gap-size: clamp(1rem, 3vw, 1.8rem);
              --container-padding: clamp(1rem, 3vw, 2rem) clamp(1rem, 4vw, 1.5rem);
              --nav-button-size: clamp(35px, 8vw, 45px);
              --nav-gap: clamp(0.8rem, 2.5vw, 1.2rem);
              --feature-grid-gap: clamp(0.6rem, 2vw, 0.9rem);
              --border-radius: clamp(6px, 1.5vw, 10px);
            }

            /* iPhone SE & Very Small Mobile (320px-375px) */
            @media (max-width: 375px) {
              .drinksip-showcase {
                --container-max-width: 100vw;
                --image-size: min(65vw, 200px);
                --title-size: clamp(1.2rem, 6vw, 1.8rem);
                --subtitle-size: clamp(0.6rem, 2vw, 0.75rem);
                --description-size: clamp(0.8rem, 2.5vw, 0.95rem);
                --feature-size: clamp(0.65rem, 2vw, 0.8rem);
                --gap-size: clamp(0.6rem, 2.5vw, 1rem);
                --container-padding: clamp(0.5rem, 2vw, 1rem) clamp(0.75rem, 3vw, 1rem);
                --nav-button-size: clamp(30px, 7vw, 38px);
                --nav-gap: clamp(0.6rem, 2vw, 0.9rem);
                --feature-grid-gap: clamp(0.5rem, 1.8vw, 0.7rem);
                --button-padding: clamp(0.8rem, 2.5vw, 1rem) clamp(1.2rem, 3.5vw, 1.6rem);
              }
            }

            /* Extra Small Mobile (iPhone SE 320px) */
            @media (max-width: 320px) {
              .drinksip-showcase {
                --container-max-width: 100vw;
                --image-size: min(60vw, 180px);
                --title-size: clamp(1rem, 5.5vw, 1.6rem);
                --subtitle-size: clamp(0.55rem, 1.8vw, 0.7rem);
                --description-size: clamp(0.75rem, 2.2vw, 0.9rem);
                --feature-size: clamp(0.6rem, 1.8vw, 0.75rem);
                --gap-size: clamp(0.5rem, 2vw, 0.8rem);
                --container-padding: clamp(0.4rem, 1.5vw, 0.8rem) clamp(0.6rem, 2.5vw, 0.9rem);
                --nav-button-size: clamp(28px, 6vw, 35px);
                --nav-gap: clamp(0.5rem, 1.8vw, 0.8rem);
                --feature-grid-gap: clamp(0.4rem, 1.5vw, 0.6rem);
                --button-padding: clamp(0.7rem, 2.2vw, 0.9rem) clamp(1rem, 3vw, 1.4rem);
              }
            }

            /* Large Mobile (414px+) - iPhone Pro Max, etc */
            @media (min-width: 414px) and (max-width: 767px) {
              .drinksip-showcase {
                --container-max-width: min(85vw, 420px);
                --image-size: min(65vw, 320px);
                --title-size: clamp(2rem, 5.5vw, 3.2rem);
                --subtitle-size: clamp(0.8rem, 1.8vw, 1rem);
                --description-size: clamp(1rem, 2.2vw, 1.2rem);
                --feature-size: clamp(0.75rem, 2vw, 0.95rem);
                --gap-size: clamp(1.2rem, 2.8vw, 2rem);
                --nav-button-size: clamp(40px, 7vw, 50px);
              }
            }

            /* Hide on tablet and desktop */
            @media (min-width: 768px) {
              .drinksip-showcase {
                display: none !important;
              }
            }

            /* Landscape Mobile Optimization */
            @media (max-height: 600px) and (orientation: landscape) {
              .drinksip-showcase {
                --gap-size: clamp(0.4rem, 1.5vw, 0.8rem);
                --container-padding: clamp(0.3rem, 1.5vw, 0.8rem) clamp(0.8rem, 2.5vw, 1.2rem);
                --image-size: min(35vh, 180px);
                --title-size: clamp(1rem, 3.5vw, 1.8rem);
                --feature-grid-gap: clamp(0.3rem, 1vw, 0.5rem);
                --feature-size: clamp(0.45rem, 1.2vw, 0.6rem);
              }
            }

            /* High DPI / Retina Optimization */
            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
              .drinksip-showcase img {
                image-rendering: -webkit-optimize-contrast;
                image-rendering: crisp-edges;
              }
            }
          `}
        </style>

      <section
        ref={sectionRef}
        className="drinksip-showcase"
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          minHeight: '100vh',
          maxHeight: '100vh',
          background: currentProduct.color,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'background 0.8s ease',
          overflow: 'hidden',
          touchAction: 'manipulation',
          margin: '0',
          padding: 'var(--container-padding)',
          boxSizing: 'border-box'
        }}
      >
        {/* NEXT-LEVEL RESPONSIVE LAYOUT - ALL MOBILE DEVICES */}
        <div style={{
          width: '100%',
          maxWidth: 'var(--container-max-width)',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'var(--gap-size)',
          margin: '0 auto'
        }}>

          {/* RESPONSIVE PRODUCT IMAGE - ALL DEVICES */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: 'var(--image-size)',
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* RESPONSIVE TAP/SWIPE TEXT - OPTIMIZED FOR SMALL DEVICES */}
            <div style={{
              position: 'absolute',
              left: 'clamp(-60px, -12vw, -40px)',
              top: '50%',
              transform: 'translateY(-50%) rotate(-90deg)',
              fontSize: 'clamp(0.45rem, 1.2vw, 0.65rem)',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: 'clamp(0.03em, 0.2vw, 0.1em)',
              opacity: 0.6,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              whiteSpace: 'nowrap',
              zIndex: 5
            }}>
              Tap or Swipe
            </div>

            <img 
              src={currentProduct.image} 
              alt={currentProduct.title}
              style={{
                width: '100%',
                maxWidth: 'var(--image-size)',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 clamp(15px, 4vw, 25px) clamp(25px, 6vw, 45px) rgba(0, 0, 0, 0.3))'
              }}
            />

            {/* Touch Areas - MOBILE CENTERED */}
            <div 
              onClick={() => setCurrentIndex(prev => (prev - 1 + products.length) % products.length)}
              style={{
                position: 'absolute',
                left: '0',
                top: '0',
                width: '30%',
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
                width: '30%',
                height: '100%',
                cursor: 'pointer',
                zIndex: 10
              }}
            />
          </div>

          {/* RESPONSIVE SERIES BADGE */}
          <div style={{
            fontSize: 'var(--subtitle-size)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: 'clamp(0.1em, 0.5vw, 0.25em)',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            opacity: 0.9,
            flex: '0 0 auto'
          }}>
            {currentProduct.subtitle}
          </div>

          {/* RESPONSIVE PRODUCT TITLE - BOLD & DESIGN FIRST */}
          <h1 style={{
            fontSize: 'var(--title-size)',
            fontWeight: 900,
            textTransform: 'uppercase',
            lineHeight: 'clamp(0.8, 2vw, 0.9)',
            letterSpacing: 'clamp(-0.03em, -0.5vw, -0.01em)',
            margin: '0',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            maxWidth: '100%',
            flex: '0 0 auto'
          }}>
            {currentProduct.title}
          </h1>

          {/* RESPONSIVE CONTENT SECTION - ALL DEVICES */}
          <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'calc(var(--gap-size) * 0.8)',
            flex: '1 1 auto',
            justifyContent: 'center'
          }}>
            {/* RESPONSIVE DESCRIPTION */}
            <p style={{
              fontSize: 'var(--description-size)',
              fontWeight: 400,
              lineHeight: 'clamp(1.4, 3vw, 1.6)',
              maxWidth: '100%',
              margin: '0',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              opacity: 0.95
            }}>
              {currentProduct.description}
            </p>

            {/* RESPONSIVE FEATURE GRID - ALWAYS 2x2 LAYOUT */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr',
              gap: 'var(--feature-grid-gap)',
              width: '100%'
            }}>
              {currentProduct.features.slice(0, 4).map((feature, index) => (
                <div
                  key={index}
                  style={{
                    padding: 'clamp(1rem, 3vw, 1.4rem) clamp(0.75rem, 2.5vw, 1rem)',
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: 'var(--border-radius)',
                    fontSize: 'var(--feature-size)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 'clamp(0.04em, 0.2vw, 0.08em)',
                    lineHeight: 'clamp(1.2, 2vw, 1.4)',
                    textAlign: 'center',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    minHeight: 'clamp(60px, 15vw, 80px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {feature}
                </div>
              ))}
            </div>

            {/* RESPONSIVE CTA BUTTONS - BOLD & PREMIUM */}
            <div style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 'calc(var(--feature-grid-gap) * 1.2)'
            }}>
              {/* Primary Button - White */}
              <Link 
                to={`/products/${currentProduct.handle}`} 
                style={{
                  display: 'block',
                  width: '100%',
                  padding: 'var(--button-padding)',
                  background: '#fff',
                  color: currentProduct.color,
                  textDecoration: 'none',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
                  letterSpacing: 'clamp(0.05em, 0.3vw, 0.15em)',
                  borderRadius: 'var(--border-radius)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  textAlign: 'center',
                  boxShadow: '0 clamp(6px, 2vw, 12px) clamp(20px, 5vw, 30px) rgba(0, 0, 0, 0.15)',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                Learn Why It Works
              </Link>

              {/* Secondary Button - Outlined */}
              <Link 
                to="/collections/all" 
                style={{
                  display: 'block',
                  width: '100%',
                  padding: 'var(--button-padding)',
                  background: 'transparent',
                  border: 'clamp(1px, 0.3vw, 2px) solid #fff',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
                  letterSpacing: 'clamp(0.05em, 0.3vw, 0.15em)',
                  borderRadius: 'var(--border-radius)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  textAlign: 'center',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  backdropFilter: 'blur(5px)'
                }}
              >
                See All Flavors
              </Link>
            </div>

             {/* RESPONSIVE NAVIGATION CONTROLS - ALL DEVICES */}
             <div style={{
               display: 'flex',
               alignItems: 'center',
               gap: 'var(--nav-gap)'
             }}>
               {/* RESPONSIVE PREVIOUS BUTTON */}
               <button 
                 onClick={() => setCurrentIndex(prev => (prev - 1 + products.length) % products.length)}
                 style={{
                   width: 'var(--nav-button-size)',
                   height: 'var(--nav-button-size)',
                   border: 'none',
                   borderRadius: '50%',
                   background: 'rgba(0, 0, 0, 0.6)',
                   color: '#fff',
                   cursor: 'pointer',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
                   transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                   backdropFilter: 'blur(10px)'
                 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                }}
                aria-label="Previous product"
              >
                ‹
              </button>

               {/* RESPONSIVE SLIDE INDICATORS */}
               <div style={{
                 display: 'flex',
                 alignItems: 'center',
                 gap: 'clamp(6px, 1.5vw, 10px)'
               }}>
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    style={{
                      width: index === currentIndex ? 'clamp(16px, 4vw, 24px)' : 'clamp(6px, 2vw, 10px)',
                      height: 'clamp(6px, 2vw, 10px)',
                      borderRadius: 'clamp(3px, 1vw, 5px)',
                      border: 'none',
                      background: index === currentIndex ? '#fff' : 'rgba(255, 255, 255, 0.4)',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    aria-label={`Go to product ${index + 1}`}
                  />
                ))}
              </div>

               {/* RESPONSIVE NEXT BUTTON */}
               <button 
                 onClick={() => setCurrentIndex(prev => (prev + 1) % products.length)}
                 style={{
                   width: 'var(--nav-button-size)',
                   height: 'var(--nav-button-size)',
                   border: 'none',
                   borderRadius: '50%',
                   background: 'rgba(0, 0, 0, 0.6)',
                   color: '#fff',
                   cursor: 'pointer',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
                   transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                   backdropFilter: 'blur(10px)'
                 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                }}
                aria-label="Next product"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* DrinkSip Styles */}
        <style>
          {`
            .drinksip-showcase * {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            .drinksip-showcase a:active {
              transform: scale(0.98);
            }
          `}
        </style>
      </section>
    </>
  );
}