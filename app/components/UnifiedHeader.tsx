import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';

interface UnifiedHeaderProps {
  backgroundColor?: string;
  isTransparent?: boolean;
}

export function UnifiedHeader({ 
  backgroundColor, 
  isTransparent = false 
}: UnifiedHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen && isMobile) {
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
  }, [isMenuOpen, isMobile]);

  // Determine colors based on background
  const isLightBackground = (color: string) => {
    if (!color) return false;
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  const bgColor = backgroundColor || (isHomepage ? 'transparent' : '#000');
  const isLight = isLightBackground(bgColor);
  const textColor = isLight ? '#000' : '#fff';
  const pillBorderColor = isLight ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)';
  const pillBackgroundColor = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const menuItems = [
    { label: 'CORE SERIES', href: '/collections/core-series' },
    { label: 'REFRESHER SERIES', href: '/collections/refresher-series' },
    { label: 'ARTIST SERIES', href: '/collections/artist-series' },
    { label: 'BUILD-A-BOX', href: '/pages/build-a-box' },
    { label: 'PARTNERS', href: '/pages/partners' },
    { label: 'WHERE TO BUY', href: '/pages/where-to-buy' }
  ];

  // Mobile Header
  if (isMobile) {
    return (
      <>
        <header 
          style={{
            position: isHomepage ? 'absolute' : 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: isTransparent ? 'transparent' : bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1.5rem',
            zIndex: 1000,
            transition: 'all var(--duration-normal) var(--ease-apple)'
          }}
        >
          {/* Logo */}
          <Link 
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none'
            }}
          >
            <img 
              src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/DrinkSip_Logo_SVG.svg?v=1759624477"
              alt="DrinkSip"
              style={{
                height: '48px',
                width: 'auto',
                maxWidth: '180px',
                filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.5))'
              }}
            />
          </Link>

          {/* Hamburger Menu Button */}
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
              padding: 0
            }}
            aria-label="Toggle menu"
          >
            <span 
              style={{
                width: '100%',
                height: '2px',
                background: textColor,
                borderRadius: '1px',
                transition: 'all var(--duration-normal) var(--ease-apple)',
                transform: isMenuOpen ? 'rotate(45deg) translateY(9px)' : 'none',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}
            />
            <span 
              style={{
                width: '100%',
                height: '2px',
                background: textColor,
                borderRadius: '1px',
                transition: 'all var(--duration-normal) var(--ease-apple)',
                opacity: isMenuOpen ? 0 : 1,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}
            />
            <span 
              style={{
                width: '100%',
                height: '2px',
                background: textColor,
                borderRadius: '1px',
                transition: 'all var(--duration-normal) var(--ease-apple)',
                transform: isMenuOpen ? 'rotate(-45deg) translateY(-9px)' : 'none',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}
            />
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: '#000',
            transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'none',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeMenu}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '3.5rem',
              fontWeight: 200,
              cursor: 'pointer',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1
            }}
            aria-label="Close menu"
          >
            ×
          </button>

          {/* Menu Items */}
          <nav 
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              padding: '0 2rem',
              gap: '2.5rem',
              paddingTop: '6rem'
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
                  fontSize: 'clamp(1.6rem, 4.8vw, 2.2rem)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  lineHeight: 1.1,
                  transition: 'opacity var(--duration-fast) var(--ease-apple)',
                  fontFamily: 'var(--font-primary)'
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Logo at Bottom */}
          <div style={{
            padding: '0 2rem 0.5rem',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0
          }}>
            <img 
              src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/DrinkSip_Logo_SVG.svg?v=1759624477"
              alt="DrinkSip"
              style={{
                height: '240px',
                width: 'auto',
                maxWidth: '1000px',
                filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.7))'
              }}
            />
          </div>
        </div>
      </>
    );
  }

  // Desktop Header
  return (
    <div 
      style={{ 
        position: isHomepage ? 'absolute' : 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000, 
        height: '203px',
        pointerEvents: 'none'
      }}
    >
      {/* Background */}
      {!isTransparent && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: bgColor,
            zIndex: 999
          }}
        />
      )}

      {/* Logo - Left Side */}
      <div style={{
        position: 'absolute',
        top: '68px',
        left: '2rem',
        zIndex: 1000,
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'auto'
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
              height: '120px',
              width: 'auto'
            }}
          />
        </Link>
      </div>

      {/* Navigation Pill - Center */}
      <div style={{
        position: 'absolute',
        top: '68px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: 'auto',
        pointerEvents: 'auto'
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
            {['Core Series', 'Refresher Series', 'Artist Series'].map((series) => {
              const href = `/collections/${series.toLowerCase().replace(' ', '-')}`;
              return (
                <Link 
                  key={series}
                  to={href} 
                  style={{
                    color: textColor,
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '1rem',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    transition: 'all var(--duration-fast) var(--ease-apple)',
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
                  }}
                >
                  {series}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Action Buttons - Right Side */}
      <div style={{
        position: 'absolute',
        top: '68px',
        right: '2rem',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        pointerEvents: 'auto'
      }}>
        <Link to="/pages/partners" style={{
          padding: '12px 30px',
          borderRadius: '30px',
          border: `1px solid ${pillBorderColor}`,
          background: pillBackgroundColor,
          color: textColor,
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '1rem',
          transition: 'all var(--duration-fast) var(--ease-apple)',
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
          border: `1px solid ${isLight ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'}`,
          background: isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
          color: textColor,
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '0.85rem',
          transition: 'all var(--duration-fast) var(--ease-apple)',
          whiteSpace: 'nowrap',
          textShadow: isLight ? '0 1px 2px rgba(0, 0, 0, 0.1)' : '0 1px 2px rgba(0, 0, 0, 0.3)',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>WHERE TO BUY</Link>
      </div>
    </div>
  );
}
