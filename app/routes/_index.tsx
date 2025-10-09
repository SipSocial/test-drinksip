import type {MetaFunction, LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Link, useLoaderData} from 'react-router';
import {useState, useEffect} from 'react';
import {SEO} from '~/components/SEO';
import {BrandIntro} from '~/components/BrandIntro';
import {HeroCarousel, type HeroSlide} from '~/components/HeroCarousel';
import {ProductCard} from '~/components/ProductCard';
import {ProductShowcaseCarousel} from '~/components/ProductShowcaseCarousel';
import {AutoPlayProductCarousel} from '~/components/AutoPlayProductCarousel';
import {MobileKillerShowcase} from '~/components/MobileKillerShowcase';
import {AnimatedSection, FadeInOnScroll, SlideUpOnScroll} from '~/components/AnimatedSection';
import {shopQuery} from '~/lib/shopify.server';
import {HOME_QUERY} from '~/graphql/queries';
import {getAccentHexForProduct, getSeriesFromProduct} from '~/lib/accents';

export const meta: MetaFunction = () => ([
  {title: 'DrinkSip — Wake Up Happy | Premium Non-Alcoholic Beer'},
  {name: 'description', content: 'Premium non-alcoholic beer with real taste. Core Series, Refresher Series, and Artist Series. Lower calories, delicious taste. Choose better with DrinkSip.'},
  {name: 'keywords', content: 'non-alcoholic beer, craft beer, DrinkSip, alcohol-free, low calorie, premium beer, hazy ipa, refresher series'},
  {property: 'og:title', content: 'DrinkSip — Wake Up Happy | Premium Non-Alcoholic Beer'},
  {property: 'og:description', content: 'Premium non-alcoholic beer with real taste. Core Series, Refresher Series, and Artist Series. Lower calories, delicious taste.'},
  {property: 'og:image', content: 'https://drinksip.com/og-homepage.jpg'},
  {property: 'og:type', content: 'website'},
  {property: 'twitter:card', content: 'summary_large_image'},
  {property: 'twitter:title', content: 'DrinkSip — Wake Up Happy | Premium Non-Alcoholic Beer'},
  {property: 'twitter:description', content: 'Premium non-alcoholic beer with real taste. Core Series, Refresher Series, and Artist Series.'},
]);

