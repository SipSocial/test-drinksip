import { useState, useEffect } from 'react';

interface CartItem {
  id: string;
  variantId: string;
  handle: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  color: string;
}

interface ProductInCatalog {
  id: string;
  handle: string;
  title: string;
  image: string;
  price: number;
  color: string;
  series: string;
}

interface BuildABoxCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: (product: Omit<CartItem, 'id' | 'quantity'>) => void;
}

// All available products
const ALL_PRODUCTS: ProductInCatalog[] = [
  {
    id: '1',
    handle: 'hazy-ipa',
    title: 'Hazy IPA',
    image: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Hazy_IPA_0645f5ce-2ec5-4fda-87ee-fb36a4ee4295.png?v=1759017824',
    price: 4.99,
    color: '#E8B122',
    series: 'Core'
  },
  {
    id: '2',
    handle: 'watermelon-refresher',
    title: 'Watermelon Refresher',
    image: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Watermelon_Refresher_e64ca8fe-8af8-43b5-8b3a-d20dc04152c2.png?v=1759017823',
    price: 4.99,
    color: '#F05757',
    series: 'Refresher'
  },
  {
    id: '3',
    handle: 'blood-orange-refresher',
    title: 'Blood Orange Refresher',
    image: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Blood_Orange_Refresher_82f1cfff-dfdd-44c5-bb02-6f8e74183f36.png?v=1759017824',
    price: 4.99,
    color: '#ED5335',
    series: 'Refresher'
  },
  {
    id: '4',
    handle: 'lemon-lime-refresher',
    title: 'Lemon Lime Refresher',
    image: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Lemon_Lime_Refresher_9565ca39-8832-48ab-8c6b-bcd0899f87e9.png?v=1759017824',
    price: 4.99,
    color: '#77C14A',
    series: 'Refresher'
  },
  {
    id: '5',
    handle: '311-hazy-ipa',
    title: '311 Hazy IPA',
    image: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/311_Hazy_IPA_607644d9-92cb-4a02-af68-0eb18d34063a.png?v=1759017824',
    price: 5.99,
    color: '#4A90E2',
    series: 'Artist'
  },
  {
    id: '6',
    handle: 'deftones-tone-zero-lager',
    title: 'Deftones Tone Zero Lager',
    image: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Deftones_Tone_Zero_Lager_dcc52426-36ee-42ee-a3b5-b49f7d2d7480.png?v=1759017824',
    price: 5.99,
    color: '#C0C0C0',
    series: 'Artist'
  }
];

// Helper to adjust color lightness for gradients
function adjustColorLightness(color: string, adjustment: number): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  const adjustComponent = (component: number) => {
    const adjusted = component + adjustment;
    return Math.max(0, Math.min(255, Math.round(adjusted)));
  };
  
  const newR = adjustComponent(r).toString(16).padStart(2, '0');
  const newG = adjustComponent(g).toString(16).padStart(2, '0');
  const newB = adjustComponent(b).toString(16).padStart(2, '0');
  
  return `#${newR}${newG}${newB}`;
}

// Product-specific FOMO messages (matching actual products)
const PRODUCT_MESSAGES: Record<string, string[]> = {
  '1': [ // Hazy IPA
    "Pick Me I'm Bold",
    "All Flavor No Hangover",
    "Wake Up Happy",
    "Craft Beer Done Right"
  ],
  '2': [ // Watermelon
    "Summer In A Can",
    "Pure Refreshment",
    "Taste The Sunshine",
    "Light & Crisp"
  ],
  '3': [ // Blood Orange
    "Citrus Perfection",
    "Bold & Bright",
    "Zesty Goodness",
    "Pure Blood Orange Bliss"
  ],
  '4': [ // Lemon Lime
    "Zesty & Fresh",
    "Crisp Citrus Hit",
    "Lime Time Baby",
    "Refreshingly Tart"
  ],
  '5': [ // 311 Hazy IPA
    "Time To Rock Out",
    "Limited Edition Vibes",
    "For The Culture",
    "Collab Excellence"
  ],
  '6': [ // Deftones Japanese Lager
    "Time To Rock Out",
    "Japanese Craft Vibes",
    "Limited Drop",
    "Art Meets Flavor"
  ]
};

