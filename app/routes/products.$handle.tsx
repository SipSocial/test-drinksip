import {Link, useLoaderData} from 'react-router';
import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {ProductCard} from '~/components/ProductCard';
import {WhiteHeader} from '~/components/WhiteHeader';
import {useState, useEffect} from 'react';

export async function loader({params}: LoaderFunctionArgs) {
  const handle = params.handle!;
  
  // Mock product data to avoid GraphQL errors
  const mockProducts: Record<string, any> = {
    'hazy-ipa': {
      id: '1',
      title: 'Hazy IPA',
      handle: 'hazy-ipa',
      description: 'Our flagship non-alcoholic beer with bold hop flavor and crisp finish.',
      color: '#E8B122',
      series: 'Core Series',
      features: [
        'Real Beer Taste',
        '≤ 0.5% ABV',
        'Crisp & Refreshing',
        'Lower Calories',
        'Natural Ingredients'
      ]
    },
    'watermelon-refresher': {
      id: '2',
      title: 'Watermelon Refresher',
      handle: 'watermelon-refresher',
      description: 'Light and refreshing with real watermelon extract.',
      color: '#F05757',
      series: 'Refresher Series',
      features: [
        'Real Watermelon Extract',
        '≤ 0.5% ABV',
        'Light & Refreshing',
        'Lower Calories',
        'Natural Flavors'
      ]
    },
    'blood-orange-refresher': {
      id: '3',
      title: 'Blood Orange Refresher',
      handle: 'blood-orange-refresher',
      description: 'Citrusy and bright with real blood orange extract.',
      color: '#ED5335',
      series: 'Refresher Series',
      features: [
        'Real Blood Orange Extract',
        '≤ 0.5% ABV',
        'Citrusy & Bright',
        'Lower Calories',
        'Natural Flavors'
      ]
    },
    'lemon-lime-refresher': {
      id: '4',
      title: 'Lemon Lime Refresher',
      handle: 'lemon-lime-refresher',
      description: 'Classic citrus combination with a crisp finish.',
      color: '#77C14A',
      series: 'Refresher Series',
      features: [
        'Real Lemon-Lime Extract',
        '≤ 0.5% ABV',
        'Crisp & Refreshing',
        'Lower Calories',
        'Natural Flavors'
      ]
    },
    '311-hazy-ipa': {
      id: '5',
      title: '311 Hazy IPA',
      handle: '311-hazy-ipa',
      description: 'Limited collaboration with 311 featuring bold hop character.',
      color: '#1E3A8A', // Deep blue for 311 can
      series: 'Artist Series',
      features: [
        'Limited Edition',
        '≤ 0.5% ABV',
        'Bold Hop Character',
        'Artist Collaboration',
        'Premium Quality'
      ]
    },
    'deftones-tone-zero-lager': {
      id: '6',
      title: 'Deftones Tone Zero Lager',
      handle: 'deftones-tone-zero',
      description: 'Smooth lager collaboration with Deftones.',
      color: '#000000', // Black for Deftones
      series: 'Artist Series',
      features: [
        'Limited Edition',
        '≤ 0.5% ABV',
        'Smooth Lager',
        'Artist Collaboration',
        'Premium Quality'
      ]
    },
    // Alias for Deftones (both handles should work)
    'deftones-tone-zero': {
      id: '6',
      title: 'Deftones Tone Zero Lager',
      handle: 'deftones-tone-zero',
      description: 'Smooth lager collaboration with Deftones.',
      color: '#000000', // Black for Deftones
      series: 'Artist Series',
      features: [
        'Limited Edition',
        '≤ 0.5% ABV',
        'Smooth Lager',
        'Artist Collaboration',
        'Premium Quality'
      ]
    }
  };

  const product = mockProducts[handle];
  if (!product) {
    throw new Response('Product not found', { status: 404 });
  }

  // Mock recommendations
  const recommendations = Object.values(mockProducts)
    .filter(p => p.handle !== handle)
    .slice(0, 3);

  return { product, recommendations };
}