export async function loader({context}: LoaderFunctionArgs) {
  try {
    // Try to get real DrinkSip products first
    const data = await shopQuery<{
      products: {
        nodes: Array<{
          id: string;
          handle: string;
          title: string;
          description: string;
          tags: string[];
          featuredImage?: {
            url: string;
            altText?: string;
            width?: number;
            height?: number;
          };
          metafields: Array<{
            key: string;
            value: string;
            namespace: string;
          }>;
        }>;
      };
      collections: {
        nodes: Array<{
          id: string;
          handle: string;
          title: string;
          description: string;
        }>;
      };
    }>(HOME_QUERY, {first: 20}); // Increased to get more real products

    // Always use our complete DrinkSip product lineup for homepage
    // This ensures consistent experience with all 6 products always showing
    const allProducts = [
      // Core Series - Premium Non-Alcoholic Beer
      { 
        id: 'real-hazy-ipa', 
        handle: 'hazy-ipa', 
        title: 'DrinkSip Hazy IPA', 
        description: 'Our flagship non-alcoholic beer with real hop flavor',
        tags: ['core-series', 'ipa', 'non-alcoholic'],
        featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Hazy_IPA_0645f5ce-2ec5-4fda-87ee-fb36a4ee4295.png?v=1759017824', altText: 'DrinkSip Hazy IPA' },
        metafields: []
      },
      // Refresher Series - Light & Refreshing
      { 
        id: 'real-watermelon', 
        handle: 'watermelon-refresher', 
        title: 'DrinkSip Watermelon Refresher', 
        description: 'Light and refreshing with real watermelon extract',
        tags: ['refresher-series', 'watermelon', 'non-alcoholic'],
        featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Watermelon_Refresher_e64ca8fe-8af8-43b5-8b3a-d20dc04152c2.png?v=1759017823', altText: 'DrinkSip Watermelon Refresher' },
        metafields: []
      },
      { 
        id: 'blood-orange-refresher', 
        handle: 'blood-orange-refresher', 
        title: 'DrinkSip Blood Orange Refresher', 
        description: 'Citrusy and bright with real blood orange extract',
        tags: ['refresher-series', 'blood-orange', 'non-alcoholic'],
        featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Blood_Orange_Refresher_82f1cfff-dfdd-44c5-bb02-6f8e74183f36.png?v=1759017824', altText: 'DrinkSip Blood Orange Refresher' },
        metafields: []
      },
      { 
        id: 'lemon-lime-refresher', 
        handle: 'lemon-lime-refresher', 
        title: 'DrinkSip Lemon Lime Refresher', 
        description: 'Crisp and refreshing with real citrus extract',
        tags: ['refresher-series', 'lemon-lime', 'non-alcoholic'],
        featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Lemon_Lime_Refresher_9565ca39-8832-48ab-8c6b-bcd0899f87e9.png?v=1759017824', altText: 'DrinkSip Lemon Lime Refresher' },
        metafields: []
      },
      // Artist Series - Limited Edition Collaborations
      { 
        id: 'artist-311', 
        handle: '311-hazy-ipa', 
        title: 'DrinkSip x 311 Hazy IPA', 
        description: 'Limited collaboration with 311',
        tags: ['artist-series', '311', 'ipa', 'non-alcoholic', 'limited-edition'],
        featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/311_Hazy_IPA_607644d9-92cb-4a02-af68-0eb18d34063a.png?v=1759017824', altText: 'DrinkSip x 311 Hazy IPA' },
        metafields: []
      },
      { 
        id: 'artist-deftones', 
        handle: 'deftones-tone-zero-lager', 
        title: 'DrinkSip x Deftones Tone Zero Lager', 
        description: 'Smooth lager collaboration with Deftones',
        tags: ['artist-series', 'deftones', 'lager', 'non-alcoholic', 'limited-edition'],
        featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Deftones_Tone_Zero_Lager_dcc52426-36ee-42ee-a3b5-b49f7d2d7480.png?v=1759017824', altText: 'DrinkSip x Deftones Tone Zero Lager' },
        metafields: []
      }
    ];

    return {
      products: allProducts,
      collections: data.collections.nodes || []
    };
  } catch (error) {
    console.error('Homepage API Error:', error);
    // Fallback to DrinkSip branded products
    return {
      products: [
        { 
          id: 'fallback-hazy-ipa', 
          handle: 'hazy-ipa', 
          title: 'DrinkSip Hazy IPA', 
          description: 'Our flagship non-alcoholic beer',
          tags: ['core-series', 'ipa'],
          featuredImage: { url: 'https://via.placeholder.com/400x600/E8B122/000000?text=DrinkSip+Hazy+IPA', altText: 'DrinkSip Hazy IPA' },
          metafields: []
        },
        { 
          id: 'fallback-watermelon', 
          handle: 'watermelon-refresher', 
          title: 'DrinkSip Watermelon Refresher', 
          description: 'Light and refreshing',
          tags: ['refresher-series', 'watermelon'],
          featuredImage: { url: 'https://via.placeholder.com/400x600/F05757/FFFFFF?text=DrinkSip+Watermelon', altText: 'DrinkSip Watermelon Refresher' },
          metafields: []
        }
      ],
      collections: []
    };
  }
}

