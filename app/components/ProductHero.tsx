import React, { useEffect, useState } from 'react';
import { AnimatedSection } from '~/components/AnimatedSection';

interface ProductHeroProps {
  product: {
    title: string;
    handle: string;
    description: string;
    color: string;
    series: string;
    features: string[];
  };
  chips: string[];
}

/**
 * Product Hero Component
 * 
 * Fully responsive hero section for Product Detail Pages
 * Features:
 * - Color-based hero background
 * - Entrance animations (title → can → content)
 * - Desktop: Split-screen layout with tabs
 * - Mobile: Stacked layout with overlapping title
 * - Hardware-accelerated animations
 * - Design system integration
 */
export function ProductHero({ product, chips }: ProductHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setIsLoaded(true);
  }, []);

  return (
    <section 
      className="pdp-hero"
      style={{
        background: product.color,
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Desktop Layout */}
      <div 
        className="pdp-hero-container-desktop"
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(8rem, 12vh, 12rem) clamp(2rem, 4vw, 4rem) clamp(4rem, 8vh, 8rem)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(3rem, 6vw, 8rem)',
          alignItems: 'flex-start',
          width: '100%',
          position: 'relative',
          zIndex: 2,
          minHeight: 'calc(100vh - 140px)'
        }}
      >
        {/* Left: Product Image with Background Title */}
        <div 
          className="pdp-image-column"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            position: 'relative',
            transform: 'translateX(-25%) translateY(-8rem)',
            isolation: 'isolate'
          }}
        >
          {/* Background Title - Animated */}
          <AnimatedSection
            animation="fadeIn"
            duration={800}
            delay={100}
            style={{
              position: 'absolute',
              left: '50%',
              top: '45%',
              transform: 'translate(-50%, -50%)',
              zIndex: -1,
              pointerEvents: 'none',
              textAlign: 'center'
            }}
          >
            <h1 
              style={{
                fontSize: 'clamp(5rem, 12vw, 8rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                color: 'rgba(255, 255, 255, 1)',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              {product.title.replace(/\s*Refresher\s*/gi, '')}
            </h1>
          </AnimatedSection>

          {/* Product Can - Slides in from left */}
          <AnimatedSection
            animation="slideFromLeft"
            duration={800}
            delay={400}
            style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div className="product-image-container">
              {/* Product image placeholder - replace with actual image */}
              <div 
                style={{
                  width: 'clamp(300px, 40vw, 500px)',
                  height: 'clamp(400px, 50vh, 600px)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {product.title} Can
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Right: Product Details */}
        <AnimatedSection
          animation="fadeIn"
          duration={600}
          delay={800}
          className="pdp-content-column"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-6)',
            paddingTop: 'var(--spacing-8)'
          }}
        >
          {/* Series Label */}
          <div 
            style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: 'var(--spacing-2)'
            }}
          >
            {product.series}
          </div>

          {/* Product Title */}
          <h2 
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: '#fff',
              margin: 0,
              textTransform: 'uppercase'
            }}
          >
            {product.title}
          </h2>

          {/* Description */}
          <p 
            style={{
              fontSize: 'var(--font-size-lg)',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '500px'
            }}
          >
            {product.description}
          </p>

          {/* Product Chips */}
          <div 
            style={{
              display: 'flex',
              gap: 'var(--spacing-3)',
              flexWrap: 'wrap',
              marginTop: 'var(--spacing-4)'
            }}
          >
            {chips.map((chip, index) => (
              <span
                key={chip}
                className="product-chip"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  padding: 'var(--spacing-3) var(--spacing-5)',
                  borderRadius: '25px',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: product.color,
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  animation: `fadeIn 0.4s ease ${1000 + (index * 100)}ms both`
                }}
              >
                {chip}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div 
            style={{
              display: 'flex',
              gap: 'var(--spacing-4)',
              marginTop: 'var(--spacing-6)'
            }}
          >
            <button
              className="shop-now-btn"
              style={{
                padding: 'var(--spacing-4) var(--spacing-8)',
                background: '#fff',
                color: product.color,
                border: 'none',
                borderRadius: '50px',
                fontSize: 'var(--font-size-base)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                transition: 'all var(--duration-normal) var(--easing-smooth)',
                minWidth: '180px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
              }}
            >
              Shop Now
            </button>

            <button
              className="find-near-me-btn"
              style={{
                padding: 'var(--spacing-4) var(--spacing-8)',
                background: 'transparent',
                color: '#fff',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '50px',
                fontSize: 'var(--font-size-base)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'all var(--duration-normal) var(--easing-smooth)',
                minWidth: '180px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Find Near Me
            </button>
          </div>
        </AnimatedSection>
      </div>

      {/* Mobile Layout */}
      <div 
        className="pdp-hero-container-mobile"
        style={{
          display: 'none', // Will be shown via media query
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          minHeight: '100vh',
          width: '100%',
          padding: '6rem 1rem 2rem',
          position: 'relative'
        }}
      >
        {/* Mobile Title - Overlapping */}
        <AnimatedSection
          animation="fadeIn"
          duration={800}
          delay={200}
          style={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            zIndex: 1,
            textAlign: 'center',
            pointerEvents: 'none'
          }}
        >
          <h1 
            style={{
              fontSize: 'clamp(4rem, 14vw, 6rem)',
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              color: '#fff',
              margin: 0,
              padding: '0 1rem',
              textTransform: 'uppercase'
            }}
          >
            {product.title.replace(/\s*Refresher\s*/gi, '')}
          </h1>
        </AnimatedSection>

        {/* Mobile Can Image */}
        <AnimatedSection
          animation="slideFromLeft"
          duration={800}
          delay={600}
          style={{
            position: 'relative',
            width: '100%',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20vh'
          }}
        >
          <div 
            style={{
              width: '70vw',
              maxWidth: '350px',
              height: '60vh',
              maxHeight: '500px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {product.title} Can
          </div>
        </AnimatedSection>

        {/* Mobile Chips */}
        <AnimatedSection
          animation="fadeIn"
          duration={600}
          delay={1200}
          style={{
            position: 'absolute',
            bottom: '32vh',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'center',
            flexWrap: 'nowrap',
            zIndex: 4,
            width: '100%',
            maxWidth: '90%',
            padding: '0 1rem'
          }}
        >
          {chips.map((chip) => (
            <span
              key={chip}
              className="product-chip"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                padding: '0.8rem 1.2rem',
                borderRadius: '25px',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: product.color,
                whiteSpace: 'nowrap',
                flex: 1,
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
              }}
            >
              {chip}
            </span>
          ))}
        </AnimatedSection>

        {/* Mobile Buttons */}
        <AnimatedSection
          animation="fadeIn"
          duration={600}
          delay={1400}
          style={{
            position: 'absolute',
            bottom: '16vh',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%',
            maxWidth: '320px',
            zIndex: 4,
            padding: '0 2rem'
          }}
        >
          <button
            className="shop-now-btn-mobile"
            style={{
              width: '100%',
              padding: '0.8rem 2rem',
              background: 'rgba(255, 255, 255, 0.95)',
              color: product.color,
              border: 'none',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            Shop Now
          </button>

          <a
            href="#"
            style={{
              width: '100%',
              padding: '0.5rem 0',
              textAlign: 'center',
              fontSize: '0.85rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(255, 255, 255, 0.8)',
              textDecoration: 'none'
            }}
          >
            Find Near Me
          </a>
        </AnimatedSection>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 767px) {
          .pdp-hero-container-desktop {
            display: none !important;
          }
          .pdp-hero-container-mobile {
            display: flex !important;
          }
        }

        @media (min-width: 768px) {
          .pdp-hero-container-desktop {
            display: grid !important;
          }
          .pdp-hero-container-mobile {
            display: none !important;
          }
        }

        /* Smooth button transitions */
        .shop-now-btn:active,
        .shop-now-btn-mobile:active {
          transform: scale(0.98);
        }

        .find-near-me-btn:active {
          transform: scale(0.98);
        }
      `}</style>
    </section>
  );
}
