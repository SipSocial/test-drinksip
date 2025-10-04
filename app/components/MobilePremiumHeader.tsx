import { useState, useEffect } from 'react';
import { Link } from 'react-router';

interface MobilePremiumHeaderProps {
  isScrolled?: boolean;
}

export function MobilePremiumHeader({ isScrolled = false }: MobilePremiumHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Track scroll for header styling
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen, scrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // BodyArmor-style menu items for DrinkSip
  const menuItems = [
    { label: 'HAZY IPA', href: '/products/hazy-ipa' },
    { label: 'REFRESHER SERIES', href: '/collections/refresher-series' },
    { label: 'ARTIST SERIES', href: '/collections/artist-series' },
    { label: 'ALL PRODUCTS', href: '/collections/all' },
    { label: 'OUR STORY', href: '/pages/story' },
    { label: 'SUSTAINABILITY', href: '/pages/sustainability' },
    { label: 'PARTNERS', href: '/pages/partners' },
    { label: 'WHERE TO BUY', href: '/pages/where-to-buy' }
  ];

  return (
    <>
      {/* Mobile Header - BodyArmor Glassmorphic Style */}
      <header 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '70px',
          background: scrollY > 50 
            ? 'rgba(0, 0, 0, 0.9)' 
            : 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrollY > 50 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : 'none',
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
        {/* DrinkSip Logo */}
        <Link 
          to="/"
          style={{
            fontSize: '1.4rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: '#fff',
            textDecoration: 'none',
            letterSpacing: '0.1em',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          DRINKSIP
        </Link>

        {/* Hamburger Menu Button - BodyArmor Style */}
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

      {/* Mobile Menu Overlay - Exact BodyArmor Style */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: '#000', // Pure black like BodyArmor
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
      >
        {/* Close Button - BodyArmor Position */}
        <button
          onClick={closeMenu}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '2rem',
            fontWeight: 300,
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            WebkitTapHighlightColor: 'transparent'
          }}
          aria-label="Close menu"
        >
          ×
        </button>

        {/* Menu Items - BodyArmor Exact Layout */}
        <nav 
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '2rem 2rem 6rem', // Extra bottom padding for logo space
            gap: '2.5rem' // BodyArmor spacing
          }}
        >
          {menuItems.map((item, index) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={closeMenu}
              style={{
                color: '#fff',
                textDecoration: 'none',
                fontSize: 'clamp(1.4rem, 4.5vw, 2rem)', // BodyArmor responsive sizing
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: 1.2,
                transition: 'all 0.3s ease',
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: isMenuOpen ? `${index * 0.1}s` : '0s',
                WebkitTapHighlightColor: 'transparent'
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

        {/* DrinkSip Logo at Bottom - BodyArmor Style */}
        <div style={{
          padding: '0 2rem 3rem',
          textAlign: 'left' // Left align like BodyArmor
        }}>
          <div 
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4rem)', // Massive logo like BodyArmor
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#fff',
              letterSpacing: '-0.02em',
              lineHeight: 0.9,
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transitionDelay: isMenuOpen ? '0.4s' : '0s'
            }}
          >
            DRINKSIP
          </div>
        </div>
      </div>

      {/* Menu Backdrop - Smooth fade */}
      {isMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9998,
            opacity: isMenuOpen ? 1 : 0,
            transition: 'opacity 0.4s ease'
          }}
          onClick={closeMenu}
        />
      )}

      {/* Performance CSS */}
      <style>
        {`
          /* Hardware acceleration for smooth animations */
          .mobile-premium-header * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
          }
          
          /* Prevent text selection and improve touch */
          .mobile-premium-header {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
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
