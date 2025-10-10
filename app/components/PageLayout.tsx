import {Await, Link, useLocation} from 'react-router';
import {Suspense, useState, useEffect} from 'react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {UnifiedFooter} from '~/components/UnifiedFooter';
import {Header, HeaderMenu} from '~/components/Header';
import {UnifiedHeader} from '~/components/UnifiedHeader';
import {CartMain} from '~/components/CartMain';
// Search functionality temporarily removed for optimization

interface PageLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  children?: React.ReactNode;
}

export function PageLayout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain,
}: PageLayoutProps) {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const isProductPage = location.pathname.startsWith('/products/');

  // Determine header background color based on route
  const getHeaderBackground = () => {
    if (isHomepage) return undefined; // Transparent for homepage
    // For other pages, default to black
    return '#000';
  };

  return (
    <Aside.Provider>
      <CartAside cart={cart} />
      <SearchAside />
      <MobileMenuAside header={header} publicStoreDomain={publicStoreDomain} />
      
      {/* Unified Responsive Header - Skip on PDP pages since they have their own WhiteHeader */}
      {!isProductPage && (
        <UnifiedHeader 
          backgroundColor={getHeaderBackground()}
          isTransparent={isHomepage}
        />
      )}
      
      <main style={{ 
        paddingTop: '0',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden'
      }}>
        {children}
      </main>
      
      <UnifiedFooter />
    </Aside.Provider>
  );
}

function CartAside({cart}: {cart: PageLayoutProps['cart']}) {
  return (
    <Aside type="cart" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  return (
    <Aside type="search" heading="SEARCH">
      <div className="predictive-search">
        <br />
        {/* Optimized search form - removed heavy predictive search for performance */}
        <form action="/search" method="get">
          <input
            name="q"
            placeholder="Search products..."
            type="search"
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '4px',
              color: '#fff',
              marginBottom: '8px'
            }}
          />
          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Search
          </button>
        </form>

        {/* Search results placeholder - simplified for now */}
        <div style={{display: 'none'}}>
          {/* Search functionality temporarily disabled */}
        </div>
      </div>
    </Aside>
  );
}

function MobileMenuAside({
  header,
  publicStoreDomain,
}: {
  header: PageLayoutProps['header'];
  publicStoreDomain: PageLayoutProps['publicStoreDomain'];
}) {
  // Guard against null header or menu
  if (!header || !header.menu || !header.shop?.primaryDomain?.url) {
    return null;
  }

  return (
    <Aside type="mobile" heading="MENU">
      <HeaderMenu
        menu={header.menu}
        viewport="mobile"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      />
    </Aside>
  );
}
