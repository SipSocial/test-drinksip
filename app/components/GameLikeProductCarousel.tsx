import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router';

interface GameLikeCarouselSlide {
  id: string;
  handle: string;
  title: string;
  image: string;
  color: string;
}

interface GameLikeProductCarouselProps {
  products: GameLikeCarouselSlide[];
}

export function GameLikeProductCarousel({ products }: GameLikeProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [momentum, setMomentum] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState<GameLikeCarouselSlide[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const velocityRef = useRef(0);
  const lastTouchRef = useRef<number>(0);

  // Create infinite loop of products (BodyArmor-style endless scroll)
  useEffect(() => {
    if (products.length > 0) {
      // Create array with duplicates for seamless infinite scroll
      const extendedProducts = [
        ...products.slice(-2), // Last 2 items at start
        ...products,
        ...products,
        ...products.slice(0, 2)  // First 2 items at end
      ];
      setVisibleProducts(extendedProducts);
      setCurrentIndex(2); // Start after the prepended items
    }
  }, [products]);

  // Game-like momentum physics with spring damping
  const updateMomentum = useCallback(() => {
    if (isDragging) {
      animationRef.current = requestAnimationFrame(updateMomentum);
      return;
    }

    if (Math.abs(momentum) > 0.1) {
      setMomentum(prev => prev * 0.92); // Smooth deceleration
      setDragOffset(prev => prev + momentum);
      animationRef.current = requestAnimationFrame(updateMomentum);
    } else {
      setMomentum(0);
      // Snap to nearest card with spring physics
      snapToNearestCard();
    }
  }, [isDragging, momentum]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(updateMomentum);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateMomentum]);

  const snapToNearestCard = () => {
    const cardWidth = window.innerWidth * 0.75; // Card width is 75vw
    const cardGap = window.innerWidth * 0.05;   // Gap is 5vw
    const totalCardWidth = cardWidth + cardGap;
    
    const targetIndex = Math.round(-dragOffset / totalCardWidth);
    const targetOffset = -targetIndex * totalCardWidth;
    
    // Smooth spring animation to target position
    const startOffset = dragOffset;
    const distance = targetOffset - startOffset;
    let startTime: number;
    
    const animateSnap = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const duration = 400; // Spring duration
      
      if (elapsed < duration) {
        // Cubic bezier spring easing
        const progress = elapsed / duration;
        const eased = 1 - Math.pow(1 - progress, 3);
        setDragOffset(startOffset + distance * eased);
        requestAnimationFrame(animateSnap);
      } else {
        setDragOffset(targetOffset);
        updateCurrentIndex(targetIndex);
      }
    };
    
    requestAnimationFrame(animateSnap);
  };

  const updateCurrentIndex = (offset: number) => {
    const newIndex = Math.max(0, Math.min(visibleProducts.length - 1, currentIndex + offset));
    
    // Handle infinite loop wrapping
    if (newIndex <= 1) {
      // Jump to end (before duplicates)
      setCurrentIndex(visibleProducts.length - 3);
      setDragOffset(-(visibleProducts.length - 3) * (window.innerWidth * 0.8));
    } else if (newIndex >= visibleProducts.length - 2) {
      // Jump to beginning (after duplicates)
      setCurrentIndex(2);
      setDragOffset(-2 * (window.innerWidth * 0.8));
    } else {
      setCurrentIndex(newIndex);
    }
  };

  // Premium touch handling with velocity tracking
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
    setIsDragging(true);
    setMomentum(0);
    lastTouchRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || !isDragging) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    const currentTime = performance.now();
    
    setTouchEnd(currentTouch);
    
    // Calculate velocity for momentum
    const timeDelta = currentTime - lastTouchRef.current;
    if (timeDelta > 0) {
      const touchDelta = currentTouch - (touchEnd || touchStart);
      velocityRef.current = touchDelta / timeDelta;
    }
    lastTouchRef.current = currentTime;
    
    // Update drag offset with resistance at edges
    const rawOffset = currentTouch - touchStart;
    const maxOffset = visibleProducts.length * window.innerWidth * 0.4;
    const resistance = Math.abs(dragOffset + rawOffset) > maxOffset ? 0.3 : 1;
    
    setDragOffset(prev => prev + rawOffset * resistance * 0.8);
    setTouchStart(currentTouch);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !isDragging) return;
    
    setIsDragging(false);
    
    // Apply momentum based on velocity
    const finalVelocity = velocityRef.current * 15; // Amplify for better feel
    setMomentum(Math.max(-50, Math.min(50, finalVelocity))); // Clamp momentum
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const navigateToProduct = (index: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const targetOffset = -index * (window.innerWidth * 0.8);
    
    // Smooth animated transition
    const startOffset = dragOffset;
    const distance = targetOffset - startOffset;
    let startTime: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const duration = 600;
      
      if (elapsed < duration) {
        const progress = elapsed / duration;
        const eased = 1 - Math.pow(1 - progress, 4); // Smooth easing
        setDragOffset(startOffset + distance * eased);
        requestAnimationFrame(animate);
      } else {
        setDragOffset(targetOffset);
        setCurrentIndex(index);
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(animate);
  };

  return (
    <section style={{
      position: 'relative',
      width: '100vw',
      background: '#000',
      padding: '4rem 0 6rem',
      overflow: 'hidden'
    }}>
      {/* BodyArmor-style Section Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '4rem',
        padding: '0 2rem'
      }}>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 8vw, 4rem)',
          fontWeight: 900,
          textTransform: 'uppercase',
          color: '#fff',
          letterSpacing: '-0.02em',
          lineHeight: 0.9,
          marginBottom: '1rem'
        }}>
          You May Like
        </h2>
        <p style={{
          fontSize: '1.1rem',
          color: '#888',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 600
        }}>
          Premium Non-Alcoholic Collection
        </p>
      </div>

      {/* Game-like Carousel Container */}
      <div 
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '420px',
          cursor: isDragging ? 'grabbing' : 'grab',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Cards Track */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          transform: `translateX(${dragOffset}px)`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          willChange: 'transform'
        }}>
          {visibleProducts.map((product, index) => {
            const offset = index - currentIndex;
            const absOffset = Math.abs(offset);
            
            // Advanced 3D transformation calculations
            const scale = Math.max(0.75, 1 - absOffset * 0.15);
            const opacity = Math.max(0.4, 1 - absOffset * 0.3);
            const rotateY = offset * -15; // 3D rotation
            const translateZ = -absOffset * 100; // Depth
            
            return (
              <div
                key={`${product.id}-${index}`}
                style={{
                  flex: '0 0 75vw',
                  maxWidth: '320px',
                  height: '380px',
                  marginRight: '5vw',
                  perspective: '1000px',
                  transform: `
                    scale(${scale}) 
                    rotateY(${rotateY}deg) 
                    translateZ(${translateZ}px)
                  `,
                  opacity,
                  transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transformStyle: 'preserve-3d',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden'
                }}
              >
                {/* Premium Card Design */}
                <Link
                  to={`/products/${product.handle}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    textDecoration: 'none',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: `linear-gradient(135deg, ${product.color}f0 0%, ${product.color} 100%)`,
                    boxShadow: absOffset === 0 
                      ? '0 30px 80px rgba(0, 0, 0, 0.4)' 
                      : '0 15px 40px rgba(0, 0, 0, 0.2)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    transform: 'translateZ(0)', // Hardware acceleration
                    transition: 'all 0.3s ease'
                  }}
                  onTouchStart={(e) => {
                    if (absOffset === 0) {
                      e.currentTarget.style.transform = 'scale(0.98) translateZ(0)';
                    }
                  }}
                  onTouchEnd={(e) => {
                    if (absOffset === 0) {
                      e.currentTarget.style.transform = 'scale(1) translateZ(0)';
                    }
                  }}
                >
                  {/* Background Gradient Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `
                      radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                      linear-gradient(145deg, transparent 0%, rgba(0, 0, 0, 0.1) 100%)
                    `,
                    pointerEvents: 'none'
                  }} />

                  {/* Product Image */}
                  <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '70%',
                    height: '60%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img 
                      src={product.image}
                      alt={product.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))',
                        transform: absOffset === 0 ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.4s ease'
                      }}
                    />
                  </div>

                  {/* Product Title */}
                  <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '1.5rem',
                    right: '1.5rem',
                    textAlign: 'center'
                  }}>
                    <h3 style={{
                      fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      color: '#fff',
                      letterSpacing: '0.05em',
                      lineHeight: 1.1,
                      margin: 0,
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                    }}>
                      {product.title.replace('DrinkSip ', '')}
                    </h3>
                  </div>

                  {/* Active Card Indicator */}
                  {absOffset === 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      width: '8px',
                      height: '8px',
                      background: '#fff',
                      borderRadius: '50%',
                      boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
                      animation: 'pulse 2s ease-in-out infinite'
                    }} />
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Minimal Progress Indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3rem',
        gap: '8px'
      }}>
        {products.map((_, index) => {
          const adjustedCurrent = (currentIndex - 2 + products.length) % products.length;
          const isActive = index === adjustedCurrent;
          
          return (
            <button
              key={index}
              onClick={() => navigateToProduct(index + 2)}
              style={{
                width: isActive ? '24px' : '6px',
                height: '3px',
                borderRadius: '2px',
                border: 'none',
                background: isActive ? '#fff' : 'rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                WebkitTapHighlightColor: 'transparent'
              }}
              aria-label={`View product ${index + 1}`}
            />
          );
        })}
      </div>

      {/* Advanced CSS for game-like smoothness */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.2); }
          }
          
          /* Hardware acceleration for all interactive elements */
          .game-like-carousel * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
          }
          
          /* Disable text selection on mobile */
          .game-like-carousel {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
        `}
      </style>
    </section>
  );
}
