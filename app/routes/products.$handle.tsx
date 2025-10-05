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

// Product-specific chips based on flavor profiles
function getProductChips(handle: string): string[] {
  const chipMap: Record<string, string[]> = {
    'hazy-ipa': ['Hoppy', 'Hazy', 'Delicious'],
    'watermelon-refresher': ['Tart', 'Refreshing', 'Delicious'],
    'blood-orange-refresher': ['Citrusy', 'Bright', 'Delicious'],
    'lemon-lime-refresher': ['Crisp', 'Zesty', 'Delicious'],
    '311-hazy-ipa': ['Bold', 'Limited', 'Hoppy'],
    'deftones-tone-zero-lager': ['Smooth', 'Limited', 'Premium']
  };
  
  return chipMap[handle] || ['Refreshing', 'Premium', 'Delicious'];
}

// Product Tabs Component - BodyArmor Style
function ProductTabs({ product }: { product: any }) {
  const [activeTab, setActiveTab] = useState('details');

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div style={{ 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '0',
      transition: 'none !important',
      animation: 'none !important'
    }} className="pdp-tabs-container">
      {/* Tab Navigation - Clean style with underline on selected */}
      <div className="pdp-tab-navigation" style={{
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '2rem',
        flexWrap: 'nowrap',
        gap: '2.5rem',
        flexShrink: 0,
        overflowX: 'auto',
        overflowY: 'hidden'
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem 0',
              fontSize: '0.9rem',
              fontWeight: activeTab === tab.id ? 900 : 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              color: activeTab === tab.id ? '#fff' : 'rgba(255, 255, 255, 0.5)',
              borderBottom: activeTab === tab.id ? '3px solid #fff' : 'none',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)';
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content - Fixed height to prevent shift */}
      <div style={{ 
        maxWidth: '100%',
        height: '350px',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: activeTab === 'details' ? 1 : 0,
          pointerEvents: activeTab === 'details' ? 'auto' : 'none',
          transition: 'none'
        }}>
          <ProductDetails product={product} />
        </div>

        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: activeTab === 'nutrition' ? 1 : 0,
          pointerEvents: activeTab === 'nutrition' ? 'auto' : 'none',
          transition: 'none'
        }}>
          <NutritionFacts product={product} />
        </div>

        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: activeTab === 'ingredients' ? 1 : 0,
          pointerEvents: activeTab === 'ingredients' ? 'auto' : 'none',
          transition: 'none'
        }}>
          <Ingredients product={product} />
        </div>

        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: activeTab === 'reviews' ? 1 : 0,
          pointerEvents: activeTab === 'reviews' ? 'auto' : 'none',
          transition: 'none'
        }}>
          <Reviews product={product} />
        </div>
      </div>
      
      {/* Custom Scrollbar */}
      <style>
        {`
          .pdp-tabs-container,
          .pdp-tabs-container *,
          .pdp-desktop-tabs-right,
          .pdp-desktop-tabs-right * {
            transition: none !important;
            animation: none !important;
          }
          
          .pdp-desktop-tabs-right div::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          
          .pdp-desktop-tabs-right div::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
          }
          
          .pdp-desktop-tabs-right div::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 3px;
          }
          
          .pdp-desktop-tabs-right div::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
          }
          
          /* Hide scrollbar for tab navigation */
          .pdp-tabs-container > div:first-of-type::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
}

// Product Details Component
function ProductDetails({ product }: { product: any }) {
  const features = [
    '≤ 0.5% ABV',
    'NATURAL FLAVORS & SWEETENERS', 
    'NO ARTIFICIAL DYES',
    'REAL INGREDIENTS',
    'PREMIUM QUALITY',
    'CRAFT BREWED'
  ];

  return (
    <div style={{ maxWidth: '100%', width: '100%' }}>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem'
      }}>
        {features.map((feature, index) => (
          <li key={index} style={{
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: '1.05rem',
            letterSpacing: '0.02em',
            borderBottom: index === features.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 1)',
            paddingBottom: '0.6rem',
            color: '#fff'
          }}>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Nutrition Facts Component
function NutritionFacts({ product }: { product: any }) {
  const nutritionData = [
    { label: 'Serving Size', value: '1 Can (12 fl oz)' },
    { label: 'Calories', value: '60' },
    { label: 'Total Fat', value: '0g' },
    { label: 'Sodium', value: '10mg' },
    { label: 'Total Carbohydrate', value: '12g' },
    { label: 'Sugars', value: '10g' },
    { label: 'Protein', value: '0g' }
  ];

  return (
    <div style={{ padding: 0, margin: 0 }}>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem'
      }}>
        {nutritionData.map((item, index) => (
          <li key={index} style={{
            fontWeight: 900,
            textTransform: 'uppercase',
            fontSize: '0.9rem',
            letterSpacing: '0.08em',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            paddingBottom: '0.6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#fff'
          }}>
            <span>{item.label}</span>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Ingredients Component
function Ingredients({ product }: { product: any }) {
  return (
    <div style={{ padding: 0, margin: 0 }}>
      <p style={{ 
        fontSize: '0.95rem', 
        lineHeight: 1.6, 
        color: 'rgba(255, 255, 255, 0.95)',
        margin: 0,
        padding: 0
      }}>
        Water, Malted Barley, Hops, Yeast, Natural Flavors. Contains less than 0.5% alcohol by volume.
      </p>
    </div>
  );
}

// Reviews Component
function Reviews({ product }: { product: any }) {
  const reviews = {
    average: 4.6,
    total: 104,
    breakdown: [
      { stars: 5, count: 86 },
      { stars: 4, count: 7 },
      { stars: 3, count: 2 },
      { stars: 2, count: 1 },
      { stars: 1, count: 8 }
    ]
  };

  return (
    <div style={{ padding: 0, margin: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '2px' }}>
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ 
              color: i < Math.floor(reviews.average) ? '#FFD700' : 'rgba(255, 255, 255, 0.3)',
              fontSize: '1.1rem'
            }}>
              ★
            </span>
          ))}
        </div>
        <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#fff' }}>
          {reviews.average}/5
        </div>
        <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)' }}>
          ({reviews.total} reviews)
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        {reviews.breakdown.map((item) => (
          <div key={item.stars} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.6rem', 
            marginBottom: '0.5rem'
          }}>
            <span style={{ minWidth: '45px', color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>{item.stars} ★</span>
            <div style={{ 
              flex: 1, 
              height: '5px', 
              backgroundColor: 'rgba(255, 255, 255, 0.2)', 
              borderRadius: '2.5px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: `${(item.count / reviews.total) * 100}%`,
                height: '100%',
                backgroundColor: '#fff',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <span style={{ minWidth: '45px', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.8)', textAlign: 'right' }}>
              {item.count}
            </span>
          </div>
        ))}
      </div>

      <button style={{
        background: '#fff',
        color: product.color,
        border: '3px solid #fff',
        padding: '0.8rem 1.6rem',
        borderRadius: '8px',
        fontSize: '0.8rem',
        fontWeight: 900,
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        letterSpacing: '0.1em'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = '#fff';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#fff';
        e.currentTarget.style.color = product.color;
      }}>
        Write a Review
      </button>
    </div>
  );
}

export default function ProductPage() {
    const {product, recommendations} = useLoaderData<typeof loader>();

  return (
    <div className="pdp-page-container" style={{
      background: '#000',
      color: '#fff',
      // scrollSnapType: 'y mandatory', // DISABLED - No more snap scroll
      minHeight: '100vh',
      width: '100vw',
      overflowY: 'auto',
      margin: '0',
      padding: '0',
      paddingTop: '203px', // Add padding for fixed desktop header
      // position: 'fixed', // REMOVED - This was causing scrolling issues
      // top: '0',
      // left: '0',
      // zIndex: 10
    }}>
      <style>
        {`
            /* Responsive padding for fixed header */
            @media (max-width: 767px) {
              .pdp-page-container {
                padding-top: 120px !important;
              }
            }
            
            @media (min-width: 768px) {
              .pdp-page-container {
                padding-top: 203px !important;
              }
            }
            
            /* Desktop PDP Title Animation - Comes up from bottom */
            @keyframes titleSlideUp {
              0% {
                opacity: 0;
                transform: translate(-50%, 20%);
              }
              100% {
                opacity: 1;
                transform: translate(-50%, -50%);
              }
            }
            
            /* Desktop PDP Can Animation - Slides in from left with power */
            @keyframes canSlideInLeft {
              0% {
                opacity: 0;
                transform: translateX(-150px) scale(0.9);
              }
              60% {
                transform: translateX(10px) scale(1.02);
              }
              100% {
                opacity: 1;
                transform: translateX(0) scale(1);
              }
            }
            
            /* Desktop PDP Content Animation - Fade in after can */
            @keyframes contentFadeIn {
              0% {
                opacity: 0;
                transform: translateY(20px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            /* Mobile PDP Title Animation */
            @keyframes titleSlideFromCenter {
              0% {
                opacity: 0;
                transform: translateY(20vh) scale(0.8);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            
            /* Mobile PDP Can Animation - Slides in from left */
            @keyframes canSlideInFromLeft {
              0% {
                opacity: 0;
                transform: translateX(-100px);
              }
              100% {
                opacity: 1;
                transform: translateX(0);
              }
            }
            
            /* Mobile PDP Chips & Buttons Animation - Fade in from bottom */
            @keyframes fadeInUp {
              0% {
                opacity: 0;
                transform: translateY(20px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
          
          .product-image-hover {
            position: relative;
          }

          /* Mobile-optimized layout - BodyArmor style with overlapping title - PRODUCT PAGES ONLY */
          @media (max-width: 767px) {
            .pdp-hero .pdp-hero-container {
              display: flex !important;
              flex-direction: column !important;
              justify-content: flex-start !important;
              align-items: center !important;
              text-align: center !important;
              padding: 4rem 1rem 2rem !important;
              gap: 0 !important;
              min-height: 100vh !important;
              position: relative !important;
              overflow: visible !important;
            }
            
            .pdp-hero .pdp-hero-text {
              position: absolute !important;
              top: 28% !important;
              left: 50% !important;
              transform: translate(-50%, -50%) !important;
              width: 100% !important;
              z-index: 1 !important;
              pointer-events: none !important;
            }
            
            /* Hide series label on mobile - it will be in the next section */
            .pdp-hero .pdp-series-animate {
              display: none !important;
            }
            
            .pdp-hero .pdp-title-animate {
              font-size: clamp(3.5rem, 12vw, 5rem) !important;
              line-height: 0.85 !important;
              margin: 0 !important;
              padding: 0 1rem !important;
              font-weight: 900 !important;
              color: #fff !important;
              text-align: center !important;
              width: 100% !important;
              display: block !important;
              text-transform: uppercase !important;
              letter-spacing: -0.02em !important;
              animation: titleSlideFromCenter 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.2s both !important;
            }
            
            /* Hide description on mobile */
            .pdp-hero .pdp-description-animate {
              display: none !important;
            }
            
            .pdp-hero .pdp-hero-image {
              position: relative !important;
              width: 100% !important;
              z-index: 10 !important;
              display: flex !important;
              justify-content: center !important;
              align-items: center !important;
              padding: 0 !important;
              margin-top: 8vh !important;
              animation: canSlideInFromLeft 0.8s cubic-bezier(0.23, 1, 0.32, 1) 1.0s both !important;
            }
            
            .pdp-hero .pdp-hero-image > div {
              width: 100% !important;
              display: flex !important;
              justify-content: center !important;
            }
            
            .pdp-hero .pdp-hero-image img {
              max-width: 65vw !important;
              height: auto !important;
              max-height: 45vh !important;
              object-fit: contain !important;
            }
            
            /* Mobile: Show single can, hide multiple cans */
            .desktop-product-image {
              display: none !important;
            }
            
            .mobile-product-image {
              display: block !important;
            }
            
            /* Product chips in single horizontal row */
            .pdp-hero .pdp-chips-animate {
              position: absolute !important;
              bottom: 26vh !important;
              left: 50% !important;
              transform: translateX(-50%) !important;
              display: flex !important;
              gap: 0.5rem !important;
              justify-content: center !important;
              flex-wrap: nowrap !important;
              z-index: 4 !important;
              width: 100% !important;
              max-width: 90% !important;
              padding: 0 1rem !important;
              animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) 1.8s both !important;
            }
            
            .pdp-hero .product-chip {
              background: rgba(255, 255, 255, 0.9) !important;
              backdrop-filter: blur(10px) !important;
              -webkit-backdrop-filter: blur(10px) !important;
              padding: 0.8rem 1.2rem !important;
              border-radius: 25px !important;
              font-size: 0.8rem !important;
              font-weight: 600 !important;
              text-transform: uppercase !important;
              letter-spacing: 0.05em !important;
              border: none !important;
              opacity: 1 !important;
              white-space: nowrap !important;
              flex-shrink: 0 !important;
              flex: 1 !important;
              text-align: center !important;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
            }
            
            /* Buttons at the bottom but within viewport */
            .pdp-hero .pdp-buttons-animate {
              position: absolute !important;
              bottom: 12vh !important;
              left: 50% !important;
              transform: translateX(-50%) !important;
              display: flex !important;
              flex-direction: column !important;
              gap: 0.75rem !important;
              width: 100% !important;
              max-width: 320px !important;
              z-index: 4 !important;
              padding: 0 2rem !important;
              animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) 2.0s both !important;
            }
            
            /* Shop Now Button - White with product color text */
            .pdp-hero .pdp-buttons-animate .shop-now-btn {
              width: 140% !important;
              padding: 0.75rem 1.5rem !important;
              text-align: center !important;
              border-radius: 50px !important;
              font-weight: 700 !important;
              font-size: 1rem !important;
              text-transform: uppercase !important;
              letter-spacing: 0.1em !important;
              background: rgba(255, 255, 255, 0.95) !important;
              border: none !important;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
              opacity: 1 !important;
              cursor: pointer !important;
              backdrop-filter: blur(10px) !important;
              -webkit-backdrop-filter: blur(10px) !important;
              position: relative !important;
              left: 50% !important;
              margin-left: -70% !important;
            }
            
            /* Find Near Me Link - Simple text styling */
            .pdp-hero .pdp-buttons-animate .find-near-me-btn {
              width: 100% !important;
              padding: 0.5rem 0 !important;
              text-align: center !important;
              border-radius: 0 !important;
              font-weight: 500 !important;
              font-size: 0.85rem !important;
              text-transform: uppercase !important;
              letter-spacing: 0.1em !important;
              background: transparent !important;
              color: rgba(255, 255, 255, 0.8) !important;
              border: none !important;
              box-shadow: none !important;
              backdrop-filter: none !important;
              -webkit-backdrop-filter: none !important;
              opacity: 1 !important;
              text-decoration: none !important;
              display: block !important;
              margin-top: 0 !important;
            }
          }
          
          /* Extra small screens (iPhone SE, etc.) - Better spacing */
          @media (max-width: 390px) {
            .pdp-hero .pdp-hero-text {
              top: 25% !important;
            }
            
            .pdp-hero .pdp-title-animate {
              font-size: clamp(3rem, 11vw, 4.5rem) !important;
            }
            
            .pdp-hero .pdp-hero-image {
              margin-top: 6vh !important;
            }
            
            .pdp-hero .pdp-hero-image img {
              max-width: 60vw !important;
              max-height: 40vh !important;
            }
            
            .pdp-hero .pdp-chips-animate {
              bottom: 24vh !important;
              gap: 0.4rem !important;
            }
            
            .pdp-hero .product-chip {
              padding: 0.7rem 1rem !important;
              font-size: 0.75rem !important;
            }
            
            .pdp-hero .pdp-buttons-animate {
              bottom: 10vh !important;
              gap: 0.6rem !important;
            }
            
            .pdp-hero .pdp-buttons-animate .shop-now-btn {
              padding: 0.7rem 1.25rem !important;
              font-size: 0.9rem !important;
            }
          }
           
           /* Desktop - PRODUCT PAGES ONLY */
           @media (min-width: 768px) {
             .pdp-hero .pdp-hero-container {
               /* Responsive padding handled by inline clamp() */
             }
             
             /* Desktop: Show split-screen layout with tabs */
             .pdp-desktop-image-left {
               display: flex !important;
               transform: translateX(-25%) translateY(-8rem) !important;
             }
             
             .pdp-desktop-tabs-right {
               display: grid !important;
               animation: contentFadeIn 0.6s ease 1.1s both !important;
             }
             
             /* Desktop: Show chips */
             .pdp-desktop-chips {
               display: flex !important;
               animation: contentFadeIn 0.6s ease 1.1s both !important;
             }
             
             /* Desktop: Hide mobile content */
             .pdp-mobile-content {
               display: none !important;
             }
             
             /* Desktop: Show multiple cans, hide single can */
             .desktop-product-image {
               display: block !important;
             }
             
             .mobile-product-image {
               display: none !important;
             }
             
             /* Desktop Animations */
             @keyframes fadeInLeft {
               from {
                 opacity: 0;
                 transform: translateX(-40px);
               }
               to {
                 opacity: 1;
                 transform: translateX(0);
               }
             }
             
             @keyframes fadeInRight {
               from {
                 opacity: 0;
                 transform: translateX(40px);
               }
               to {
                 opacity: 1;
                 transform: translateX(0);
               }
             }
             
             /* Desktop Product Image - No hover effects */
             .pdp-desktop-image-left .product-image-hover {
               pointer-events: none;
             }
           }
           
           /* Mobile - PRODUCT PAGES ONLY */
           @media (max-width: 767px) {
             /* Override grid layout on mobile */
             .pdp-hero .pdp-hero-container {
               display: block !important;
               position: relative !important;
               padding: 0 !important;
               grid-template-columns: none !important;
               gap: 0 !important;
             }
             
             /* Hide desktop layout on mobile */
             .pdp-desktop-image-left {
               display: none !important;
             }
             
             .pdp-desktop-tabs-right {
               display: none !important;
             }
             
             /* Show mobile content */
             .pdp-mobile-content {
               display: flex !important;
               flex-direction: column !important;
               justify-content: flex-start !important;
               align-items: center !important;
               position: relative !important;
               width: 100% !important;
               min-height: 100vh !important;
               padding: 6rem 1rem 1rem !important;
             }
             
             /* Remove border from hero section */
             .pdp-hero {
               border: none !important;
               border-bottom: none !important;
               margin-bottom: 0 !important;
               padding-bottom: 0 !important;
             }
             
             /* Show mobile tabs section */
             .pdp-mobile-tabs-section {
               display: block !important;
               border: none !important;
               border-top: none !important;
               margin-top: 0 !important;
               padding-top: 0 !important;
             }
             
             .pdp-mobile-tabs-section *,
             .pdp-hero * {
               border-top: none !important;
               border-bottom: none !important;
             }
             
             /* Mobile tabs styling */
             .pdp-mobile-tabs-section .pdp-tabs-container {
               width: 100%;
             }
             
             .pdp-mobile-tabs-section .pdp-tab-navigation {
               gap: 1rem !important;
               overflow-x: visible !important;
               margin-bottom: 1.25rem !important;
               margin-top: 0 !important;
               padding-top: 0 !important;
             }
             
             .pdp-mobile-tabs-section > div > div > div:first-child {
               gap: 1rem !important;
               overflow-x: visible !important;
               margin-bottom: 1.25rem !important;
               margin-top: 0 !important;
               padding-top: 0 !important;
             }
             
             .pdp-mobile-tabs-section .pdp-tabs-container {
               margin-top: 0 !important;
               padding-top: 0 !important;
               margin: 0 !important;
               padding: 0 !important;
             }
             
             .pdp-mobile-tabs-section .pdp-tabs-container > * {
               margin-top: 0 !important;
               padding-top: 0 !important;
             }
             
             .pdp-mobile-tabs-section > div > div {
               margin-top: 0 !important;
               padding-top: 0 !important;
             }
             
             .pdp-mobile-tabs-section > div > div > * {
               margin-top: 0 !important;
               padding-top: 0 !important;
             }
             
             .pdp-mobile-tabs-section button {
               font-size: 0.7rem !important;
               padding: 0.5rem 0 !important;
               white-space: nowrap !important;
               flex-shrink: 0 !important;
               letter-spacing: 0.05em !important;
             }
             
             .pdp-mobile-tabs-section h2,
             .pdp-mobile-tabs-section h3 {
               font-size: 1.1rem !important;
             }
             
             .pdp-mobile-tabs-section p,
             .pdp-mobile-tabs-section li {
               font-size: 0.9rem !important;
             }
             
             /* Mobile tab content - auto height */
             .pdp-mobile-tabs-section > div > div > div:nth-child(2) {
               height: auto !important;
               min-height: 0 !important;
               padding-top: 0 !important;
               overflow: visible !important;
             }
             
             /* Make sure reviews are visible */
             .pdp-mobile-tabs-section > div > div > div:nth-child(2) > div {
               position: relative !important;
               padding-top: 0 !important;
               margin-top: 0 !important;
             }
             
             /* Remove extra spacing from tab content */
             .pdp-mobile-tabs-section > div > div > div:nth-child(2) > div > div,
             .pdp-mobile-tabs-section > div > div > div:nth-child(2) > div > p,
             .pdp-mobile-tabs-section > div > div > div:nth-child(2) > div > ul {
               margin-top: 0 !important;
               padding-top: 0 !important;
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
          padding: 'clamp(8rem, 12vh, 12rem) clamp(2rem, 4vw, 4rem) clamp(4rem, 8vh, 8rem)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(3rem, 6vw, 8rem)',
          alignItems: 'flex-start',
          width: '100%',
          position: 'relative',
          zIndex: 2,
          minHeight: 'calc(100vh - 140px)'
        }}>
          {/* Left: Product Image - DESKTOP ONLY */}
          <div className="pdp-desktop-image-left" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            position: 'relative',
            transform: 'translateX(-25%) translateY(-8rem)',
            isolation: 'isolate',
            gap: '2rem'
          }}>
            {/* Background Title - Behind Can */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '45%',
              transform: 'translate(-50%, -50%)',
              zIndex: -1,
              pointerEvents: 'none',
              textAlign: 'center',
              animation: 'titleSlideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both'
            }}>
              <h2 style={{
                fontSize: 'clamp(5rem, 12vw, 8rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                color: 'rgba(255, 255, 255, 1)',
                margin: 0,
                whiteSpace: 'nowrap'
              }}>
                {product.title.replace(/\s*Refresher\s*/gi, '')}
              </h2>
            </div>

            {product.handle === 'watermelon-refresher' && (
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '600px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
                animation: 'canSlideInLeft 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both'
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
                    filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4))',
                    transition: 'all 1s ease',
                    transform: 'scale(1.1)',
                    position: 'relative'
                  }}
                />
              </div>
            )}

            {product.handle === 'hazy-ipa' && (
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '600px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
                animation: 'canSlideInLeft 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both'
              }}>
                {/* Desktop: Multiple cans */}
                <img 
                  src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/hazy-cans.png?v=1759269017"
                  alt="DrinkSip Hazy IPA"
                  className="product-image-hover desktop-product-image"
                  style={{
                    width: '100%',
                    maxWidth: '500px',
                    height: 'auto',
                    filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4))',
                    transition: 'all 1s ease',
                    transform: 'scale(1.1)'
                  }}
                />
                {/* Mobile: Single can */}
                <img 
                  src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Hazy_IPA_0645f5ce-2ec5-4fda-87ee-fb36a4ee4295.png?v=1759017824"
                  alt="DrinkSip Hazy IPA"
                  className="product-image-hover mobile-product-image"
                  style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: 'auto',
                    filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4))',
                    cursor: 'pointer',
                    transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                    display: 'none'
                  }}
                />
              </div>
            )}

            {product.handle === 'blood-orange-refresher' && (
              <div>
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
              <div>
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
              <div>
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
              <div>
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

            {/* Desktop Chips - Centered below the can */}
            <div className="pdp-desktop-chips" style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              zIndex: 10,
              animation: 'contentFadeIn 0.6s ease 1.1s both'
            }}>
              {getProductChips(product.handle).map((chip) => (
                <span key={chip} style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  padding: '0.8rem 1.2rem',
                  borderRadius: '25px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: product.color,
                  border: 'none',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                }}>
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Product Content with Tabs - DESKTOP ONLY - Homepage Style */}
          <div className="pdp-desktop-tabs-right" style={{
            display: 'grid',
            gridTemplateRows: 'auto auto 1fr auto',
            gap: 'clamp(1rem, 2vh, 2rem)',
            minHeight: '500px',
            maxWidth: '600px',
            padding: '0',
            paddingLeft: 'clamp(2rem, 4vw, 6rem)',
            position: 'relative',
            zIndex: 5,
            animation: 'contentFadeIn 0.6s ease 1.1s both'
          }}>
            {/* DrinkSip Logo */}
            <div style={{
              marginBottom: '0.5rem',
              marginTop: '0',
              lineHeight: 0,
              marginLeft: '0'
            }}>
              <img 
                src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/DrinkSip_Logo_SVG.svg?v=1759624477"
                alt="DrinkSip Logo"
                style={{
                  height: '120px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>

            {/* Series Label - Anchored to Logo */}
            <div style={{
              fontSize: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              opacity: 0.9,
              fontWeight: 600,
              marginTop: '0',
              marginBottom: '0.5rem'
            }}>
              {product.series}
            </div>

            {/* Tabs Component - Integrated into the flow */}
            <div style={{ width: '100%' }}>
              <ProductTabs product={product} />
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              <button style={{
                padding: '1.2rem 2.5rem',
                border: '3px solid #fff',
                background: '#fff',
                color: product.color,
                textDecoration: 'none',
                fontWeight: 900,
                textTransform: 'uppercase',
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = product.color;
              }}>
                Shop Now
              </button>
              <Link to="/pages/where-to-buy" style={{
                padding: '1.2rem 2.5rem',
                border: '3px solid #fff',
                background: 'transparent',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 900,
                textTransform: 'uppercase',
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                display: 'inline-block',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = product.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#fff';
              }}>
                Find It Near Me
              </Link>
            </div>
          </div>

          {/* Mobile Layout - Keep existing mobile structure */}
          <div className="pdp-mobile-content" style={{ display: 'none' }}>
            {/* Mobile title overlay */}
            <div className="pdp-hero-text">
              <div className="pdp-series-animate" style={{
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '1rem',
                fontWeight: 600
              }}>
                {product.series}
              </div>
              <h1 className="pdp-title-animate" style={{
                fontSize: 'clamp(4rem, 8vw, 6.5rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                marginBottom: '2rem',
                color: '#fff'
              }}>
                {product.title}
              </h1>
              <p className="pdp-description-animate" style={{
                fontSize: '1.3rem',
                lineHeight: 1.5,
                marginBottom: '3rem',
                maxWidth: '500px'
              }}>
                {product.description}
              </p>
            </div>

            {/* Product Chips - Mobile - OUTSIDE pdp-hero-text */}
            <div className="pdp-chips-animate">
              {getProductChips(product.handle).map((chip) => (
                <span key={chip} className="product-chip" style={{ color: product.color }}>
                  {chip}
                </span>
              ))}
            </div>

            {/* Buttons - Mobile - OUTSIDE pdp-hero-text */}
            <div className="pdp-buttons-animate">
              <button className="shop-now-btn" style={{
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
              }}>
                Shop Now
              </button>
              <Link className="find-near-me-btn" to="/pages/where-to-buy" style={{
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
              }}>
                FIND IT NEAR ME →
              </Link>
            </div>

            {/* Mobile product image */}
            <div className="pdp-hero-image" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              height: '100%'
            }}>
              {product.handle === 'hazy-ipa' && (
                <img 
                  src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Hazy_IPA_0645f5ce-2ec5-4fda-87ee-fb36a4ee4295.png?v=1759017824"
                  alt="DrinkSip Hazy IPA"
                  className="product-image-hover mobile-product-image"
                  style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: 'auto',
                    filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4))',
                    cursor: 'pointer',
                    transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
                  }}
                />
              )}
              {product.handle === 'watermelon-refresher' && (
                <img 
                  src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Watermelon_Refresher_e64ca8fe-8af8-43b5-8b3a-d20dc04152c2.png?v=1759017823"
                  alt="DrinkSip Watermelon Refresher"
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
              )}
              {product.handle === 'blood-orange-refresher' && (
                <img 
                  src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Blood_Orange_Refresher_82f1cfff-dfdd-44c5-bb02-6f8e74183f36.png?v=1759017824"
                  alt="DrinkSip Blood Orange Refresher"
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
              )}
              {product.handle === 'lemon-lime-refresher' && (
                <img 
                  src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Lemon_Lime_Refresher_9565ca39-8832-48ab-8c6b-bcd0899f87e9.png?v=1759017824"
                  alt="DrinkSip Lemon Lime Refresher"
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
              )}
              {product.handle === '311-hazy-ipa' && (
                <img 
                  src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/311_Hazy_IPA_607644d9-92cb-4a02-af68-0eb18d34063a.png?v=1759017824"
                  alt="DrinkSip x 311 Hazy IPA"
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
              )}
              {(product.handle === 'deftones-tone-zero' || product.handle === 'deftones-tone-zero-lager') && (
                <img 
                  src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Deftones_Tone_Zero_Lager_dcc52426-36ee-42ee-a3b5-b49f7d2d7480.png?v=1759017824"
                  alt="DrinkSip x Deftones Tone Zero Lager"
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
              )}
            </div>
          </div>
          </div>
        </section>

        {/* Mobile Tabs Section - Below PDP Hero */}
        <section className="pdp-mobile-tabs-section" style={{
          background: product.color,
          padding: '0 1.5rem 2rem',
          display: 'none',
          borderTop: 'none',
          marginTop: 0
        }}>
          <img 
            src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/DrinkSip_Logo_SVG.svg?v=1759624477"
            alt="DrinkSip"
            style={{
              height: '80px',
              width: 'auto',
              marginBottom: '0.5rem',
              display: 'block'
            }}
          />
          <div style={{
            fontSize: '0.9rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#fff',
            marginBottom: '1rem',
            lineHeight: 1
          }}>
            {product.title.includes('Refresher') ? 'Refresher Series' : 
             product.title.includes('311') || product.title.includes('Deftones') ? 'Artist Series' : 
             'Core Series'}
          </div>
          
          <ProductTabs product={product} />
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
