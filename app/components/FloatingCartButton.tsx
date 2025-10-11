import { useState, useEffect } from 'react';

interface FloatingCartButtonProps {
  itemCount: number;
  onClick: () => void;
}

export function FloatingCartButton({ itemCount, onClick }: FloatingCartButtonProps) {
  const packCount = Math.floor(itemCount / 4); // Convert cans to packs
  
  const [isPulsing, setIsPulsing] = useState(false);
  const [prevPackCount, setPrevPackCount] = useState(packCount);

  // Pulse animation when pack count increases
  useEffect(() => {
    if (packCount > prevPackCount && packCount > 0) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 1000);
      setPrevPackCount(packCount);
      return () => clearTimeout(timer);
    }
    
    if (packCount !== prevPackCount) {
      setPrevPackCount(packCount);
    }
  }, [packCount, prevPackCount]);

  // Don't render if no packs in cart
  if (packCount === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9997,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '1rem'
      }}
    >
      {/* Status Chip - Changes based on full/partial */}
      {packCount >= 3 ? (
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '24px',
            padding: '14px 28px',
            boxShadow: '0 6px 24px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#FFFFFF',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            animation: 'chipPulse 1.5s ease-in-out infinite',
            whiteSpace: 'nowrap'
          }}
        >
          ✓ Ready to Checkout
        </div>
      ) : (
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '24px',
            padding: '12px 24px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#FFFFFF',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            animation: isPulsing ? 'chipPulse 0.6s ease-out' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>MY BOX</span>
          <span style={{
            fontSize: '1.1em',
            fontWeight: 900,
            color: '#FFFFFF'
          }}>
            {packCount}/3
          </span>
          <span style={{
            fontSize: '0.75em',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            PACKS
          </span>
        </div>
      )}

      {/* Box Button */}
      <button
        onClick={onClick}
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          animation: isPulsing ? 'cartPulse 0.6s ease-out' : 'none',
          position: 'relative'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.3)';
        }}
      >
        {/* Isometric Box Icon - Same as Header */}
        <svg 
          width="60" 
          height="60" 
          viewBox="0 0 60 60" 
          fill="none"
          style={{ 
            position: 'relative', 
            zIndex: 2,
            filter: packCount > 0 ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))' : 'none',
            transition: 'filter 0.4s ease'
          }}
        >
          {/* Cardboard box gradients */}
          <defs>
            {/* Top face gradient - lightest */}
            <linearGradient id="topGradientFloat" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4A574" />
              <stop offset="100%" stopColor="#C89968" />
            </linearGradient>
            
            {/* Left face gradient - darkest */}
            <linearGradient id="leftGradientFloat" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A67C52" />
              <stop offset="100%" stopColor="#8B6840" />
            </linearGradient>
            
            {/* Right face gradient - medium */}
            <linearGradient id="rightGradientFloat" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C89968" />
              <stop offset="100%" stopColor="#B08555" />
            </linearGradient>
            
            {/* Flare effect for subtle shine */}
            <radialGradient id="flareGradientFloat" cx="50%" cy="30%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            
            {/* Fill gradient */}
            <linearGradient id="fillGradientFloat" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#F4C430" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#FFD700" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFA500" stopOpacity="0.3" />
            </linearGradient>
            
            {/* Clip path for left face */}
            <clipPath id="leftFaceClipFloat">
              <path d="M15 23 L15 43 L30 51 L30 31 Z"/>
            </clipPath>
            
            {/* Clip path for right face */}
            <clipPath id="rightFaceClipFloat">
              <path d="M30 31 L30 51 L45 43 L45 23 Z"/>
            </clipPath>
          </defs>
          
          {/* Top face (diamond shape) */}
          <path 
            d="M30 15 L45 23 L30 31 L15 23 Z"
            fill="url(#topGradientFloat)"
            fillOpacity={packCount > 0 ? "1" : "0.7"}
            stroke="#A67C52"
            strokeWidth="2.5"
            strokeOpacity={packCount > 0 ? "1" : "0.7"}
            strokeLinejoin="round"
            style={{ transition: 'all 0.4s ease' }}
          />
          
          {/* Left face (darker) */}
          <path 
            d="M15 23 L15 43 L30 51 L30 31 Z"
            fill="url(#leftGradientFloat)"
            fillOpacity={packCount > 0 ? "1" : "0.7"}
            stroke="#8B6840"
            strokeWidth="2.5"
            strokeOpacity={packCount > 0 ? "1" : "0.7"}
            strokeLinejoin="round"
            style={{ transition: 'all 0.4s ease' }}
          />
          
          {/* Right face (lighter - angled towards viewer) */}
          <path 
            d="M30 31 L30 51 L45 43 L45 23 Z"
            fill="url(#rightGradientFloat)"
            fillOpacity={packCount > 0 ? "1" : "0.7"}
            stroke="#A67C52"
            strokeWidth="2.5"
            strokeOpacity={packCount > 0 ? "1" : "0.7"}
            strokeLinejoin="round"
            style={{ transition: 'all 0.4s ease' }}
          />
          
          {/* Filling level indicator - contained within box */}
          {packCount > 0 && (
            <>
              {/* Fill on left face */}
              <path 
                d={`M15 ${43 - (packCount / 3) * 20} L15 43 L30 51 L30 ${51 - (packCount / 3) * 20} Z`}
                fill="url(#fillGradientFloat)"
                clipPath="url(#leftFaceClipFloat)"
                style={{ 
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
              
              {/* Fill on right face */}
              <path 
                d={`M30 ${51 - (packCount / 3) * 20} L30 51 L45 43 L45 ${43 - (packCount / 3) * 20} Z`}
                fill="url(#fillGradientFloat)"
                clipPath="url(#rightFaceClipFloat)"
                style={{ 
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
              
              {/* Subtle shine overlay */}
              <circle 
                cx="30" 
                cy="28" 
                r="18" 
                fill="url(#flareGradientFloat)"
                style={{ 
                  animation: 'flareAnimation 2s ease-in-out infinite',
                  opacity: 0.5
                }}
              />
            </>
          )}
        </svg>

        {/* Pack Count Badge */}
        {packCount > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#000000',
              border: '3px solid #FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.95rem',
              fontWeight: 900,
              color: '#FFFFFF',
              animation: isPulsing ? 'badgePop 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)' : 'none',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}
          >
            {packCount}
          </div>
        )}
      </button>

      <style>{`
        @keyframes cartPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes chipPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
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
        
        @keyframes flareAnimation {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        /* Mobile Adjustments */
        @media (max-width: 767px) {
          button {
            width: 80px !important;
            height: 80px !important;
          }
        }
      `}</style>
    </div>
  );
}
