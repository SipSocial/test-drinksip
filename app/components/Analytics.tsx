import { useEffect } from 'react';
import { useLocation } from 'react-router';

// Google Analytics 4 integration
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const location = useLocation();

  useEffect(() => {
    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}', {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: false
      });
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [measurementId]);

  // Track page views
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [location, measurementId]);

  return null;
}

// Facebook Pixel integration
export function FacebookPixel({ pixelId }: { pixelId: string }) {
  const location = useLocation();

  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [pixelId]);

  // Track page views
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location]);

  return null;
}

// Custom event tracking functions
export const trackEvent = {
  // E-commerce events
  addToCart: (productId: string, productName: string, price: number, quantity: number = 1) => {
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (window.gtag) {
        window.gtag('event', 'add_to_cart', {
          currency: 'USD',
          value: price * quantity,
          items: [{
            item_id: productId,
            item_name: productName,
            quantity: quantity,
            price: price
          }]
        });
      }

      // Facebook Pixel
      if (window.fbq) {
        window.fbq('track', 'AddToCart', {
          content_ids: [productId],
          content_name: productName,
          content_type: 'product',
          value: price * quantity,
          currency: 'USD'
        });
      }
    }
  },

  removeFromCart: (productId: string, productName: string, price: number, quantity: number = 1) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'remove_from_cart', {
        currency: 'USD',
        value: price * quantity,
        items: [{
          item_id: productId,
          item_name: productName,
          quantity: quantity,
          price: price
        }]
      });
    }
  },

  viewProduct: (productId: string, productName: string, category: string, price: number) => {
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (window.gtag) {
        window.gtag('event', 'view_item', {
          currency: 'USD',
          value: price,
          items: [{
            item_id: productId,
            item_name: productName,
            item_category: category,
            price: price
          }]
        });
      }

      // Facebook Pixel
      if (window.fbq) {
        window.fbq('track', 'ViewContent', {
          content_ids: [productId],
          content_name: productName,
          content_category: category,
          content_type: 'product',
          value: price,
          currency: 'USD'
        });
      }
    }
  },

  beginCheckout: (items: Array<{id: string, name: string, price: number, quantity: number}>) => {
    const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (window.gtag) {
        window.gtag('event', 'begin_checkout', {
          currency: 'USD',
          value: totalValue,
          items: items.map(item => ({
            item_id: item.id,
            item_name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        });
      }

      // Facebook Pixel
      if (window.fbq) {
        window.fbq('track', 'InitiateCheckout', {
          content_ids: items.map(item => item.id),
          contents: items.map(item => ({
            id: item.id,
            quantity: item.quantity
          })),
          value: totalValue,
          currency: 'USD'
        });
      }
    }
  },

  purchase: (transactionId: string, items: Array<{id: string, name: string, price: number, quantity: number}>) => {
    const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (window.gtag) {
        window.gtag('event', 'purchase', {
          transaction_id: transactionId,
          currency: 'USD',
          value: totalValue,
          items: items.map(item => ({
            item_id: item.id,
            item_name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        });
      }

      // Facebook Pixel
      if (window.fbq) {
        window.fbq('track', 'Purchase', {
          content_ids: items.map(item => item.id),
          contents: items.map(item => ({
            id: item.id,
            quantity: item.quantity
          })),
          value: totalValue,
          currency: 'USD'
        });
      }
    }
  },

  // Engagement events
  search: (searchTerm: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'search', {
        search_term: searchTerm
      });
    }
  },

  newsletterSignup: (email: string) => {
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (window.gtag) {
        window.gtag('event', 'sign_up', {
          method: 'email'
        });
      }

      // Facebook Pixel
      if (window.fbq) {
        window.fbq('track', 'Lead');
      }
    }
  },

  socialShare: (platform: string, url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        method: platform,
        content_type: 'product',
        item_id: url
      });
    }
  },

  // Custom DrinkSip events
  ageVerification: (verified: boolean) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'age_verification', {
        verified: verified
      });
    }
  },

  productInteraction: (action: string, productId: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'product_interaction', {
        action: action,
        product_id: productId
      });
    }
  }
};

// Type declarations for global objects
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}
