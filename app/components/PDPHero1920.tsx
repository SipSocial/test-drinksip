import React from 'react';
import { Link } from 'react-router';
import { AddToBoxButton } from '~/components/AddToBoxButton';
import { useCart } from '~/contexts/CartContext';

interface PDPHero1920Props {
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
  productImage: string;
  onColorChange?: (color: string) => void;
  allProducts?: any[]; // All available products for thumbnails
}

/**
 * ULTRA-LUXURY PDP HERO - 1920x1080 LAYOUT
 * Two-tone split background with centered can, left content, right details & thumbnails
 * Designed for ultra-luxury 1% of 1% aesthetic with magazine-style visuals
 */
export function PDPHero1920({ product, productImage, onColorChange, allProducts = [] }: PDPHero1920Props) {
  const [activeTab, setActiveTab] = React.useState<'nutrition' | 'details' | 'ingredients' | 'reviews'>('nutrition');
  const [rippling, setRippling] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(product);
  const [titleLoaded, setTitleLoaded] = React.useState(false);
  
  // Cart functionality
  const { addItem, totalItems } = useCart();
  

  // Handle adding product to cart
  const handleAddToBox = () => {
    addItem({
      variantId: selectedProduct.id, // Using product id as variant id
      handle: selectedProduct.handle,
      title: selectedProduct.title,
      image: getProductImage(selectedProduct.handle),
      price: 8.99, // Standard price for all products
      color: selectedProduct.color
    });
  };
  
  // Fade title after component loads
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTitleLoaded(true);
    }, 800); // Wait 800ms then fade to background
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate darker color for right side (same color, higher opacity)
  const lighterColor = selectedProduct.color + 'EE'; // EE = ~93% opacity - much darker

  // Clean product title based on series
  const getCleanTitle = (title: string, series?: string) => {
    // Handle specific product name customizations
    if (title.toLowerCase().includes('311') && title.toLowerCase().includes('hazy')) {
      return '311 Hazy IPA'; // Keep 311 in the title but remove x
    }
    if (title.toLowerCase().includes('deftones') && title.toLowerCase().includes('tone zero')) {
      return 'Deftones Lager'; // Shorten Deftones to - Deftones Lager
    }
    
    if (series === 'Artist Series') {
      return title
        .replace(/DrinkSip\s*/gi, '')
        .replace(/Artist Series\s*/gi, '')
        .replace(/\s*Refresher\s*/gi, '')
        .replace(/\s*Series\s*/gi, '')
        .replace(/x/gi, '') // Remove x from any artist series products
        .trim();
    }
    return title.replace(/\s*Refresher\s*/gi, '').replace(/DrinkSip\s*/gi, '').replace(/x/gi, '').trim();
  };

  // Split title into lines for stacking
  const getTitleLines = (title: string, series?: string) => {
    const cleanTitle = getCleanTitle(title, series);
    const words = cleanTitle.split(' ');
    if (words.length >= 2) {
      return words; // Stack each word on its own line
    }
    return [cleanTitle]; // Single word
  };

  // Truncate product names for thumbnails (>20 chars)
  const truncateProductName = (name: string, maxLength: number = 20) => {
    const cleanName = getCleanTitle(name);
    if (cleanName.length <= maxLength) return cleanName;
    return cleanName.substring(0, maxLength - 3) + '...';
  };

  // Handle product switch with ripple animation
  const handleProductSwitch = (newProduct: any) => {
    setRippling(true);
    setTitleLoaded(false); // Reset title to full opacity for new product
    
    setTimeout(() => {
      setSelectedProduct(newProduct);
      if (onColorChange) {
        onColorChange(newProduct.color);
      }
      setTimeout(() => {
        setRippling(false);
        // Start title fade for new product
        setTimeout(() => {
          setTitleLoaded(true);
        }, 400);
      }, 300);
    }, 150);
  };

  // Get descriptive chips for each product
  const getProductChips = (handle: string): string[] => {
    const chipMap: Record<string, string[]> = {
      'hazy-ipa': ['Non-Alcoholic', 'Hoppy', 'Citrus', 'Craft Beer'],
      'watermelon-refresher': ['Refreshing', 'Fruit', 'Summer', 'Light'],
      'blood-orange-refresher': ['Citrus', 'Refreshing', 'Vitamin C', 'Energy'],
      'lemon-lime-refresher': ['Zesty', 'Citrus', 'Refreshing', 'Classic'],
      '311-hazy-ipa': ['Artist Series', 'Hoppy', 'Limited', 'Craft'],
      'deftones-tone-zero-lager': ['Artist Series', 'Smooth', 'Limited', 'Lager']
    };
    return chipMap[handle] || ['Premium', 'Craft', 'Quality', 'Fresh'];
  };

  // Dynamic product image mapping - matches "You may like" section exactly
  const getProductImage = (handle: string): string => {
    const imageMap: Record<string, string> = {
      'hazy-ipa': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Hazy_IPA_0645f5ce-2ec5-4fda-87ee-fb36a4ee4295.png?v=1759017824',
      'watermelon-refresher': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/box-mockup-refresher-watermelon-no-bottom.png?v=1759862531',
      'blood-orange': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Blood_Orange_Refresher_82f1cfff-dfdd-44c5-bb02-6f8e74183f36.png?v=1759017824',
      'blood-orange-refresher': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Blood_Orange_Refresher_82f1cfff-dfdd-44c5-bb02-6f8e74183f36.png?v=1759017824',
      'lemon-lime': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Lemon_Lime_Refresher_9565ca39-8832-48ab-8c6b-bcd0899f87e9.png?v=1759017824',
      'lemon-lime-refresher': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Lemon_Lime_Refresher_9565ca39-8832-48ab-8c6b-bcd0899f87e9.png?v=1759017824',
      '311-hazy-ipa': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/311_Hazy_IPA_607644d9-92cb-4a02-af68-0eb18d34063a.png?v=1759017824',
      'deftones-tone-zero-lager': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Deftones_Tone_Zero_Lager_dcc52426-36ee-42ee-a3b5-b49f7d2d7480.png?v=1759017824',
    };
    return imageMap[handle] || 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Hazy_IPA_0645f5ce-2ec5-4fda-87ee-fb36a4ee4295.png?v=1759017824';
  };

  return (
    <>
      {/* Keyframes for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      
      <section 
        className="pdp-hero-1920"
        style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        paddingTop: '203px', // Header height
        overflow: 'hidden',
        background: 'transparent' // Ensure no parent background interferes
      }}
    >
      {/* TWO-TONE SPLIT BACKGROUND - CLEAR 50/50 SPLIT */}
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
        {/* Left side - Full saturated color */}
        <div style={{ 
          width: '50%', 
          height: '100%', 
          background: selectedProduct.color,
          transition: 'background 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}></div>
        
        {/* Right side - Much lighter/desaturated color with refined white layered shadow */}
        <div style={{ 
          width: '50%', 
          height: '100%', 
          background: lighterColor,
          transition: 'background 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: 'inset 20px 0 40px -15px rgba(255, 255, 255, 0.12)'
        }}></div>

        {/* Ripple animation overlay */}
        {rippling && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '800px',
              height: '800px',
              background: `radial-gradient(circle, ${selectedProduct.color} 0%, transparent 70%)`,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%) scale(0)',
              animation: 'ripple 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              zIndex: 3,
              pointerEvents: 'none',
              opacity: 0.6
            }}
          />
        )}
      </div>

      {/* MAIN CONTENT CONTAINER - EXACT MOCKUP LAYOUT */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          height: 'calc(100vh - 203px)',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'stretch',
          maxWidth: '1920px',
          margin: '0 auto',
          padding: '0 0 clamp(10rem, 16vh, 16rem) 0', // Extra padding for massive background title
          gap: '0'
        }}
      >
        {/* LEFT SIDE - CHIPS, PRICE & BUILD-A-BOX */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 'clamp(2rem, 4vh, 4rem)',
            padding: 'clamp(3rem, 6vh, 6rem)',
            height: '100%',
            alignItems: 'flex-start'
          }}
        >
          {/* DESCRIPTIVE CHIPS */}
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              width: '100%',
              maxWidth: '400px'
            }}
          >
            {getProductChips(selectedProduct.handle).map((chip, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '20px',
                  padding: '0.5rem 1rem',
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap'
                }}
              >
                {chip}
              </div>
            ))}
          </div>

          {/* PRICE */}
          <div>
            <span 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem, 6vw, 6rem)',
                fontWeight: '900',
                color: '#FFFFFF',
                lineHeight: 1,
                letterSpacing: '-0.01em'
              }}
            >
              $8.99
              <span 
                style={{
                  fontSize: '0.4em', // Smaller font for /4pk
                  fontWeight: '600',
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginLeft: '0.2em'
                }}
              >
                /4pk
              </span>
            </span>
          </div>

          {/* ADD 4-PACK TO BOX BUTTON */}
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <button
              onClick={handleAddToBox}
              style={{
                width: '100%',
                padding: '1.5rem 2rem',
                background: 'transparent',
                border: '3px solid #FFFFFF',
                borderRadius: '0',
                color: '#FFFFFF',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                fontWeight: '700',
                fontFamily: 'var(--font-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = selectedProduct.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              ADD 4-PACK TO BOX
            </button>
          </div>

          {/* BUILD-A-BOX PROGRESS */}
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <div 
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '1.5rem 2rem 1rem',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              {/* Header Row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div 
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 0.8)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}
                >
                  BUILD-A-BOX
                </div>
                <div 
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight: '900',
                    color: '#FFFFFF',
                    letterSpacing: '-0.01em'
                  }}
                >
                  {totalItems}<span style={{ 
                    fontSize: '0.6em', 
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontWeight: '900' 
                  }}>/12</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '3px',
                overflow: 'hidden',
                position: 'relative',
                backdropFilter: 'blur(5px)'
              }}>
                <div 
                  style={{
                    width: `${Math.min((totalItems / 12) * 100, 100)}%`,
                    height: '100%',
                    background: totalItems > 0 
                      ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0.6) 100%)'
                      : 'transparent',
                    borderRadius: '3px',
                    transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    boxShadow: totalItems > 0 ? '0 0 8px rgba(255, 255, 255, 0.3)' : 'none'
                  }}
                >
                  {/* Animated shimmer effect */}
                  {totalItems > 0 && (
                    <div 
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
                        animation: 'shimmer 2s ease-in-out infinite',
                        borderRadius: '3px'
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE - PRODUCT CAN CENTERED */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center', // Vertical center
            justifyContent: 'center', // Horizontal center
            height: '100%',
            position: 'relative',
            minWidth: 'clamp(400px, 30vw, 600px)',
            flex: '0 0 auto' // Prevent flex shrinking/growing to maintain centering
          }}
        >
          <img
            src={getProductImage(selectedProduct.handle)}
            alt={selectedProduct.title}
            style={{
              width: 'clamp(400px, 30vw, 550px)',
              height: 'clamp(600px, 70vh, 800px)', // Back to full size since title is at bottom
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 60px rgba(0, 0, 0, 0.3))',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: rippling ? 'scale(1.02)' : 'scale(1)',
              zIndex: 8 // Above background title (zIndex: 5) but below containers (zIndex: 10)
            }}
          />
        </div>

         {/* RIGHT SIDE - UNIFIED CONTAINER */}
         <div 
           style={{
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'center',
             padding: 'clamp(2rem, 4vh, 3rem)',
             height: '100%',
             minWidth: 0,
             width: '100%',
             boxSizing: 'border-box'
           }}
         >
           {/* UNIFIED CONTAINER - DETAILS & THUMBNAILS */}
           <div 
             style={{
               background: `${selectedProduct.color}B3`,
               backdropFilter: 'blur(10px)',
               WebkitBackdropFilter: 'blur(10px)',
               borderRadius: '16px',
               border: '1px solid rgba(255, 255, 255, 0.2)',
               padding: 'clamp(1.5rem, 3vh, 2rem)',
               width: '100%',
               boxSizing: 'border-box',
               position: 'relative',
               display: 'flex',
               flexDirection: 'column',
               gap: 'clamp(1.5rem, 3vh, 2rem)',
               height: '100%'
             }}
           >
             {/* COMPACT DETAILS PANEL */}
             <div 
               style={{
                 flex: '1',
                 display: 'flex',
                 flexDirection: 'column'
               }}
             >
            {/* Compact Tab Navigation */}
            <div 
              style={{
                display: 'flex',
                marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
                background: `${selectedProduct.color}99`,
                borderRadius: '8px',
                padding: '4px',
                gap: '2px'
              }}
            >
              {(['nutrition', 'details', 'ingredients', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1,
                    padding: 'clamp(8px, 1.5vh, 12px) clamp(4px, 1vh, 8px)',
                    border: 'none',
                    borderRadius: '6px',
                    background: activeTab === tab 
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'transparent',
                    color: activeTab === tab 
                      ? '#333333'
                      : 'rgba(255, 255, 255, 0.8)',
                    fontSize: 'clamp(0.65rem, 1.2vh, 0.75rem)',
                    fontWeight: activeTab === tab ? '600' : '500',
                    fontFamily: 'var(--font-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                    }
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Compact Tab Content */}
            <div style={{ 
              minHeight: 'clamp(120px, 20vh, 160px)', 
              width: '100%',
              overflow: 'visible'
            }}>
              {activeTab === 'nutrition' && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 'clamp(0.75rem, 1.5vh, 1rem)',
                  width: '100%'
                }}>
                  {[
                    { label: 'Calories', value: '60', unit: '' },
                    { label: 'Sugar', value: '12', unit: 'g' },
                    { label: 'Protein', value: '0', unit: 'g' },
                    { label: 'ABV', value: '≤0.5', unit: '%' }
                  ].map((item) => (
                    <div 
                      key={item.label}
                      style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        borderRadius: '8px',
                        padding: 'clamp(0.75rem, 1.5vh, 1rem)',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{
                        fontSize: 'clamp(1.2rem, 2.5vh, 1.5rem)',
                        fontWeight: '300',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-display)',
                        marginBottom: '0.25rem',
                        letterSpacing: '-0.01em'
                      }}>
                        {item.value}<span style={{ fontSize: '0.6em', opacity: 0.7 }}>{item.unit}</span>
                      </div>
                      <div style={{
                        fontSize: 'clamp(0.6rem, 1.2vh, 0.7rem)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: '500'
                      }}>
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'details' && (
                <div style={{ 
                  color: 'rgba(255, 255, 255, 0.95)', 
                  lineHeight: 1.5,
                  fontSize: 'clamp(0.75rem, 1.4vh, 0.85rem)'
                }}>
                  <p style={{ margin: '0 0 1rem 0' }}>
                    Premium craft brewing meets modern wellness. Our flagship non-alcoholic beer 
                    delivers bold hop character with real ingredients.
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: 'clamp(0.7rem, 1.3vh, 0.8rem)' }}>
                    <li style={{ marginBottom: '0.25rem' }}>Contains less than 0.5% ABV</li>
                    <li style={{ marginBottom: '0.25rem' }}>Made with premium malted barley</li>
                    <li style={{ marginBottom: '0.25rem' }}>Natural hop extracts</li>
                    <li>No artificial flavors or colors</li>
                  </ul>
                </div>
              )}
              
              {activeTab === 'ingredients' && (
                <div style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: '0.5rem',
                    fontSize: 'clamp(0.7rem, 1.3vh, 0.8rem)'
                  }}>
                    {[
                      'Premium Malted Barley', 'Natural Hop Extracts', 'Pure Filtered Water', 
                      'Craft Brewing Yeast', 'Natural Flavors', 'Citric Acid'
                    ].map((ingredient, index) => (
                      <div 
                        key={ingredient}
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '6px',
                          padding: '0.5rem',
                          fontWeight: '500',
                          color: 'rgba(255, 255, 255, 0.9)'
                        }}
                      >
                        {ingredient}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.95)', padding: '1rem 0' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '0.75rem',
                    gap: '0.5rem'
                  }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[1,2,3,4,5].map((star) => (
                        <span key={star} style={{ color: '#FFD700', fontSize: 'clamp(1rem, 2vh, 1.25rem)' }}>★</span>
                      ))}
                    </div>
                    <span style={{ fontWeight: '600', fontSize: 'clamp(1rem, 2vh, 1.2rem)' }}>4.8</span>
                  </div>
                  <p style={{
                    margin: '0',
                    fontSize: 'clamp(0.7rem, 1.3vh, 0.8rem)',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    Based on 127 reviews
                  </p>
                </div>
              )}
            </div>
            </div>

            {/* SELECT FLAVOR HEADER */}
            <div style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              paddingTop: 'clamp(1rem, 2vh, 1.5rem)',
              marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)'
            }}>
              <h4 style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'clamp(1.1rem, 2.2vh, 1.3rem)',
                fontWeight: '700',
                color: '#FFFFFF',
                margin: '0',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                textAlign: 'center'
              }}>
                Select Flavor
              </h4>
            </div>

            {/* COMPACT THUMBNAILS GRID */}
            <div 
              style={{
                flex: '0 0 auto',
                paddingBottom: 'clamp(0.5rem, 1vh, 0.75rem)'
              }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: 'clamp(0.75rem, 1.5vh, 1rem)',
                width: '100%'
              }}>
                {allProducts.slice(0, 6).map((prod) => {
                  const isCurrent = prod.handle === selectedProduct.handle;
                  return (
                    <div
                      key={prod.handle}
                      onClick={() => !isCurrent && handleProductSwitch(prod)}
                      style={{
                        aspectRatio: '0.85',
                        background: isCurrent ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: 'clamp(0.75rem, 1.5vh, 1.25rem)',
                        cursor: isCurrent ? 'default' : 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 'clamp(0.75rem, 1.5vh, 1rem)',
                        border: isCurrent ? '2px solid rgba(255, 255, 255, 0.6)' : '1px solid rgba(255, 255, 255, 0.2)',
                        boxSizing: 'border-box',
                        position: 'relative',
                        minHeight: 'clamp(140px, 18vh, 160px)'
                      }}
                      onMouseEnter={(e) => {
                        if (!isCurrent) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                          e.currentTarget.style.transform = 'scale(1.02)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isCurrent) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                          e.currentTarget.style.transform = 'scale(1)';
                        }
                      }}
                    >
                      <img
                        src={getProductImage(prod.handle)}
                        alt={prod.title}
                        style={{
                          width: '100%',
                          height: '50%',
                          objectFit: 'contain',
                          opacity: isCurrent ? 1 : 0.8,
                          transition: 'opacity 0.3s ease',
                          flex: '0 0 50%'
                        }}
                      />
                      <div style={{
                        fontSize: 'clamp(0.8rem, 1.6vh, 0.95rem)',
                        fontWeight: '600',
                        color: isCurrent ? '#FFFFFF' : 'rgba(255, 255, 255, 0.9)',
                        textAlign: 'center',
                        fontFamily: 'var(--font-primary)',
                        width: '100%',
                        transition: 'color 0.3s ease',
                        lineHeight: 1.2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.25rem',
                        flex: '1',
                        minHeight: '3.5rem'
                      }}>
                        {(() => {
                          const titleWords = truncateProductName(prod.title, 10).split(' ');
                          return titleWords.length > 1 ? (
                            titleWords.map((word, index) => (
                              <div key={index} style={{ margin: 0 }}>
                                {word}
                              </div>
                            ))
                          ) : (
                            <div>{titleWords[0]}</div>
                          );
                        })()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MASSIVE BACKGROUND TITLE - BEHIND EVERYTHING */}
      <div 
        style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 4vh, 4rem)', // Lower positioning
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 5, // Behind image (zIndex: 5) and containers (zIndex: 10)
          textAlign: 'center',
          width: '100%',
          overflow: 'hidden' // Prevent text from extending beyond container
        }}
      >
        <h1 
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: '900', // Black weight for Peridot
            fontSize: 'clamp(8rem, 16vw, 18rem)', // 2x bigger - massive background text
            lineHeight: '1',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            margin: '0',
            textAlign: 'center',
            whiteSpace: 'nowrap', // Keep it single line
            transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth, slow fade transition
            transform: rippling ? 'scale(1.02)' : 'scale(1)', // Sync with can animation
            opacity: titleLoaded ? 0.4 : 1, // Start full white, fade to subtle background
            userSelect: 'none', // Prevent text selection
            pointerEvents: 'none' // Don't interfere with interactions
          }}
        >
          {getCleanTitle(selectedProduct.title, selectedProduct.series)}
        </h1>
      </div>

      {/* RIPPLE ANIMATION STYLES */}
      <style>{`
        @keyframes ripple {
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

        /* RESPONSIVE ADJUSTMENTS */
        @media (max-width: 1200px) {
          .pdp-hero-1920 > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto auto;
            gap: 3rem !important;
            padding: 2rem 1rem !important;
          }
          
          .pdp-hero-1920 > div:nth-child(2) > div:nth-child(2) {
            order: 1;
          }
          
          .pdp-hero-1920 > div:nth-child(2) > div:nth-child(1) {
            order: 2;
            text-align: center;
          }
          
          .pdp-hero-1920 > div:nth-child(2) > div:nth-child(3) {
            order: 3;
          }
        }

        @media (max-width: 768px) {
          .pdp-hero-1920 {
            padding-top: 120px !important;
          }
          
          .pdp-hero-1920 > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
    </>
  );
}

export default PDPHero1920;
