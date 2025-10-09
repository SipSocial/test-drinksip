import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';

interface UnifiedHeaderProps {
  backgroundColor?: string;
  isTransparent?: boolean;
}

// Safe cart hook for SSR
function useClientSideCart() {
  const [cartState, setCartState] = useState({
    totalItems: 0,
    openDrawer: () => {}
  });

  useEffect(() => {
    // Only access cart context on client side after component mounts
    if (typeof window !== 'undefined') {
      // Use a dynamic import to avoid SSR issues
      const loadCart = async () => {
        try {
          const { useCart } = await import('~/contexts/CartContext');
          // We can't call useCart here since we're not in a React component context
          // Instead, we'll set up a subscription or use a different approach
          
          // For now, just keep the default values during SSR
          // The cart functionality will be available through root.tsx CartProvider
        } catch (error) {
          console.log('Cart context not available');
        }
      };
      
      loadCart();
    }
  }, []);

  return cartState;
}

export function UnifiedHeader({ 
  backgroundColor, 
  isTransparent = false
}: UnifiedHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  
  // Use safe cart hook that works with SSR
  const { totalItems, openDrawer } = useClientSideCart();

  // Get dynamic color based on current route (for PDP pages)
  const getCurrentProductColor = () => {
    const pathname = location.pathname;
    if (pathname.startsWith('/products/')) {
      const handle = pathname.split('/products/')[1];
      const colorMap: Record<string, string> = {
        'hazy-ipa': '#E8B122',
        'watermelon-refresher': '#F05757',
        'blood-orange-refresher': '#ED5335',
        'blood-orange': '#ED5335',
        'lemon-lime-refresher': '#77C14A',
        'lemon-lime': '#77C14A',
        '311-hazy-ipa': '#1E3A8A',
        'deftones-tone-zero-lager': '#8B5CF6'
      };
      return colorMap[handle];
    }
    return undefined; // Use default gradient on non-PDP pages
  };

  const currentProductColor = getCurrentProductColor();

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
        {/* Animations for box indicator */}
        <style>
          {`
            @keyframes subtleShake {
              0%, 100% { transform: translateX(0) translateZ(0); }
              25% { transform: translateX(-1px) translateZ(0); }
              75% { transform: translateX(1px) translateZ(0); }
            }
            
            @keyframes pulse {
              0% { transform: scale(1); }
              100% { transform: scale(1.1); }
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
          `}
        </style>
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
    <>
      {/* Animations for box indicator */}
      <style>
        {`
          @keyframes subtleShake {
            0%, 100% { transform: translateX(0) translateZ(0); }
            25% { transform: translateX(-1px) translateZ(0); }
            75% { transform: translateX(1px) translateZ(0); }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
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
        `}
      </style>
      
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
            transform: 'translateX(-20px) translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-20px) scale(1.05) translateZ(0)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(-20px) scale(1) translateZ(0)';
          }}
        >
          {/* Clean Container */}
          <div style={{ position: 'relative' }}>
            <svg 
              width="44" 
              height="44" 
              viewBox="0 0 28 28" 
              fill="none" 
              style={{ position: 'relative', zIndex: 2 }}
            >
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
                background: currentProductColor 
                  ? `linear-gradient(135deg, ${currentProductColor} 0%, ${currentProductColor}CC 100%)`
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '18px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '700',
                color: '#FFFFFF',
                boxShadow: currentProductColor 
                  ? `0 2px 8px ${currentProductColor}4D`
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
              transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }} />
          </div>
        </div>
        
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
    </>
  );
}
