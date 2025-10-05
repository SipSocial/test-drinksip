import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router';
import { AnimatedSection } from '~/components/AnimatedSection';

interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  color: string;
  series: string;
}

interface YouMayLikeCarouselProps {
  products: Product[];
  currentProductHandle: string;
}

/**
 * You May Like Carousel Component
 * 
 * Auto-playing carousel with jumbo product cards
 * Features:
 * - Thick white borders on cards
 * - Auto-play with smooth infinite looping
 * - Responsive card sizing
 * - Hardware-accelerated transitions
 * - Pause on hover
 * - Navigation dots
 */
export function YouMayLikeCarousel({ products, currentProductHandle }: YouMayLikeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Filter out current product
  const recommendedProducts = products.filter(p => p.handle !== currentProductHandle);

  // Auto-play logic
  useEffect(() => {
    if (isPaused || recommendedProducts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recommendedProducts.length);
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [isPaused, recommendedProducts.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? recommendedProducts.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % recommendedProducts.length);
  };

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <AnimatedSection
      animation="fadeIn"
      duration={800}
      threshold={0.2}
      style={{
        background: '#000',
        padding: 'clamp(4rem, 8vh, 8rem) clamp(1rem, 4vw, 4rem)',
        width: '100%'
      }}
    >
      <div 
        style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >
        {/* Section Title */}
        <h2 
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: '#fff',
            marginBottom: 'var(--spacing-8)',
            textAlign: 'center'
          }}
        >
          You May Like
        </h2>

        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '20px'
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Carousel Track */}
          <div 
            style={{
              display: 'flex',
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: 'transform var(--duration-slow) var(--easing-smooth)',
              willChange: 'transform'
            }}
          >
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  minWidth: '100%',
                  padding: '0 var(--spacing-4)'
                }}
              >
                <Link
                  to={`/products/${product.handle}`}
                  style={{
                    textDecoration: 'none',
                    display: 'block'
                  }}
                >
                  <div 
                    className="you-may-like-card"
                    style={{
                      background: product.color,
                      border: '8px solid #fff',
                      borderRadius: '20px',
                      padding: 'clamp(3rem, 6vh, 6rem) clamp(2rem, 4vw, 4rem)',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 'clamp(2rem, 4vw, 4rem)',
                      alignItems: 'center',
                      minHeight: 'clamp(400px, 50vh, 600px)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all var(--duration-normal) var(--easing-smooth)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Left: Product Info */}
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-6)',
                        color: '#fff'
                      }}
                    >
                      {/* Series */}
                      <div 
                        style={{
                          fontSize: 'var(--font-size-sm)',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: 'rgba(255, 255, 255, 0.8)'
                        }}
                      >
                        {product.series}
                      </div>

                      {/* Title */}
                      <h3 
                        style={{
                          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                          fontWeight: 900,
                          lineHeight: 0.95,
                          letterSpacing: '-0.02em',
                          textTransform: 'uppercase',
                          margin: 0
                        }}
                      >
                        {product.title}
                      </h3>

                      {/* Description */}
                      <p 
                        style={{
                          fontSize: 'var(--font-size-lg)',
                          lineHeight: 1.6,
                          color: 'rgba(255, 255, 255, 0.9)',
                          margin: 0
                        }}
                      >
                        {product.description}
                      </p>

                      {/* CTA Button */}
                      <button
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
                          alignSelf: 'flex-start',
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
                        View Product
                      </button>
                    </div>

                    {/* Right: Product Image */}
                    <div 
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative'
                      }}
                    >
                      {/* Placeholder for product image */}
                      <div 
                        style={{
                          width: 'clamp(250px, 30vw, 400px)',
                          height: 'clamp(350px, 40vh, 500px)',
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
                        {product.title}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {recommendedProducts.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                style={{
                  position: 'absolute',
                  left: 'var(--spacing-4)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#000',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  transition: 'all var(--duration-fast) var(--easing-smooth)',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                  e.currentTarget.style.background = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                }}
              >
                ‹
              </button>

              <button
                onClick={handleNext}
                style={{
                  position: 'absolute',
                  right: 'var(--spacing-4)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#000',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  transition: 'all var(--duration-fast) var(--easing-smooth)',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                  e.currentTarget.style.background = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                }}
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Navigation Dots */}
        {recommendedProducts.length > 1 && (
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'var(--spacing-3)',
              marginTop: 'var(--spacing-6)'
            }}
          >
            {recommendedProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                style={{
                  width: currentIndex === index ? '40px' : '12px',
                  height: '12px',
                  borderRadius: '6px',
                  background: currentIndex === index 
                    ? '#fff' 
                    : 'rgba(255, 255, 255, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all var(--duration-normal) var(--easing-smooth)',
                  padding: 0
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 767px) {
          .you-may-like-card {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-6) !important;
            padding: var(--spacing-6) var(--spacing-4) !important;
            text-align: center !important;
          }

          .you-may-like-card > div:first-child {
            align-items: center !important;
          }

          .you-may-like-card button {
            align-self: center !important;
            width: 100% !important;
            max-width: 280px !important;
          }
        }

        /* Smooth button press effect */
        .you-may-like-card button:active {
          transform: scale(0.98) !important;
        }
      `}</style>
    </AnimatedSection>
  );
}
