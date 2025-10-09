import { useState, useEffect } from 'react';

interface FloatingCartButtonProps {
  itemCount: number;
  onClick: () => void;
}

export function FloatingCartButton({ itemCount, onClick }: FloatingCartButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  // Show button when items are added
  useEffect(() => {
    if (itemCount > 0) {
      setIsVisible(true);
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  if (!isVisible && itemCount === 0) return null;

  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #E8B122 0%, #F0C14B 100%)',
        border: '3px solid #000000',
        boxShadow: '0 10px 40px rgba(232, 177, 34, 0.5), 0 0 0 0 rgba(232, 177, 34, 0.7)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9997,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        animation: isPulsing ? 'cartPulse 0.6s ease-out' : 'none',
        transform: isVisible ? 'scale(1)' : 'scale(0)',
        opacity: isVisible ? 1 : 0
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.15) rotate(5deg)';
        e.currentTarget.style.boxShadow = '0 15px 50px rgba(232, 177, 34, 0.7), 0 0 0 10px rgba(232, 177, 34, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
        e.currentTarget.style.boxShadow = '0 10px 40px rgba(232, 177, 34, 0.5), 0 0 0 0 rgba(232, 177, 34, 0.7)';
      }}
    >
      {/* Cart Icon - Box Symbol */}
      <div
        style={{
          position: 'relative',
          fontSize: '2rem',
          fontWeight: 900,
          color: '#000000'
        }}
      >
        □
      </div>

      {/* Item Count Badge */}
      {itemCount > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#000000',
            border: '3px solid #E8B122',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            fontWeight: 900,
            color: '#FFFFFF',
            animation: isPulsing ? 'badgePop 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)' : 'none'
          }}
        >
          {itemCount}
        </div>
      )}

      <style>{`
        @keyframes cartPulse {
          0% {
            transform: scale(1);
            box-shadow: 0 10px 40px rgba(232, 177, 34, 0.5), 0 0 0 0 rgba(232, 177, 34, 0.7);
          }
          50% {
            transform: scale(1.2);
            box-shadow: 0 15px 50px rgba(232, 177, 34, 0.7), 0 0 0 20px rgba(232, 177, 34, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 10px 40px rgba(232, 177, 34, 0.5), 0 0 0 0 rgba(232, 177, 34, 0);
          }
        }

        @keyframes badgePop {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }

        /* Mobile Adjustments */
        @media (max-width: 767px) {
          button {
            bottom: 1.5rem !important;
            right: 1.5rem !important;
            width: 60px !important;
            height: 60px !important;
          }
        }
      `}</style>
    </button>
  );
}
