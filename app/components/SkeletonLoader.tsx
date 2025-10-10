/**
 * Ultra-luxury skeleton loading components
 * Smooth, sophisticated loading states for premium UX
 */

import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
  delay?: number;
}

export function Skeleton({ 
  width = '100%', 
  height = '1rem', 
  borderRadius = '4px',
  className = '',
  delay = 0
}: SkeletonProps) {
  return (
    <>
      <style>{`
        @keyframes skeletonShimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .skeleton {
          display: inline-block;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.18) 50%,
            rgba(255, 255, 255, 0.1) 100%
          );
          background-size: 200px 100%;
          animation: skeletonShimmer 1.6s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }

        .skeleton-dark {
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.08) 0%,
            rgba(0, 0, 0, 0.15) 50%,
            rgba(0, 0, 0, 0.08) 100%
          );
        }
      `}</style>
      
      <div
        className={`skeleton ${className}`}
        style={{
          width,
          height,
          borderRadius,
          '--delay': `${delay}s`
        } as React.CSSProperties}
        aria-label="Loading..."
      />
    </>
  );
}

export function ProductCardSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        animationDelay: `${delay}s`
      }}
    >
      {/* Product Image Skeleton */}
      <Skeleton 
        height="200px" 
        borderRadius="12px"
        delay={delay}
      />
      
      {/* Title Skeleton */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Skeleton 
          height="1.2rem" 
          width="80%"
          delay={delay + 0.1}
        />
        <Skeleton 
          height="1rem" 
          width="60%"
          delay={delay + 0.2}
        />
      </div>
      
      {/* Price Skeleton */}
      <Skeleton 
        height="1.5rem" 
        width="40%"
        delay={delay + 0.3}
      />
    </div>
  );
}

export function PDPHeroSkeleton() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #333 0%, #222 100%)',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '2rem',
        padding: '2rem',
        paddingTop: '203px'
      }}
    >
      {/* Left Side Skeleton */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem',
        padding: '2rem'
      }}>
        {/* Chips */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[...Array(4)].map((_, i) => (
            <Skeleton 
              key={i}
              height="2rem" 
              width="4rem"
              borderRadius="20px"
              delay={i * 0.1}
            />
          ))}
        </div>
        
        {/* Price */}
        <Skeleton 
          height="4rem" 
          width="8rem"
          delay={0.5}
        />
        
        {/* Button */}
        <Skeleton 
          height="3.5rem" 
          borderRadius="0"
          delay={0.7}
        />
        
        {/* Build-a-box */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Skeleton height="1rem" width="6rem" delay={0.9} />
            <Skeleton height="1.5rem" width="3rem" delay={1.0} />
          </div>
          <Skeleton height="6px" borderRadius="3px" delay={1.1} />
        </div>
      </div>

      {/* Center Product Skeleton */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '400px'
      }}>
        <Skeleton 
          height="600px" 
          width="400px"
          borderRadius="20px"
          delay={0.3}
        />
      </div>

      {/* Right Side Skeleton */}
      <div style={{ padding: '2rem' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {[...Array(4)].map((_, i) => (
              <Skeleton 
                key={i}
                height="2.5rem" 
                width="5rem"
                borderRadius="8px"
                delay={1.2 + i * 0.1}
              />
            ))}
          </div>
          
          {/* Content Area */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Skeleton height="1rem" width="70%" delay={1.6 + i * 0.1} />
                <Skeleton height="1.5rem" width="50%" delay={1.7 + i * 0.1} />
              </div>
            ))}
          </div>
          
          {/* Thumbnails Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: '0.75rem',
            marginTop: '1rem'
          }}>
            {[...Array(6)].map((_, i) => (
              <Skeleton 
                key={i}
                height="120px"
                borderRadius="8px"
                delay={2.2 + i * 0.05}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: '#000',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        zIndex: 1000
      }}
    >
      {/* Logo */}
      <Skeleton height="2rem" width="8rem" />
      
      {/* Navigation */}
      <div style={{ display: 'flex', gap: '2rem' }}>
        {[...Array(4)].map((_, i) => (
          <Skeleton 
            key={i}
            height="1rem" 
            width="4rem"
            delay={i * 0.1}
          />
        ))}
      </div>
      
      {/* Actions */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Skeleton height="2rem" width="2rem" borderRadius="50%" delay={0.5} />
        <Skeleton height="2rem" width="2rem" borderRadius="50%" delay={0.6} />
      </div>
    </div>
  );
}

export function CarouselSkeleton({ items = 4 }: { items?: number }) {
  return (
    <div style={{
      display: 'flex',
      gap: '1.5rem',
      padding: '2rem 0',
      overflow: 'hidden'
    }}>
      {[...Array(items)].map((_, i) => (
        <div key={i} style={{ flex: '0 0 300px' }}>
          <ProductCardSkeleton delay={i * 0.1} />
        </div>
      ))}
    </div>
  );
}
