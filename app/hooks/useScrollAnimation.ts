import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * 
 * @param options - Configuration options
 * @param options.threshold - Percentage of element visibility to trigger (0-1)
 * @param options.rootMargin - Margin around root element
 * @param options.triggerOnce - Whether animation should only trigger once
 * 
 * @returns Object with ref to attach to element and isVisible state
 * 
 * @example
 * const { ref, isVisible } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
 * 
 * <div ref={ref} className={isVisible ? 'animate-fade-in' : ''}>
 *   Content
 * </div>
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Disconnect observer if triggerOnce is true
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          // Allow re-triggering if triggerOnce is false
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

/**
 * Hook for staggered animations on multiple elements
 * 
 * @param count - Number of elements to animate
 * @param options - Same options as useScrollAnimation
 * 
 * @returns Array of refs and visibility states for each element
 * 
 * @example
 * const items = useStaggeredAnimation(3, { threshold: 0.2 });
 * 
 * {items.map((item, index) => (
 *   <div 
 *     key={index} 
 *     ref={item.ref} 
 *     className={item.isVisible ? 'animate-fade-in' : ''}
 *     style={{ animationDelay: `${index * 100}ms` }}
 *   >
 *     Content {index}
 *   </div>
 * ))}
 */
export function useStaggeredAnimation(
  count: number,
  options: UseScrollAnimationOptions = {}
) {
  const items = Array.from({ length: count }, () => useScrollAnimation(options));
  return items;
}

/**
 * Hook for parallax scroll effects
 * 
 * @param speed - Parallax speed multiplier (0-1 for slower, >1 for faster)
 * 
 * @returns Object with ref and transform value
 * 
 * @example
 * const { ref, transform } = useParallax(0.5);
 * 
 * <div ref={ref} style={{ transform: `translateY(${transform}px)` }}>
 *   Parallax Content
 * </div>
 */
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const windowHeight = window.innerHeight;

      // Calculate parallax offset
      const offset = (scrolled - elementTop + windowHeight) * speed;
      setTransform(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return { ref, transform };
}
