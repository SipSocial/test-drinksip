/**
 * Premium loading component with ultra-luxury animations
 * Smooth transitions between loading states and content
 */

import React, { useState, useEffect } from 'react';

interface PremiumLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
  skeleton?: React.ReactNode;
  minLoadTime?: number;
  className?: string;
}

export function PremiumLoader({ 
  isLoading, 
  children, 
  skeleton,
  minLoadTime = 800,
  className = ''
}: PremiumLoaderProps) {
  const [showLoader, setShowLoader] = useState(isLoading);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLoading) {
      setShowLoader(true);
      setIsTransitioning(false);
    } else {
      // Ensure minimum loading time for smooth UX
      timer = setTimeout(() => {
        setIsTransitioning(true);
        
        // Fade out loader after transition starts
        setTimeout(() => {
          setShowLoader(false);
          setIsTransitioning(false);
        }, 400);
      }, minLoadTime);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, minLoadTime]);

  return (
    <>
      <style>{`
        .premium-loader-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .premium-loader-content {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .premium-loader-content.loading {
          opacity: 0;
          transform: translateY(20px);
        }

        .premium-loader-skeleton {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 1;
          transform: translateY(0);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2;
        }

        .premium-loader-skeleton.hiding {
          opacity: 0;
          transform: translateY(-20px);
        }

        .premium-fade-in {
          animation: premiumFadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes premiumFadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      <div className={`premium-loader-container ${className}`}>
        {/* Skeleton Loader */}
        {showLoader && (
          <div className={`premium-loader-skeleton ${isTransitioning ? 'hiding' : ''}`}>
            {skeleton || <DefaultSkeleton />}
          </div>
        )}

        {/* Actual Content */}
        <div className={`premium-loader-content ${showLoader ? 'loading' : ''} ${!showLoader ? 'premium-fade-in' : ''}`}>
          {children}
        </div>
      </div>
    </>
  );
}

function DefaultSkeleton() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '2rem',
      minHeight: '200px'
    }}>
      <div style={{
        height: '2rem',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
        backgroundSize: '200px 100%',
        animation: 'skeletonShimmer 1.6s ease-in-out infinite',
        borderRadius: '4px',
        width: '60%'
      }} />
      
      <div style={{
        height: '1rem',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
        backgroundSize: '200px 100%',
        animation: 'skeletonShimmer 1.6s ease-in-out infinite',
        borderRadius: '4px',
        width: '80%',
        animationDelay: '0.2s'
      }} />
      
      <div style={{
        height: '1rem',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
        backgroundSize: '200px 100%',
        animation: 'skeletonShimmer 1.6s ease-in-out infinite',
        borderRadius: '4px',
        width: '40%',
        animationDelay: '0.4s'
      }} />
    </div>
  );
}

// Specialized loaders for different content types
export function ProductLoader({ isLoading, children }: { isLoading: boolean; children: React.ReactNode }) {
  return (
    <PremiumLoader
      isLoading={isLoading}
      skeleton={
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          minHeight: '300px'
        }}>
          <div style={{
            height: '200px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
            backgroundSize: '200px 100%',
            animation: 'skeletonShimmer 1.6s ease-in-out infinite',
            borderRadius: '12px'
          }} />
          
          <div style={{
            height: '1.5rem',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
            backgroundSize: '200px 100%',
            animation: 'skeletonShimmer 1.6s ease-in-out infinite',
            borderRadius: '4px',
            width: '70%',
            animationDelay: '0.2s'
          }} />
          
          <div style={{
            height: '2rem',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
            backgroundSize: '200px 100%',
            animation: 'skeletonShimmer 1.6s ease-in-out infinite',
            borderRadius: '4px',
            width: '40%',
            animationDelay: '0.4s'
          }} />
        </div>
      }
    >
      {children}
    </PremiumLoader>
  );
}

export function PageLoader({ isLoading, children }: { isLoading: boolean; children: React.ReactNode }) {
  return (
    <PremiumLoader
      isLoading={isLoading}
      minLoadTime={1000}
      skeleton={
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #000 0%, #111 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          {/* Logo skeleton */}
          <div style={{
            width: '120px',
            height: '40px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
            backgroundSize: '200px 100%',
            animation: 'skeletonShimmer 1.6s ease-in-out infinite',
            borderRadius: '8px'
          }} />
          
          {/* Premium loading indicator */}
          <div style={{
            width: '300px',
            height: '2px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '1px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
              animation: 'premiumProgress 2s ease-in-out infinite'
            }} />
          </div>
        </div>
      }
    >
      {children}
    </PremiumLoader>
  );
}

// Add keyframes for animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes skeletonShimmer {
      0% { background-position: -200px 0; }
      100% { background-position: calc(200px + 100%) 0; }
    }
    
    @keyframes premiumProgress {
      0% { transform: translateX(-100px); }
      100% { transform: translateX(400px); }
    }
  `;
  document.head.appendChild(style);
}
