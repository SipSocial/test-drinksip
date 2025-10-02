import { Link } from 'react-router';
import React from 'react';

interface WhiteHeaderProps {
  backgroundColor?: string;
}

export function WhiteHeader({ backgroundColor = '#000' }: WhiteHeaderProps) {
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

  const isLight = isLightBackground(backgroundColor);
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
            src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Logo-20.png?v=1735858463"
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
