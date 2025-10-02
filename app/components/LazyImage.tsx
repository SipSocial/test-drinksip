import { useState, useRef, useEffect } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  style = {},
  placeholder,
  onLoad,
  onError
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px' // Start loading 50px before image comes into view
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate responsive srcSet for different screen sizes
  const generateSrcSet = (baseSrc: string) => {
    if (baseSrc.includes('placeholder.com')) {
      // For placeholder images, generate different sizes
      const baseUrl = baseSrc.split('?')[0];
      const params = baseSrc.split('?')[1] || '';
      return [
        `${baseUrl.replace('400x600', '200x300')}?${params} 200w`,
        `${baseUrl.replace('400x600', '400x600')}?${params} 400w`,
        `${baseUrl.replace('400x600', '800x1200')}?${params} 800w`
      ].join(', ');
    }
    return undefined;
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    width: width || '100%',
    height: height || 'auto',
    ...style
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    transition: 'opacity 0.3s ease',
    opacity: isLoaded ? 1 : 0
  };

  return (
    <div ref={containerRef} style={containerStyle} className={className}>
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: placeholder || '#f8f9fa',
          borderRadius: 'inherit'
        }}>
          {isInView ? (
            <LoadingSpinner size="medium" color="#666" />
          ) : (
            <div style={{
              color: '#999',
              fontSize: '0.8rem',
              textAlign: 'center'
            }}>
              📷
            </div>
          )}
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8f9fa',
          color: '#666',
          borderRadius: 'inherit'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
          <div style={{ fontSize: '0.8rem' }}>Image unavailable</div>
        </div>
      )}

      {/* Actual image - only load when in view */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          srcSet={generateSrcSet(src)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={alt}
          width={width}
          height={height}
          style={imageStyle}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}

// Preload critical images
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Preload multiple images
export async function preloadImages(srcs: string[]): Promise<void> {
  try {
    await Promise.all(srcs.map(preloadImage));
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
}
