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
  const { totalItems, openDrawer } = useCart();
  
  
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
          background: ${backgroundColor} !important;
          background-color: ${backgroundColor} !important;
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
          textDecoration: 'none'
        }}>
          <img 
            src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/DrinkSip_Logo_SVG.svg?v=1759624477"
            alt="DrinkSip Logo"
            style={{
              height: '120px', // Bigger logo
              width: 'auto'
            }}
          />
        </Link>
      </div>

      {/* Navigation Pill - Center (Same as Homepage) */}
      <div style={{
        position: 'absolute',
        top: '68px', // Centered in the 203px tall header
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: 'auto'
      }}>
        <div style={{
          background: pillBackgroundColor,
          backdropFilter: 'blur(20px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
          borderRadius: '30px',
          border: `1px solid ${pillBorderColor}`,
          padding: '12px 30px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
        }}>
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <Link to="/collections/core-series" style={{
              color: textColor,
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '10px 20px',
              borderRadius: '20px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              textShadow: isLight ? '0 1px 2px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.5)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>Core Series</Link>
            <Link to="/collections/refresher-series" style={{
              color: textColor,
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '10px 20px',
              borderRadius: '20px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              textShadow: isLight ? '0 1px 2px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.5)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>Refresher Series</Link>
            <Link to="/collections/artist-series" style={{
              color: textColor,
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '10px 20px',
              borderRadius: '20px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              textShadow: isLight ? '0 1px 2px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.5)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>Artist Series</Link>
          </nav>
        </div>
      </div>

      {/* Action Buttons - Right Side (Same as Homepage) */}
      <div style={{
        position: 'absolute',
        top: '68px', // Centered in the 203px tall header
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
            animation: totalItems > 0 ? 'subtleShake 2s ease-in-out infinite' : 'none',
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
          {/* Clean Shopping Box Icon */}
          <div style={{ position: 'relative' }}>
            <svg 
              width="44" 
              height="44" 
              viewBox="0 0 28 28" 
              fill="none" 
              style={{ position: 'relative', zIndex: 2 }}
            >
              {/* Minimalist Container - Ultra Clean */}
              
              {/* Main Container */}
              <rect 
                x="4" 
                y="8" 
                width="20" 
                height="16" 
                rx="3" 
                fill={totalItems > 0 ? '#4ECDC4' : textColor}
                fillOpacity={totalItems > 0 ? "0.12" : "0.06"}
                stroke={totalItems > 0 ? '#4ECDC4' : textColor}
                strokeWidth="2.5"
                strokeOpacity={totalItems > 0 ? "0.8" : "0.4"}
                style={{ transition: 'all 0.3s ease' }}
              />
              
              {/* Container Lid/Top */}
              <rect 
                x="6" 
                y="6" 
                width="16" 
                height="4" 
                rx="2" 
                fill={totalItems > 0 ? '#4ECDC4' : textColor}
                fillOpacity={totalItems > 0 ? "0.2" : "0.1"}
                stroke={totalItems > 0 ? '#4ECDC4' : textColor}
                strokeWidth="2"
                strokeOpacity={totalItems > 0 ? "0.7" : "0.3"}
                style={{ transition: 'all 0.3s ease' }}
              />
              
              {/* Progress Fill */}
              <rect 
                x="6" 
                y="20" 
                width={`${Math.min((totalItems / 12) * 16, 16)}`}
                height="2" 
                rx="1" 
                fill={totalItems > 0 ? '#4ECDC4' : 'transparent'}
                opacity={totalItems > 0 ? "0.8" : "0"}
                style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
              
              {/* Minimal Indicator Dots */}
              <circle 
                cx="10" 
                cy="16" 
                r="1" 
                fill={totalItems >= 3 ? '#4ECDC4' : 'rgba(255,255,255,0.3)'}
                style={{ transition: 'fill 0.3s ease' }}
              />
              <circle 
                cx="14" 
                cy="16" 
                r="1" 
                fill={totalItems >= 6 ? '#4ECDC4' : 'rgba(255,255,255,0.3)'}
                style={{ transition: 'fill 0.3s ease' }}
              />
              <circle 
                cx="18" 
                cy="16" 
                r="1" 
                fill={totalItems >= 9 ? '#4ECDC4' : 'rgba(255,255,255,0.3)'}
                style={{ transition: 'fill 0.3s ease' }}
              />
            </svg>
          
          {/* "TRY ME" Chip - Only when empty */}
          {totalItems === 0 && (
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '-72px',
              background: productColor 
                ? `linear-gradient(135deg, ${productColor} 0%, ${productColor}CC 100%)`
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '18px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '700',
              color: '#FFFFFF',
              boxShadow: productColor 
                ? `0 2px 8px ${productColor}4D`
                : '0 2px 8px rgba(102, 126, 234, 0.3)',
              whiteSpace: 'nowrap',
              animation: 'ecommerceShake 3s ease-in-out infinite',
              zIndex: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              TRY ME
            </div>
          )}
        </div>
          
          {/* Progress Indicator */}
          <div style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: totalItems > 0 ? 'linear-gradient(135deg, #FF6B6B, #FF8E53)' : 'rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '900',
            color: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            animation: totalItems > 0 ? 'pulse 1.5s ease-in-out infinite alternate' : 'none'
          }}>
            {totalItems}
          </div>
          
          {/* Fill Level Indicator */}
          <div style={{
            position: 'absolute',
            bottom: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '3px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${Math.min((totalItems / 12) * 100, 100)}%`,
              height: '100%',
              background: totalItems > 0 
                ? 'linear-gradient(90deg, #4ECDC4, #44A08D)' 
                : 'transparent',
              borderRadius: '2px',
              transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              animation: totalItems > 0 ? 'shimmer 2s ease-in-out infinite' : 'none'
            }} />
          </div>
        </div>
        
        <Link to="/pages/partners" style={{
          padding: '12px 30px',
          borderRadius: '30px',
          border: `1px solid ${buttonBorderColor1}`,
          background: buttonBackgroundColor1,
          color: textColor,
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '1rem',
          transition: 'all 0.2s ease',
          whiteSpace: 'nowrap',
          textShadow: isLight ? '0 1px 2px rgba(0, 0, 0, 0.1)' : '0 1px 2px rgba(0, 0, 0, 0.3)',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>PARTNERS</Link>
        
        <Link to="/pages/where-to-buy" style={{
          padding: '8px 20px',
          borderRadius: '25px',
          border: `1px solid ${buttonBorderColor2}`,
          background: buttonBackgroundColor2,
          color: textColor,
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '0.85rem',
          transition: 'all 0.2s ease',
          whiteSpace: 'nowrap',
          textShadow: isLight ? '0 1px 2px rgba(0, 0, 0, 0.1)' : '0 1px 2px rgba(0, 0, 0, 0.3)',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>WHERE TO BUY</Link>
      </div>
    </>
  );
}
