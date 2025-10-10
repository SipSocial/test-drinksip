/**
 * GameLikeShoppablePanel - Ultra-performance interactive product selector
 * Optimized with pure CSS animations instead of framer-motion for better performance
 */

import React, { useState } from 'react';
import { Link } from 'react-router';

interface Product {
  id: string;
  title: string;
  handle: string;
  color: string;
  series: string;
  image?: string;
  description?: string;
}

interface GameLikeShoppablePanelProps {
  allProducts: Product[];
  currentProduct: Product;
  onProductSelect: (product: Product) => void;
  className?: string;
}

export function GameLikeShoppablePanel({ 
  allProducts, 
  currentProduct, 
  onProductSelect,
  className = '' 
}: GameLikeShoppablePanelProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [isGridExpanded, setIsGridExpanded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load animation
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Dynamic product image mapping
  const getProductImage = (handle: string): string => {
    const imageMap: Record<string, string> = {
      'hazy-ipa': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Hazy_IPA_0645f5ce-2ec5-4fda-87ee-fb36a4ee4295.png?v=1759017824',
      'watermelon-refresher': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/box-mockup-refresher-watermelon-no-bottom.png?v=1759862531',
      'blood-orange-refresher': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Blood_Orange_Refresher_82f1cfff-dfdd-44c5-bb02-6f8e74183f36.png?v=1759017824',
      'lemon-lime-refresher': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Lemon_Lime_Refresher_9565ca39-8832-48ab-8c6b-bcd0899f87e9.png?v=1759017824',
      '311-hazy-ipa': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/311_Hazy_IPA_607644d9-92cb-4a02-af68-0eb18d34063a.png?v=1759017824',
      'deftones-tone-zero-lager': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Deftones_Tone_Zero_Lager_dcc52426-36ee-42ee-a3b5-b49f7d2d7480.png?v=1759017824',
    };
    return imageMap[handle] || imageMap['hazy-ipa'];
  };

  // Clean product title
  const getCleanTitle = (title: string, series?: string) => {
    if (series === 'ARTIST SERIES') {
      return title
        .replace(/DrinkSip\s*/gi, '')
        .replace(/Artist Series\s*/gi, '')
        .replace(/\s*Refresher\s*/gi, '')
        .replace(/\s*Series\s*/gi, '')
        .trim();
    }
    return title.replace(/\s*Refresher\s*/gi, '').replace(/DrinkSip\s*/gi, '').trim();
  };

  // Handle product selection
  const handleProductClick = (product: Product) => {
    if (product.handle !== currentProduct.handle) {
      onProductSelect(product);
    }
  };

  const isHovered = (handle: string) => hoveredProduct === handle;

  return (
    <>
      {/* Performance-optimized CSS animations */}
      <style>{`
        .game-panel {
          opacity: 0;
          transform: translateY(20px) scale(0.95);
          animation: panelFadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .game-panel.loaded {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .product-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
          will-change: transform, box-shadow;
        }

        .product-card:hover:not(.current) {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .product-card.current {
          animation: currentPulse 2s ease-in-out infinite;
        }

        .product-image {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, filter;
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        .expand-arrow {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .expand-arrow.expanded {
          transform: rotate(180deg);
        }

        .current-badge {
          animation: badgeScale 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .selection-ring {
          animation: ringPulse 1.5s ease-in-out infinite;
        }

        .hover-overlay {
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-card:hover .hover-overlay {
          opacity: 1;
        }

        @keyframes panelFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes currentPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.1);
          }
        }

        @keyframes badgeScale {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes ringPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        .grid-item {
          opacity: 0;
          transform: translateY(20px);
          animation: itemFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .grid-item:nth-child(1) { animation-delay: 0s; }
        .grid-item:nth-child(2) { animation-delay: 0.1s; }
        .grid-item:nth-child(3) { animation-delay: 0.2s; }
        .grid-item:nth-child(4) { animation-delay: 0.3s; }
        .grid-item:nth-child(5) { animation-delay: 0.4s; }
        .grid-item:nth-child(6) { animation-delay: 0.5s; }

        @keyframes itemFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div 
        className={`game-panel ${className} ${isLoaded ? 'loaded' : ''}`}
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 100%)',
          borderRadius: '16px',
          padding: 'clamp(1.5rem, 2.5vw, 2rem)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '400px'
        }}
      >
        {/* Panel Header */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div>
            <h3 style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              fontWeight: '700',
              color: '#FFFFFF',
              margin: '0 0 0.25rem 0',
              fontFamily: 'var(--font-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Select Flavor
            </h3>
            <p style={{
              fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '0',
              fontFamily: 'var(--font-primary)'
            }}>
              {allProducts.length} available
            </p>
          </div>
          
          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsGridExpanded(!isGridExpanded)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '0.5rem',
              color: '#FFFFFF',
              cursor: 'pointer',
              fontSize: '1rem',
              lineHeight: 1,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <div className={`expand-arrow ${isGridExpanded ? 'expanded' : ''}`}>
              ⌄
            </div>
          </button>
        </div>

        {/* Products Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isGridExpanded ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: 'clamp(0.75rem, 1.5vw, 1rem)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {allProducts.map((product, index) => {
            const isCurrent = product.handle === currentProduct.handle;
            
            return (
              <div
                key={product.handle}
                className={`grid-item`}
                style={{
                  position: 'relative',
                  aspectRatio: '0.8',
                  cursor: isCurrent ? 'default' : 'pointer'
                }}
                onClick={() => handleProductClick(product)}
                onMouseEnter={() => setHoveredProduct(product.handle)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Card */}
                <div
                  className={`product-card ${isCurrent ? 'current' : ''}`}
                  style={{
                    background: isCurrent 
                      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)'
                      : 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: 'clamp(0.75rem, 1.5vw, 1rem)',
                    border: isCurrent 
                      ? '2px solid rgba(255, 255, 255, 0.4)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Current Badge */}
                  {isCurrent && (
                    <div
                      className="current-badge"
                      style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        background: 'rgba(255, 255, 255, 0.9)',
                        color: '#000',
                        fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
                        fontWeight: '700',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        zIndex: 2
                      }}
                    >
                      CURRENT
                    </div>
                  )}

                  {/* Product Image */}
                  <img
                    className="product-image"
                    src={getProductImage(product.handle)}
                    alt={product.title}
                    style={{
                      width: '100%',
                      height: '60%',
                      objectFit: 'contain',
                      marginBottom: '0.5rem'
                    }}
                    loading="lazy"
                  />

                  {/* Product Info */}
                  <div style={{
                    textAlign: 'center',
                    width: '100%'
                  }}>
                    <h4 style={{
                      fontSize: 'clamp(0.7rem, 1.3vw, 0.8rem)',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      margin: '0 0 0.25rem 0',
                      lineHeight: 1.2,
                      fontFamily: 'var(--font-primary)'
                    }}>
                      {getCleanTitle(product.title, product.series)}
                    </h4>
                    <p style={{
                      fontSize: 'clamp(0.6rem, 1.1vw, 0.7rem)',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: '0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {product.series}
                    </p>

                    {/* Action Indicator */}
                    {!isCurrent && (
                      <div
                        style={{
                          marginTop: '0.5rem',
                          fontSize: 'clamp(0.55rem, 1vw, 0.65rem)',
                          color: 'rgba(255, 255, 255, 0.6)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          fontWeight: '600'
                        }}
                      >
                        TAP TO SWITCH
                      </div>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className="hover-overlay"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      borderRadius: '12px',
                      pointerEvents: 'none'
                    }}
                  />
                </div>

                {/* Game-like Selection Ring */}
                {isHovered(product.handle) && !isCurrent && (
                  <div
                    className="selection-ring"
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      left: '-2px',
                      right: '-2px',
                      bottom: '-2px',
                      borderRadius: '14px',
                      border: '2px solid rgba(255, 255, 255, 0.6)',
                      pointerEvents: 'none',
                      zIndex: 1
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Panel Footer */}
        <div
          style={{
            marginTop: 'clamp(1.5rem, 2.5vw, 2rem)',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}
        >
          <Link
            to="/collections/all"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: 'clamp(0.75rem, 1.4vw, 0.85rem)',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            VIEW ALL
          </Link>
        </div>

        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="white" fill-opacity="0.1"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
            pointerEvents: 'none'
          }}
        />
      </div>
    </>
  );
}