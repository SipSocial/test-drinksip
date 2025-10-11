import { useState } from 'react';
import { useCart } from '~/contexts/CartContext';

interface AddToBoxButtonProps {
  product: {
    variantId: string;
    handle: string;
    title: string;
    image: string;
    price: number;
    color: string;
  };
}

export function AddToBoxButton({ product }: AddToBoxButtonProps) {
  const { addItem, totalPacks, items, openDrawer } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const BOX_SIZE = 3; // 3 packs per box
  const PACK_SIZE = 4; // 4 cans per pack
  const packsInBox = totalPacks;
  const isBoxFull = packsInBox >= BOX_SIZE;
  const progressPercent = Math.min((packsInBox / BOX_SIZE) * 100, 100);
  const packsRemaining = BOX_SIZE - packsInBox;
  
  // Calculate if this product is already in cart
  const productInCart = items.find(item => item.variantId === product.variantId);
  const productQuantity = productInCart ? productInCart.quantity : 0;

  const handleAddToBox = () => {
    if (isBoxFull) {
      openDrawer();
      return;
    }

    setIsAdding(true);
    
    addItem({
      variantId: product.variantId,
      handle: product.handle,
      title: product.title,
      image: product.image,
      price: product.price,
      color: product.color
    });

    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 300);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%'
      }}
    >
      {/* Main CTA Button */}
      <button
        onClick={handleAddToBox}
        disabled={isAdding}
        style={{
          width: '100%',
          padding: '1.5rem 2rem',
          background: showSuccess ? '#FFFFFF' : 'rgba(255, 255, 255, 0.15)',
          border: `2px solid #FFFFFF`,
          borderRadius: 0,
          color: '#FFFFFF',
          fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
          fontWeight: 700,
          fontFamily: 'Inter, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          cursor: isAdding ? 'default' : 'pointer',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          transform: isAdding ? 'scale(0.98)' : 'scale(1)',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
        }}
        onMouseEnter={(e) => {
          if (!isAdding) {
            e.currentTarget.style.background = '#FFFFFF';
            e.currentTarget.style.color = product.color;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 8px 24px rgba(255, 255, 255, 0.3)`;
          }
        }}
        onMouseLeave={(e) => {
          if (!isAdding && !showSuccess) {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
          }
        }}
      >
        {showSuccess 
          ? '✓ Added to Box' 
          : isBoxFull 
          ? 'View Your Box' 
          : productQuantity > 0
          ? 'Add Another 4-Pack'
          : 'Add 4-Pack to Box'
        }
      </button>

      {/* Compact Build-a-Box Progress */}
      <div
        style={{
          marginTop: '1.5rem',
          padding: '1.5rem',
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Compact Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: totalCans > 0 ? '1rem' : '0'
          }}
        >
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            Build-a-Box
          </div>
          <div
            style={{
              fontFamily: 'Peridot PE, Inter, sans-serif',
              fontSize: '1.1rem',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.01em'
            }}
          >
            {packsInBox}<span style={{ 
              fontSize: '0.7em', 
              color: 'rgba(255, 255, 255, 0.6)',
              fontWeight: 600 
            }}>/3 PACKS</span>
          </div>
        </div>

        {/* Compact Progress Bar */}
        {packsInBox > 0 && (
          <>
            <div
              style={{
                height: '4px',
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '2px',
                position: 'relative',
                marginBottom: '0.75rem',
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
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '2px',
                  transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            </div>

            {/* Compact Status */}
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.8)',
                textAlign: 'center'
              }}
            >
              {packsInBox >= BOX_SIZE 
                ? 'Box Full — Ready to Checkout' 
                : `${packsRemaining} more pack${packsRemaining > 1 ? 's' : ''} to complete`
              }
            </div>
          </>
        )}

        {/* View Box Link - Only show if items in cart */}
        {packsInBox > 0 && (
          <button
            onClick={openDrawer}
            style={{
              marginTop: '1rem',
              width: '100%',
              padding: '0.75rem',
              background: 'transparent',
              border: `1px solid rgba(255, 255, 255, 0.2)`,
              borderRadius: '8px',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.75rem',
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `rgba(255, 255, 255, 0.1)`;
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = `rgba(255, 255, 255, 0.2)`;
            }}
          >
            View Box →
          </button>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
}