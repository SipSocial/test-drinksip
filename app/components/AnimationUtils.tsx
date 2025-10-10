/**
 * Ultra-performance animation utilities
 * 60fps guaranteed with hardware acceleration and optimized CSS
 */

import React from 'react';

// Performance-optimized animation hook
export function useOptimizedAnimation() {
  React.useEffect(() => {
    // Enable hardware acceleration globally
    const style = document.createElement('style');
    style.textContent = `
      /* 60fps Performance Optimizations */
      *, *::before, *::after {
        transform-style: preserve-3d;
        backface-visibility: hidden;
        perspective: 1000px;
      }

      /* Ultra-smooth transitions with hardware acceleration */
      .perf-transition {
        will-change: transform, opacity, filter;
        transform-origin: center;
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        perspective: 1000px;
        -webkit-perspective: 1000px;
      }

      /* Premium easing curves */
      .ease-luxury {
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      .ease-premium {
        transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .ease-ultra {
        transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
      }

      /* High-performance animations */
      @keyframes premiumFadeInUp {
        0% {
          opacity: 0;
          transform: translate3d(0, 30px, 0);
        }
        100% {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      @keyframes premiumScaleIn {
        0% {
          opacity: 0;
          transform: translate3d(0, 0, 0) scale3d(0.9, 0.9, 1);
        }
        100% {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
        }
      }

      @keyframes premiumSlideInLeft {
        0% {
          opacity: 0;
          transform: translate3d(-40px, 0, 0);
        }
        100% {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      @keyframes premiumFloat {
        0%, 100% {
          transform: translate3d(0, 0px, 0);
        }
        50% {
          transform: translate3d(0, -10px, 0);
        }
      }

      @keyframes premiumPulse {
        0%, 100% {
          transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
          opacity: 1;
        }
        50% {
          transform: translate3d(0, 0, 0) scale3d(1.05, 1.05, 1);
          opacity: 0.8;
        }
      }

      @keyframes premiumGlow {
        0%, 100% {
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
        }
        50% {
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
        }
      }

      @keyframes premiumShimmer {
        0% {
          background-position: -200px 0;
        }
        100% {
          background-position: calc(200px + 100%) 0;
        }
      }

      /* Optimized hover effects */
      .hover-lift {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform;
      }

      .hover-lift:hover {
        transform: translate3d(0, -4px, 0);
      }

      .hover-scale {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform;
      }

      .hover-scale:hover {
        transform: translate3d(0, 0, 0) scale3d(1.02, 1.02, 1);
      }

      .hover-glow {
        transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: box-shadow;
      }

      .hover-glow:hover {
        box-shadow: 0 8px 32px rgba(255, 255, 255, 0.2);
      }

      /* Performance-first entrance animations */
      .animate-fade-in-up {
        animation: premiumFadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        opacity: 0;
      }

      .animate-scale-in {
        animation: premiumScaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        opacity: 0;
      }

      .animate-slide-in-left {
        animation: premiumSlideInLeft 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        opacity: 0;
      }

      .animate-float {
        animation: premiumFloat 3s ease-in-out infinite;
      }

      .animate-pulse {
        animation: premiumPulse 2s ease-in-out infinite;
      }

      .animate-glow {
        animation: premiumGlow 2s ease-in-out infinite;
      }

      .animate-shimmer {
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.1) 0%,
          rgba(255, 255, 255, 0.18) 50%,
          rgba(255, 255, 255, 0.1) 100%
        );
        background-size: 200px 100%;
        animation: premiumShimmer 1.6s ease-in-out infinite;
      }

      /* Staggered animation delays */
      .stagger-1 { animation-delay: 0.1s; }
      .stagger-2 { animation-delay: 0.2s; }
      .stagger-3 { animation-delay: 0.3s; }
      .stagger-4 { animation-delay: 0.4s; }
      .stagger-5 { animation-delay: 0.5s; }
      .stagger-6 { animation-delay: 0.6s; }

      /* Mobile-optimized animations */
      @media (prefers-reduced-motion: reduce) {
        .animate-fade-in-up,
        .animate-scale-in,
        .animate-slide-in-left,
        .animate-float,
        .animate-pulse,
        .animate-glow,
        .animate-shimmer {
          animation: none;
          opacity: 1;
          transform: none;
        }
      }

      /* Touch device optimizations */
      @media (hover: none) and (pointer: coarse) {
        .hover-lift:active {
          transform: translate3d(0, -2px, 0);
        }
        
        .hover-scale:active {
          transform: translate3d(0, 0, 0) scale3d(0.98, 0.98, 1);
        }
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
}

// Component for intersection observer animations
export function AnimateOnScroll({ 
  children, 
  animation = 'fade-in-up',
  delay = 0,
  threshold = 0.1,
  className = ''
}: {
  children: React.ReactNode;
  animation?: 'fade-in-up' | 'scale-in' | 'slide-in-left';
  delay?: number;
  threshold?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div 
      ref={ref}
      className={`${isVisible ? `animate-${animation}` : ''} ${className}`}
    >
      {children}
    </div>
  );
}

// Performance monitoring hook
export function usePerformanceMonitor() {
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Log any long animations (>16.67ms for 60fps)
          if (entry.duration > 16.67 && process.env.NODE_ENV === 'development') {
            console.warn(`Long animation detected: ${entry.duration}ms`, entry);
          }
        }
      });

      observer.observe({ entryTypes: ['measure'] });

      return () => observer.disconnect();
    }
  }, []);
}

// High-performance component wrapper
export function OptimizedComponent({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  useOptimizedAnimation();
  usePerformanceMonitor();

  return (
    <div className={`perf-transition ${className}`}>
      {children}
    </div>
  );
}
