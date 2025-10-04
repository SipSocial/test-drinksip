import {Await, Link, useLocation} from 'react-router';
import {Suspense, useId} from 'react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {DrinkSipFooter} from '~/components/DrinkSipFooter';
import {Header, HeaderMenu} from '~/components/Header';
import {GlassHeader} from '~/components/GlassHeader';
import {WhiteHeader} from '~/components/WhiteHeader';
import {MobileBodyArmorHeader} from '~/components/MobileBodyArmorHeader';
import {CartMain} from '~/components/CartMain';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
// SearchResultsPredictive component removed

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

  return (
    <Aside.Provider>
      <CartAside cart={cart} />
      <SearchAside />
      <MobileMenuAside header={header} publicStoreDomain={publicStoreDomain} />
      
      {/* Desktop Headers - Hidden on Mobile */}
      <div style={{ display: 'block' }} className="desktop-only-header">
        {isHomepage ? <GlassHeader /> : <WhiteHeader />}
      </div>
      
      {/* Mobile BODYARMOR-Style Header - Hidden on Desktop */}
      <MobileBodyArmorHeader 
        cart={cart} 
        isLoggedIn={isLoggedIn} 
        publicStoreDomain={publicStoreDomain} 
      />
      
      <main style={{ paddingTop: '0' }}>{children}</main>
      <DrinkSipFooter />
      
      {/* CSS to control mobile/desktop header display */}
      <style>
        {`
          .desktop-only-header {
            display: block;
          }
          
          @media (max-width: 767px) {
            .desktop-only-header {
              display: none !important;
            }
          }
        `}
      </style>
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
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <SearchFormPredictive>
          {({fetchResults, goToSearch, inputRef}) => (
            <>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
                list={queriesDatalistId}
              />
              &nbsp;
              <button onClick={goToSearch}>Search</button>
            </>
          )}
        </SearchFormPredictive>

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
