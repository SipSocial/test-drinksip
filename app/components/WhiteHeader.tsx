import { Link } from 'react-router';
import React from 'react';
import { useCart } from '~/contexts/CartContext';

interface WhiteHeaderProps {
  backgroundColor?: string;
  forceWhiteText?: boolean;
  productColor?: string;
}

export function WhiteHeader({ backgroundColor = '#000', forceWhiteText = false, productColor }: WhiteHeaderProps) {
  // Cart data for animated box indicator
  const { totalPacks, openDrawer } = useCart();
  
  // Mobile menu state - client-only to avoid hydration issues
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Determine if background is light or dark to set appropriate text colors
  const isLightBackground = (color: string) => {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  const isLight = forceWhiteText ? false : isLightBackground(backgroundColor);
  const textColor = isLight ? '#000' : '#fff';
  const pillBorderColor = isLight ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)';
  const pillBackgroundColor = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';
  const buttonBorderColor1 = isLight ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)';
  const buttonBorderColor2 = isLight ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)';
  const buttonBackgroundColor1 = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';
  const buttonBackgroundColor2 = isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)';

  return (
    <>
      <style>
        {`.white-header-custom {
          background: rgba(255, 255, 255, 0.08) !important;
          background-color: rgba(255, 255, 255, 0.08) !important;
        }
        
        @keyframes subtleShake {
          0%, 100% { transform: translateX(0) translateZ(0); }
          25% { transform: translateX(-1px) translateZ(0); }
          75% { transform: translateX(1px) translateZ(0); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes ecommerceShake {
          0% { transform: translateX(0px) rotate(0deg); }
          2% { transform: translateX(-3px) rotate(-3deg); }
          4% { transform: translateX(3px) rotate(3deg); }
          6% { transform: translateX(-3px) rotate(-2deg); }
          8% { transform: translateX(3px) rotate(2deg); }
          10% { transform: translateX(-2px) rotate(-1deg); }
          12% { transform: translateX(2px) rotate(1deg); }
          14% { transform: translateX(-1px) rotate(-0.5deg); }
          16% { transform: translateX(1px) rotate(0.5deg); }
          18% { transform: translateX(0px) rotate(0deg); }
          100% { transform: translateX(0px) rotate(0deg); }
        }
        
        @keyframes gentlePulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.3);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.4);
          }
        }
        
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        /* ============================================
           MOBILE HEADER - HIDE DESKTOP NAV
           ============================================ */
        @media (max-width: 768px) {
          .white-header-custom {
            height: 60px !important;
          }
          
          /* Mobile logo */
          .white-header-custom + div {
            top: 10px !important;
            left: 1rem !important;
            height: 40px !important;
          }
          
          .white-header-custom + div img {
            height: 40px !important;
          }
          
          /* Hide desktop navigation on mobile */
          .desktop-nav-pill,
          .desktop-action-buttons {
            display: none !important;
          }
          
          /* Show mobile menu button */
          .mobile-menu-button {
            display: flex !important;
          }
          
          /* Mobile menu overlay */
          .mobile-menu-overlay {
            display: block !important;
          }
        }
        
        /* Desktop: hide mobile elements */
        @media (min-width: 769px) {
          .mobile-menu-button,
          .mobile-menu-overlay {
            display: none !important;
          }
        }`}
      </style>
      
      {/* Taller Header Background */}
      <div 
        className="white-header-custom"
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          height: '203px' // Another 30% increase from 156px
        }}>
      </div>

      {/* Logo - Left Side (Same as Homepage) */}
      <div style={{
        position: 'absolute',
        top: '68px', // Centered in the 203px tall header
        left: '2rem',
        zIndex: 1000,
        height: '40px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onMouseEnter={(e) => {
          const img = e.currentTarget.querySelector('img');
          if (img) {
            (img as HTMLElement).style.transform = 'scale(1.02)';
            (img as HTMLElement).style.filter = 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))';
          }
        }}
        onMouseLeave={(e) => {
          const img = e.currentTarget.querySelector('img');
          if (img) {
            (img as HTMLElement).style.transform = 'scale(1)';
            (img as HTMLElement).style.filter = 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))';
          }
        }}>
          <img 
            src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/DrinkSip_Logo_SVG.svg?v=1759624477"
            alt="DrinkSip Logo"
            style={{
              height: '120px', // Bigger logo
              width: 'auto',
              filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </Link>
      </div>

      {/* Navigation Pill - Center (Unified with PDP chips) */}
      <div 
        className="desktop-nav-pill"
        style={{
        position: 'absolute',
        top: '68px', // Centered in the 203px tall header
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: 'auto'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          padding: '12px 30px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <Link to="/collections/core-series" style={{
              color: '#FFFFFF',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '10px 20px',
              borderRadius: '20px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}>Core Series</Link>
            <Link to="/collections/refresher-series" style={{
              color: '#FFFFFF',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '10px 20px',
              borderRadius: '20px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}>Refresher Series</Link>
            <Link to="/collections/artist-series" style={{
              color: '#FFFFFF',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '10px 20px',
              borderRadius: '20px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}>Artist Series</Link>
          </nav>
        </div>
      </div>

      {/* Action Buttons - Right Side (Same as Homepage) */}
      <div 
        className="desktop-action-buttons"
        style={{
        position: 'absolute',
        top: '68px', // Centered in the 203px tall header - aligned with navigation pill
        right: '2rem',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        {/* ANIMATED BUILD-A-BOX INDICATOR */}
        <div 
          onClick={openDrawer}
          style={{
            position: 'relative',
            width: '70px',
            height: '70px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            animation: totalPacks > 0 ? 'subtleShake 2s ease-in-out infinite' : 'none',
            transform: 'translateX(-20px) translateZ(0)', // Move further left + hardware acceleration
            backfaceVisibility: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-20px) scale(1.05) translateZ(0)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(-20px) scale(1) translateZ(0)';
          }}
        >
          {/* Isometric Packaging Cube - Angled Right */}
          <div style={{ position: 'relative' }}>
            <svg 
              width="88" 
              height="88" 
              viewBox="0 0 60 60" 
              fill="none" 
              style={{ 
                position: 'relative', 
                zIndex: 2,
                filter: totalPacks > 0 ? 'drop-shadow(0 4px 12px rgba(166, 124, 82, 0.6))' : 'none',
                transition: 'filter 0.4s ease'
              }}
            >
              {/* Isometric Box Package - Classic 3D View */}
              
              {/* Cardboard box gradients */}
              <defs>
                {/* Top face gradient - lightest */}
                <linearGradient id="topGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4A574" />
                  <stop offset="100%" stopColor="#C89968" />
                </linearGradient>
                
                {/* Left face gradient - darkest */}
                <linearGradient id="leftGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#A67C52" />
                  <stop offset="100%" stopColor="#8B6840" />
                </linearGradient>
                
                {/* Right face gradient - medium */}
                <linearGradient id="rightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C89968" />
                  <stop offset="100%" stopColor="#B08555" />
                </linearGradient>
                
                {/* Flare effect for subtle shine */}
                <radialGradient id="flareGradient" cx="50%" cy="30%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </radialGradient>
              </defs>
              
              {/* Top face (diamond shape) */}
              <path 
                d="M30 15 L45 23 L30 31 L15 23 Z"
                fill="url(#topGradient)"
                fillOpacity={totalPacks > 0 ? "1" : "0.7"}
                stroke="#A67C52"
                strokeWidth="2.5"
                strokeOpacity={totalPacks > 0 ? "1" : "0.7"}
                strokeLinejoin="round"
                style={{ transition: 'all 0.4s ease' }}
              />
              
              {/* Left face (darker) */}
              <path 
                d="M15 23 L15 43 L30 51 L30 31 Z"
                fill="url(#leftGradient)"
                fillOpacity={totalPacks > 0 ? "1" : "0.7"}
                stroke="#8B6840"
                strokeWidth="2.5"
                strokeOpacity={totalPacks > 0 ? "1" : "0.7"}
                strokeLinejoin="round"
                style={{ transition: 'all 0.4s ease' }}
              />
              
              {/* Right face (lighter - angled towards viewer) */}
              <path 
                d="M30 31 L30 51 L45 43 L45 23 Z"
                fill="url(#rightGradient)"
                fillOpacity={totalPacks > 0 ? "1" : "0.7"}
                stroke="#A67C52"
                strokeWidth="2.5"
                strokeOpacity={totalPacks > 0 ? "1" : "0.7"}
                strokeLinejoin="round"
                style={{ transition: 'all 0.4s ease' }}
              />
              
              {/* Filling level indicator - contained within box */}
              {totalPacks > 0 && (
                <>
                  {/* Fill gradient */}
                  <defs>
                    <linearGradient id="fillGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#F4C430" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#FFD700" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#FFA500" stopOpacity="0.3" />
                    </linearGradient>
                    
                    {/* Clip path for left face */}
                    <clipPath id="leftFaceClip">
                      <path d="M15 23 L15 43 L30 51 L30 31 Z"/>
                    </clipPath>
                    
                    {/* Clip path for right face */}
                    <clipPath id="rightFaceClip">
                      <path d="M30 31 L30 51 L45 43 L45 23 Z"/>
                    </clipPath>
                  </defs>
                  
                  {/* Fill on left face */}
                  <path 
                    d={`M15 ${43 - (totalPacks / 3) * 20} L15 43 L30 51 L30 ${51 - (totalPacks / 3) * 20} Z`}
                    fill="url(#fillGradient)"
                    clipPath="url(#leftFaceClip)"
                    style={{ 
                      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                  
                  {/* Fill on right face */}
                  <path 
                    d={`M30 ${51 - (totalPacks / 3) * 20} L30 51 L45 43 L45 ${43 - (totalPacks / 3) * 20} Z`}
                    fill="url(#fillGradient)"
                    clipPath="url(#rightFaceClip)"
                    style={{ 
                      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                  
                  {/* Subtle shine overlay */}
                  <circle 
                    cx="30" 
                    cy="28" 
                    r="18" 
                    fill="url(#flareGradient)"
                    style={{ 
                      animation: 'flareAnimation 2s ease-in-out infinite',
                      opacity: 0.5
                    }}
                  />
                </>
              )}
            </svg>
            
            {/* Add animations */}
            <style>{`
              @keyframes flareAnimation {
                0%, 100% { opacity: 0.4; transform: scale(1); }
                50% { opacity: 0.8; transform: scale(1.05); }
              }
            `}</style>
          
          {/* "BOX FULL - CHECKOUT" Chip - When box is full (3 packs) */}
          {totalPacks >= 3 && (
            <div style={{
              position: 'absolute',
              top: '-14px',
              left: '-120px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '13px',
              fontWeight: '700',
              color: '#FFFFFF',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
              whiteSpace: 'nowrap',
              animation: 'gentlePulse 2s ease-in-out infinite',
              zIndex: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
            }}>
              BOX FULL — CHECKOUT
            </div>
          )}
          
          {/* "TRY ME" Chip - Only when empty */}
          {totalPacks === 0 && (
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '-72px',
              background: '#000000',
              borderRadius: '18px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '700',
              color: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              whiteSpace: 'nowrap',
              animation: 'ecommerceShake 3s ease-in-out infinite',
              zIndex: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              border: '2px solid #000000'
            }}>
              TRY ME
            </div>
          )}
        </div>
          
          {/* Progress Indicator Badge - Shows pack count */}
          <div style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: totalPacks > 0 ? 'linear-gradient(135deg, #FF6B6B, #FF8E53)' : 'rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '900',
            color: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            animation: totalPacks > 0 ? 'pulse 1.5s ease-in-out infinite alternate' : 'none',
            zIndex: 5
          }}>
            {totalPacks}
          </div>
        </div>
        
        <Link 
          to="/pages/partners" 
          style={{
            padding: '12px 30px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.85rem',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
          }}
        >
          PARTNERS
        </Link>
        
        <Link 
          to="/pages/where-to-buy" 
          style={{
            padding: '8px 20px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.85rem',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
          }}
        >
          WHERE TO BUY
        </Link>
      </div>

      {/* ============================================
           MOBILE HAMBURGER BUTTON & MENU
           ============================================ */}
      
      {/* Mobile Hamburger Button - Replaces desktop nav on mobile */}
      <button
        className="mobile-menu-button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        style={{
          position: 'absolute',
          top: '15px',
          right: '1rem',
          zIndex: 1001,
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '12px',
          width: '48px',
          height: '48px',
          display: 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          padding: 0
        }}
      >
        <span style={{
          width: '24px',
          height: '2px',
          background: '#FFFFFF',
          borderRadius: '2px',
          transition: 'all 0.3s ease',
          transform: isMobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none'
        }} />
        <span style={{
          width: '24px',
          height: '2px',
          background: '#FFFFFF',
          borderRadius: '2px',
          transition: 'all 0.3s ease',
          opacity: isMobileMenuOpen ? 0 : 1
        }} />
        <span style={{
          width: '24px',
          height: '2px',
          background: '#FFFFFF',
          borderRadius: '2px',
          transition: 'all 0.3s ease',
          transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none'
        }} />
      </button>

      {/* Mobile Build-a-Box Icon (Always visible) */}
      <div
        onClick={openDrawer}
        style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1001,
          cursor: 'pointer',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          width: '50px',
          height: '50px',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '12px',
          animation: totalPacks > 0 ? 'subtleShake 2s ease-in-out infinite' : 'none'
        }}
        className="mobile-menu-button"
      >
        <svg width="32" height="32" viewBox="0 0 60 60" fill="none">
          <defs>
            <linearGradient id="mobileTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4A574" />
              <stop offset="100%" stopColor="#C89968" />
            </linearGradient>
            <linearGradient id="mobileLeftGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#B88A5A" />
              <stop offset="100%" stopColor="#A67C52" />
            </linearGradient>
            <linearGradient id="mobileRightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C89968" />
              <stop offset="100%" stopColor="#B88A5A" />
            </linearGradient>
          </defs>
          <path d="M30 20 L15 28 L15 43 L30 51 L30 20 Z" fill="url(#mobileLeftGradient)" stroke="#8B6F47" strokeWidth="0.5"/>
          <path d="M30 20 L45 28 L45 43 L30 51 L30 20 Z" fill="url(#mobileRightGradient)" stroke="#8B6F47" strokeWidth="0.5"/>
          <path d="M30 20 L45 28 L30 36 L15 28 Z" fill="url(#mobileTopGradient)" stroke="#8B6F47" strokeWidth="0.5"/>
          {totalPacks > 0 && (
            <path
              d={`M30 ${51 - (totalPacks / 3) * 20} L15 ${43 - (totalPacks / 3) * 20} L15 43 L30 51 Z`}
              fill="url(#mobileLeftGradient)"
              opacity="0.8"
            />
          )}
        </svg>
        {totalPacks > 0 && (
          <div style={{
            position: 'absolute',
            top: '-6px',
            right: '-6px',
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '900',
            color: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}>
            {totalPacks}
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay - Client-only */}
      {isClient && isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="mobile-menu-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 998,
              display: 'none'
            }}
          />

          {/* Mobile Menu Panel */}
          <div
            className="mobile-menu-overlay"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '80vw',
              maxWidth: '400px',
              height: '100vh',
              background: 'rgba(34, 34, 34, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              zIndex: 999,
              display: 'none',
              flexDirection: 'column',
              padding: '5rem 2rem 2rem 2rem',
              overflowY: 'auto',
              animation: 'slideInFromRight 0.3s ease-out',
              boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Mobile Nav Links */}
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <Link 
                to="/collections/core-series" 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  padding: '1rem',
                  borderRadius: '12px',
                  transition: 'all 0.2s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  background: 'rgba(255, 255, 255, 0.05)'
                }}
              >
                Core Series
              </Link>
              
              <Link 
                to="/collections/refresher-series" 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  padding: '1rem',
                  borderRadius: '12px',
                  transition: 'all 0.2s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  background: 'rgba(255, 255, 255, 0.05)'
                }}
              >
                Refresher Series
              </Link>
              
              <Link 
                to="/collections/artist-series" 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  padding: '1rem',
                  borderRadius: '12px',
                  transition: 'all 0.2s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  background: 'rgba(255, 255, 255, 0.05)'
                }}
              >
                Artist Series
              </Link>

              {/* Divider */}
              <div style={{
                height: '1px',
                background: 'rgba(255, 255, 255, 0.1)',
                margin: '1rem 0'
              }} />

              <Link 
                to="/pages/partners" 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  padding: '1rem',
                  borderRadius: '12px',
                  transition: 'all 0.2s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  background: 'rgba(255, 255, 255, 0.05)'
                }}
              >
                Partners
              </Link>
              
              <Link 
                to="/pages/where-to-buy" 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  padding: '1rem',
                  borderRadius: '12px',
                  transition: 'all 0.2s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  background: 'rgba(255, 255, 255, 0.05)'
                }}
              >
                Where to Buy
              </Link>
            </nav>

            {/* Mobile Build-a-Box CTA */}
            <button
              onClick={() => {
                openDrawer();
                setIsMobileMenuOpen(false);
              }}
              style={{
                marginTop: '2rem',
                padding: '1.25rem',
                background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
                border: 'none',
                borderRadius: '16px',
                color: '#FFFFFF',
                fontSize: '1.1rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(255, 107, 107, 0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              Build-a-Box {totalPacks > 0 && `(${totalPacks}/3)`}
            </button>

            {/* Home Link */}
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                marginTop: 'auto',
                paddingTop: '2rem',
                color: 'rgba(255, 255, 255, 0.6)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              ← Back to Home
            </Link>
          </div>
        </>
      )}
    </>
  );
}
