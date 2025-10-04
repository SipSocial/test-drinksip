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
    { id: 'nutrition', label: 'Nutrition Facts' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div style={{ width: '100%' }}>
      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '3rem',
        borderBottom: '2px solid #f0f0f0',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              color: activeTab === tab.id ? '#000' : '#999',
              borderBottom: activeTab === tab.id ? '3px solid #000' : '3px solid transparent',
              transition: 'all 0.3s ease',
              marginBottom: '-2px'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {activeTab === 'details' && (
          <ProductDetails product={product} />
        )}

        {activeTab === 'nutrition' && (
          <NutritionFacts product={product} />
        )}

        {activeTab === 'ingredients' && (
          <Ingredients product={product} />
        )}

        {activeTab === 'reviews' && (
          <Reviews product={product} />
        )}
      </div>
    </div>
  );
}

// Product Details Component
function ProductDetails({ product }: { product: any }) {
  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {[
          '790MG ELECTROLYTES',
          'NATURAL FLAVORS & SWEETENERS', 
          'NO ARTIFICIAL DYES',
          'VITAMINS',
          'ANTIOXIDANTS VITAMINS A, C, & E',
          'COCONUT WATER'
        ].map((feature, index) => (
          <div key={index} style={{
            padding: '1.5rem',
            background: '#f8f8f8',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderLeft: `4px solid ${product.color}`,
            textAlign: 'center'
          }}>
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}

// Nutrition Facts Component - BodyArmor Style
function NutritionFacts({ product }: { product: any }) {
  const nutritionData = {
    servingSize: '1 Bottle',
    calories: 110,
    totalFat: '0g', 
    sodium: '30mg',
    potassium: '680mg',
    totalCarbs: '25g',
    sugar: '25g',
    addedSugar: '23g',
    protein: '0g',
    microNutrients: [
      { name: 'Vitamin A', amount: '300mcg', daily: '33%' },
      { name: 'Vitamin E', amount: '5mg', daily: '33%' },
      { name: 'Vitamin B6', amount: '1.7mg', daily: '100%' },
      { name: 'Vitamin B12', amount: '2.4mcg', daily: '100%' },
      { name: 'Magnesium', amount: '75mg', daily: '18%' },
      { name: 'Vitamin C', amount: '63mg', daily: '70%' },
      { name: 'Niacin', amount: '16mg', daily: '100%' },
      { name: 'Folate', amount: '400mcg DFE (240mcg folic acid)', daily: '100%' },
      { name: 'Pantothenic Acid', amount: '5mg', daily: '100%' },
      { name: 'Zinc', amount: '7.7mg', daily: '70%' }
    ]
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <h3 style={{ 
        fontSize: '1.2rem', 
        marginBottom: '1.5rem', 
        textTransform: 'uppercase',
        fontWeight: 700,
        color: '#000'
      }}>
        Ingredients 
      </h3>
      <div style={{ 
        background: '#f8f8f8', 
        padding: '2rem', 
        borderRadius: '12px',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          borderBottom: '2px solid #000', 
          paddingBottom: '0.5rem', 
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Serving size {nutritionData.servingSize}</div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #ddd' }}>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Calories</span>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{nutritionData.calories}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '1px solid #ddd' }}>
          <span>Total Fat</span>
          <span>{nutritionData.totalFat}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '1px solid #ddd' }}>
          <span>Sodium</span>
          <span>{nutritionData.sodium}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '1px solid #ddd' }}>
          <span>Potassium</span>
          <span>{nutritionData.potassium}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '1px solid #ddd' }}>
          <span>Total Carbohydrate</span>
          <span>{nutritionData.totalCarbs}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0 0.3rem 1rem', borderBottom: '1px solid #ddd' }}>
          <span>Sugar</span>
          <span>{nutritionData.sugar}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0 0.3rem 2rem', borderBottom: '1px solid #ddd' }}>
          <span>• Includes Added Sugar</span>
          <span>{nutritionData.addedSugar}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '2px solid #000' }}>
          <span>Protein</span>
          <span>{nutritionData.protein}</span>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Micro Nutrients</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 2rem' }}>
            {nutritionData.microNutrients.map((nutrient, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span>{nutrient.name}</span>
                <span>{nutrient.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Ingredients Component - BodyArmor Style  
function Ingredients({ product }: { product: any }) {
  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{ fontSize: '1rem', lineHeight: 1.8, color: '#333' }}>
        Filtered Water, Cane Sugar, Coconut Water Concentrate, Citric Acid, Electrolyte Blend (Dipotassium Phosphate, Magnesium Oxide, Zinc Oxide), Fruit and Vegetable Juice (Color), Vitamins (Ascorbic Acid [Vitamin C], Calcium D-Pantothenate [Vitamin B5], Niacinamide [Vitamin B3], alpha-Tocopheryl Acetate [Vitamin E], Pyridoxine Hydrochloride [Vitamin B6], Vitamin A Palmitate [Vitamin A], Folic Acid [Vitamin B9], Cyanocobalamin [Vitamin B12]), Gum Arabic, Natural Strawberry Banana Flavor with other Natural Flavors, Ester Gum, Stevia Glycosides (Stevia Sweetener), beta-Apo-8'-carotenal (Color).
      </div>
    </div>
  );
}

// Reviews Component - BodyArmor Style
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
    <div style={{ textAlign: 'left' }}>
      <h3 style={{ 
        fontSize: '1.8rem', 
        marginBottom: '2rem', 
        textTransform: 'uppercase',
        fontWeight: 700,
        color: '#000'
      }}>
        Customer Reviews
      </h3>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '2px', marginBottom: '0.5rem' }}>
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ 
              color: i < Math.floor(reviews.average) ? '#FFD700' : '#ddd',
              fontSize: '1.5rem'
            }}>
              ★
            </span>
          ))}
        </div>
        <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>
          {reviews.average}/5
        </div>
        <div style={{ fontSize: '1rem', color: '#666' }}>
          {reviews.total} reviews
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        {reviews.breakdown.map((item) => (
          <div key={item.stars} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            marginBottom: '0.8rem' 
          }}>
            <span style={{ minWidth: '20px' }}>{item.stars} ★</span>
            <div style={{ 
              flex: 1, 
              height: '8px', 
              backgroundColor: '#e0e0e0', 
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: `${(item.count / reviews.total) * 100}%`,
                height: '100%',
                backgroundColor: product.color,
                transition: 'width 0.3s ease'
              }} />
            </div>
            <span style={{ minWidth: '80px', fontSize: '0.9rem', color: '#666' }}>
              {item.count} review{item.count !== 1 ? 's' : ''}
            </span>
          </div>
        ))}
      </div>

      <button style={{
        background: '#000',
        color: '#fff',
        border: 'none',
        padding: '1rem 2rem',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}>
        Write a Review →
      </button>
    </div>
  );
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
      <style>
        {`
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
            pointer-events: none;
            z-index: -1;
            transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          }
          
          .product-image-hover:hover::before {
            opacity: 1;
          }

          /* Mobile-optimized layout - BodyArmor style with overlapping title - PRODUCT PAGES ONLY */
          @media (max-width: 767px) {
            .pdp-hero .pdp-hero-container {
              display: flex !important;
              flex-direction: column !important;
              justify-content: flex-start !important;
              align-items: center !important;
              text-align: center !important;
              padding: 6rem 1rem 1rem !important;
              gap: 0 !important;
              min-height: 100vh !important;
              position: relative !important;
              overflow: visible !important;
            }
            
            .pdp-hero .pdp-hero-text {
              position: absolute !important;
              top: 35% !important;
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
              font-size: clamp(4rem, 14vw, 6rem) !important;
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
              margin-top: 0 !important;
              animation: canSlideInFromLeft 0.8s cubic-bezier(0.23, 1, 0.32, 1) 1.0s both !important;
            }
            
            .pdp-hero .pdp-hero-image > div {
              width: 100% !important;
              display: flex !important;
              justify-content: center !important;
            }
            
            .pdp-hero .pdp-hero-image img {
              max-width: 70vw !important;
              height: auto !important;
              max-height: 60vh !important;
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
              bottom: 21vh !important;
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
              bottom: 1vh !important;
              left: 50% !important;
              transform: translateX(-50%) !important;
              display: flex !important;
              flex-direction: column !important;
              gap: 1rem !important;
              width: 100% !important;
              max-width: 320px !important;
              z-index: 4 !important;
              padding: 0 2rem !important;
              animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) 2.0s both !important;
            }
            
            /* Shop Now Button - White with product color text */
            .pdp-hero .pdp-buttons-animate .shop-now-btn {
              width: 140% !important;
              padding: 0.8rem 2rem !important;
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
           
           /* Desktop - PRODUCT PAGES ONLY */
           @media (min-width: 768px) {
             .pdp-hero .pdp-hero-container {
               padding-top: 0px !important;
               transform: translateY(-10vh) !important;
             }
             
             /* Desktop: Show multiple cans, hide single can */
             .desktop-product-image {
               display: block !important;
             }
             
             .mobile-product-image {
               display: none !important;
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
          <div className="pdp-hero-text" style={{
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
                fontWeight: 600
              }}
            >
              {product.series}
            </div>
            <h1 
              className="pdp-title-animate"
              style={{
                fontSize: 'clamp(4rem, 8vw, 6.5rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                marginBottom: '2rem',
                color: '#fff'
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
                 maxWidth: '500px'
               }}
             >
               {product.description}
             </p>

             {/* Product Chips - Mobile Only */}
             <div 
               className="pdp-chips-animate"
               style={{
                 display: 'none' // Hidden on desktop, shown on mobile via CSS
               }}
             >
               {getProductChips(product.handle).map((chip, index) => (
                 <span
                   key={chip}
                   className="product-chip"
                   style={{
                     color: product.color
                   }}
                 >
                   {chip}
                 </span>
               ))}
             </div>
 
             <div 
               className="pdp-buttons-animate"
              style={{ 
                display: 'flex', 
                gap: '1.5rem', 
                flexWrap: 'wrap', 
                marginBottom: '2rem'
              }}
            >
              <button 
                className="shop-now-btn"
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
                Shop Now
              </button>
              <Link 
                className="find-near-me-btn"
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
                FIND IT NEAR ME →
              </Link>
            </div>
          </div>

          {/* Right: Product Image */}
          <div className="pdp-hero-image" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            height: '100%'
          }}>
            {product.handle === 'watermelon-refresher' && (
              <div style={{
                position: 'relative',
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
              <div>
                {/* Desktop: Multiple cans */}
                <img 
                  src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/hazy-cans.png?v=1759269017"
                  alt="DrinkSip Hazy IPA"
                  className="product-image-hover desktop-product-image"
                  style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: 'auto',
                    filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4))',
                    cursor: 'pointer',
                    transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
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
