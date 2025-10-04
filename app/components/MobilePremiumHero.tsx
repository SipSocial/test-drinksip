import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
  video?: string;
  handle: string;
  color: string;
  type: 'image' | 'video';
  emphasizeText?: boolean;
}

interface MobilePremiumHeroProps {
  slides: HeroSlide[];
}

export function MobilePremiumHero({ slides }: MobilePremiumHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();

  // Game-like 60fps animation frame handling
  const animate = useCallback(() => {
    if (isDragging && containerRef.current) {
      containerRef.current.style.transform = `translateX(${dragOffset}px)`;
    }
    requestRef.current = requestAnimationFrame(animate);
  }, [isDragging, dragOffset]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  // Auto-advance slides with smooth transitions
  useEffect(() => {
    const currentSlideData = slides[currentSlide];
    
    if (currentSlideData.type === 'video' && isVideoPlaying) {
      return;
    }
    
    if (currentSlideData.type !== 'video') {
      const timer = setInterval(() => {
        handleSlideChange((prev) => (prev + 1) % slides.length);
      }, 6000); // BodyArmor-style timing
      
      return () => clearInterval(timer);
    }
  }, [slides.length, currentSlide, isVideoPlaying]);

  const handleSlideChange = (nextSlide: number | ((prev: number) => number)) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newSlide = typeof nextSlide === 'function' ? nextSlide(currentSlide) : nextSlide;
    setCurrentSlide(newSlide);
    
    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 800);
  };

  // Premium touch gestures with momentum and spring physics
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    
    // Calculate drag offset with resistance (like iOS)
    const rawOffset = currentTouch - touchStart;
    const resistance = Math.abs(rawOffset) > 100 ? 0.3 : 1;
    setDragOffset(rawOffset * resistance);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || isTransitioning) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const threshold = 80; // Swipe threshold
    const velocity = Math.abs(distance);
    
    setIsDragging(false);
    setDragOffset(0);
    
    // Premium spring-back animation
    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      containerRef.current.style.transform = 'translateX(0)';
      
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = '';
        }
      }, 400);
    }
    
    if (velocity > threshold) {
      if (distance > 0) {
        // Swipe left - next slide
        handleSlideChange((prev) => (prev + 1) % slides.length);
      } else {
        // Swipe right - previous slide
        handleSlideChange((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const currentProduct = slides[currentSlide];

  return (
    <section 
      className="mobile-premium-hero"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: currentProduct.color,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        transition: isTransitioning ? 'background 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* BodyArmor-style Dynamic Background Gradients */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 80%, ${currentProduct.color}dd 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${currentProduct.color}aa 0%, transparent 50%),
            linear-gradient(135deg, ${currentProduct.color} 0%, ${currentProduct.color}f0 100%)
          `,
          transition: 'background 1s ease',
          zIndex: 1
        }}
      />

      {/* Content Container with Game-like Smoothness */}
      <div 
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 2,
          willChange: 'transform'
        }}
      >
        {/* Mobile-Optimized Content Layout */}
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '2rem 1.5rem',
          position: 'relative'
        }}>
          
          {/* Top Section - BodyArmor Style Minimal Branding */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingTop: '1rem',
            zIndex: 10
          }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(255, 255, 255, 0.8)',
              background: 'rgba(0, 0, 0, 0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)'
            }}>
              Premium Series
            </div>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.7)',
              letterSpacing: '0.1em'
            }}>
              {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </div>
          </div>

          {/* Center Section - Hero Content */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            marginTop: '-2rem' // Pull content higher for better mobile balance
          }}>
            
            {/* Main Hero Title - BodyArmor Massive Impact */}
            <h1 
              key={`title-${currentSlide}`}
              style={{
                fontSize: 'clamp(3.5rem, 12vw, 6rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 0.85,
                letterSpacing: '-0.03em',
                color: '#fff',
                textShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                marginBottom: '1rem',
                animation: isTransitioning ? 'none' : 'heroSlideIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                opacity: 0,
                transform: 'translateY(50px)',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden'
              }}
            >
              {currentProduct.title}
            </h1>

            {/* Subtitle - BodyArmor Clean Typography */}
            <p 
              key={`subtitle-${currentSlide}`}
              style={{
                fontSize: 'clamp(1rem, 3vw, 1.4rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 600,
                marginBottom: '3rem',
                maxWidth: '280px',
                lineHeight: 1.3,
                animation: isTransitioning ? 'none' : 'heroSlideIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards',
                opacity: 0,
                transform: 'translateY(30px)'
              }}
            >
              {currentProduct.subtitle}
            </p>

            {/* Product Visual - Center Stage */}
            {currentProduct.type === 'image' && currentProduct.image && (
              <div 
                key={`image-${currentSlide}`}
                style={{
                  position: 'relative',
                  marginBottom: '2rem',
                  animation: isTransitioning ? 'none' : 'productFloat 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards',
                  opacity: 0,
                  transform: 'translateY(40px) scale(0.95)'
                }}
              >
                <img 
                  src={currentProduct.image} 
                  alt={currentProduct.title}
                  style={{
                    width: 'clamp(180px, 50vw, 320px)',
                    height: 'auto',
                    filter: 'drop-shadow(0 20px 60px rgba(0, 0, 0, 0.4))',
                    transform: 'scale(1.1)',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden'
                  }}
                />
                
                {/* Premium Floating Particles Effect */}
                <div style={{
                  position: 'absolute',
                  top: '10%',
                  left: '10%',
                  width: '80%',
                  height: '80%',
                  background: `radial-gradient(circle, ${currentProduct.color}33 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                  opacity: 0.3,
                  animation: 'floatingParticles 8s linear infinite',
                  pointerEvents: 'none'
                }} />
              </div>
            )}

            {/* Video Content */}
            {currentProduct.type === 'video' && currentProduct.video && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1
              }}>
                <video 
                  ref={videoRef}
                  src={currentProduct.video}
                  autoPlay
                  muted
                  loop={false}
                  playsInline
                  style={{
                    width: '100%',
                    height: '100vh',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                  onPlay={() => setIsVideoPlaying(true)}
                  onEnded={() => {
                    setIsVideoPlaying(false);
                    setTimeout(() => handleSlideChange((prev) => (prev + 1) % slides.length), 500);
                  }}
                  onPause={() => setIsVideoPlaying(false)}
                />
              </div>
            )}
          </div>

          {/* Bottom Section - BodyArmor CTA & Navigation */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
            paddingBottom: '2rem'
          }}>
            
            {/* Primary CTA - BodyArmor Bold Button */}
            <Link 
              to={`/collections/${currentProduct.handle}`}
              key={`cta-${currentSlide}`}
              style={{
                padding: '1.2rem 3rem',
                background: '#fff',
                color: currentProduct.color,
                textDecoration: 'none',
                fontWeight: 900,
                textTransform: 'uppercase',
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
                borderRadius: '50px',
                border: '3px solid #fff',
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transform: 'translateY(0)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                animation: isTransitioning ? 'none' : 'ctaSlideUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s forwards',
                opacity: 0,
                WebkitTapHighlightColor: 'transparent'
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'scale(0.95) translateY(2px)';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
              }}
            >
              Shop Now
            </Link>

            {/* Slide Indicators - BodyArmor Minimal Dots */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => !isTransitioning && handleSlideChange(index)}
                  style={{
                    width: index === currentSlide ? '32px' : '8px',
                    height: '4px',
                    borderRadius: '2px',
                    border: 'none',
                    background: index === currentSlide ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.4)',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Game-like CSS Animations */}
      <style>
        {`
          @keyframes heroSlideIn {
            0% {
              opacity: 0;
              transform: translateY(50px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes productFloat {
            0% {
              opacity: 0;
              transform: translateY(40px) scale(0.95);
            }
            60% {
              transform: translateY(-5px) scale(1.02);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes ctaSlideUp {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes floatingParticles {
            0% { transform: rotate(0deg) translateY(0); }
            100% { transform: rotate(360deg) translateY(-10px); }
          }
          
          .mobile-premium-hero * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          /* Performance optimizations for 60fps */
          .mobile-premium-hero {
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
          }
          
          .mobile-premium-hero img,
          .mobile-premium-hero video {
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
          }
        `}
      </style>
    </section>
  );
}
