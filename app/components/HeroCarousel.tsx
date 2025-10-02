import { useState, useEffect, useRef } from 'react';
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

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

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

      {/* Wake Up Happy Slide - Full Image, No Text */}
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
          <img 
            src={currentProduct.image!} 
            alt="Wake Up Happy"
            style={{
              width: '100%',
              height: '100vh',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
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
          
          {/* Content Overlay - BodyArmor Style */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)', // BodyArmor-style left gradient
            display: 'flex',
            alignItems: 'center',
            zIndex: 2
          }}>
            <div style={{
              width: '100%',
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0 4rem',
              display: 'flex',
              alignItems: 'center',
              height: '100%'
            }}>
              {/* Left: Content - BodyArmor Exact Positioning */}
              <div style={{
                maxWidth: '650px', // More space for text like BodyArmor
                paddingTop: '2rem' // Slight offset from center like BodyArmor
              }}>
                <h1 style={{
                  fontSize: 'clamp(4.5rem, 8vw, 7rem)', // Large like "WAKE UP HAPPY"
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  lineHeight: 0.85,
                  letterSpacing: '-0.02em',
                  marginBottom: '1.5rem',
                  color: '#fff',
                  textShadow: '0 6px 20px rgba(0, 0, 0, 0.8)'
                }}>
                  WAKE UP<br/>HAPPY
                </h1>
                <p style={{
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', // Like BodyArmor subtitle
                  color: '#fff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 600,
                  marginBottom: '3rem',
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.8)',
                  lineHeight: 1.2
                }}>
                  SEE WHY DEMARCUS LAWRENCE CHOOSES DRINKSIP
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations for Game-Like Smoothness */}
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
        `}
      </style>

      {/* Standard Image Slides - Refresher Series */}
      {currentProduct.id !== 'wake-up-happy' && currentProduct.id !== 'demarcus-lawrence' && (
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 4rem', // More padding to prevent edge cutting
          display: 'grid',
          gridTemplateColumns: currentProduct.id === 'refresher-trio' ? '1fr 1.2fr' : '1fr 1fr', // Give more space to image for trio
          gap: currentProduct.id === 'refresher-trio' ? '6rem' : '4rem', // Bigger gap for trio for better spacing
          alignItems: 'center',
          height: '100%',
          position: 'relative',
          zIndex: 2,
          boxSizing: 'border-box'
        }}>
          {/* Left: Content - Animated from Left */}
          <div 
            key={`text-${currentProduct.id}-${currentSlide}`}
            className={currentProduct.id === 'refresher-trio' ? 'refresher-text-animate' : ''}
            style={{
              paddingRight: currentProduct.id === 'refresher-trio' ? '2rem' : '0', // Add padding to text for trio
              opacity: currentProduct.id === 'refresher-trio' ? 0 : 1 // Start hidden for animation
            }}
          >
            <h1 style={{
              fontSize: currentProduct.emphasizeText ? 'clamp(4rem, 10vw, 8rem)' : 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 0.85,
              letterSpacing: '-0.03em',
              marginBottom: currentProduct.id === 'refresher-trio' ? '2rem' : '1rem', // More space for trio
              color: '#fff'
            }}>
              {currentProduct.title}
            </h1>
            <p style={{
              fontSize: currentProduct.emphasizeText ? '2rem' : '1.5rem',
              color: '#ddd',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontWeight: 900,
              marginBottom: currentProduct.id === 'refresher-trio' ? '3rem' : '2rem' // More space for trio
            }}>
              {currentProduct.subtitle}
            </p>
            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
              <Link to={`/collections/${currentProduct.handle}`} style={{
                padding: '1rem 2rem',
                border: '2px solid #fff',
                background: '#fff',
                color: currentProduct.color,
                textDecoration: 'none',
                fontWeight: 900,
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                display: 'inline-block',
                textAlign: 'center',
                borderRadius: '4px',
                transition: 'all 0.3s ease'
              }}>
                SHOP COLLECTION
              </Link>
              <Link to="/collections/all" style={{
                padding: '1rem 2rem',
                border: '2px solid #fff',
                background: 'transparent',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 900,
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                display: 'inline-block',
                textAlign: 'center',
                borderRadius: '4px',
                transition: 'all 0.3s ease'
              }}>
                SEE ALL FLAVORS
              </Link>
            </div>
          </div>

          {/* Right: Product Image - Animated from Right with Delay */}
          <div 
            key={`image-${currentProduct.id}-${currentSlide}`}
            className={currentProduct.id === 'refresher-trio' ? 'refresher-image-animate' : ''}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              paddingLeft: currentProduct.id === 'refresher-trio' ? '3rem' : '0', // Add space between text and image
              opacity: currentProduct.id === 'refresher-trio' ? 0 : 1 // Start hidden for animation
            }}
          >
            <img 
              src={currentProduct.image!} 
              alt={currentProduct.title}
              style={{
                width: '100%',
                maxWidth: currentProduct.id === 'refresher-trio' ? '1000px' : '500px', // Bigger for trio cans
                height: 'auto',
                filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.6))',
                transition: 'transform 0.8s ease',
                transform: currentProduct.id === 'refresher-trio' ? 'scale(1.3)' : 'scale(1.05)' // Bigger scale for trio
              }}
            />
          </div>
        </div>
      )}

      {/* BodyArmor Exact Navigation Controls - Absolute Bottom Left */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        zIndex: 1000 // Higher z-index to match header elements
      }}>
        {/* Previous Button - BodyArmor Style */}
        <button 
          onClick={prevSlide}
          style={{
            width: '40px',
            height: '40px',
            border: 'none',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.6)',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
          }}
          aria-label="Previous slide"
        >
          ‹
        </button>

        {/* Slide Indicators - BodyArmor Simple Dots */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: index === currentSlide ? '20px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                background: index === currentSlide ? '#fff' : 'rgba(255, 255, 255, 0.4)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button - BodyArmor Style */}
        <button 
          onClick={nextSlide}
          style={{
            width: '40px',
            height: '40px',
            border: 'none',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.6)',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
          }}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

    </section>
  );
}