// General top messages
const TOP_MESSAGES = [
  "You Won't Regret This",
  "Smart Choices Only",
  "Your Future Self Says Thanks",
  "Level Up Your Game",
  "This Is Your Sign",
  "Better Choices Start Here",
  "No Hangover No Problem",
  "Crushing It Starts Here"
];

export function BuildABoxCartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onAddItem
}: BuildABoxCartDrawerProps) {
  const [activeView, setActiveView] = useState<'shop' | 'box'>('shop');
  const [isAnimating, setIsAnimating] = useState(false);
  const [boxSize, setBoxSize] = useState<12 | 24 | null>(null);
  const [showSizeSelection, setShowSizeSelection] = useState(false);
  
  // Product chip animations
  const [productChips, setProductChips] = useState<Record<string, { message: string; show: boolean; side: 'left' | 'right' }>>({});
  
  // Top message - always "Wake Up Happy" with wild animations
  const [topMessagePhase, setTopMessagePhase] = useState<'hidden' | 'drop' | 'stretch' | 'explode' | 'implode'>('hidden');
  const [topMessageColor, setTopMessageColor] = useState('#E8B122');
  const [showWord1, setShowWord1] = useState(true);
  const [showWord2, setShowWord2] = useState(true);
  const [showWord3, setShowWord3] = useState(true);
  
  const BOX_SIZE_CANS = boxSize || 12;
  const BOX_SIZE_PACKS = BOX_SIZE_CANS / 4; // 3 packs for 12 cans, 6 packs for 24 cans
  const PACK_SIZE = 4;
  const totalCans = items.reduce((sum, item) => sum + item.quantity, 0);
  const PRICE_PER_PACK = 8.99;
  const totalPacks = Math.floor(totalCans / PACK_SIZE);
  const progressPercent = Math.min((totalPacks / BOX_SIZE_PACKS) * 100, 100);
  const packsRemaining = BOX_SIZE_PACKS - totalPacks;
  const subtotal = totalPacks * PRICE_PER_PACK;
  const isBoxComplete = totalPacks >= BOX_SIZE_PACKS;

  const handleSelectBoxSize = (size: 12 | 24) => {
    setBoxSize(size);
    setShowSizeSelection(false);
  };

  // Show size selection when drawer opens and no box size selected yet
  useEffect(() => {
    if (isOpen && boxSize === null) {
      // Show selection modal on first open
      setShowSizeSelection(true);
    } else {
      setShowSizeSelection(false);
    }
  }, [isOpen, boxSize]);
  
  // Product chip animation cycle
  useEffect(() => {
    if (!isOpen || activeView !== 'shop') {
      setProductChips({});
      return;
    }
    
    let currentIndex = 0;
    const productIds = ALL_PRODUCTS.map(p => p.id);
    
    const showNextChip = () => {
      const productId = productIds[currentIndex];
      const messages = PRODUCT_MESSAGES[productId] || [];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      const randomSide = Math.random() > 0.5 ? 'left' : 'right';
      
      // Show chip
      setProductChips(prev => ({
        ...prev,
        [productId]: { message: randomMessage, show: true, side: randomSide }
      }));
      
      // Hide after 2.5 seconds
      setTimeout(() => {
        setProductChips(prev => ({
          ...prev,
          [productId]: { ...prev[productId], show: false }
        }));
      }, 2500);
      
      // Move to next product
      currentIndex = (currentIndex + 1) % productIds.length;
    };
    
    // Show first chip immediately
    showNextChip();
    
    // Then cycle every 4 seconds
    const interval = setInterval(showNextChip, 4000);
    
    return () => clearInterval(interval);
  }, [isOpen, activeView]);
  
  // PDP Colors for cycling
  const PDP_COLORS = ['#E8B122', '#F05757', '#ED5335', '#77C14A', '#1E3A8A', '#2D2D2D'];
  
  // NEXT LEVEL "Wake Up Happy" animation sequence
  useEffect(() => {
    if (!isOpen) {
      setTopMessagePhase('hidden');
      setShowWord1(true);
      setShowWord2(true);
      setShowWord3(true);
      return;
    }
    
    const runNextLevelSequence = () => {
      let colorIndex = 0;
      
      // Reset words
      setShowWord1(true);
      setShowWord2(true);
      setShowWord3(true);
      
      // Phase 1: Drop in with liquid bounce
      setTopMessagePhase('drop');
      setTopMessageColor(PDP_COLORS[0]);
      
      // Phase 2: Accordion stretch - words separate
      setTimeout(() => {
        setTopMessagePhase('stretch');
        
        // Color cycling during stretch
        const colorInterval = setInterval(() => {
          colorIndex = (colorIndex + 1) % PDP_COLORS.length;
          setTopMessageColor(PDP_COLORS[colorIndex]);
        }, 180);
        
        setTimeout(() => {
          clearInterval(colorInterval);
        }, 2400);
      }, 1000);
      
      // Phase 3: Explode - words fly apart
      setTimeout(() => {
        setTopMessagePhase('explode');
      }, 3400);
      
      // Phase 4: Words disappear one by one
      setTimeout(() => setShowWord1(false), 3800);
      setTimeout(() => setShowWord2(false), 4000);
      setTimeout(() => setShowWord3(false), 4200);
      
      // Phase 5: Implode back to center and vanish
      setTimeout(() => {
        setTopMessagePhase('implode');
      }, 4400);
      
      // Phase 6: Hide completely
      setTimeout(() => {
        setTopMessagePhase('hidden');
      }, 5000);
    };
    
    // Initial delay, then run first sequence
    setTimeout(runNextLevelSequence, 600);
    
    // Repeat every 8 seconds
    const interval = setInterval(runNextLevelSequence, 8000);
    
    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setTimeout(() => setIsAnimating(false), 500);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Get quantity of a specific product in cart
  const getProductQuantity = (productId: string) => {
    const item = items.find(i => i.variantId === productId);
    return item ? item.quantity : 0;
  };
  
  // Group items by product (combine duplicates)
  const groupedItems = items.reduce((acc, item) => {
    const existingGroup = acc.find(g => g.variantId === item.variantId);
    if (existingGroup) {
      existingGroup.quantity += item.quantity;
      existingGroup.ids.push(item.id);
    } else {
      acc.push({
        ...item,
        ids: [item.id]
      });
    }
    return acc;
  }, [] as Array<CartItem & { ids: string[] }>);
  
  // Handle quantity change for grouped items
  const handleGroupedQuantityChange = (groupedItem: CartItem & { ids: string[] }, newTotalQuantity: number) => {
    if (newTotalQuantity <= 0) {
      // Remove all instances
      groupedItem.ids.forEach(id => onRemoveItem(id));
    } else {
      // Update first item, remove others
      const firstId = groupedItem.ids[0];
      onUpdateQuantity(firstId, newTotalQuantity);
      groupedItem.ids.slice(1).forEach(id => onRemoveItem(id));
    }
  };

  // Handle adding product from catalog
  const handleAddFromCatalog = (product: ProductInCatalog) => {
    if (totalPacks >= BOX_SIZE_PACKS) return;
    
    const existingItem = items.find(item => item.variantId === product.id);
    
    if (existingItem) {
      onUpdateQuantity(existingItem.id, existingItem.quantity + PACK_SIZE);
    } else {
      onAddItem({
        variantId: product.id,
        handle: product.handle,
        title: product.title,
        image: product.image,
        price: product.price,
        color: product.color
      });
    }
  };

  if (!isOpen && !isAnimating) return null;

  // BOX SIZE SELECTION SCREEN
  if (showSizeSelection && isOpen && boxSize === null) {
    return (
      <>
        {/* Backdrop */}
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            zIndex: 9998,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
        />

        {/* Size Selection Modal */}
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(90vw, 600px)',
            background: '#FFFFFF',
            zIndex: 9999,
            padding: 'clamp(2rem, 5vw, 3rem)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
              color: '#222222',
              cursor: 'pointer',
              padding: '0.5rem',
              lineHeight: 1
            }}
          >
            ×
          </button>

          {/* Title */}
          <h2
            style={{
              fontFamily: 'Peridot PE, Inter, sans-serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#222222',
              margin: '0 0 1rem 0',
              letterSpacing: '-0.02em'
            }}
          >
            Select Box Size
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
              color: '#A6A6A6',
              marginBottom: '2.5rem',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Choose how many cans for your custom box
          </p>

          {/* Box Size Options */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {/* 12-Pack */}
            <button
              onClick={() => handleSelectBoxSize(12)}
              style={{
                background: '#FAFAFA',
                border: '2px solid #E5E5E5',
                padding: '2rem 1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#222222';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E5E5';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 900,
                color: '#222222',
                fontFamily: 'Inter, sans-serif'
              }}>
                12
              </div>
              <div style={{
                fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: '#222222',
                letterSpacing: '0.1em',
                fontFamily: 'Inter, sans-serif'
              }}>
                Cans
              </div>
              <div style={{
                fontSize: '0.85rem',
                color: '#A6A6A6',
                fontFamily: 'Inter, sans-serif'
              }}>
                3 Four-Packs
              </div>
            </button>

            {/* 24-Pack */}
            <button
              onClick={() => handleSelectBoxSize(24)}
              style={{
                background: '#FAFAFA',
                border: '2px solid #E5E5E5',
                padding: '2rem 1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#222222';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E5E5';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 900,
                color: '#222222',
                fontFamily: 'Inter, sans-serif'
              }}>
                24
              </div>
              <div style={{
                fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: '#222222',
                letterSpacing: '0.1em',
                fontFamily: 'Inter, sans-serif'
              }}>
                Cans
              </div>
              <div style={{
                fontSize: '0.85rem',
                color: '#A6A6A6',
                fontFamily: 'Inter, sans-serif'
              }}>
                6 Four-Packs
              </div>
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* MOBILE RESPONSIVE STYLES - NO DESKTOP IMPACT */}
      <style>{`
        /* Mobile styles only apply below 768px */
        @media (max-width: 768px) {
          .cart-drawer-main {
            height: 100vh !important;
            border-radius: 0 !important;
          }
          
          .cart-drawer-header {
            padding: 1rem !important;
          }
          
          .cart-drawer-title {
            font-size: 1.5rem !important;
            margin-bottom: 0.75rem !important;
          }
          
          .cart-drawer-close {
            top: 1rem !important;
            right: 1rem !important;
            width: 36px !important;
            height: 36px !important;
            font-size: 1.25rem !important;
          }
          
          .wake-up-happy-container {
            min-height: 50px !important;
            margin-bottom: 0.5rem !important;
          }
          
          .wake-up-happy-container > div {
            font-size: 0.75rem !important;
            padding: 8px 16px !important;
          }
          
          /* Size toggle buttons */
          .cart-drawer-header button[style*="14px 40px"] {
            padding: 10px 24px !important;
            font-size: 0.9rem !important;
          }
          
          /* Tabs */
          .cart-drawer-header > div[style*="borderBottom"] button {
            padding: 0.875rem 0.5rem !important;
            font-size: 0.8rem !important;
          }
          
          /* Content area with products */
          .cart-drawer-main > div[style*="flex: 1"] {
            padding: 1rem !important;
          }
          
          /* Product grid */
          .cart-drawer-main > div[style*="overflowY"] > div[style*="grid"] {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
            padding: 1rem !important;
          }
          
          /* Product cards */
          .cart-drawer-main [style*="aspectRatio"] {
            height: 180px !important;
          }
          
          /* Footer with checkout */
          .cart-drawer-main > div:last-child[style*="borderTop"] {
            padding: 1rem !important;
          }
          
          /* Checkout button */
          .cart-drawer-main button[style*="width: 100%"][style*="padding: 1.25rem"] {
            padding: 1rem 1.5rem !important;
            font-size: 0.95rem !important;
          }
          
          /* Cart items list */
          .cart-drawer-main [style*="maxHeight"][style*="overflowY"] {
            max-height: none !important;
          }
        }
        
        /* Tablet breakpoint for intermediate sizing */
        @media (min-width: 769px) and (max-width: 1024px) {
          .cart-drawer-main {
            height: 95vh !important;
          }
          
          .cart-drawer-header {
            padding: 1.5rem !important;
          }
        }
      `}</style>
      
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          zIndex: 9998,
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
      />

      {/* Main Drawer */}
      <div
        className="cart-drawer-main"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '90vh',
          background: '#FFFFFF',
          zIndex: 9999,
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          className="cart-drawer-header"
          style={{
            padding: '2rem',
            borderBottom: '1px solid #E5E5E5',
            background: '#FFFFFF',
            position: 'relative'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="cart-drawer-close"
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: '#F5F5F5',
              border: 'none',
              fontSize: '1.5rem',
              color: '#222222',
              cursor: 'pointer',
              padding: '0.5rem',
              lineHeight: 1,
              transition: 'all 0.2s ease',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'rotate(90deg)';
              e.currentTarget.style.background = '#E5E5E5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotate(0)';
              e.currentTarget.style.background = '#F5F5F5';
            }}
          >
            ×
          </button>

          {/* Title */}
          <h2
            className="cart-drawer-title"
            style={{
              fontFamily: 'Peridot PE, Inter, sans-serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#222222',
              margin: '0 0 1.5rem 0',
              letterSpacing: '-0.02em'
            }}
          >
            Build Your Box
          </h2>
          
          {/* Wake Up Happy - Wild Animation */}
          <div
            className="wake-up-happy-container"
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1rem',
              minHeight: '80px',
              alignItems: 'center',
              position: 'relative',
              overflow: 'visible'
            }}
          >
            {topMessagePhase !== 'hidden' && (
              <div
                style={{
                  position: 'relative',
                  animation: topMessagePhase === 'drop' ? 'liquidDrop 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'none'
                }}
              >
                <div
                  style={{
                    background: `linear-gradient(135deg, ${topMessageColor} 0%, ${adjustColorLightness(topMessageColor, -30)} 100%)`,
                    color: '#FFFFFF',
                    padding: '12px 24px',
                    borderRadius: '24px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: topMessagePhase === 'stretch' ? '0.25em' : '0.05em',
                    textTransform: 'uppercase',
                    boxShadow: `0 6px 20px ${topMessageColor}40`,
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    transition: 'letter-spacing 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55), all 0.18s ease-in-out',
                    animation: topMessagePhase === 'stretch' ? 'accordionPulse 0.6s ease-in-out infinite' : 'none',
                    display: 'flex',
                    gap: '0.5em'
                  }}
                >
                  {showWord1 && (
                    <span
                      style={{
                        display: 'inline-block',
                        animation: topMessagePhase === 'explode' ? 'explodeWord1 0.6s ease-out forwards' : 'none'
                      }}
                    >
                      WAKE
                    </span>
                  )}
                  {showWord2 && (
                    <span
                      style={{
                        display: 'inline-block',
                        animation: topMessagePhase === 'explode' ? 'explodeWord2 0.6s ease-out forwards' : 'none'
                      }}
                    >
                      UP
                    </span>
                  )}
                  {showWord3 && (
                    <span
                      style={{
                        display: 'inline-block',
                        animation: topMessagePhase === 'explode' ? 'explodeWord3 0.6s ease-out forwards' : 'none'
                      }}
                    >
                      HAPPY
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Box Size Toggle - Centered */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '6px', background: '#F5F5F5', padding: '6px', borderRadius: '12px' }}>
              <button
                onClick={() => handleSelectBoxSize(12)}
                style={{
                  padding: '14px 40px',
                  background: boxSize === 12 ? '#222222' : 'transparent',
                  color: boxSize === 12 ? '#FFFFFF' : '#666666',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'Inter, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
                onMouseEnter={(e) => {
                  if (boxSize !== 12) {
                    e.currentTarget.style.background = '#E5E5E5';
                  }
                }}
                onMouseLeave={(e) => {
                  if (boxSize !== 12) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                12-Pack
              </button>
              <button
                onClick={() => handleSelectBoxSize(24)}
                style={{
                  padding: '14px 40px',
                  background: boxSize === 24 ? '#222222' : 'transparent',
                  color: boxSize === 24 ? '#FFFFFF' : '#666666',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'Inter, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
                onMouseEnter={(e) => {
                  if (boxSize !== 24) {
                    e.currentTarget.style.background = '#E5E5E5';
                  }
                }}
                onMouseLeave={(e) => {
                  if (boxSize !== 24) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                24-Pack
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: '1rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}
            >
              <span
                style={{
                  fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#A6A6A6',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Progress
              </span>
              <span
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  fontWeight: 700,
                  color: '#222222',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                {totalPacks} / {BOX_SIZE_PACKS} <span style={{ fontSize: '0.75em', fontWeight: 600, color: '#999' }}>PACKS</span>
              </span>
            </div>
            
            {/* Progress Bar */}
            <div
              style={{
                height: '6px',
                background: '#F1EFE1',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: `${progressPercent}%`,
                  background: isBoxComplete ? '#32CD32' : '#222222',
                  transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            </div>
          </div>

          {/* Status Text */}
          <div
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: isBoxComplete ? '#32CD32' : '#A6A6A6',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            {isBoxComplete 
              ? '✓ Box Complete — Ready to Checkout' 
              : `${packsRemaining} More Pack${packsRemaining > 1 ? 's' : ''} Needed`
            }
          </div>
        </div>

        {/* View Toggle */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid #E5E5E5',
            background: '#FFFFFF'
          }}
        >
          <button
            onClick={() => setActiveView('shop')}
            style={{
              flex: 1,
              padding: '1.25rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeView === 'shop' ? '2px solid #222222' : '2px solid transparent',
              color: activeView === 'shop' ? '#222222' : '#A6A6A6',
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Shop All
          </button>
          <button
            onClick={() => setActiveView('box')}
            style={{
              flex: 1,
              padding: '1.25rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeView === 'box' ? '2px solid #222222' : '2px solid transparent',
              color: activeView === 'box' ? '#222222' : '#A6A6A6',
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'Inter, sans-serif',
              position: 'relative'
            }}
          >
            Your Box
            {totalPacks > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '1rem',
                  background: '#222222',
                  color: '#FFFFFF',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  gap: '4px',
                  whiteSpace: 'nowrap'
                }}
              >
                {totalPacks}/{BOX_SIZE_PACKS} <span style={{ fontSize: '0.85em', fontWeight: 600 }}>PACKS</span>
              </span>
            )}
          </button>
        </div>

        {/* Content Area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            background: '#FAFAFA'
          }}
        >
          {/* SHOP VIEW */}
          {activeView === 'shop' && (
            <div
              style={{
                padding: '2rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                gap: '1.5rem'
              }}
            >
              {ALL_PRODUCTS.map((product) => {
                const quantityInCart = getProductQuantity(product.id);
                const canAdd = totalPacks < BOX_SIZE_PACKS;

                const chipData = productChips[product.id];
                const showChip = chipData?.show;
                const chipSide = chipData?.side || 'left';
                
                return (
                  <div
                    key={product.id}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E5E5E5',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#222222';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E5E5E5';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Product-specific FOMO chip */}
                    {showChip && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '-12px',
                          [chipSide]: '-12px',
                          zIndex: 10,
                          transform: showChip ? 'scale(1) rotate(-5deg)' : 'scale(0)',
                          opacity: showChip ? 1 : 0,
                          transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                          animation: showChip ? 'chipJitter 0.3s ease-in-out 0.4s' : 'none'
                        }}
                      >
                        <div
                          style={{
                            background: `linear-gradient(135deg, ${product.color} 0%, ${adjustColorLightness(product.color, -20)} 100%)`,
                            color: '#FFFFFF',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            fontFamily: 'Inter, sans-serif',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                            whiteSpace: 'nowrap',
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                          }}
                        >
                          {chipData?.message}
                        </div>
                      </div>
                    )}
                    {/* Product Image */}
                    <div
                      style={{
                        width: '100%',
                        aspectRatio: '1',
                        background: product.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        position: 'relative'
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          padding: '1.5rem'
                        }}
                      />
                      {quantityInCart > 0 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: '#222222',
                            color: '#FFFFFF',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            fontFamily: 'Inter, sans-serif'
                          }}
                        >
                          {quantityInCart}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: '#A6A6A6',
                          marginBottom: '0.5rem',
                          fontFamily: 'Inter, sans-serif'
                        }}
                      >
                        {product.series} Series
                      </div>
                      <h3
                        style={{
                          fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                          fontWeight: 700,
                          color: '#222222',
                          margin: '0 0 0.75rem 0',
                          fontFamily: 'Inter, sans-serif',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {product.title}
                      </h3>
                      <div
                        style={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: '#222222',
                          marginBottom: '1rem',
                          fontFamily: 'Inter, sans-serif'
                        }}
                      >
                        $8.99 <span style={{ fontSize: '0.85rem', color: '#A6A6A6', fontWeight: 600 }}>/ 4pk</span>
                      </div>

                      {/* Add Button */}
                      <button
                        onClick={() => handleAddFromCatalog(product)}
                        disabled={!canAdd}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          background: !canAdd ? '#F1EFE1' : '#222222',
                          border: 'none',
                          color: !canAdd ? '#A6A6A6' : '#FFFFFF',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          cursor: !canAdd ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s ease',
                          fontFamily: 'Inter, sans-serif',
                          marginTop: 'auto'
                        }}
                        onMouseEnter={(e) => {
                          if (canAdd) {
                            e.currentTarget.style.background = product.color;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (canAdd) {
                            e.currentTarget.style.background = '#222222';
                          }
                        }}
                      >
                        {!canAdd ? 'Box Full' : quantityInCart > 0 ? 'Add Another' : 'Add 4-Pack'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* BOX VIEW */}
          {activeView === 'box' && (
            <div style={{ padding: '2rem' }}>
              {groupedItems.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    color: '#A6A6A6'
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>□</div>
                  <h3
                    style={{
                      fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                      fontWeight: 700,
                      color: '#222222',
                      marginBottom: '0.5rem',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    Your Box is Empty
                  </h3>
                  <p style={{ fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}>
                    Start adding 4-packs to build your custom box
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {groupedItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E5E5E5',
                        padding: '1.5rem',
                        display: 'grid',
                        gridTemplateColumns: '80px 1fr auto',
                        gap: '1.5rem',
                        alignItems: 'center'
                      }}
                    >
                      {/* Product Image */}
                      <div
                        style={{
                          width: '80px',
                          height: '80px',
                          background: item.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            padding: '0.5rem'
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div>
                        <h4
                          style={{
                            fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                            fontWeight: 700,
                            color: '#222222',
                            margin: '0 0 0.5rem 0',
                            fontFamily: 'Inter, sans-serif'
                          }}
                        >
                          {item.title}
                        </h4>
                        <div
                          style={{
                            fontSize: '0.9rem',
                            color: '#A6A6A6',
                            fontFamily: 'Inter, sans-serif'
                          }}
                        >
                          {Math.floor(item.quantity / 4)} pack{Math.floor(item.quantity / 4) !== 1 ? 's' : ''} • ${(8.99 * Math.floor(item.quantity / 4)).toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button
                          onClick={() => handleGroupedQuantityChange(item, Math.max(0, item.quantity - PACK_SIZE))}
                          style={{
                            width: '32px',
                            height: '32px',
                            border: '1px solid #E5E5E5',
                            background: '#FFFFFF',
                            color: '#222222',
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            fontFamily: 'Inter, sans-serif'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#222222';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#E5E5E5';
                          }}
                        >
                          −
                        </button>
                        
                        <span
                          style={{
                            fontSize: '1rem',
                            fontWeight: 700,
                            color: '#222222',
                            minWidth: '30px',
                            textAlign: 'center',
                            fontFamily: 'Inter, sans-serif'
                          }}
                        >
                          {Math.floor(item.quantity / 4)}
                        </span>

                        <button
                          onClick={() => handleGroupedQuantityChange(item, item.quantity + PACK_SIZE)}
                          disabled={totalPacks >= BOX_SIZE_PACKS}
                          style={{
                            width: '32px',
                            height: '32px',
                            border: `1px solid ${totalPacks >= BOX_SIZE_PACKS ? '#E5E5E5' : '#E5E5E5'}`,
                            background: '#FFFFFF',
                            color: totalPacks >= BOX_SIZE_PACKS ? '#A6A6A6' : '#222222',
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            cursor: totalPacks >= BOX_SIZE_PACKS ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            fontFamily: 'Inter, sans-serif',
                            opacity: totalPacks >= BOX_SIZE_PACKS ? 0.5 : 1
                          }}
                          onMouseEnter={(e) => {
                            if (totalPacks < BOX_SIZE_PACKS) {
                              e.currentTarget.style.borderColor = '#222222';
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#E5E5E5';
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {totalCans > 0 && (
          <div
            style={{
              padding: '2rem',
              borderTop: '1px solid #E5E5E5',
              background: '#FFFFFF'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}
            >
              <span
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#222222',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Subtotal
              </span>
              <span
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 900,
                  color: '#222222',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <button
              style={{
                width: '100%',
                padding: '1.25rem 2rem',
                background: isBoxComplete ? '#222222' : '#F1EFE1',
                border: 'none',
                color: isBoxComplete ? '#FFFFFF' : '#A6A6A6',
                fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                cursor: isBoxComplete ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                fontFamily: 'Inter, sans-serif'
              }}
              onMouseEnter={(e) => {
                if (isBoxComplete) {
                  e.currentTarget.style.background = '#000000';
                }
              }}
              onMouseLeave={(e) => {
                if (isBoxComplete) {
                  e.currentTarget.style.background = '#222222';
                }
              }}
            >
              {isBoxComplete ? 'Continue to Checkout' : `Add ${packsRemaining} More Pack${packsRemaining > 1 ? 's' : ''}`}
            </button>
          </div>
        )}
      </div>
      
      {/* Chip Animation Styles */}
      <style>{`
        @keyframes chipJitter {
          0%, 100% {
            transform: rotate(-5deg);
          }
          25% {
            transform: rotate(-7deg);
          }
          50% {
            transform: rotate(-3deg);
          }
          75% {
            transform: rotate(-6deg);
          }
        }
        
        @keyframes liquidDrop {
          0% {
            transform: translateY(-100px) scaleY(2) scaleX(0.5);
            opacity: 0;
          }
          40% {
            transform: translateY(10px) scaleY(0.7) scaleX(1.3);
            opacity: 1;
          }
          60% {
            transform: translateY(-5px) scaleY(1.1) scaleX(0.9);
          }
          80% {
            transform: translateY(3px) scaleY(0.95) scaleX(1.05);
          }
          100% {
            transform: translateY(0) scaleY(1) scaleX(1);
            opacity: 1;
          }
        }
        
        @keyframes accordionPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15) rotateZ(5deg);
          }
        }
        
        @keyframes explodeWord1 {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-120px, -80px) rotate(-45deg) scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes explodeWord2 {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(0, -100px) rotate(180deg) scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes explodeWord3 {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(120px, -80px) rotate(45deg) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}