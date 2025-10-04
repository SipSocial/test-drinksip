import {Analytics, getShopAnalytics, useNonce} from '@shopify/hydrogen';
import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  type ShouldRevalidateFunction,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from 'react-router';
import favicon from '~/assets/favicon.svg';
import {FOOTER_QUERY, HEADER_QUERY} from '~/lib/fragments';
import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';
import tailwindCss from './styles/tailwind.css?url';
import {PageLayout} from './components/PageLayout';
import {SkipToMain, useHighContrastMode, useReducedMotion, useKeyboardNavigation} from './components/AccessibilityUtils';

export type RootLoader = typeof loader;

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 */
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') return true;

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) return true;

  // Defaulting to no revalidation for root loader data to improve performance.
  // When using this feature, you risk your UI getting out of sync with your server.
  // Use with caution. If you are uncomfortable with this optimization, update the
  // line below to `return defaultShouldRevalidate` instead.
  // For more details see: https://remix.run/docs/en/main/route/should-revalidate
  return false;
};

/**
 * The main and reset stylesheets are added in the Layout component
 * to prevent a bug in development HMR updates.
 *
 * This avoids the "failed to execute 'insertBefore' on 'Node'" error
 * that occurs after editing and navigating to another page.
 *
 * It's a temporary fix until the issue is resolved.
 * https://github.com/remix-run/remix/issues/9242
 */
export function links() {
  return [
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg'},
  ];
}

export async function loader(args: LoaderFunctionArgs) {
  // Simplified loader to get the site working first
  const {env, cart, customerAccount} = args.context;
  
  console.log('Using minimal root loader - Shopify queries disabled');

  return {
    header: null,
    footer: null,
    cart: cart.get(), // Return promise like expected
    isLoggedIn: customerAccount.isLoggedIn(), // Return promise like expected
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN || 'demo-store.myshopify.com',
    shop: null,
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN || '',
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN || '',
      withPrivacyBanner: false,
      country: 'US',
      language: 'EN',
    },
  };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  // Temporarily disable Shopify queries to get site working
  console.log('Skipping header query - no Shopify credentials available');
  const header = null;

  return {
    header,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const {storefront, customerAccount, cart} = context;

  // Temporarily disable footer query to get site working
  console.log('Skipping footer query - no Shopify credentials available');
  const footer = null;

  return {
    cart: cart.get(),
    isLoggedIn: customerAccount.isLoggedIn(),
    footer,
  };
}

export function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();
  const data = useRouteLoaderData<RootLoader>('root');
  
  // Initialize accessibility features
  useHighContrastMode();
  useReducedMotion();
  useKeyboardNavigation();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <style dangerouslySetInnerHTML={{__html: `
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { 
            font-family: 'Arial Black', 'Helvetica', 'Arial', sans-serif; 
            background: #000000; 
            color: #ffffff; 
            line-height: 1.4; 
            overflow-x: hidden; 
            -webkit-font-smoothing: antialiased; 
            -moz-osx-font-smoothing: grayscale; 
          }
          .header { 
            position: fixed; 
            top: 0; 
            left: 0; 
            right: 0; 
            z-index: 1000; 
            background: #000; 
            border-bottom: 1px solid rgba(255, 255, 255, 0.2); 
            height: 80px; 
            display: flex; 
            align-items: center; 
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); 
          }
          .hero { 
            position: relative; 
            width: 100vw; 
            height: 100vh; 
            background: #000; 
            display: flex; 
            align-items: center; 
            overflow: hidden; 
            margin: 0;
            padding: 0;
          }
        `}} />
                    <link rel="stylesheet" href={tailwindCss}></link>
        <link rel="stylesheet" href={resetStyles}></link>
        <link rel="stylesheet" href={appStyles}></link>
        <Meta />
        <Links />
      </head>
      <body>
        <SkipToMain />
        {data ? (
          <PageLayout {...data}>
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
          </PageLayout>
        ) : (
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        )}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="route-error">
      <h1>Oops</h1>
      <h2>{errorStatus}</h2>
      {errorMessage && (
        <fieldset>
          <pre>{errorMessage}</pre>
        </fieldset>
      )}
    </div>
  );
}
