import React from 'react';
import { Link } from 'react-router';
import { AddToBoxButton } from '~/components/AddToBoxButton';
import { GameLikeShoppablePanel } from '~/components/GameLikeShoppablePanel';

interface PDPHeroNewProps {
  product: {
    id: string;
    title: string;
    handle: string;
    description: string;
    color: string;
    series: string;
    features: string[];
    image?: string;
  };
  chips: string[];
  productImage: string;
  onColorChange?: (color: string) => void;
  allProducts?: any[]; // All available products for dynamic thumbnails
}

/**
 * PREMIUM SPLIT SCREEN PDP HERO
 * Exact replica of orange smoothie design for DrinkSip beer brand
 * Clean, minimal, next-level premium aesthetic
 */
export function PDPHeroNew({ product, chips, productImage, onColorChange, allProducts = [] }: PDPHeroNewProps) {
  const [activeTab, setActiveTab] = React.useState<'nutrition' | 'details' | 'ingredients'>('nutrition');
  const [rippling, setRippling] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(product);
  
  // Calculate right side color (same color, 25% opacity)  
  const rightSideColor = `${selectedProduct.color}40`; // 40 = ~25% opacity in hex

  // Clean product title based on series
  const getCleanTitle = (title: string, series?: string) => {
    if (series === 'Artist Series') {
      return title
        .replace(/DrinkSip\s*/gi, '')
        .replace(/Artist Series\s*/gi, '')
        .replace(/\s*Refresher\s*/gi, '')
        .replace(/\s*Series\s*/gi, '')
        .trim();
    }
    return title.replace(/\s*Refresher\s*/gi, '').replace(/DrinkSip\s*/gi, '').trim();
  };

  // Beer ripple animation when clicking thumbnails
  const handleProductSwitch = (newProduct: any) => {
    setRippling(true);
    
    setTimeout(() => {
      setSelectedProduct(newProduct);
      // Update header and page background color
      if (onColorChange) {
        onColorChange(newProduct.color);
      }
      setTimeout(() => {
        setRippling(false);
      }, 300);
    }, 150);
  };

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

  // GAME-LIKE PANEL - Show ALL products including current one
  const panelProducts = allProducts.map(p => ({
    id: p.handle,
    title: p.title,
    image: getProductImage(p.handle),
    color: p.color,
    series: p.series,
    handle: p.handle,
    description: p.description || ''
  }));

  return (
    <>
    <section 
        className="premium-split-hero"
      style={{
          background: 'transparent', // Let parent page background show through (product hex code)
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
          paddingTop: '203px', // Header height
          overflow: 'hidden'
        }}
      >
        {/* SPLIT BACKGROUND WITH RIPPLE ANIMATION - PROPER OPACITY SPLIT */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            zIndex: 1,
            overflow: 'hidden'
          }}
        >
          <div style={{ 
            flex: 4, 
            height: '100%', 
            background: selectedProduct.color, // Full hex color left side (80%)
            transition: 'background 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}></div>
          <div style={{ 
            flex: 1, 
            height: '100%', 
            background: `${selectedProduct.color}40`, // 40 = ~25% opacity right side (20%)
            transition: 'background 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}></div>

          {/* BEER RIPPLE ANIMATION OVERLAY */}
          {rippling && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '75%',
                width: '600px',
                height: '600px',
                background: `radial-gradient(circle, ${selectedProduct.color} 0%, transparent 70%)`,
                borderRadius: '50%',
                transform: 'translate(-50%, -50%) scale(0)',
                animation: 'beerRipple 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                zIndex: 2,
                pointerEvents: 'none',
                opacity: 0.6
              }}
            />
          )}
              </div>

        {/* RIPPLE ANIMATION KEYFRAMES */}
        <style>{`
          @keyframes beerRipple {
            0% {
              transform: translate(-50%, -50%) scale(0);
              opacity: 0.8;
            }
            50% {
              opacity: 0.4;
            }
            100% {
              transform: translate(-50%, -50%) scale(4);
              opacity: 0;
            }
          }
        `}</style>

        {/* DESKTOP LAYOUT */}
        <div 
          className="premium-split-desktop"
        >
          <div 
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              height: 'calc(100vh - 203px)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              alignItems: 'stretch',
              padding: '0 2rem',
              gap: '2rem'
            }}
          >
            {/* LEFT CONTENT AREA - PRODUCT INFO + BUILD A BOX */}
            <div 
              style={{
                padding: 'clamp(2rem, 4vw, 4rem) clamp(1rem, 3vw, 3rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 'clamp(2rem, 4vw, 4rem)',
                minHeight: '100%'
              }}
            >
              {/* MASSIVE WHITE TITLE - ARTIST SERIES CLEAN */}
              <h1 
                style={{
                  fontFamily: 'Peridot PE, Inter, sans-serif',
                  fontWeight: '900',
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  lineHeight: '0.85',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.05em',
                  color: '#FFFFFF',
                  margin: '0 0 clamp(1.5rem, 3vw, 3rem) 0',
                  textShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                  wordBreak: 'break-word',
                  hyphens: 'auto'
                }}
              >
                {getCleanTitle(selectedProduct.title, selectedProduct.series)}
              </h1>

              {/* WORLD CLASS RATING & PRICE */}
              <div style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                    flexWrap: 'wrap'
                  }}
                >
                  <div 
                    style={{
                      color: '#FFFFFF',
                      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                      letterSpacing: '0.2em',
                      opacity: 0.9
                    }}
                  >
                    ★★★★★
                  </div>
                  <span 
                    style={{
                      fontFamily: 'Peridot PE, Inter, sans-serif',
                      fontSize: 'clamp(2.8rem, 5.5vw, 4rem)',
                      fontWeight: '900',
                      color: '#FFFFFF',
                      lineHeight: 1,
                      letterSpacing: '-0.02em'
                    }}
                  >
                    $4.99
                  </span>
                </div>
              </div>

              {/* PREMIUM DESCRIPTION */}
              <p 
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'clamp(1.1rem, 2.2vw, 1.3rem)',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.85)',
                  margin: '0 0 clamp(3rem, 5vw, 4rem) 0',
                  fontWeight: 400,
                  maxWidth: '90%'
                }}
              >
                {selectedProduct.description || product.description}
              </p>

              {/* RESPONSIVE BUILD A BOX CTA */}
              <div style={{ marginBottom: 'clamp(2rem, 4vw, 4rem)' }}>
                <AddToBoxButton
                  product={{
                    variantId: product.id,
                    handle: product.handle,
                    title: product.title,
                    image: productImage,
                    price: 4.99,
                    color: product.color
                  }}
                />
              </div>
              </div>

            {/* RIGHT SIDE - CAN + VERTICAL THUMBNAILS + DETAILS */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                alignItems: 'start',
                justifyContent: 'center',
                zIndex: 10,
                position: 'relative',
                padding: 'clamp(2rem, 3vw, 3rem)',
                gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                minHeight: '100%',
                overflow: 'visible'
              }}
            >
              {/* LEFT: BEER CAN + DETAILS CONTAINER - CENTERED */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'clamp(1.5rem, 3vw, 2rem)',
                  textAlign: 'center'
                }}
              >
                {/* WORLD CLASS BEER CAN - BIGGER & CENTERED */}
                <img
                  src={selectedProduct.image || productImage}
                  alt={selectedProduct.title}
                  style={{
                    width: 'clamp(320px, 35vw, 450px)',
                    height: 'clamp(480px, 50vh, 650px)',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))',
                    maxWidth: '100%',
                    maxHeight: '60vh',
                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: rippling ? 'scale(1.02)' : 'scale(1)',
                    margin: '0 auto'
                  }}
                />

                {/* COMPACT DETAILS CARD */}
                <div 
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '16px',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                    overflow: 'hidden',
                    width: '100%',
                    maxWidth: '320px',
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  {/* COMPACT TABS */}
                  <div 
                    style={{
                      display: 'flex',
                      background: 'rgba(0, 0, 0, 0.04)'
                    }}
                  >
                  <button 
                      style={{
                        flex: 1,
                        background: activeTab === 'nutrition' ? 'white' : 'transparent',
                        border: 'none',
                        padding: '0.75rem 1rem',
                        fontFamily: 'var(--font-primary)',
                        fontWeight: activeTab === 'nutrition' ? '700' : '600',
                        fontSize: '0.8rem',
                        color: activeTab === 'nutrition' ? '#000' : 'rgba(0, 0, 0, 0.6)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    onClick={() => setActiveTab('nutrition')}
                  >
                    Nutrition
                  </button>
                  <button 
                      style={{
                        flex: 1,
                        background: activeTab === 'details' ? 'white' : 'transparent',
                        border: 'none',
                        padding: '0.75rem 1rem',
                        fontFamily: 'var(--font-primary)',
                        fontWeight: activeTab === 'details' ? '700' : '600',
                        fontSize: '0.8rem',
                        color: activeTab === 'details' ? '#000' : 'rgba(0, 0, 0, 0.6)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    onClick={() => setActiveTab('details')}
                  >
                    Details
                  </button>
                  <button 
                      style={{
                        flex: 1,
                        background: activeTab === 'ingredients' ? 'white' : 'transparent',
                        border: 'none',
                        padding: '0.75rem 1rem',
                        fontFamily: 'var(--font-primary)',
                        fontWeight: activeTab === 'ingredients' ? '700' : '600',
                        fontSize: '0.8rem',
                        color: activeTab === 'ingredients' ? '#000' : 'rgba(0, 0, 0, 0.6)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    onClick={() => setActiveTab('ingredients')}
                  >
                    Ingredients
                  </button>
                </div>

                  {/* COMPACT TAB CONTENT */}
                  <div style={{ padding: '1.5rem' }}>
                  {activeTab === 'nutrition' && (
                      <div 
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '1rem'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          <span 
                            style={{
                              fontFamily: 'var(--font-primary)',
                              fontSize: '0.75rem',
                              color: 'rgba(0, 0, 0, 0.6)',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}
                          >
                            Calories
                          </span>
                          <span 
                            style={{
                              fontFamily: 'var(--font-primary)',
                              fontSize: '1.1rem',
                              color: '#000',
                              fontWeight: '700'
                            }}
                          >
                            60
                          </span>
                      </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          <span 
                            style={{
                              fontFamily: 'var(--font-primary)',
                              fontSize: '0.75rem',
                              color: 'rgba(0, 0, 0, 0.6)',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}
                          >
                            Sugar
                          </span>
                          <span 
                            style={{
                              fontFamily: 'var(--font-primary)',
                              fontSize: '1.1rem',
                              color: '#000',
                              fontWeight: '700'
                            }}
                          >
                            12g
                          </span>
                      </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          <span 
                            style={{
                              fontFamily: 'var(--font-primary)',
                              fontSize: '0.75rem',
                              color: 'rgba(0, 0, 0, 0.6)',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}
                          >
                            Protein
                          </span>
                          <span 
                            style={{
                              fontFamily: 'var(--font-primary)',
                              fontSize: '1.1rem',
                              color: '#000',
                              fontWeight: '700'
                            }}
                          >
                            0g
                          </span>
                      </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          <span 
                            style={{
                              fontFamily: 'var(--font-primary)',
                              fontSize: '0.75rem',
                              color: 'rgba(0, 0, 0, 0.6)',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}
                          >
                            ABV
                          </span>
                          <span 
                            style={{
                              fontFamily: 'var(--font-primary)',
                              fontSize: '1.1rem',
                              color: '#000',
                              fontWeight: '700'
                            }}
                          >
                            ≤0.5%
                          </span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'details' && (
                      <div 
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '1rem'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          <span 
                            style={{
                              fontFamily: 'var(--font-primary)',
                              fontSize: '0.75rem',
                              color: 'rgba(0, 0, 0, 0.6)',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}
                          >
                            Flavors
                          </span>
                          <span 
                            style={{
                              fontFamily: 'var(--font-primary)',
                              fontSize: '1.1rem',
                              color: '#000',
                              fontWeight: '700'
                            }}
                          >
                            Natural
                          </span>
                      </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          <span 
                            style={{
                              fontFamily: 'var(--font-primary)',
                              fontSize: '0.75rem',
                              color: 'rgba(0, 0, 0, 0.6)',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}
                          >
                            Dyes
                          </span>
                          <span 
                            style={{
                              fontFamily: 'var(--font-primary)',
                              fontSize: '1.1rem',
                              color: '#000',
                              fontWeight: '700'
                            }}
                          >
                            None
                          </span>
                      </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          <span 
                            style={{
                              fontFamily: 'var(--font-primary)',
                              fontSize: '0.75rem',
                              color: 'rgba(0, 0, 0, 0.6)',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}
                          >
                            Quality
                          </span>
                          <span 
                            style={{
                              fontFamily: 'var(--font-primary)',
                              fontSize: '1.1rem',
                              color: '#000',
                              fontWeight: '700'
                            }}
                          >
                            Premium
                          </span>
                      </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          <span 
                            style={{
                              fontFamily: 'var(--font-primary)',
                              fontSize: '0.75rem',
                              color: 'rgba(0, 0, 0, 0.6)',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}
                          >
                            Brewing
                          </span>
                          <span 
                            style={{
                              fontFamily: 'var(--font-primary)',
                              fontSize: '1.1rem',
                              color: '#000',
                              fontWeight: '700'
                            }}
                          >
                            Craft
                          </span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'ingredients' && (
                      <div>
                        <p 
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '0.9rem',
                            lineHeight: '1.6',
                            color: '#000',
                            margin: '0',
                            fontWeight: '500'
                          }}
                        >
                          Water, Malted Barley, Hops, Natural Flavors, Yeast, Citric Acid
                        </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

              {/* RIGHT: GAME-LIKE SHOPPABLE PANEL */}
              <GameLikeShoppablePanel
                allProducts={panelProducts}
                currentProduct={{
                  id: selectedProduct.handle,
                  title: selectedProduct.title,
                  handle: selectedProduct.handle,
                  color: selectedProduct.color,
                  series: selectedProduct.series || 'CORE SERIES',
                  description: selectedProduct.description || ''
                }}
                onProductSelect={handleProductSwitch}
              />
          </div>
        </div>
      </div>

        {/* MOBILE LAYOUT */}
        <div 
          className="premium-split-mobile"
        >
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '3rem',
              padding: '2rem 1rem'
            }}
          >
            {/* OVERSIZED MOBILE PRODUCT */}
            <div style={{ textAlign: 'center' }}>
              {/* RESPONSIVE MOBILE TITLE - ARTIST SERIES CLEAN */}
              <h1 
                style={{
                  fontFamily: 'Peridot PE, Inter, sans-serif',
                  fontWeight: '900',
                  fontSize: 'clamp(2.5rem, 10vw, 4.5rem)',
                  lineHeight: '0.88',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.04em',
                  color: '#000',
                  margin: '0 0 clamp(1.5rem, 4vw, 2rem) 0',
                  wordBreak: 'break-word',
                  hyphens: 'auto'
                }}
              >
                {getCleanTitle(product.title, product.series)}
              </h1>
              
              {/* OVERSIZED MOBILE RATING & PRICE */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1.5rem',
                  marginBottom: '3rem'
                }}
              >
                <div style={{ color: '#000', fontSize: '1.3rem', letterSpacing: '0.1em' }}>★★★★★</div>
                <span 
                  style={{
                    fontFamily: 'Peridot PE, Inter, sans-serif',
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    color: '#000'
                  }}
                >
                  $4.99
                </span>
      </div>

              {/* OVERSIZED MOBILE BEER CAN - BIGGER & CENTERED */}
              <div style={{ margin: '3rem 0', display: 'flex', justifyContent: 'center' }}>
          <img 
            src={productImage}
            alt={product.title}
                  style={{
                    width: '380px',
                    height: '570px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.25))',
                    maxWidth: '90vw'
                  }}
          />
        </div>

              {/* OVERSIZED MOBILE DESCRIPTION */}
              <p 
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  color: 'rgba(0, 0, 0, 0.8)',
                  margin: '0 auto 3rem auto',
                  maxWidth: '350px',
                  fontWeight: '400'
                }}
              >
                {product.description}
              </p>

              {/* OVERSIZED MOBILE CTA */}
              <div style={{ margin: '3rem 0' }}>
          <AddToBoxButton
            product={{
              variantId: product.id,
              handle: product.handle,
              title: product.title,
              image: productImage,
              price: 4.99,
              color: product.color
            }}
          />
        </div>

              {/* MOBILE PRODUCT DETAILS CARD */}
              <div 
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                  overflow: 'hidden',
                  margin: '3rem auto 0 auto',
                  maxWidth: '380px'
                }}
              >
                {/* MOBILE TABS */}
                <div 
                  style={{
                    display: 'flex',
                    background: 'rgba(0, 0, 0, 0.05)'
                  }}
                >
            <button 
                    style={{
                      flex: 1,
                      background: activeTab === 'nutrition' ? 'white' : 'transparent',
                      border: 'none',
                      padding: '1rem 0.5rem',
                      fontFamily: 'var(--font-primary)',
                      fontWeight: activeTab === 'nutrition' ? '800' : '600',
                      fontSize: '0.85rem',
                      color: activeTab === 'nutrition' ? '#000' : 'rgba(0, 0, 0, 0.6)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
              onClick={() => setActiveTab('nutrition')}
            >
              Nutrition
            </button>
            <button 
                    style={{
                      flex: 1,
                      background: activeTab === 'details' ? 'white' : 'transparent',
                      border: 'none',
                      padding: '1rem 0.5rem',
                      fontFamily: 'var(--font-primary)',
                      fontWeight: activeTab === 'details' ? '800' : '600',
                      fontSize: '0.85rem',
                      color: activeTab === 'details' ? '#000' : 'rgba(0, 0, 0, 0.6)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
            <button 
                    style={{
                      flex: 1,
                      background: activeTab === 'ingredients' ? 'white' : 'transparent',
                      border: 'none',
                      padding: '1rem 0.5rem',
                      fontFamily: 'var(--font-primary)',
                      fontWeight: activeTab === 'ingredients' ? '800' : '600',
                      fontSize: '0.85rem',
                      color: activeTab === 'ingredients' ? '#000' : 'rgba(0, 0, 0, 0.6)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </button>
          </div>
          
                {/* MOBILE TAB CONTENT */}
                <div style={{ padding: '2rem' }}>
            {activeTab === 'nutrition' && (
                    <div 
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '1.5rem'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <span 
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '0.85rem',
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                        >
                          Calories
                        </span>
                        <span 
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '1.2rem',
                            color: '#000',
                            fontWeight: '800'
                          }}
                        >
                          60
                        </span>
                </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <span 
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '0.85rem',
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                        >
                          Sugar
                        </span>
                        <span 
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '1.2rem',
                            color: '#000',
                            fontWeight: '800'
                          }}
                        >
                          12g
                        </span>
                </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <span 
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '0.85rem',
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                        >
                          Protein
                        </span>
                        <span 
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '1.2rem',
                            color: '#000',
                            fontWeight: '800'
                          }}
                        >
                          0g
                        </span>
                </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <span 
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '0.85rem',
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                        >
                          ABV
                        </span>
                        <span 
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '1.2rem',
                            color: '#000',
                            fontWeight: '800'
                          }}
                        >
                          ≤0.5%
                        </span>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
                    <div 
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '1.5rem'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <span 
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '0.85rem',
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                        >
                          Flavors
                        </span>
                        <span 
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '1.2rem',
                            color: '#000',
                            fontWeight: '800'
                          }}
                        >
                          Natural
                        </span>
                </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <span 
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '0.85rem',
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                        >
                          Dyes
                        </span>
                        <span 
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '1.2rem',
                            color: '#000',
                            fontWeight: '800'
                          }}
                        >
                          None
                        </span>
                </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <span 
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '0.85rem',
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                        >
                          Quality
                        </span>
                        <span 
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '1.2rem',
                            color: '#000',
                            fontWeight: '800'
                          }}
                        >
                          Premium
                        </span>
                </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <span 
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '0.85rem',
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                        >
                          Brewing
                        </span>
                        <span 
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '1.2rem',
                            color: '#000',
                            fontWeight: '800'
                          }}
                        >
                          Craft
                        </span>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
                    <div>
                      <p 
                        style={{
                          fontFamily: 'var(--font-primary)',
                          fontSize: '1rem',
                          lineHeight: '1.7',
                          color: '#000',
                          margin: '0',
                          fontWeight: '500'
                        }}
                      >
                        Water, Malted Barley, Hops, Natural Flavors, Yeast, Citric Acid
                      </p>
              </div>
            )}
          </div>
        </div>
      </div>
          </div>
        </div>
    </section>

    </>
  );
}

export default PDPHeroNew;