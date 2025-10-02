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
    const [currentSection, setCurrentSection] = useState(0);


  // Snap scroll sections
  const sections = [
    'hero',
    'details', 
    'nutrition',
    'story',
    'subscription'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionIndex = Math.floor(scrollPosition / windowHeight);
      setCurrentSection(Math.min(sectionIndex, sections.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div style={{
      background: '#000',
      color: '#fff',
      scrollSnapType: 'y mandatory',
      height: '100vh',
      width: '100vw',
      overflowY: 'scroll',
      margin: '0',
      padding: '0',
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: 10
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
        `}
      </style>
      
      {/* Black Header for PDP */}
      <WhiteHeader />
      
      {/* Close Button - Positioned to work with black header */}
      <Link
        to="/"
        style={{
          position: 'fixed',
          top: '124px', // Positioned below the reduced height header
          right: '2rem',
          zIndex: 1001,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          backdrop: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        ×
      </Link>

      {/* Section Navigation Dots */}
      <div style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            border: '2px solid #fff',
            background: currentSection === index ? '#fff' : 'transparent',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
            }}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="pdp-hero" style={{
        background: product.color,
        scrollSnapAlign: 'start',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        margin: '0',
        padding: '0'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          width: '100%',
          paddingTop: '114px' // Adjusted for reduced header height
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
                onClick={() => scrollToSection(4)}
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

      {/* Details Section */}
      <section style={{
        background: '#000',
        minHeight: '100vh',
        scrollSnapAlign: 'start',
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          alignItems: 'center',
          width: '100%'
        }}>
          <div>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              marginBottom: '2rem',
              color: '#fff'
            }}>
              Why It Works
            </h2>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {product.features.map((feature: string, index: number) => (
                <li key={index} style={{
                  padding: '1.5rem 0',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: '1.1rem',
                  letterSpacing: '0.08em',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    background: product.color,
                    borderRadius: '50%',
                    flexShrink: 0
                  }} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div style={{
            background: `linear-gradient(135deg, ${product.color}20, transparent)`,
            borderRadius: '20px',
            padding: '3rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🍺</div>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              marginBottom: '1rem',
              color: '#fff'
            }}>
              Premium Quality
            </h3>
            <p style={{
              color: '#ccc',
              fontSize: '1.1rem',
              lineHeight: 1.5
            }}>
              Crafted with the finest ingredients and brewing techniques to deliver an authentic beer experience without the alcohol.
            </p>
          </div>
        </div>
      </section>

      {/* Nutrition Section */}
      <section style={{
        background: '#111',
        minHeight: '100vh',
        scrollSnapAlign: 'start',
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          width: '100%',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            marginBottom: '4rem',
            color: '#fff'
          }}>
            Nutrition Facts
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {/* Nutrition Facts */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '3rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                marginBottom: '2rem',
                color: product.color
              }}>
                Per 12 FL OZ
              </h3>
              <div style={{
                display: 'grid',
                gap: '1rem'
              }}>
                {[
                  { label: 'Calories', value: '25' },
                  { label: 'Total Carbs', value: '6g' },
                  { label: 'Sugars', value: '4g' },
                  { label: 'Sodium', value: '15mg' },
                  { label: 'Alcohol', value: '<0.5%' }
                ].map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '1.1rem',
                    fontWeight: 600
                  }}>
                    <span style={{ color: '#ccc' }}>{item.label}</span>
                    <span style={{ color: '#fff', fontWeight: 900 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '3rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                marginBottom: '2rem',
                color: product.color
              }}>
                Ingredients
              </h3>
              <div style={{
                textAlign: 'left'
              }}>
                {[
                  'Filtered Water',
                  'Malted Barley',
                  'Natural Hop Extract',
                  'Natural Flavors',
                  'Citric Acid',
                  'Potassium Sorbate'
                ].map((ingredient, index) => (
                  <div key={index} style={{
                    padding: '0.75rem 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '1rem',
                    color: '#ccc',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      background: product.color,
                      borderRadius: '50%',
                      flexShrink: 0
                    }} />
                    {ingredient}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section style={{
        background: product.color,
        minHeight: '100vh',
        scrollSnapAlign: 'start',
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          alignItems: 'center',
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8rem'
            }}>
              🍺
            </div>
          </div>
          <div>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              marginBottom: '2rem',
              color: '#fff'
            }}>
              The Story
            </h2>
            <p style={{
              fontSize: '1.3rem',
              lineHeight: 1.6,
              marginBottom: '2rem',
              opacity: 0.95
            }}>
              Born from a passion for authentic beer flavor without compromise. Our master brewers spent years perfecting the process to deliver the full-bodied taste you crave.
            </p>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.6,
              opacity: 0.9
            }}>
              Every sip tells the story of craftsmanship, innovation, and the relentless pursuit of the perfect non-alcoholic beer experience.
            </p>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section style={{
        background: '#000',
        minHeight: '100vh',
        scrollSnapAlign: 'start',
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 2rem',
          textAlign: 'center',
          width: '100%'
        }}>
          <h2 style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
            color: '#fff'
          }}>
            Never Run Out
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: '#ccc',
            marginBottom: '4rem',
            maxWidth: '600px',
            margin: '0 auto 4rem'
          }}>
            Subscribe and save 15% on every order. Skip, pause, or cancel anytime.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {[
              { frequency: 'Every 2 Weeks', savings: '15%', popular: false },
              { frequency: 'Every Month', savings: '15%', popular: true },
              { frequency: 'Every 2 Months', savings: '15%', popular: false }
            ].map((plan, index) => (
              <div key={index} style={{
                background: plan.popular ? product.color : 'rgba(255, 255, 255, 0.05)',
                borderRadius: '20px',
                padding: '2.5rem 2rem',
                border: plan.popular ? `3px solid ${product.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!plan.popular) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!plan.popular) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}>
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#fff',
                    color: '#000',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 900,
                    textTransform: 'uppercase'
                  }}>
                    Most Popular
                  </div>
                )}
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  color: plan.popular ? '#000' : '#fff'
                }}>
                  {plan.frequency}
                </h3>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: plan.popular ? '#000' : product.color,
                  marginBottom: '1rem'
                }}>
                  Save {plan.savings}
                </div>
                <button style={{
                  width: '100%',
                  padding: '1rem',
                  border: plan.popular ? '2px solid #000' : '2px solid #fff',
                  background: plan.popular ? '#000' : 'transparent',
                  color: plan.popular ? '#fff' : '#fff',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  Subscribe Now
                </button>
              </div>
            ))}
          </div>

          <p style={{
            color: '#888',
            fontSize: '0.9rem',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            Free shipping on all subscription orders. Manage your subscription anytime in your account.
          </p>
        </div>
      </section>

      {/* You May Also Like - Fixed at bottom */}
      <section style={{
        background: '#000',
        padding: '6rem 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            marginBottom: '4rem',
            color: '#fff'
          }}>
            You may also like
          </h2>
          
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            paddingBottom: '1rem'
          }}>
            {recommendations.map((rec: any) => {
              // Map product images based on handle
              let imageUrl = '';
              switch(rec.handle) {
                case 'hazy-ipa':
                  imageUrl = 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/hazy-cans.png?v=1759269017';
                  break;
                case 'watermelon-refresher':
                  imageUrl = 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/two-watermelon-cans.png?v=1759269017';
                  break;
                case 'blood-orange-refresher':
                  imageUrl = 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Blood_Orange_Refresher_82f1cfff-dfdd-44c5-bb02-6f8e74183f36.png?v=1759017824';
                  break;
                case 'lemon-lime-refresher':
                  imageUrl = 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Lemon_Lime_Refresher_9565ca39-8832-48ab-8c6b-bcd0899f87e9.png?v=1759017824';
                  break;
                case '311-hazy-ipa':
                  imageUrl = 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/311_Hazy_IPA_607644d9-92cb-4a02-af68-0eb18d34063a.png?v=1759017824';
                  break;
                case 'deftones-tone-zero':
                case 'deftones-tone-zero-lager':
                  imageUrl = 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Deftones_Tone_Zero_Lager_dcc52426-36ee-42ee-a3b5-b49f7d2d7480.png?v=1759017824';
                  break;
                default:
                  imageUrl = `https://via.placeholder.com/400x600/${rec.color.replace('#', '')}/${rec.color === '#E8B122' ? '000' : 'fff'}?text=${encodeURIComponent(rec.title)}`;
              }
              
              return (
                <div key={rec.id} style={{ flex: '0 0 280px' }}>
                  <ProductCard
                    id={rec.id}
                    handle={rec.handle}
                    title={rec.title}
                    image={imageUrl}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
