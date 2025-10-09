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
  
  const BOX_SIZE = boxSize || 12;
  const PACK_SIZE = 4;
  const totalCans = items.reduce((sum, item) => sum + item.quantity, 0);
  const progressPercent = Math.min((totalCans / BOX_SIZE) * 100, 100);
  const cansRemaining = BOX_SIZE - totalCans;
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isBoxComplete = totalCans >= BOX_SIZE;

  const handleSelectBoxSize = (size: 12 | 24) => {
    setBoxSize(size);
    setShowSizeSelection(false);
  };

  // Show size selection when drawer opens and no box size selected yet
  useEffect(() => {
    if (isOpen && boxSize === null) {
      // If there are already items in cart, skip size selection and use 12-pack
      if (items.length > 0) {
        setBoxSize(12);
        setShowSizeSelection(false);
      } else {
        setShowSizeSelection(true);
      }
    } else if (boxSize !== null) {
      setShowSizeSelection(false);
    }
  }, [isOpen, boxSize, items.length]);

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

  // Handle adding product from catalog
  const handleAddFromCatalog = (product: ProductInCatalog) => {
    if (totalCans + PACK_SIZE > BOX_SIZE) return;
    
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
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
              color: '#222222',
              cursor: 'pointer',
              padding: '0.5rem',
              lineHeight: 1,
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(90deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0)'}
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
              margin: '0 0 1.5rem 0',
              letterSpacing: '-0.02em'
            }}
          >
            Build Your Box
          </h2>

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
                {totalCans} / {BOX_SIZE}
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
              : `${cansRemaining} More Can${cansRemaining > 1 ? 's' : ''} Needed`
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
            {totalCans > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '1rem',
                  background: '#222222',
                  color: '#FFFFFF',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}
              >
                {totalCans}
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
                const canAdd = totalCans + PACK_SIZE <= BOX_SIZE;

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
                        ${product.price.toFixed(2)} <span style={{ fontSize: '0.85rem', color: '#A6A6A6', fontWeight: 600 }}>/ 4pk</span>
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
              {items.length === 0 ? (
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
                  {items.map((item) => (
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
                          {item.quantity} cans • ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - PACK_SIZE))}
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
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + PACK_SIZE)}
                          disabled={totalCans >= BOX_SIZE}
                          style={{
                            width: '32px',
                            height: '32px',
                            border: `1px solid ${totalCans >= BOX_SIZE ? '#E5E5E5' : '#E5E5E5'}`,
                            background: '#FFFFFF',
                            color: totalCans >= BOX_SIZE ? '#A6A6A6' : '#222222',
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            cursor: totalCans >= BOX_SIZE ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            fontFamily: 'Inter, sans-serif',
                            opacity: totalCans >= BOX_SIZE ? 0.5 : 1
                          }}
                          onMouseEnter={(e) => {
                            if (totalCans < BOX_SIZE) {
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
              {isBoxComplete ? 'Continue to Checkout' : `Add ${cansRemaining} More Can${cansRemaining > 1 ? 's' : ''}`}
            </button>
          </div>
        )}
      </div>
    </>
  );
}