import React, { useState, useEffect } from 'react';
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
  const [activeTab, setActiveTab] = useState<'nutrition' | 'details' | 'ingredients' | 'reviews'>('nutrition');
  const [rippling, setRippling] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(product);
  const [titleLoaded, setTitleLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoveredThumbnail, setHoveredThumbnail] = useState<string | null>(null);
  
  // Keyboard navigation for tabs
  const handleTabKeyDown = (event: React.KeyboardEvent, currentTab: string) => {
    const tabs = ['nutrition', 'details', 'ingredients', 'reviews'] as const;
    const currentIndex = tabs.indexOf(currentTab as any);
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        setActiveTab(tabs[prevIndex]);
        break;
      case 'ArrowRight':
        event.preventDefault();
        const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        setActiveTab(tabs[nextIndex]);
        break;
      case 'Home':
        event.preventDefault();
        setActiveTab(tabs[0]);
        break;
      case 'End':
        event.preventDefault();
        setActiveTab(tabs[tabs.length - 1]);
        break;
    }
  };
  
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
  
  // Sophisticated entrance animations with staggered timing
  useEffect(() => {
    // Initial load animation
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Title fade after all elements are loaded
    const titleTimer = setTimeout(() => {
      setTitleLoaded(true);
    }, 1200); // Increased for better staging
    
    return () => {
      clearTimeout(loadTimer);
      clearTimeout(titleTimer);
    };
  }, []);

  // Advanced image preloading for smooth transitions
  useEffect(() => {
    const img = new Image();
    img.src = getProductImage(selectedProduct.handle);
    img.onload = () => setImageLoaded(true);
  }, [selectedProduct.handle]);

  // Preload all product images on component mount for instant switching
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = allProducts.map((prod) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = getProductImage(prod.handle);
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Don't block on errors
        });
      });
      
      // Load images in batches to avoid overwhelming the network
      const batchSize = 2;
      for (let i = 0; i < imagePromises.length; i += batchSize) {
        const batch = imagePromises.slice(i, i + batchSize);
        await Promise.all(batch);
        // Small delay between batches for better performance
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    };

    if (allProducts.length > 0) {
      preloadImages();
    }
  }, [allProducts]);
  
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

  // Get clean product names for thumbnails (no truncation - show full names)
  const getCleanProductName = (name: string) => {
    return getCleanTitle(name); // Return full clean title without truncation
  };

  // Enhanced product switch with sophisticated animations
  const handleProductSwitch = (newProduct: any) => {
    if (newProduct.handle === selectedProduct.handle) return;
    
    setRippling(true);
    setTitleLoaded(false);
    setImageLoaded(false);
    
    // Preload new product image
    const img = new Image();
    img.src = getProductImage(newProduct.handle);
    
    img.onload = () => {
      setTimeout(() => {
        setSelectedProduct(newProduct);
        if (onColorChange) {
          onColorChange(newProduct.color);
        }
        setImageLoaded(true);
        
        setTimeout(() => {
          setRippling(false);
          // Delayed title fade for premium feel
          setTimeout(() => {
            setTitleLoaded(true);
          }, 600);
        }, 400);
      }, 200);
    };
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
      {/* Enhanced keyframes for premium animations */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fadeInUp {
          0% { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slideInLeft {
          0% { 
            opacity: 0; 
            transform: translateX(-40px); 
          }
          100% { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes scaleIn {
          0% { 
            opacity: 0; 
            transform: scale(0.9); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        @keyframes pulseGlow {
          0%, 100% { 
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.3); 
          }
          50% { 
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.6); 
          }
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
          {/* DESCRIPTIVE CHIPS WITH ENTRANCE ANIMATIONS */}
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
                key={`${selectedProduct.handle}-${index}`}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '20px',
                  padding: '0.5rem 1rem',
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
                  cursor: 'default',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
              >
                {chip}
              </div>
            ))}
          </div>

          {/* PRICE WITH ENTRANCE ANIMATION */}
          <div
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s'
            }}
          >
            <span 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem, 6vw, 6rem)',
                fontWeight: '900',
                color: '#FFFFFF',
                lineHeight: 1,
                letterSpacing: '-0.01em',
                textShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                display: 'inline-block'
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

          {/* ENHANCED ADD 4-PACK TO BOX BUTTON */}
          <div 
            style={{ 
              width: '100%', 
              maxWidth: '400px',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s'
            }}
          >
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
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = selectedProduct.color;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(0.98)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1)';
              }}
            >
              ADD 4-PACK TO BOX
            </button>
          </div>

          {/* ENHANCED BUILD-A-BOX PROGRESS */}
          <div 
            style={{ 
              width: '100%', 
              maxWidth: '400px',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.7s'
            }}
          >
            <div 
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '1.5rem 2rem 1rem',
                borderRadius: '12px',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
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
              filter: `drop-shadow(0 20px 60px rgba(0, 0, 0, 0.3)) ${!imageLoaded ? 'blur(4px)' : 'blur(0px)'}`,
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: rippling 
                ? 'scale(1.02) rotate(0.5deg)' 
                : imageLoaded 
                  ? 'scale(1) rotate(0deg)' 
                  : 'scale(0.95) rotate(0deg)',
              opacity: imageLoaded ? 1 : 0.7,
              zIndex: 8 // Above background title (zIndex: 5) but below containers (zIndex: 10)
            }}
            onLoad={() => setImageLoaded(true)}
            loading="eager" // Prioritize hero image loading
          />
        </div>

         {/* RIGHT SIDE - UNIFIED RESPONSIVE CONTAINER */}
         <div 
           style={{
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'center',
             padding: 'clamp(2rem, 4vh, 3rem)',
             height: '100%',
             width: '100%',
             boxSizing: 'border-box',
             // Ensure this entire side behaves as one cohesive responsive unit
             minWidth: 'clamp(300px, 35vw, 450px)',
             maxWidth: 'clamp(400px, 45vw, 550px)',
             flex: '1 1 auto' // Allow the container to grow/shrink proportionally
           }}
         >
           {/* UNIFIED CONTAINER - DETAILS & THUMBNAILS AS ONE COHESIVE SECTION */}
           <div 
             style={{
               background: `linear-gradient(135deg, ${selectedProduct.color}CC 0%, ${selectedProduct.color}99 50%, ${selectedProduct.color}B3 100%)`,
               backdropFilter: 'blur(20px)',
               WebkitBackdropFilter: 'blur(20px)',
               borderRadius: '20px',
               border: '1px solid rgba(255, 255, 255, 0.25)',
               padding: 'clamp(1.5rem, 3vh, 2rem)',
               width: '100%',
               boxSizing: 'border-box',
               position: 'relative',
               display: 'flex',
               flexDirection: 'column',
               gap: 'clamp(1.5rem, 3vh, 2rem)',
               height: '100%',
               // Ensure details and thumbnails always scale together as one unit
               minHeight: 'clamp(400px, 50vh, 600px)',
               flex: '1 1 auto', // Responsive scaling as one unified section
               boxShadow: `
                 0 20px 40px rgba(0, 0, 0, 0.15),
                 0 8px 16px rgba(0, 0, 0, 0.1),
                 inset 0 1px 0 rgba(255, 255, 255, 0.2),
                 inset 0 -1px 0 rgba(0, 0, 0, 0.1)
               `,
               transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
               opacity: isLoaded ? 1 : 0,
               transform: isLoaded ? 'translateY(0)' : 'translateY(30px)'
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
                background: `linear-gradient(135deg, ${selectedProduct.color}AA 0%, ${selectedProduct.color}77 100%)`,
                borderRadius: '12px',
                padding: '6px',
                gap: '3px',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            >
              {(['nutrition', 'details', 'ingredients', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  role="tab"
                  aria-selected={activeTab === tab}
                  aria-controls={`${tab}-panel`}
                  tabIndex={activeTab === tab ? 0 : -1}
                  style={{
                    flex: 1,
                    padding: 'clamp(8px, 1.5vh, 12px) clamp(4px, 1vh, 8px)',
                    borderRadius: '8px',
                    background: activeTab === tab 
                      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)'
                      : 'transparent',
                    color: activeTab === tab 
                      ? '#333333'
                      : 'rgba(255, 255, 255, 0.8)',
                    fontSize: 'clamp(0.65rem, 1.2vh, 0.75rem)',
                    fontWeight: activeTab === tab ? '700' : '500',
                    fontFamily: 'var(--font-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                    boxShadow: activeTab === tab 
                      ? '0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                      : '0 2px 4px rgba(0, 0, 0, 0.05)',
                    backdropFilter: activeTab === tab ? 'blur(10px)' : 'none',
                    WebkitBackdropFilter: activeTab === tab ? 'blur(10px)' : 'none',
                    border: activeTab === tab ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                    }
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(0.98)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = activeTab === tab ? 'translateY(0) scale(1)' : 'translateY(-1px) scale(1)';
                  }}
                  onKeyDown={(e) => handleTabKeyDown(e, tab)}
                  onFocus={(e) => {
                    if (activeTab !== tab) {
                      e.currentTarget.style.outline = '2px solid rgba(255, 255, 255, 0.6)';
                      e.currentTarget.style.outlineOffset = '2px';
                    }
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Compact Tab Content */}
            <div 
              role="tabpanel"
              id={`${activeTab}-panel`}
              aria-labelledby={`${activeTab}-tab`}
              style={{ 
                minHeight: 'clamp(120px, 20vh, 160px)', 
                width: '100%',
                overflow: 'visible'
              }}
            >
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
              paddingTop: 'clamp(0.75rem, 1.5vh, 1rem)', // Reduced padding to save space
              marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)' // Reduced margin to save space
            }}>
              <h4 style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'clamp(0.95rem, 1.8vh, 1.1rem)', // Slightly smaller to fit better
                fontWeight: '700',
                color: '#FFFFFF',
                margin: '0',
                textTransform: 'uppercase',
                letterSpacing: '0.1em', // Slightly reduced letter spacing
                textAlign: 'center'
              }}>
                Select Flavor
              </h4>
            </div>

            {/* COMPACT THUMBNAILS GRID */}
            <div 
              style={{
                flex: '0 0 auto',
                paddingBottom: 'clamp(0.25rem, 0.5vh, 0.5rem)' // Reduced bottom padding to prevent overflow
              }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: 'clamp(0.5rem, 1vh, 0.75rem)', // Reduced gap to prevent overflow
                width: '100%',
                boxSizing: 'border-box' // Ensure proper sizing
              }}>
                {allProducts.slice(0, 6).map((prod, index) => {
                  const isCurrent = prod.handle === selectedProduct.handle;
                  return (
                    <button
                      key={prod.handle}
                      onClick={() => !isCurrent && handleProductSwitch(prod)}
                      disabled={isCurrent}
                      aria-label={`Switch to ${getCleanProductName(prod.title)}`}
                      aria-current={isCurrent ? 'true' : 'false'}
                      style={{
                        aspectRatio: '0.85',
                        background: isCurrent ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: 'clamp(0.5rem, 1vh, 0.75rem)', // Reduced padding to fit better
                        cursor: isCurrent ? 'default' : 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 'clamp(0.4rem, 0.8vh, 0.6rem)', // Further reduced gap to accommodate larger images
                        border: isCurrent ? '2px solid rgba(255, 255, 255, 0.6)' : '1px solid rgba(255, 255, 255, 0.2)',
                        boxSizing: 'border-box',
                        position: 'relative',
                        minHeight: 'clamp(120px, 15vh, 140px)', // Reduced height to fit within container
                        maxHeight: 'clamp(130px, 16vh, 150px)', // Added max height to prevent overflow
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        boxShadow: isCurrent 
                          ? '0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                          : '0 4px 12px rgba(0, 0, 0, 0.1)',
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                        animationDelay: `${index * 0.05}s`
                      }}
                      onMouseEnter={(e) => {
                        if (!isCurrent) {
                          setHoveredThumbnail(prod.handle);
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                          e.currentTarget.style.transform = 'scale(1.03) translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isCurrent) {
                          setHoveredThumbnail(null);
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                          e.currentTarget.style.transform = 'scale(1) translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        }
                      }}
                      onFocus={(e) => {
                        if (!isCurrent) {
                          e.currentTarget.style.outline = '2px solid rgba(255, 255, 255, 0.8)';
                          e.currentTarget.style.outlineOffset = '2px';
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!isCurrent) {
                          e.currentTarget.style.outline = 'none';
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        }
                      }}
                      onKeyDown={(e) => {
                        if ((e.key === 'Enter' || e.key === ' ') && !isCurrent) {
                          e.preventDefault();
                          handleProductSwitch(prod);
                        }
                      }}
                    >
                      <img
                        src={getProductImage(prod.handle)}
                        alt={prod.title}
                        style={{
                          width: '100%',
                          height: '65%', // Increased from 50% to 65% (1.3x bigger)
                          objectFit: 'contain',
                          opacity: isCurrent ? 1 : 0.8,
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          flex: '0 0 65%', // Increased from 50% to 65% to make image 1.5x bigger
                          filter: hoveredThumbnail === prod.handle 
                            ? 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2)) brightness(1.1)' 
                            : 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))',
                          transform: hoveredThumbnail === prod.handle && !isCurrent 
                            ? 'scale(1.05)' 
                            : 'scale(1)'
                        }}
                        loading="lazy" // Optimize thumbnail loading
                      />
                      <div style={{
                        fontSize: 'clamp(0.75rem, 1.4vh, 0.85rem)', // Slightly smaller font to fit better
                        fontWeight: '600',
                        color: isCurrent ? '#FFFFFF' : 'rgba(255, 255, 255, 0.9)',
                        textAlign: 'center',
                        fontFamily: 'var(--font-primary)',
                        width: '100%',
                        transition: 'color 0.3s ease',
                        lineHeight: 1.1, // Tighter line height to save space
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.15rem', // Reduced gap to save space
                        flex: '1', // Takes remaining space after larger image
                        minHeight: '2rem', // Further reduced to accommodate larger image
                        maxHeight: '2.5rem' // Reduced max height to fit with larger image
                      }}>
                        {(() => {
                          const titleWords = getCleanProductName(prod.title).split(' ');
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
                    </button>
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
            fontSize: 'clamp(2.5rem, 8vw + 1rem, 18rem)', // Advanced clamping: starts smaller, scales more aggressively
            lineHeight: '1',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            margin: '0',
            textAlign: 'center',
            whiteSpace: 'nowrap', // Keep it single line
            transition: 'all 1.4s cubic-bezier(0.4, 0, 0.2, 1)', // Longer, more luxurious transition
            transform: rippling 
              ? 'scale(1.02) translateY(-2px)' 
              : imageLoaded 
                ? 'scale(1) translateY(0px)' 
                : 'scale(0.98) translateY(4px)', // Subtle parallax effect
            opacity: titleLoaded ? 0.35 : imageLoaded ? 0.8 : 1, // More sophisticated fade stages
            userSelect: 'none', // Prevent text selection
            pointerEvents: 'none', // Don't interfere with interactions
            textShadow: titleLoaded 
              ? '0 8px 32px rgba(0, 0, 0, 0.4)' 
              : '0 4px 16px rgba(0, 0, 0, 0.6)', // Dynamic shadow based on state
            willChange: 'transform, opacity' // Optimize for animations
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
