/**
 * DrinkSip Shopify GraphQL Client
 * Secure server-side client for Shopify Storefront API
 */

// Environment variables - only accessed when functions are called
function getDomain() {
  const domain = process.env.PUBLIC_STORE_DOMAIN;
  if (!domain) {
    console.warn('PUBLIC_STORE_DOMAIN not found, using fallback');
    return 'drinksip.myshopify.com'; // Fallback domain
  }
  return domain;
}

function getTokens() {
  const publicToken = process.env.PUBLIC_STOREFRONT_API_TOKEN;
  const privateToken = process.env.PRIVATE_STOREFRONT_API_TOKEN;
  
  // For development - gracefully handle missing tokens
  if (!publicToken) {
    console.warn('PUBLIC_STOREFRONT_API_TOKEN not found - using fallback data');
    return { publicToken: null, privateToken };
  }
  
  return { publicToken, privateToken };
}

/**
 * Execute GraphQL query against Shopify Storefront API
 */
export async function shopQuery<T>(
  query: string,
  variables?: Record<string, any>,
  opts?: { isPrivate?: boolean }
): Promise<T> {
  const domain = getDomain();
  const { publicToken, privateToken } = getTokens();
  
  // If no token available, throw error to trigger fallback
  if (!publicToken && !privateToken) {
    throw new Error('No Shopify API tokens available - using fallback data');
  }
  
  const token = opts?.isPrivate && privateToken ? privateToken : publicToken;
  
  const res = await fetch(`https://${domain}/api/2024-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token!,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Shopify API Error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json() as {data: T; errors?: any[]};
  
  if (json.errors) {
    console.error('GraphQL Errors:', json.errors);
    throw new Error(`GraphQL Error: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}

/**
 * Format money values consistently
 */
export function formatMoney(money: { amount: string; currencyCode: string }): string {
  const amount = parseFloat(money.amount);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currencyCode,
  }).format(amount);
}

/**
 * Get optimized image URL from Shopify CDN
 */
export function getImageUrl(
  url: string, 
  options: { width?: number; height?: number; crop?: string } = {}
): string {
  if (!url) return '';
  
  const urlObj = new URL(url);
  
  if (options.width) {
    urlObj.searchParams.set('width', options.width.toString());
  }
  
  if (options.height) {
    urlObj.searchParams.set('height', options.height.toString());
  }
  
  if (options.crop) {
    urlObj.searchParams.set('crop', options.crop);
  }
  
  return urlObj.toString();
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(url: string, widths: number[]): string {
  return widths
    .map(width => `${getImageUrl(url, { width })} ${width}w`)
    .join(', ');
}