export default function ProductPage() {
    const {product, recommendations} = useLoaderData<typeof loader>();

  return (
    <div style={{
      background: '#000',
      color: '#fff',
      // scrollSnapType: 'y mandatory', // DISABLED - No more snap scroll
      minHeight: '100vh',
      width: '100vw',
      overflowY: 'auto',
      margin: '0',
      padding: '0',
      // position: 'fixed', // REMOVED - This was causing scrolling issues
      // top: '0',
      // left: '0',
      // zIndex: 10
    }}>
      {/* PDP Text Animations */}
      <style>
        {`
          @keyframes slideInFromLeft {
            0% {
              opacity: 0;
              transform: translateX(-120px) scale(0.95);
            }
            100% {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }
          
          @keyframes slideUpFromBottom {
            0% {
              opacity: 0;
              transform: translateY(100px) scale(0.9);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          .pdp-series-animate {
            animation: slideInFromLeft 1.0s cubic-bezier(0.23, 1, 0.32, 1) forwards;
            opacity: 0;
          }
          
          .pdp-title-animate {
            animation: slideInFromLeft 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.2s forwards;
            opacity: 0;
          }
          
          .pdp-description-animate {
            animation: slideInFromLeft 1.4s cubic-bezier(0.23, 1, 0.32, 1) 0.4s forwards;
            opacity: 0;
          }
          
          .pdp-buttons-animate {
            animation: slideInFromLeft 1.6s cubic-bezier(0.23, 1, 0.32, 1) 0.6s forwards;
            opacity: 0;
          }
          
          .product-image-hover {
            position: relative;
          }
          
          .product-image-hover:hover {
            transform: scale(1.08) rotate(2deg) translateY(-10px);
            filter: drop-shadow(0 50px 100px rgba(0, 0, 0, 0.8)) saturate(1.2) brightness(1.1);
          }
          
          .product-image-hover::before {
            content: '';
            position: absolute;
            top: -20px;
            left: -20px;
            right: -20px;
            bottom: -20px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
            opacity: 0;
            animation: none;
            pointer-events: none;
            z-index: -1;
            transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          }
          
          .product-image-hover:hover::before {
            opacity: 1;
            animation: pulseGlow 2s ease-in-out infinite alternate;
          }
          
          @keyframes pulseGlow {
            0% { opacity: 0.6; transform: scale(1); }
            100% { opacity: 1; transform: scale(1.05); }
          }
          
          /* Desktop-only hero positioning */
          @media (min-width: 768px) {
            .pdp-hero-container {
              padding-top: 0px !important; /* Move up another 50% (12px to 0px) */
              transform: translateY(-10vh); /* Increased upward movement */
            }
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="pdp-hero" style={{
        background: product.color,
        // scrollSnapAlign: 'start', // DISABLED - No more snap scroll
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        margin: '0',
        padding: '0'
      }}>
        <div 
          className="pdp-hero-container"
          style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          width: '100%',
            paddingTop: '2rem' // Reduced since no header
        }}>
          {/* Left: Hero Text Content */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: '100%'
          }}>
            <div 
              className="pdp-series-animate"
              style={{
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '1rem',
                opacity: 0,
                fontWeight: 600
              }}
            >
              {product.series}
            </div>
            <h1 
              className="pdp-title-animate"
              style={{
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                marginBottom: '2rem',
                color: '#fff',
                opacity: 0
              }}
            >
              {product.title}
            </h1>
            
            <p 
              className="pdp-description-animate"
              style={{
                fontSize: '1.3rem',
                lineHeight: 1.5,
                marginBottom: '3rem',
                opacity: 0,
                maxWidth: '500px'
              }}
            >
              {product.description}
            </p>

            <div 
              className="pdp-buttons-animate"
              style={{ 
                display: 'flex', 
                gap: '1.5rem', 
                flexWrap: 'wrap', 
                marginBottom: '2rem',
                opacity: 0
              }}
            >
              <button 
                style={{
                  background: '#fff',
                  color: product.color,
                  padding: '1.2rem 2.5rem',
                  border: '3px solid #fff',
                  textDecoration: 'none',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: '0.9rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = product.color;
                }}
              >
                Subscribe & Save
              </button>
              <Link 
                to="/pages/where-to-buy" 
                style={{
                  border: '3px solid #fff',
                  background: 'transparent',
                  color: '#fff',
                  padding: '1.2rem 2.5rem',
                  textDecoration: 'none',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: '0.9rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = product.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#fff';
                }}
              >
                Find Near Me
              </Link>
            </div>
          </div>

          {/* Right: Product Image */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            height: '100%'
          }}>
            {product.handle === 'watermelon-refresher' && (
              <div style={{
                position: 'relative',
                animation: 'slideUpFromBottom 1.8s cubic-bezier(0.23, 1, 0.32, 1) 0.8s forwards',
                transform: 'translateY(100px) scale(0.9)',
                opacity: 0,
                width: '100%',
                maxWidth: '600px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <img 
                  src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/two-watermelon-cans.png?v=1759269017"
                  alt="DrinkSip Watermelon Refresher"
                  className="product-image-hover"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '700px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 40px 80px rgba(0, 0, 0, 0.5))',
                    zIndex: 3,
                    cursor: 'pointer',
                    transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
                  }}
                />
              </div>
            )}

            {product.handle === 'hazy-ipa' && (
              <div style={{
                animation: 'slideUpFromBottom 1.8s cubic-bezier(0.23, 1, 0.32, 1) 0.8s forwards',
                transform: 'translateY(100px) scale(0.9)',
                opacity: 0
              }}>
                <img 
                  src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/hazy-cans.png?v=1759269017"
                  alt="DrinkSip Hazy IPA"
                  className="product-image-hover"
                  style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: 'auto',
                    filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4))',
                    cursor: 'pointer',
                    transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
                  }}
                />
              </div>
            )}

            {product.handle === 'blood-orange-refresher' && (
              <div style={{
                animation: 'slideUpFromBottom 1.8s cubic-bezier(0.23, 1, 0.32, 1) 0.8s forwards',
                transform: 'translateY(100px) scale(0.9)',
                opacity: 0
              }}>
                <img 
                  src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Blood_Orange_Refresher_82f1cfff-dfdd-44c5-bb02-6f8e74183f36.png?v=1759017824"
                  alt="DrinkSip Blood Orange Refresher"
                  className="product-image-hover"
                  style={{
                    width: '100%',
                    maxWidth: '500px',
                    height: 'auto',
                    filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4))',
                    cursor: 'pointer',
                    transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
                  }}
                />
              </div>
            )}

            {product.handle === 'lemon-lime-refresher' && (
              <div style={{
                animation: 'slideUpFromBottom 1.8s cubic-bezier(0.23, 1, 0.32, 1) 0.8s forwards',
                transform: 'translateY(100px) scale(0.9)',
                opacity: 0
              }}>
                <img 
                  src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Lemon_Lime_Refresher_9565ca39-8832-48ab-8c6b-bcd0899f87e9.png?v=1759017824"
                  alt="DrinkSip Lemon Lime Refresher"
                  className="product-image-hover"
                  style={{
                    width: '100%',
                    maxWidth: '500px',
                    height: 'auto',
                    filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4))',
                    cursor: 'pointer',
                    transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
                  }}
                />
              </div>
            )}

            {product.handle === '311-hazy-ipa' && (
              <div style={{
                animation: 'slideUpFromBottom 1.8s cubic-bezier(0.23, 1, 0.32, 1) 0.8s forwards',
                transform: 'translateY(100px) scale(0.9)',
                opacity: 0
              }}>
                <img 
                  src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/311_Hazy_IPA_607644d9-92cb-4a02-af68-0eb18d34063a.png?v=1759017824"
                  alt="DrinkSip x 311 Hazy IPA"
                  className="product-image-hover"
                  style={{
                    width: '100%',
                    maxWidth: '500px',
                    height: 'auto',
                    filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4))',
                    cursor: 'pointer',
                    transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
                  }}
                />
              </div>
            )}

            {(product.handle === 'deftones-tone-zero' || product.handle === 'deftones-tone-zero-lager') && (
              <div style={{
                animation: 'slideUpFromBottom 1.8s cubic-bezier(0.23, 1, 0.32, 1) 0.8s forwards',
                transform: 'translateY(100px) scale(0.9)',
                opacity: 0
              }}>
                <img 
                  src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Deftones_Tone_Zero_Lager_dcc52426-36ee-42ee-a3b5-b49f7d2d7480.png?v=1759017824"
                  alt="DrinkSip x Deftones Tone Zero Lager"
                  className="product-image-hover"
                  style={{
                    width: '100%',
                    maxWidth: '500px',
                    height: 'auto',
                    filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4))',
                    cursor: 'pointer',
                    transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* You May Like Section - Copied from Homepage */}
      <section style={{
        padding: '2.5rem 2rem 1.5rem', // Desktop padding
        background: '#000',
        textAlign: 'center',
        position: 'relative' // For controls positioning
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <h1 
            className="you-may-like-header"
            style={{
              fontSize: 'clamp(4rem, 8vw, 6rem)', // Desktop size
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              lineHeight: 0.9,
              color: '#fff',
              marginBottom: '1rem'
            }}
          >
            You May Like
          </h1>
          <p 
            className="you-may-like-description"
            style={{
              fontSize: '1.3rem', // Desktop size
              color: '#888',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.5
            }}
          >
            Our complete range of premium non-alcoholic beers.
            </p>
          </div>
        
        {/* Mobile Controls - BETWEEN HEADER AND CARDS */}
        <div 
          className="carousel-controls-container"
          style={{
            position: 'absolute',
            top: '80%', // Position at bottom of header section
            right: '2rem',
            display: 'none', // Hidden by default, shown on mobile
        alignItems: 'center',
            gap: '0.5rem',
            zIndex: 100
          }}
        >
          <button 
            className="carousel-control carousel-control-left"
            style={{
              width: '44px',
              height: '44px',
              border: 'none',
                      borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#fff',
              cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
            justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 300,
              transition: 'all 0.2s ease',
              WebkitTapHighlightColor: 'transparent'
            }}
            aria-label="Previous products"
          >
            ‹
          </button>
          
          <button 
            className="carousel-control carousel-control-right"
            style={{
              width: '44px',
              height: '44px',
              border: 'none',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 300,
              transition: 'all 0.2s ease',
              WebkitTapHighlightColor: 'transparent'
            }}
            aria-label="Next products"
          >
            ›
          </button>
        </div>
      </section>

       {/* MOBILE JUMBO Product Carousel with Controls */}
       <section 
         className="product-carousel-section"
         style={{
           padding: 'clamp(3rem, 8vw, 4rem) 0 clamp(1rem, 3vw, 2rem) 0', // More top padding to prevent overlap
        background: '#000',
           overflow: 'hidden',
           position: 'relative'
         }}
       >
         {/* Carousel Container */}
         <div 
           className="product-carousel-container"
           style={{
        display: 'flex',
             animation: 'scroll 25s linear infinite',
             gap: 'clamp(1rem, 3vw, 2rem)',
             width: 'fit-content'
           }}
         >
           {[
             // Core Series
             { id: '1', handle: 'hazy-ipa', title: 'DrinkSip Hazy IPA', tags: ['core-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Hazy_IPA_0645f5ce-2ec5-4fda-87ee-fb36a4ee4295.png?v=1759017824' }, metafields: [] },
             
             // Refresher Series
             { id: '2', handle: 'watermelon-refresher', title: 'DrinkSip Watermelon Refresher', tags: ['refresher-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Watermelon_Refresher_e64ca8fe-8af8-43b5-8b3a-d20dc04152c2.png?v=1759017823' }, metafields: [] },
             { id: '3', handle: 'blood-orange-refresher', title: 'DrinkSip Blood Orange Refresher', tags: ['refresher-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Blood_Orange_Refresher_82f1cfff-dfdd-44c5-bb02-6f8e74183f36.png?v=1759017824' }, metafields: [] },
             { id: '4', handle: 'lemon-lime-refresher', title: 'DrinkSip Lemon Lime Refresher', tags: ['refresher-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Lemon_Lime_Refresher_9565ca39-8832-48ab-8c6b-bcd0899f87e9.png?v=1759017824' }, metafields: [] },
             
             // Artist Series
             { id: '5', handle: '311-hazy-ipa', title: 'DrinkSip x 311 Hazy IPA', tags: ['artist-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/311_Hazy_IPA_607644d9-92cb-4a02-af68-0eb18d34063a.png?v=1759017824' }, metafields: [] },
             { id: '6', handle: 'deftones-tone-zero-lager', title: 'DrinkSip x Deftones Tone Zero Lager', tags: ['artist-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Deftones_Tone_Zero_Lager_dcc52426-36ee-42ee-a3b5-b49f7d2d7480.png?v=1759017824' }, metafields: [] },
             
             // Duplicate set for seamless loop
             { id: 'dup-1', handle: 'hazy-ipa', title: 'DrinkSip Hazy IPA', tags: ['core-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Hazy_IPA_0645f5ce-2ec5-4fda-87ee-fb36a4ee4295.png?v=1759017824' }, metafields: [] },
             { id: 'dup-2', handle: 'watermelon-refresher', title: 'DrinkSip Watermelon Refresher', tags: ['refresher-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Watermelon_Refresher_e64ca8fe-8af8-43b5-8b3a-d20dc04152c2.png?v=1759017823' }, metafields: [] },
             { id: 'dup-3', handle: 'blood-orange-refresher', title: 'DrinkSip Blood Orange Refresher', tags: ['refresher-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Blood_Orange_Refresher_82f1cfff-dfdd-44c5-bb02-6f8e74183f36.png?v=1759017824' }, metafields: [] },
             { id: 'dup-4', handle: 'lemon-lime-refresher', title: 'DrinkSip Lemon Lime Refresher', tags: ['refresher-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Lemon_Lime_Refresher_9565ca39-8832-48ab-8c6b-bcd0899f87e9.png?v=1759017824' }, metafields: [] },
             { id: 'dup-5', handle: '311-hazy-ipa', title: 'DrinkSip x 311 Hazy IPA', tags: ['artist-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/311_Hazy_IPA_607644d9-92cb-4a02-af68-0eb18d34063a.png?v=1759017824' }, metafields: [] },
             { id: 'dup-6', handle: 'deftones-tone-zero-lager', title: 'DrinkSip x Deftones Tone Zero Lager', tags: ['artist-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Deftones_Tone_Zero_Lager_dcc52426-36ee-42ee-a3b5-b49f7d2d7480.png?v=1759017824' }, metafields: [] }
           ].map((product: any) => (
             <div 
               key={product.id} 
               className="product-card-wrapper"
               style={{ 
                 flex: '0 0 clamp(200px, 28vw, 400px)', // Desktop sizing
                 display: 'flex',
                 justifyContent: 'center'
               }}
             >
               <ProductCard
                 id={product.id}
                 handle={product.handle}
                 title={product.title}
                 image={product.featuredImage.url}
               />
              </div>
            ))}
          </div>

         {/* MOBILE & DESKTOP STYLES */}
         <style>
           {`
             /* DESKTOP & MOBILE - You May Like Section */
             .you-may-like-header {
               font-size: 32px !important; /* 32px on mobile by default */
               margin-bottom: 2rem !important; /* More space below header */
             }
             
             /* Hide description on both desktop and mobile */
             .you-may-like-description {
               display: none !important;
             }
             
             /* Show controls on both desktop and mobile */
             .carousel-controls-container {
               display: flex !important;
               top: 85% !important; /* More space above controls */
             }
             
             /* Desktop specific styling */
             @media (min-width: 768px) {
               /* Desktop header size: 62.62px */
               .you-may-like-header {
                 font-size: 62.62px !important;
               }
               
               /* Better spacing on desktop */
               .product-carousel-section {
                 padding: 3rem 0 2rem 0 !important; /* Good spacing for desktop */
               }
               
               /* Desktop product cards - slight overlapping */
               .product-card-wrapper {
                 margin-right: -1.4rem !important; /* Slight overlapping with more breathing room */
               }
               
               /* Control hover effects on desktop */
               .carousel-control:hover {
                 background: rgba(255, 255, 255, 0.3) !important;
                 transform: scale(1.05) !important;
               }
             }
             
             /* MOBILE ONLY - Additional mobile-specific styles */
             @media (max-width: 767px) {
               /* JUMBO Product Cards - 2.5x larger, almost full viewport */
               .product-card-wrapper {
                 flex: 0 0 calc(85vw - 2rem) !important; /* Almost full viewport with padding */
                 min-width: 280px !important;
                 max-width: 350px !important;
                 margin-right: 0.5rem !important; /* Tighter spacing on mobile too */
               }
               
               /* Better spacing on mobile - MORE SPACE BELOW CONTROLS */
               .product-carousel-section {
                 padding: 3rem 0 1rem 0 !important; /* Even more top padding for space below controls */
               }
               
               /* Control active effects on mobile */
               .carousel-control:active {
                 background: rgba(255, 255, 255, 0.3) !important;
                 transform: scale(0.95) !important;
               }
             }
             
             /* Keep auto-play on both desktop and mobile */
             .product-carousel-container {
               animation: scroll 25s linear infinite !important;
             }
             
             /* Animation keyframes */
             @keyframes scroll {
               0% { transform: translateX(0); }
               100% { transform: translateX(-50%); }
             }
           `}
         </style>
      </section>
    </div>
  );
}
