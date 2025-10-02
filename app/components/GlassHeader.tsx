import { Link } from 'react-router';
import { DrinkSipLogo } from './DrinkSipLogo';

export function GlassHeader() {
  return (
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000, 
        height: '203px', // Another 30% increase from 156px
        pointerEvents: 'none' // Allow clicks to pass through to hero
      }}>
      {/* Separate Logo - Left Side (Centered in Taller Header) */}
      <div style={{
        position: 'absolute',
        top: '68px', // Centered in the 203px tall header
        left: '2rem',
        zIndex: 1000,
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'auto' // Enable clicks for logo
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

      {/* Glassmorphic Navigation Header - Center (Series Only) */}
      <div style={{
        position: 'absolute',
        top: '68px', // Centered in the 203px tall header
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: 'auto',
        pointerEvents: 'auto' // Enable clicks for navigation
      }}>
        <header style={{
          background: 'rgba(255, 255, 255, 0.08)', // More subtle background
          backdropFilter: 'blur(20px) saturate(1.4)', // Lighter blur effect
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)', // Safari support
          borderRadius: '30px', // Bigger pill
          border: '1px solid rgba(255, 255, 255, 0.15)', // Much thinner, subtle border
          padding: '12px 30px', // Bigger padding
          height: '50px', // Bigger height
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)' // Much lighter shadow
        }}>
          {/* Navigation - Series Only */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <Link to="/collections/core-series" style={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '10px 20px',
              borderRadius: '20px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' // Text shadow for better readability
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>Core Series</Link>
            <Link to="/collections/refresher-series" style={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '10px 20px',
              borderRadius: '20px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' // Text shadow for better readability
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>Refresher Series</Link>
            <Link to="/collections/artist-series" style={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '10px 20px',
              borderRadius: '20px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' // Text shadow for better readability
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>Artist Series</Link>
          </nav>
        </header>
      </div>

      {/* Action Buttons - Right Side (Same Height as Pill) */}
      <div style={{
        position: 'absolute',
        top: '68px', // Centered in the 203px tall header
        right: '2rem',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        pointerEvents: 'auto' // Enable clicks for buttons
      }}>
        <Link to="/pages/partners" style={{
          padding: '12px 30px', // Bigger padding
          borderRadius: '30px', // Bigger border radius
          border: '1px solid rgba(255, 255, 255, 0.15)', // Much thinner, subtle border
          background: 'rgba(255, 255, 255, 0.08)', // More subtle background
          color: '#fff',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '1rem',
          transition: 'all 0.2s ease',
          whiteSpace: 'nowrap',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)', // Lighter text shadow
          height: '50px', // Bigger height
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>PARTNERS</Link>
        <Link to="/pages/where-to-buy" style={{
          padding: '8px 20px', // SAME refined padding as glassmorphic pill
          borderRadius: '25px', // SAME refined border radius as glassmorphic pill
          border: '1px solid rgba(255, 255, 255, 0.2)', // Slightly more visible for primary button
          background: 'rgba(255, 255, 255, 0.12)', // Slightly more prominent background
          color: '#fff',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '0.85rem',
          transition: 'all 0.2s ease',
          whiteSpace: 'nowrap',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)', // Lighter text shadow
          height: '40px', // EXACT SAME HEIGHT as glassmorphic pill
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>WHERE TO BUY</Link>
      </div>
    </div>
  );
}