/**
 * Performance Optimizer - Ultra-luxury performance monitoring and optimization
 * Real-time performance metrics for the most demanding users
 */

import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  ttfb: number;
  bundleSize: number;
  memoryUsage: number;
}

export function PerformanceOptimizer({ showDebugInfo = false }: { showDebugInfo?: boolean }) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: 0,
    fid: 0,
    cls: 0,
    fcp: 0,
    ttfb: 0,
    bundleSize: 0,
    memoryUsage: 0
  });

  useEffect(() => {
    // Web Vitals monitoring
    const measureWebVitals = () => {
      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        for (const entry of entries) {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
          }
        }
      }).observe({ entryTypes: ['paint'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            setMetrics(prev => ({ ...prev, cls: clsValue }));
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });

      // Memory usage monitoring
      const updateMemoryUsage = () => {
        if ('memory' in performance) {
          const memory = (performance as any).memory;
          setMetrics(prev => ({
            ...prev,
            memoryUsage: memory.usedJSHeapSize / 1024 / 1024 // MB
          }));
        }
      };

      updateMemoryUsage();
      const memoryInterval = setInterval(updateMemoryUsage, 5000);

      return () => clearInterval(memoryInterval);
    };

    const cleanup = measureWebVitals();
    return cleanup;
  }, []);

  // Performance optimizations
  useEffect(() => {
    // Preload critical resources
    const preloadCritical = () => {
      // Preload fonts
      const fontUrl = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap';
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = fontUrl;
      document.head.appendChild(link);

      // Preload critical images with lazy loading
      const criticalImages = [
        'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Hazy_IPA_0645f5ce-2ec5-4fda-87ee-fb36a4ee4295.png?v=1759017824'
      ];

      criticalImages.forEach(src => {
        const img = new Image();
        img.loading = 'eager';
        img.src = src;
      });
    };

    // Resource hints optimization
    const addResourceHints = () => {
      // DNS prefetch for external domains
      const addDnsPrefetch = (domain: string) => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      };

      addDnsPrefetch('https://fonts.googleapis.com');
      addDnsPrefetch('https://fonts.gstatic.com');
      addDnsPrefetch('https://cdn.shopify.com');
    };

    preloadCritical();
    addResourceHints();
  }, []);

  // Performance score calculation
  const getPerformanceScore = () => {
    const lcpScore = metrics.lcp < 2500 ? 100 : metrics.lcp < 4000 ? 75 : 0;
    const fidScore = metrics.fid < 100 ? 100 : metrics.fid < 300 ? 75 : 0;
    const clsScore = metrics.cls < 0.1 ? 100 : metrics.cls < 0.25 ? 75 : 0;
    const fcpScore = metrics.fcp < 1800 ? 100 : metrics.fcp < 3000 ? 75 : 0;
    
    return Math.round((lcpScore + fidScore + clsScore + fcpScore) / 4);
  };

  const performanceScore = getPerformanceScore();

  if (!showDebugInfo) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(0, 0, 0, 0.9)',
        color: '#fff',
        padding: '1rem',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
        minWidth: '200px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
        Performance Score: {performanceScore}/100
      </div>
      
      <div style={{ display: 'grid', gap: '4px' }}>
        <div style={{ color: metrics.lcp < 2500 ? '#4ade80' : '#ef4444' }}>
          LCP: {metrics.lcp.toFixed(0)}ms
        </div>
        <div style={{ color: metrics.fcp < 1800 ? '#4ade80' : '#ef4444' }}>
          FCP: {metrics.fcp.toFixed(0)}ms
        </div>
        <div style={{ color: metrics.cls < 0.1 ? '#4ade80' : '#ef4444' }}>
          CLS: {metrics.cls.toFixed(3)}
        </div>
        <div style={{ color: metrics.memoryUsage < 50 ? '#4ade80' : '#ef4444' }}>
          Memory: {metrics.memoryUsage.toFixed(1)}MB
        </div>
      </div>

      <div style={{ marginTop: '0.5rem', fontSize: '10px', opacity: 0.7 }}>
        Ultra-Luxury Performance Monitoring
      </div>
    </div>
  );
}

// Performance utilities
export const PerformanceUtils = {
  // Measure component render time
  measureRender: (componentName: string, fn: () => void) => {
    const start = performance.now();
    fn();
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Performance] ${componentName} render: ${(end - start).toFixed(2)}ms`);
    }
  },

  // Lazy image loading with intersection observer
  lazyLoadImage: (img: HTMLImageElement, src: string) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    observer.observe(img);
  },

  // Debounce for performance-critical operations
  debounce: <T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Throttle for scroll/resize events
  throttle: <T extends (...args: any[]) => void>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};
