import { useState, useEffect } from 'react';
import { Link } from 'react-router';

interface MobileBodyArmorHeaderProps {
  cart: Promise<any | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

export function MobileBodyArmorHeader({ cart, isLoggedIn, publicStoreDomain }: MobileBodyArmorHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Track scroll for glassmorphic header effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open - BODYARMOR style
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // BODYARMOR-style menu items - EXACT as user requested
  const menuItems = [
    { label: 'CORE SERIES', href: '/collections/core-series', type: 'collection' },
    { label: 'REFRESHER SERIES', href: '/collections/refresher-series', type: 'collection' },
    { label: 'ARTIST SERIES', href: '/collections/artist-series', type: 'collection' },
    { label: 'BUILD-A-BOX', href: '/pages/build-a-box', type: 'page' },
    { label: 'PARTNERS', href: '/pages/partners', type: 'nav' },
    { label: 'WHERE TO BUY', href: '/pages/where-to-buy', type: 'nav' }
  ];

  return (
    <>
      {/* Mobile-Only Display */}
      <style>
        {`
          @media (min-width: 768px) {
            .mobile-bodyarmor-header {
              display: none !important;
            }
          }
        `}
      </style>

      {/* Mobile Header - Transparent Style */}
      <header 
        className="mobile-bodyarmor-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '120px', // Increased to accommodate 3x larger logo
          background: 'transparent', // Fully transparent
          borderBottom: 'none', // Remove border
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          zIndex: 1000,
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
      >
        {/* DrinkSip Logo - MOVED TO LEFT */}
        <Link 
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            WebkitTapHighlightColor: 'transparent',
            marginLeft: '-0.5rem' // Move logo to the left
          }}
        >
          <img 
            src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Logo-20.png?v=1735858463"
            alt="DrinkSip"
            className="mobile-header-logo"
            style={{
              height: '96px', // 3x bigger (32px * 3)
              width: 'auto',
              maxWidth: '360px', // 3x bigger (120px * 3)
              filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.5))'
            }}
          />
        </Link>

        {/* Hamburger Menu Button - BODYARMOR Style */}
        <button
          onClick={toggleMenu}
          style={{
            background: 'none',
            border: 'none',
            width: '30px',
            height: '30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            cursor: 'pointer',
            padding: 0,
            WebkitTapHighlightColor: 'transparent'
          }}
          aria-label="Toggle menu"
        >
          {/* Hamburger Lines with Animation */}
          <span 
            style={{
              width: '100%',
              height: '2px',
              background: '#fff',
              borderRadius: '1px',
              transition: 'all 0.3s ease',
              transform: isMenuOpen ? 'rotate(45deg) translateY(9px)' : 'none',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
            }}
          />
          <span 
            style={{
              width: '100%',
              height: '2px',
              background: '#fff',
              borderRadius: '1px',
              transition: 'all 0.3s ease',
              opacity: isMenuOpen ? 0 : 1,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
            }}
          />
          <span 
            style={{
              width: '100%',
              height: '2px',
              background: '#fff',
              borderRadius: '1px',
              transition: 'all 0.3s ease',
              transform: isMenuOpen ? 'rotate(-45deg) translateY(-9px)' : 'none',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
            }}
          />
        </button>
      </header>

      {/* Mobile Menu Overlay - Exact BODYARMOR Style - INSTANT */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: '#000', // Pure black like BODYARMOR
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'none', // INSTANT - NO ANIMATIONS
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
      >
        {/* Close Button - BODYARMOR Perfect Positioning */}
        <button
          onClick={closeMenu}
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '3.5rem', // Much bigger X
            fontWeight: 200,
            cursor: 'pointer',
            width: '60px', // Bigger touch target
            height: '60px', // Bigger touch target
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            WebkitTapHighlightColor: 'transparent',
            lineHeight: 1
          }}
          aria-label="Close menu"
        >
          ×
        </button>

        {/* Menu Items - BODYARMOR Perfect Layout - CLEAN & MINIMAL */}
        <nav 
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', // Move items to top instead of center
            alignItems: 'flex-start',
            padding: '0 2rem',
            gap: '2.5rem', // Slightly reduced gap to fit better
            paddingBottom: '12rem', // More space for the big logo
            paddingTop: '6rem' // More space from top to move buttons up
          }}
        >
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={closeMenu}
              style={{
                color: '#fff',
                textDecoration: 'none',
                fontSize: 'clamp(1.6rem, 4.8vw, 2.2rem)', // Perfect BODYARMOR size
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                lineHeight: 1.1,
                transition: 'opacity 0.2s ease',
                WebkitTapHighlightColor: 'transparent',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.opacity = '0.7';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* DrinkSip Logo at Bottom - 5X BIGGER & CENTERED */}
        <div style={{
          padding: '0 2rem 0.5rem', // Minimal bottom padding to bring logo down even more
          textAlign: 'center', // Center the logo
          display: 'flex',
          justifyContent: 'center', // Ensure perfect centering
          position: 'absolute', // Position absolutely at bottom
          bottom: 0,
          left: 0,
          right: 0
        }}>
          <img 
            src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Logo-20.png?v=1735858463"
            alt="DrinkSip"
            className="mobile-menu-logo"
            style={{
              height: '240px', // 5x bigger (48px * 5)
              width: 'auto',
              maxWidth: '1000px', // 5x bigger (200px * 5)
              filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.7))'
            }}
          />
        </div>
      </div>

      {/* Performance CSS */}
      <style>
        {`
          /* Hardware acceleration for smooth animations */
          .mobile-bodyarmor-header * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
          }
          
          /* Prevent text selection and improve touch */
          .mobile-bodyarmor-header {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          
          /* Mobile logo styling - only visible on mobile */
          .mobile-header-logo,
          .mobile-menu-logo {
            transition: opacity 0.2s ease;
          }
          
          .mobile-header-logo:hover,
          .mobile-menu-logo:hover {
            opacity: 0.8;
          }
          
          /* Smooth scrolling for iOS */
          body {
            -webkit-overflow-scrolling: touch;
          }
        `}
      </style>
    </>
  );
}