export default function Index() {
  const {products} = useLoaderData<typeof loader>();
  const [showBrandIntro, setShowBrandIntro] = useState(true);

  // TEMPORARILY DISABLED - Always show intro for testing
  // useEffect(() => {
  //   const seen = sessionStorage.getItem('brandIntroSeen');
  //   if (seen === 'true') {
  //     setShowBrandIntro(false);
  //   }
  // }, []);

  const handleIntroComplete = () => {
    setShowBrandIntro(false);
    // sessionStorage.setItem('brandIntroSeen', 'true');
  };
  
  // Create hero slides from real product data - ensure we include all series
  const coreProducts = products.filter(p => p.tags.includes('core-series') || p.handle.includes('hazy'));
  const refresherProducts = products.filter(p => p.tags.includes('refresher-series') || p.handle.includes('refresher'));
  const artistProducts = products.filter(p => p.tags.includes('artist-series') || p.handle.includes('311') || p.handle.includes('deftones'));
  
  // Create epic hero slides with real images and video (removed brand statement slide)
  const heroSlides: HeroSlide[] = [
    // 1. Wake Up Happy - Custom HTML Hero with Animations
    {
      id: 'wake-up-happy',
      handle: 'hazy-ipa',
      title: 'Wake Up Happy',
      subtitle: '',
      color: '#000000',
      image: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Hero-image-desktop_a8e04c13-e818-4bda-894f-c3239dfc7f67.png?v=1759723506',
      type: 'custom-html'
    },
    // 2. Refresher Series - Trio of Cans (Bigger text)
    {
      id: 'refresher-trio',
      handle: 'refresher-series',
      title: 'Refresher Series',
      subtitle: 'Light & Refreshing',
      color: '#F05757',
      image: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Can-Trio-Template.png?v=1759266564',
      type: 'image',
      emphasizeText: true // Flag to make this slide's text bigger
    },
    // 3. DeMarcus Lawrence Video - BodyArmor Style (Smaller text)
    {
      id: 'demarcus-lawrence',
      handle: 'athlete-endorsement',
      title: 'DeMarcus Lawrence chooses DrinkSip',
      subtitle: 'Professional Athletes Trust DrinkSip',
      color: '#000',
      video: 'https://cdn.shopify.com/videos/c/o/v/bdb0eceb57d04d56823c2dc8b1be034a.mp4',
      type: 'video'
    }
  ];

  // Create showcase carousel data from products with correct image URLs
  const showcaseProducts = [
    // Core Series
    {
      id: 'showcase-hazy-ipa',
      handle: 'hazy-ipa',
      title: 'Hazy IPA',
      subtitle: 'Core Series',
      description: 'Our flagship non-alcoholic beer with bold hop flavor and crisp finish.',
      features: ['Real Beer Taste', 'Contains Less Than 0.5% ABV', 'Lower Calories', 'Natural Ingredients'],
      color: '#E8B122',
      image: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Hazy_IPA_0645f5ce-2ec5-4fda-87ee-fb36a4ee4295.png?v=1759017824'
    },
    // Refresher Series
    {
      id: 'showcase-watermelon',
      handle: 'watermelon-refresher',
      title: 'Watermelon',
      subtitle: 'Refresher Series',
      description: 'Light and refreshing with real watermelon extract.',
      features: ['Real Fruit Extract', 'Contains Less Than 0.5% ABV', 'Crisp & Refreshing', 'Natural Flavors'],
      color: '#F05757',
      image: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Watermelon_Refresher_e64ca8fe-8af8-43b5-8b3a-d20dc04152c2.png?v=1759017823'
    },
    {
      id: 'showcase-lemon-lime',
      handle: 'lemon-lime-refresher',
      title: 'Lemon Lime',
      subtitle: 'Refresher Series',
      description: 'Crisp and refreshing with real citrus extract.',
      features: ['Real Citrus Extract', 'Contains Less Than 0.5% ABV', 'Crisp & Clean', 'Natural Flavors'],
      color: '#32CD32',
      image: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Lemon_Lime_Refresher_9565ca39-8832-48ab-8c6b-bcd0899f87e9.png?v=1759017824'
    },
    {
      id: 'showcase-blood-orange',
      handle: 'blood-orange-refresher',
      title: 'Blood Orange',
      subtitle: 'Refresher Series',
      description: 'Citrusy and bright with real blood orange extract.',
      features: ['Real Blood Orange Extract', 'Contains Less Than 0.5% ABV', 'Citrusy & Bright', 'Natural Flavors'],
      color: '#ED5335',
      image: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Blood_Orange_Refresher_82f1cfff-dfdd-44c5-bb02-6f8e74183f36.png?v=1759017824'
    },
    // Artist Series
    {
      id: 'showcase-311',
      handle: '311-hazy-ipa',
      title: '311 Hazy IPA',
      subtitle: 'Artist Series',
      description: 'Limited collaboration with 311 featuring bold hop character.',
      features: ['Limited Edition', 'Artist Collaboration', 'Contains Less Than 0.5% ABV', 'Premium Quality'],
      color: '#1E3A8A',
      image: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/311_Hazy_IPA_607644d9-92cb-4a02-af68-0eb18d34063a.png?v=1759017824'
    },
    {
      id: 'showcase-deftones',
      handle: 'deftones-tone-zero-lager',
      title: 'Deftones Tone Zero',
      subtitle: 'Artist Series',
      description: 'Smooth lager collaboration with Deftones.',
      features: ['Limited Edition', 'Artist Collaboration', 'Contains Less Than 0.5% ABV', 'Smooth Lager'],
      color: '#000000',
      image: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Deftones_Tone_Zero_Lager_dcc52426-36ee-42ee-a3b5-b49f7d2d7480.png?v=1759017824'
    }
  ];

  return (
    <>
      {/* Brand Intro - Entry/Loading Screen */}
      {showBrandIntro && (
        <BrandIntro onComplete={handleIntroComplete} />
      )}
      
      {/* Only show main content after intro completes */}
      {!showBrandIntro && (
        <div data-rebuild={`HOT-RELOAD-TEST-v13-${Date.now()}-${Math.random()}-ALL-PRODUCTS-${Date.now()}`} style={{background: '#000', color: '#fff', minHeight: '100vh', margin: 0, padding: 0, width: '100%', overflow: 'hidden'}}>
          {/* Hero Carousel - BodyArmor Style - Full Viewport */}
          <HeroCarousel slides={heroSlides} />

      {/* KILLER Mobile-Only Showcase - Next Level Design */}
      <MobileKillerShowcase products={showcaseProducts} />

      {/* Desktop Product Showcase Carousel - Hidden on Mobile */}
      <div className="desktop-showcase">
        <ProductShowcaseCarousel products={showcaseProducts} />
      </div>

      {/* CSS to control mobile/desktop display */}
      <style>
        {`
          /* Show desktop showcase only on desktop */
          .desktop-showcase {
            display: block;
          }
          
          @media (max-width: 767px) {
            .desktop-showcase {
              display: none !important;
            }
          }
        `}
      </style>

      {/* Artist Series Spotlight - Limited Edition */}
      {artistProducts.length > 0 && (
        <section style={{
          width: '100%',
          padding: '6rem 0',
          background: '#111',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 2rem',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              color: '#fff'
            }}>
              Artist Series
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#888',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 900,
              marginBottom: '4rem'
            }}>
              Limited Edition Collaborations
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {artistProducts.slice(0, 2).map((product) => {
                const color = getAccentHexForProduct(product.handle, product.title, product.tags, product.metafields);
  return (
                  <div key={product.id} style={{
                    background: color,
                    borderRadius: '15px',
                    padding: '3rem 2rem',
                    color: '#fff',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                    <h3 style={{
                      fontSize: '1.8rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      marginBottom: '1rem',
                      lineHeight: 0.9
                    }}>
                      {product.title}
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      marginBottom: '2rem',
                      opacity: 0.9
                    }}>
                      {product.description}
                    </p>
                    <Link to={`/products/${product.handle}`} style={{
                      display: 'inline-block',
                      padding: '1rem 2rem',
                      border: '2px solid #fff',
                      background: 'transparent',
                      color: '#fff',
                      textDecoration: 'none',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      fontSize: '0.8rem',
                      letterSpacing: '0.1em',
                      borderRadius: '4px',
                      transition: 'all 0.3s ease'
                    }}>
                      Limited Edition
                    </Link>
    </div>
  );
              })}
            </div>
        </div>
        </section>
      )}

      {/* Collection Header - MOBILE OPTIMIZED */}
      <section style={{
        padding: '15.7rem 2rem 1.5rem', // 203px header height + 2.5rem spacing
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
      )}
    </>
  );
}