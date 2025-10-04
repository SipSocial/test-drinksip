import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
  desktopImage?: string;
  video?: string;
  handle: string;
  color: string;
  type: 'image' | 'video';
  emphasizeText?: boolean;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-advance slides - wait for video to finish
  useEffect(() => {
    const currentSlideData = slides[currentSlide];
    
    // Don't auto-advance if video is playing
    if (currentSlideData.type === 'video' && isVideoPlaying) {
      return;
    }
    
    // For non-video slides, use normal timing
    if (currentSlideData.type !== 'video') {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      
      return () => clearInterval(timer);
    }
  }, [slides.length, currentSlide, isVideoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentProduct = slides[currentSlide];

  return (
    <section 
      role="banner"
      aria-label="Hero carousel showcasing DrinkSip products"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      }}>
      {/* Background - Dynamic based on slide */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: currentProduct.color,
        transition: 'background 0.8s ease',
        zIndex: 0
      }} />

      {/* Wake Up Happy Slide - Responsive Images (Desktop + Mobile) */}
      {currentProduct.id === 'wake-up-happy' && (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Mobile Image - Only visible on mobile */}
          <img 
            src={currentProduct.image!} 
            alt="Wake Up Happy - Mobile"
            className="wake-up-happy-mobile"
            style={{
              width: '100%',
              height: '100vh',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block'
            }}
          />
          
          {/* Desktop Image - Only visible on desktop */}
          {currentProduct.desktopImage && (
            <img 
              src={currentProduct.desktopImage} 
              alt="Wake Up Happy - Desktop"
              className="wake-up-happy-desktop"
              style={{
                width: '100%',
                height: '100vh',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'none'
              }}
            />
          )}
        </div>
      )}

      {/* Video Slide - DeMarcus Lawrence - Full Viewport */}
      {currentProduct.id === 'demarcus-lawrence' && (
        <div style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 2,
          overflow: 'hidden'
        }}>
          {/* Full Viewport Video Background */}
          <video 
            ref={videoRef}
            src={currentProduct.video}
            autoPlay
            muted
            loop={false}
            playsInline
            preload="metadata"
            style={{
              width: '100%',
              height: '100vh',
              objectFit: 'cover',
              objectPosition: 'center',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1
            }}
            onLoadedMetadata={() => {
              if (videoRef.current) {
                setVideoDuration(videoRef.current.duration);
                console.log('Video loaded, duration:', videoRef.current.duration);
              }
            }}
            onPlay={() => {
              setIsVideoPlaying(true);
              console.log('Video started playing');
            }}
            onEnded={() => {
              setIsVideoPlaying(false);
              console.log('Video ended, advancing slide');
              // Auto advance to next slide when video ends
              setTimeout(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
              }, 500);
            }}
            onPause={() => setIsVideoPlaying(false)}
            onError={(e) => {
              console.error('Video error:', e);
              setIsVideoPlaying(false);
            }}
          />
          
          {/* Content Overlay - Mobile Left-Aligned Style */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
            display: 'flex',
            alignItems: 'center',
            zIndex: 2
          }}>
            <div style={{
              width: '100%',
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0 clamp(1.5rem, 4vw, 4rem)', // Responsive padding
              display: 'flex',
              alignItems: 'center',
              height: '100%'
            }}>
              {/* Content - Mobile Left-Aligned */}
              <div 
                className="wake-up-happy-content"
                style={{
                  maxWidth: '650px',
                  paddingTop: '2rem'
                }}
              >
                <h1 style={{
                  fontSize: 'clamp(3rem, 8vw, 7rem)', // Better mobile scaling
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  lineHeight: 0.9, // Tighter line height for mobile
                  letterSpacing: '-0.02em',
                  marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                  color: '#fff',
                  textShadow: '0 6px 20px rgba(0, 0, 0, 0.8)',
                  textAlign: 'left' // Left-aligned on mobile
                }}>
                  WAKE UP HAPPY
                </h1>
                <p style={{
                  fontSize: 'clamp(1rem, 3vw, 1.8rem)', // Better mobile scaling
                  color: '#fff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 600,
                  marginBottom: '3rem',
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.8)',
                  lineHeight: 1.2,
                  textAlign: 'left' // Left-aligned on mobile
                }}>
                  SEE WHY DEMARCUS LAWRENCE CHOOSES DRINKSIP
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations for Game-Like Smoothness + Mobile Responsive Design */}
      <style>
        {`
          @keyframes refreshingSlideInLeft {
            0% {
              opacity: 0;
              transform: translateX(-120px) scale(0.95);
            }
            100% {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }
          
          @keyframes refreshingSlideInRight {
            0% {
              opacity: 0;
              transform: translateX(150px) scale(0.95);
            }
            100% {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }
          
          .refresher-text-animate {
            animation: refreshingSlideInLeft 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          }
          
          .refresher-image-animate {
            animation: refreshingSlideInRight 1.4s cubic-bezier(0.23, 1, 0.32, 1) 0.3s forwards;
            opacity: 0;
          }
          
          /* Mobile-First Responsive Design - OPTIMIZED FOR ALL MOBILE SCREENS */
          
          /* MOBILE HERO - Show mobile layout, hide desktop layout */
          @media (max-width: 767px) {
            .mobile-hero-content {
              display: flex !important;
            }
            
            .desktop-hero-content {
              display: none !important;
            }
            
            /* Extra Small Mobile (iPhone SE 320px-375px) */
            @media (max-width: 375px) {
              .mobile-hero-content {
                padding: clamp(0.8rem, 2vh, 2rem) clamp(0.8rem, 2vw, 1.5rem) !important;
                gap: clamp(1rem, 2vh, 1.8rem) !important;
              }
              
              /* Controls positioning for extra small screens */
              .mobile-carousel-dots,
              .mobile-carousel-button {
                bottom: 48% !important; /* Slightly higher for compact screens */
              }
            }
            
            /* Small Mobile (375px-414px) - iPhone Pro 12 */
            @media (min-width: 375px) and (max-width: 414px) {
              .mobile-hero-content {
                padding: clamp(1rem, 2.5vh, 2.5rem) clamp(1rem, 2.5vw, 1.8rem) !important;
                gap: clamp(1.3rem, 2.5vh, 2.2rem) !important;
              }
              
              /* Controls positioning for iPhone Pro 12 and similar */
              .mobile-carousel-dots,
              .mobile-carousel-button {
                bottom: 55% !important; /* Moved up from 50% to 55% */
              }
            }
            
            /* Large Mobile (414px+) */
            @media (min-width: 414px) {
              .mobile-hero-content {
                padding: clamp(1.2rem, 3vh, 3rem) clamp(1.2rem, 3vw, 2rem) !important;
                gap: clamp(1.5rem, 3vh, 2.5rem) !important;
              }
              
              /* Controls positioning for large screens */
              .mobile-carousel-dots,
              .mobile-carousel-button {
                bottom: 52% !important; /* Slightly lower for more space */
              }
            }
            
            /* Short Screens (Height < 700px) - Compact Layout */
            @media (max-height: 700px) {
              .mobile-hero-content {
                gap: clamp(1rem, 2vh, 1.5rem) !important;
                padding: clamp(0.8rem, 2vh, 2rem) clamp(1rem, 3vw, 2rem) !important;
              }
              
              /* Controls positioning for short screens */
              .mobile-carousel-dots,
              .mobile-carousel-button {
                bottom: 45% !important; /* Higher to avoid content overlap */
              }
            }
            
            /* Very Short Screens (Height < 600px) - Ultra Compact */
            @media (max-height: 600px) {
              .mobile-hero-content {
                gap: clamp(0.8rem, 1.5vh, 1.2rem) !important;
                padding: clamp(0.6rem, 1.5vh, 1.5rem) clamp(1rem, 3vw, 2rem) !important;
              }
              
              /* Controls positioning for very short screens */
              .mobile-carousel-dots,
              .mobile-carousel-button {
                bottom: 42% !important; /* Much higher for ultra-compact layout */
              }
            }
            
            /* Landscape Mobile Optimization */
            @media (orientation: landscape) and (max-height: 500px) {
              .mobile-hero-content {
                flex-direction: row !important;
                padding: clamp(0.5rem, 1vh, 1rem) clamp(1rem, 3vw, 2rem) !important;
                gap: clamp(1.5rem, 3vw, 3rem) !important;
                align-items: center !important;
              }
              
              .mobile-hero-content > div:first-child {
                flex: 0 0 auto !important;
                width: 40% !important;
              }
              
              .mobile-hero-content > div:last-child {
                flex: 1 1 auto !important;
                width: 60% !important;
                text-align: left !important;
              }
              
              /* Controls positioning for landscape mode */
              .mobile-carousel-dots,
              .mobile-carousel-button {
                bottom: 50% !important; /* Center vertically in landscape */
              }
              
              /* Move dots to bottom in landscape */
              .mobile-carousel-dots {
                bottom: 10% !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                flex-direction: row !important;
              }
              
              /* Keep arrow on right in landscape */
              .mobile-carousel-button {
                right: 1rem !important;
                bottom: 50% !important;
                transform: translateY(50%) !important;
              }
            }
            /* Show mobile image, hide desktop image */
            .wake-up-happy-mobile {
              display: block !important;
            }
            
            .wake-up-happy-desktop {
              display: none !important;
            }
            
            /* Center text content on mobile like BODYARMOR */
            .mobile-text-center {
              text-align: center !important;
            }
            
            /* Center buttons on mobile */
            .mobile-button-center {
              justify-content: center !important;
            }
            
            /* Move image above text on mobile */
            .mobile-image-first {
              order: -1 !important;
              margin-bottom: 2rem;
            }
            
            /* MOBILE: Show mobile controls, hide desktop controls */
            .mobile-carousel-dots {
              display: flex !important;
            }
            
            .mobile-carousel-button {
              display: flex !important;
            }
            
            .desktop-carousel-controls {
              display: none !important;
            }
            
            /* MOBILE: Move Wake Up Happy text down by 30% */
            .wake-up-happy-content {
              padding-top: 30vh !important; /* Move down by 30% of viewport height */
            }
          }
            
            /* Mobile hero grid - stack vertically */
            .hero-mobile-grid {
              display: flex !important;
              flex-direction: column !important;
              text-align: center !important;
              padding: 1rem !important;
              gap: 2rem !important;
            }
            
            /* Mobile text shadows for better readability */
            .mobile-text-shadow h1 {
              text-shadow: 0 4px 20px rgba(0, 0, 0, 0.9) !important;
            }
            
            .mobile-text-shadow p {
              text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9) !important;
            }
          }
          
          /* Tablet adjustments */
          @media (min-width: 768px) and (max-width: 1024px) {
            /* Show desktop image on tablet */
            .wake-up-happy-desktop {
              display: block !important;
            }
            
            .wake-up-happy-mobile {
              display: none !important;
            }
            
            .hero-mobile-grid {
              grid-template-columns: 1fr 1fr !important;
              gap: 3rem !important;
            }
          }
          
          /* Desktop - DESKTOP HERO - Show desktop layout, hide mobile layout */
          @media (min-width: 1025px) {
            .mobile-hero-content {
              display: none !important;
            }
            
            .desktop-hero-content {
              display: grid !important;
            }
            
            /* Show desktop image, hide mobile image */
            .wake-up-happy-desktop {
              display: block !important;
            }
            
            .wake-up-happy-mobile {
              display: none !important;
            }
            
            .mobile-text-center {
              text-align: left !important;
            }
            
            .mobile-button-center {
              justify-content: flex-start !important;
            }
            
            .mobile-image-first {
              order: 0 !important;
            }
            
            /* DESKTOP: Hide mobile controls, show desktop controls */
            .mobile-carousel-dots {
              display: none !important;
            }
            
            .mobile-carousel-button {
              display: none !important;
            }
            
            .desktop-carousel-controls {
              display: flex !important;
            }
            
            /* DESKTOP: Reset Wake Up Happy text positioning */
            .wake-up-happy-content {
              padding-top: 2rem !important; /* Reset to original desktop positioning */
            }
            
            /* CRITICAL: Ensure desktop refresher animations work properly */
            .refresher-image-animate {
              animation: refreshingSlideInRight 1.4s cubic-bezier(0.23, 1, 0.32, 1) 0.3s forwards !important;
              opacity: 0 !important;
            }
            
            .refresher-text-animate {
              animation: refreshingSlideInLeft 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards !important;
            }
          }
          
          /* Tablet - hide BODYARMOR controls */
          @media (min-width: 768px) and (max-width: 1024px) {
            .bodyarmor-nav-button {
              display: none !important;
            }
          }
        `}
      </style>

      {/* Standard Image Slides - MOBILE FIRST DESIGN - Full Viewport Layout */}
      {currentProduct.id !== 'wake-up-happy' && currentProduct.id !== 'demarcus-lawrence' && (
        <div style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0',
          boxSizing: 'border-box'
        }}>
          {/* MOBILE LAYOUT - POLISHED & CONTAINED - OPTIMIZED FOR ALL SCREENS */}
          <div 
            className="mobile-hero-content"
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              padding: 'clamp(0.8rem, 2vh, 2rem) clamp(1rem, 2vw, 1.5rem)', // More contained padding
              gap: 'clamp(1rem, 2vh, 1.8rem)', // Tighter gaps
              boxSizing: 'border-box',
              minHeight: '100vh',
              maxWidth: '100vw' // Ensure containment
            }}
          >
            {/* Product Image - Mobile First - CONTAINED & POLISHED */}
            <div 
              key={`image-${currentProduct.id}-${currentSlide}`}
              className={currentProduct.id === 'refresher-trio' ? 'refresher-image-animate' : ''}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                flex: '0 0 auto',
                opacity: currentProduct.id === 'refresher-trio' ? 0 : 1,
                width: '100%',
                maxWidth: '100vw'
              }}
            >
              <img 
                src={currentProduct.image!} 
                alt={currentProduct.title}
                style={{
                  width: 'auto',
                  height: currentProduct.id === 'refresher-trio' 
                    ? 'clamp(180px, 32vh, 350px)' // Slightly larger for better presence
                    : 'clamp(160px, 28vh, 320px)', // Optimized sizing
                  maxWidth: '80vw', // More contained
                  maxHeight: '35vh', // Better proportions
                  filter: 'drop-shadow(0 clamp(10px, 2vh, 25px) clamp(20px, 4vh, 50px) rgba(0, 0, 0, 0.7))',
                  transition: 'transform 0.8s ease',
                  transform: currentProduct.id === 'refresher-trio' 
                    ? 'scale(1.1) translateY(5vh)' // Keep your preferred positioning
                    : 'scale(1.05)',
                  objectFit: 'contain'
                }}
              />
            </div>

            {/* Text Content - POLISHED TYPOGRAPHY - BIGGER & TIGHTER */}
            <div 
              key={`text-${currentProduct.id}-${currentSlide}`}
              className={currentProduct.id === 'refresher-trio' ? 'refresher-text-animate' : ''}
              style={{
                width: '100%',
                maxWidth: '90vw', // More contained
                textAlign: 'center',
                opacity: currentProduct.id === 'refresher-trio' ? 0 : 1,
                flex: '1 1 auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              {/* BIGGER FONTS & BETTER LINE HEIGHT */}
              <h1 style={{
                fontSize: currentProduct.emphasizeText 
                  ? 'clamp(3.2rem, 12vw, 7rem)' // BIGGER for refresher series
                  : 'clamp(2.6rem, 10vw, 5.5rem)', // BIGGER for other slides
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 0.9, // BETTER line height - not too tight, not too loose
                letterSpacing: 'clamp(-0.04em, -0.8vw, -0.02em)', // Less aggressive letter spacing
                marginBottom: 'clamp(0.8rem, 2vh, 1.2rem)', // Slightly more margin below H1
                color: '#fff',
                textShadow: '0 6px 25px rgba(0, 0, 0, 0.9)', // Strong shadow
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                wordBreak: 'break-word',
                hyphens: 'auto',
                maxWidth: '100%'
              }}>
                {currentProduct.title}
              </h1>
              
              <p style={{
                fontSize: currentProduct.emphasizeText 
                  ? 'clamp(1.1rem, 4vw, 2rem)' // BIGGER for refresher series
                  : 'clamp(1rem, 3.5vw, 1.7rem)', // BIGGER for other slides
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: 'clamp(0.1em, 0.6vw, 0.18em)', // Better responsive letter spacing
                fontWeight: 700,
                marginBottom: 'clamp(2rem, 3.5vh, 2.8rem)', // Slightly more margin below subtitle
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)',
                opacity: 0.95,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                lineHeight: 1.3, // Better line height for subtitle readability
                maxWidth: '100%'
              }}>
                {currentProduct.subtitle}
              </p>
              
              {/* POLISHED BUTTON LAYOUT - CONTAINED & REFINED */}
              <div style={{
                display: 'flex', 
                flexDirection: 'column',
                gap: 'clamp(0.7rem, 1.8vh, 1rem)', // Tighter button gap
                width: '100%',
                maxWidth: 'clamp(260px, 75vw, 300px)', // More contained button container
                margin: '0 auto'
              }}>
                <Link to={`/collections/${currentProduct.handle}`} style={{
                  padding: 'clamp(1rem, 2.8vh, 1.3rem) clamp(1.3rem, 4.5vw, 2rem)', // Better proportions
                  border: '2px solid #fff',
                  background: '#fff',
                  color: currentProduct.color,
                  textDecoration: 'none',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: 'clamp(0.75rem, 2.2vw, 0.95rem)', // Slightly bigger font
                  letterSpacing: 'clamp(0.1em, 0.4vw, 0.15em)',
                  display: 'flex', // Ensure proper centering
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  borderRadius: '8px', // Slightly more rounded
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)', // Stronger shadow
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  minHeight: '48px', // Better touch target
                  lineHeight: 1
                }}>
                  SHOP COLLECTION
                </Link>
                <Link to="/collections/all" style={{
                  padding: 'clamp(1rem, 2.8vh, 1.3rem) clamp(1.3rem, 4.5vw, 2rem)', // Better proportions
                  border: '2px solid #fff',
                  background: 'rgba(255, 255, 255, 0.15)', // Slightly more visible
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: 'clamp(0.75rem, 2.2vw, 0.95rem)', // Slightly bigger font
                  letterSpacing: 'clamp(0.1em, 0.4vw, 0.15em)',
                  display: 'flex', // Ensure proper centering
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  borderRadius: '8px', // Slightly more rounded
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(8px)', // Stronger blur
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  minHeight: '48px', // Better touch target
                  lineHeight: 1,
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' // Subtle shadow
                }}>
                  SEE ALL FLAVORS
                </Link>
              </div>
            </div>
          </div>

          {/* DESKTOP LAYOUT - Preserved Original Grid (Hidden on Mobile) */}
          <div 
            className="desktop-hero-content"
            style={{
              width: '100%',
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0 clamp(1.5rem, 4vw, 4rem)', // Better mobile padding
              display: 'grid',
              gridTemplateColumns: currentProduct.id === 'refresher-trio' ? '1fr 1.2fr' : '1fr 1fr', // Give more space to image for trio
              gap: currentProduct.id === 'refresher-trio' ? 'clamp(2rem, 6vw, 6rem)' : 'clamp(2rem, 4vw, 4rem)', // Responsive gap
              alignItems: 'center',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2,
              boxSizing: 'border-box'
            }}
          >
            {/* Left: Content - Desktop */}
            <div 
              key={`text-desktop-${currentProduct.id}-${currentSlide}`}
              className={currentProduct.id === 'refresher-trio' ? 'refresher-text-animate' : ''}
              style={{
                paddingRight: currentProduct.id === 'refresher-trio' ? 'clamp(1rem, 3vw, 2rem)' : '0', // Responsive padding  
                opacity: currentProduct.id === 'refresher-trio' ? 0 : 1 // Start hidden for animation
              }}
            >
              <h1 style={{
                fontSize: currentProduct.emphasizeText 
                  ? 'clamp(2.5rem, 8vw, 8rem)' // Better mobile scaling
                  : 'clamp(2rem, 6vw, 6rem)', // Better mobile scaling
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 0.85,
                letterSpacing: '-0.03em',
                marginBottom: currentProduct.id === 'refresher-trio' ? 'clamp(1rem, 3vw, 2rem)' : 'clamp(0.5rem, 2vw, 1rem)', // Responsive margins
                color: '#fff',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)' // Better readability on mobile
              }}>
                {currentProduct.title}
              </h1>
              <p style={{
                fontSize: currentProduct.emphasizeText 
                  ? 'clamp(1rem, 3vw, 2rem)' // Better mobile scaling
                  : 'clamp(0.9rem, 2.5vw, 1.5rem)', // Better mobile scaling
                color: '#ddd',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontWeight: 900,
                marginBottom: currentProduct.id === 'refresher-trio' ? 'clamp(2rem, 4vw, 3rem)' : 'clamp(1.5rem, 3vw, 2rem)', // Responsive margins
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' // Better readability
              }}>
                {currentProduct.subtitle}
              </p>
              
              {/* Desktop button layout */}
              <div style={{
                display: 'flex', 
                gap: 'clamp(0.5rem, 2vw, 1rem)', // Responsive gap
                flexWrap: 'wrap'
              }}>
                <Link to={`/collections/${currentProduct.handle}`} style={{
                  padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)', // Responsive padding
                  border: '2px solid #fff',
                  background: '#fff',
                  color: currentProduct.color,
                  textDecoration: 'none',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: 'clamp(0.7rem, 2vw, 0.8rem)', // Responsive font size
                  letterSpacing: '0.1em',
                  display: 'inline-block',
                  textAlign: 'center',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease',
                  minWidth: '120px' // Ensure buttons don't get too small
                }}>
                  SHOP COLLECTION
                </Link>
                <Link to="/collections/all" style={{
                  padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)', // Responsive padding
                  border: '2px solid #fff',
                  background: 'transparent',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: 'clamp(0.7rem, 2vw, 0.8rem)', // Responsive font size
                  letterSpacing: '0.1em',
                  display: 'inline-block',
                  textAlign: 'center',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease',
                  minWidth: '120px' // Ensure buttons don't get too small
                }}>
                  SEE ALL FLAVORS
                </Link>
              </div>
            </div>

            {/* Right: Product Image - Desktop Animation Preserved */}
            <div 
              key={`image-desktop-${currentProduct.id}-${currentSlide}`}
              className={currentProduct.id === 'refresher-trio' ? 'refresher-image-animate' : ''}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                paddingLeft: currentProduct.id === 'refresher-trio' ? 'clamp(1rem, 4vw, 3rem)' : '0', // Responsive padding
                opacity: currentProduct.id === 'refresher-trio' ? 0 : 1 // Start hidden for animation - DESKTOP ANIMATION PRESERVED
              }}
            >
              <img 
                src={currentProduct.image!} 
                alt={currentProduct.title}
                style={{
                  width: '100%',
                  maxWidth: currentProduct.id === 'refresher-trio' 
                    ? 'clamp(300px, 80vw, 1000px)' // Better mobile scaling for trio
                    : 'clamp(250px, 70vw, 500px)', // Better mobile scaling for single products
                  height: 'auto',
                  filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.6))',
                  transition: 'transform 0.8s ease',
                  transform: currentProduct.id === 'refresher-trio' 
                    ? 'scale(1.2)' // CSS clamp for responsive scaling
                    : 'scale(1.05)'
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* MOBILE: Dots on Left Side - RESPONSIVE POSITIONING FOR ALL SCREENS */}
      <div 
        className="mobile-carousel-dots"
        style={{
          position: 'absolute',
          left: '2rem',
          bottom: '50%', // Default middle position
          transform: 'translateY(50%)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '8px',
          zIndex: 1000
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: index === currentSlide ? '32px' : '12px', // Horizontal dots
              height: '6px',
              borderRadius: '3px',
              border: 'none',
              background: index === currentSlide 
                ? '#fff' 
                : 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              WebkitTapHighlightColor: 'transparent'
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* MOBILE: Single Right Arrow Button - RESPONSIVE POSITIONING FOR ALL SCREENS */}
      <div 
        className="mobile-carousel-button"
        style={{
          position: 'absolute',
          right: '2rem',
          bottom: '50%', // Default middle position
          transform: 'translateY(50%)',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1000
        }}
      >
        <button 
          onClick={nextSlide}
          className="bodyarmor-nav-button mobile-only-button"
          style={{
            width: '44px',
            height: '44px',
            border: 'none',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: 300,
            transition: 'all 0.2s ease',
            WebkitTapHighlightColor: 'transparent'
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      {/* DESKTOP: Left-Side Controls Near Bottom */}
      <div 
        className="desktop-carousel-controls"
        style={{
          position: 'absolute',
          left: '4rem', // Moved more to the right
          bottom: '4rem', // Near bottom of viewport
          display: 'none', // Hidden by default, shown on desktop
          flexDirection: 'column',
          alignItems: 'center', // Center align the content
          gap: '1rem',
          zIndex: 1000
        }}
      >
        {/* Two Buttons for Desktop */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.5rem'
        }}>
          <button 
            onClick={prevSlide}
            className="bodyarmor-nav-button desktop-only-button"
            style={{
              width: '44px',
              height: '44px',
              border: 'none',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 300,
              transition: 'all 0.2s ease',
              WebkitTapHighlightColor: 'transparent'
            }}
            aria-label="Previous slide"
          >
            ‹
          </button>

          <button 
            onClick={nextSlide}
            className="bodyarmor-nav-button desktop-only-button"
            style={{
              width: '44px',
              height: '44px',
              border: 'none',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 300,
              transition: 'all 0.2s ease',
              WebkitTapHighlightColor: 'transparent'
            }}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>

        {/* Dots for Desktop */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '8px'
        }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: index === currentSlide ? '32px' : '12px',
                height: '6px',
                borderRadius: '3px',
                border: 'none',
                background: index === currentSlide 
                  ? '#fff' 
                  : 'rgba(255, 255, 255, 0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                WebkitTapHighlightColor: 'transparent'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
