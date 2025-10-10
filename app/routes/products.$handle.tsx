import React, { useState, useEffect } from 'react';
import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from 'react-router';
import {WhiteHeader} from '~/components/WhiteHeader';
import {ProductCard} from '~/components/ProductCard';
import {PDPHero1920} from '~/components/PDPHero1920';

// Helper function to adjust color lightness
function adjustColorLightness(color: string, adjustment: number): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  const adjustComponent = (component: number) => {
    const adjusted = component + (adjustment * 2.55);
    return Math.max(0, Math.min(255, Math.round(adjusted)));
  };
  
  const newR = adjustComponent(r).toString(16).padStart(2, '0');
  const newG = adjustComponent(g).toString(16).padStart(2, '0');
  const newB = adjustComponent(b).toString(16).padStart(2, '0');
  
  return `#${newR}${newG}${newB}`;
}

export async function loader(args: LoaderFunctionArgs) {
  return {
    product: getMockProduct(args),
    recommendations: getMockRecommendations(),
    allProducts: getAllProducts(), // Add all products for dynamic thumbnails
  };
}

function getMockProduct(args: LoaderFunctionArgs) {
  const {handle} = args.params;
  
  const productMap: Record<string, any> = {
    'hazy-ipa': {
      id: 'gid://shopify/Product/1',
      title: 'Hazy IPA',
      handle: 'hazy-ipa',
      description: 'Our flagship non-alcoholic beer with bold hop flavor and crisp finish.',
      color: '#E8B122',
      series: 'CORE SERIES',
      features: ['≤ 0.5% ABV', 'Natural Flavors', 'No Artificial Dyes', 'Real Ingredients', 'Premium Quality', 'Craft Brewed'],
    },
    'watermelon-refresher': {
      id: 'gid://shopify/Product/2',
      title: 'Watermelon Refresher',
      handle: 'watermelon-refresher',
      description: 'Light and refreshing with natural watermelon flavor.',
      color: '#F05757',
      series: 'REFRESHER SERIES',
      features: ['≤ 0.5% ABV', 'Natural Flavors', 'No Artificial Dyes', 'Real Ingredients', 'Premium Quality', 'Craft Brewed'],
    },
    'blood-orange': {
      id: 'gid://shopify/Product/3',
      title: 'Blood Orange Refresher',
      handle: 'blood-orange-refresher',
      description: 'Vibrant citrus with a bold orange taste.',
      color: '#ED5335',
      series: 'REFRESHER SERIES',
      features: ['≤ 0.5% ABV', 'Natural Flavors', 'No Artificial Dyes', 'Real Ingredients', 'Premium Quality', 'Craft Brewed'],
    },
    'blood-orange-refresher': {
      id: 'gid://shopify/Product/3',
      title: 'Blood Orange Refresher',
      handle: 'blood-orange-refresher',
      description: 'Vibrant citrus with a bold orange taste.',
      color: '#ED5335',
      series: 'REFRESHER SERIES',
      features: ['≤ 0.5% ABV', 'Natural Flavors', 'No Artificial Dyes', 'Real Ingredients', 'Premium Quality', 'Craft Brewed'],
    },
    'lemon-lime': {
      id: 'gid://shopify/Product/4',
      title: 'Lemon Lime Refresher',
      handle: 'lemon-lime-refresher',
      description: 'Zesty lemon lime refreshment.',
      color: '#77C14A',
      series: 'REFRESHER SERIES',
      features: ['≤ 0.5% ABV', 'Natural Flavors', 'No Artificial Dyes', 'Real Ingredients', 'Premium Quality', 'Craft Brewed'],
    },
    'lemon-lime-refresher': {
      id: 'gid://shopify/Product/4',
      title: 'Lemon Lime Refresher',
      handle: 'lemon-lime-refresher',
      description: 'Zesty lemon lime refreshment.',
      color: '#77C14A',
      series: 'REFRESHER SERIES',
      features: ['≤ 0.5% ABV', 'Natural Flavors', 'No Artificial Dyes', 'Real Ingredients', 'Premium Quality', 'Craft Brewed'],
    },
    '311-hazy-ipa': {
      id: 'gid://shopify/Product/5',
      title: 'DrinkSip x 311 Hazy IPA',
      handle: '311-hazy-ipa',
      description: 'Limited collaboration with 311.',
      color: '#1E3A8A',
      series: 'ARTIST SERIES',
      features: ['≤ 0.5% ABV', 'Natural Flavors', 'No Artificial Dyes', 'Real Ingredients', 'Premium Quality', 'Craft Brewed'],
    },
    'deftones-tone-zero-lager': {
      id: 'gid://shopify/Product/6',
      title: 'DrinkSip x Deftones Tone Zero Lager',
      handle: 'deftones-tone-zero-lager',
      description: 'Smooth lager collaboration with Deftones.',
      color: '#2D2D2D',
      series: 'ARTIST SERIES',
      features: ['≤ 0.5% ABV', 'Natural Flavors', 'No Artificial Dyes', 'Real Ingredients', 'Premium Quality', 'Craft Brewed'],
    },
  };

  return productMap[handle || 'hazy-ipa'] || productMap['hazy-ipa'];
}

function getMockRecommendations() {
  return [
    {
      id: 'gid://shopify/Product/1',
      title: 'Hazy IPA',
      handle: 'hazy-ipa',
    },
    {
      id: 'gid://shopify/Product/2',
      title: 'Watermelon Refresher',
      handle: 'watermelon-refresher',
    },
    {
      id: 'gid://shopify/Product/3',
      title: 'Blood Orange Refresher',
      handle: 'blood-orange-refresher',
    },
    {
      id: 'gid://shopify/Product/4',
      title: 'Lemon Lime Refresher',
      handle: 'lemon-lime-refresher',
    },
    {
      id: 'gid://shopify/Product/5',
      title: 'DrinkSip x 311 Hazy IPA',
      handle: '311-hazy-ipa',
    },
    {
      id: 'gid://shopify/Product/6',
      title: 'DrinkSip x Deftones Tone Zero Lager',
      handle: 'deftones-tone-zero-lager',
    },
  ];
}

function getProductImage(handle: string): string {
  const imageMap: Record<string, string> = {
    'hazy-ipa': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Hazy_IPA_0645f5ce-2ec5-4fda-87ee-fb36a4ee4295.png?v=1759017824',
    'watermelon-refresher': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/box-mockup-refresher-watermelon-no-bottom.png?v=1759862531',
    'blood-orange': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Blood_Orange_Refresher_82f1cfff-dfdd-44c5-bb02-6f8e74183f36.png?v=1759017824',
    'blood-orange-refresher': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Blood_Orange_Refresher_82f1cfff-dfdd-44c5-bb02-6f8e74183f36.png?v=1759017824',
    'lemon-lime': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Lemon_Lime_Refresher_9565ca39-8832-48ab-8c6b-bcd0899f87e9.png?v=1759017824',
    'lemon-lime-refresher': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Lemon_Lime_Refresher_9565ca39-8832-48ab-8c6b-bcd0899f87e9.png?v=1759017824',
    '311-hazy-ipa': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/311_Hazy_IPA_607644d9-92cb-4a02-af68-0eb18d34063a.png?v=1759017824',
    'deftones-tone-zero-lager': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Deftones_Tone_Zero_Lager_dcc52426-36ee-42ee-a3b5-b49f7d2d7480.png?v=1759017824',
  };
  return imageMap[handle] || 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Hazy_IPA_0645f5ce-2ec5-4fda-87ee-fb36a4ee4295.png?v=1759017824';
}

function getAllProducts() {
  return [
    {
      id: 'gid://shopify/Product/1',
      title: 'Hazy IPA',
      handle: 'hazy-ipa',
      description: 'Our flagship non-alcoholic beer with bold hop flavor and crisp finish.',
      color: '#E8B122',
      series: 'CORE SERIES',
    },
    {
      id: 'gid://shopify/Product/2',
      title: 'Watermelon Refresher',
      handle: 'watermelon-refresher',
      description: 'Light and refreshing with natural watermelon flavor.',
      color: '#F05757',
      series: 'REFRESHER SERIES',
    },
    {
      id: 'gid://shopify/Product/3',
      title: 'Blood Orange Refresher',
      handle: 'blood-orange-refresher',
      description: 'Vibrant citrus with a bold orange taste.',
      color: '#ED5335',
      series: 'REFRESHER SERIES',
    },
    {
      id: 'gid://shopify/Product/4',
      title: 'Lemon Lime Refresher',
      handle: 'lemon-lime-refresher',
      description: 'Zesty lemon lime refreshment.',
      color: '#77C14A',
      series: 'REFRESHER SERIES',
    },
    {
      id: 'gid://shopify/Product/5',
      title: 'DrinkSip x 311 Hazy IPA',
      handle: '311-hazy-ipa',
      description: 'Limited collaboration with 311.',
      color: '#1E3A8A',
      series: 'ARTIST SERIES',
    },
    {
      id: 'gid://shopify/Product/6',
      title: 'DrinkSip x Deftones Tone Zero Lager',
      handle: 'deftones-tone-zero-lager',
      description: 'Smooth lager collaboration with Deftones.',
      color: '#2D2D2D',
      series: 'ARTIST SERIES',
    },
  ];
}

function getProductChips(handle: string): string[] {
  const chipsMap: Record<string, string[]> = {
    'hazy-ipa': ['HOPPY', 'HAZY', 'DELICIOUS', 'CRISP', 'CRAFT', 'BOLD'],
    'watermelon-refresher': ['REFRESHING', 'FRUITY', 'LIGHT', 'SWEET', 'NATURAL', 'CRISP'],
    'blood-orange': ['CITRUS', 'BOLD', 'TANGY', 'ZESTY', 'VIBRANT', 'FRESH'],
    'blood-orange-refresher': ['CITRUS', 'BOLD', 'TANGY', 'ZESTY', 'VIBRANT', 'FRESH'],
    'lemon-lime': ['ZESTY', 'CRISP', 'BRIGHT', 'TANGY', 'REFRESHING', 'CLEAN'],
    'lemon-lime-refresher': ['ZESTY', 'CRISP', 'BRIGHT', 'TANGY', 'REFRESHING', 'CLEAN'],
    '311-hazy-ipa': ['LIMITED', '311', 'BOLD', 'HOPPY', 'EXCLUSIVE', 'CRAFT'],
    'deftones-tone-zero-lager': ['SMOOTH', 'DEFTONES', 'CRAFT', 'PREMIUM', 'EXCLUSIVE', 'BOLD'],
  };
  return chipsMap[handle] || ['PREMIUM', 'CRAFT', 'QUALITY', 'NATURAL', 'BOLD', 'FRESH'];
}

export default function ProductPage() {
  const {product, recommendations, allProducts} = useLoaderData<typeof loader>();
  const [currentColor, setCurrentColor] = useState(product.color);
  

  const handleColorChange = (newColor: string) => {
    setCurrentColor(newColor);
  };

  // Set document background color immediately to prevent flash
  useEffect(() => {
    document.body.style.background = currentColor;
    return () => {
      document.body.style.background = '';
    };
  }, [currentColor]);

  return (
    <>
      {/* BODY STYLES - LET COMPONENT HANDLE BACKGROUND */}
      <style>
        {`
          html, body {
            background: transparent !important;
            margin: 0;
            padding: 0;
            transition: background 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}
      </style>

      {/* HEADER WITH PRODUCT COLOR */}
    <div style={{ 
        position: 'fixed',
          top: 0,
          left: 0,
        right: 0,
        zIndex: 1000,
        background: '#000', // Header back to black
        transition: 'background 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <WhiteHeader forceWhiteText={true} productColor={currentColor} />
        </div>

      {/* PAGE CONTAINER - LET COMPONENT HANDLE BACKGROUND */}
    <div className="pdp-page-container" style={{
        background: 'transparent', // Let PDPHero1920 handle the two-tone background
      color: '#fff',
      minHeight: '100vh',
      width: '100vw',
      overflowY: 'auto',
        margin: '0',
        padding: '0',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Ultra-Luxury PDP Hero - 1920x1080 Layout */}
        <PDPHero1920
          product={product}
          productImage={getProductImage(product.handle)}
          onColorChange={handleColorChange}
          allProducts={allProducts}
        />

        {/* WORLD CLASS CRAFT EXCELLENCE SECTION - CHOMPS INSPIRED */}
        <section 
          style={{
            background: currentColor, // This section keeps the product color
            color: '#fff',
            padding: 'clamp(4rem, 8vw, 8rem) 0',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* ANIMATED BACKGROUND ELEMENTS */}
          <div 
            className="craft-bg-elements"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0.1,
              pointerEvents: 'none'
            }}
          >
            <div 
              className="hop-element animate-float-left"
              style={{
                position: 'absolute',
                top: '10%',
                left: '-10%',
                width: '120px',
                height: '120px',
                backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="none" stroke="white" stroke-width="2" opacity="0.3"/><path d="M30 50 Q50 30 70 50 Q50 70 30 50" fill="white" opacity="0.2"/></svg>')}")`,
                backgroundSize: 'contain'
              }}
            />
            <div 
              className="barley-element animate-float-right"
              style={{
                position: 'absolute',
                top: '60%',
                right: '-10%',
                width: '100px',
                height: '100px',
                backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="45" y="20" width="10" height="60" fill="white" opacity="0.3"/><circle cx="50" cy="25" r="5" fill="white" opacity="0.2"/><circle cx="50" cy="35" r="4" fill="white" opacity="0.2"/><circle cx="50" cy="45" r="4" fill="white" opacity="0.2"/></svg>')}")`,
                backgroundSize: 'contain'
              }}
            />
          </div>

          <div 
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0 clamp(2rem, 4vw, 4rem)'
            }}
          >
            {/* HERO HEADLINE - NIKE INSPIRED */}
            <div style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 8vw, 6rem)' }}>
              <h2 
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: '900',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  margin: '0 0 1rem 0',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                }}
              >
                CRAFT EXCELLENCE REDEFINED
              </h2>
              <div 
                style={{
                  width: '80px',
                  height: '3px',
                  background: 'rgba(255, 255, 255, 0.8)',
                  margin: '0 auto'
                }}
              />
            </div>

            {/* MAIN CONTENT GRID */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(4rem, 8vw, 8rem)',
                alignItems: 'center',
                minHeight: '60vh'
              }}
              className="craft-excellence-grid"
            >
              {/* LEFT: PREMIUM BENEFITS */}
              <div 
                className="benefits-section animate-slide-left"
                style={{
                  animation: 'slideInLeft 1s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                }}
              >
                <h3 
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                    fontWeight: '800',
                    margin: '0 0 clamp(2rem, 4vw, 3rem) 0',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em'
                  }}
                >
                  PREMIUM CRAFT BREWING
                </h3>

                {/* BENEFITS GRID */}
                <div 
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                    marginBottom: 'clamp(3rem, 5vw, 4rem)'
                  }}
                >
                  {[
                    { 
                      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2h8v2h-1v14c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2V4H6V2z" fill="currentColor"/><path d="M9 6h6v10H9z" fill="none" stroke="currentColor"/></svg>`, 
                      title: '≤0.5% ABV', 
                      desc: 'NON-ALCOHOLIC' 
                    },
                    { 
                      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/></svg>`, 
                      title: 'NATURAL', 
                      desc: 'REAL INGREDIENTS' 
                    },
                    { 
                      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor"/></svg>`, 
                      title: 'CRAFT', 
                      desc: 'PREMIUM QUALITY' 
                    },
                    { 
                      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/><line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/></svg>`, 
                      title: 'NO DYES', 
                      desc: 'CLEAN FORMULA' 
                    },
                    { 
                      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.85-2.5h8.88l.85 2.5 1.89-.66C15.1 16.17 13 10 17 8zm-4.5 9c-.83 0-1.5-.67-1.5-1.5S11.67 14 12.5 14s1.5.67 1.5 1.5S13.33 17 12.5 17z" fill="currentColor"/></svg>`, 
                      title: 'ORGANIC', 
                      desc: 'SUSTAINABLE' 
                    },
                    { 
                      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 11H7v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9h-2M15 4V2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v8M8 11l8-4" stroke="currentColor" stroke-width="2"/></svg>`, 
                      title: 'FRESH', 
                      desc: 'BOLD FLAVOR' 
                    }
                  ].map((benefit, index) => (
                    <div 
                      key={benefit.title}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        animationDelay: `${index * 0.1}s`
                      }}
                      className="benefit-card"
                    >
                      <div 
                        style={{
                          width: '40px',
                          height: '40px',
                          background: 'rgba(255, 255, 255, 0.2)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff'
                        }}
                        dangerouslySetInnerHTML={{ __html: benefit.icon }}
                      />
                      <div>
                        <div 
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            marginBottom: '0.25rem'
                          }}
                        >
                          {benefit.title}
                        </div>
                        <div 
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '0.75rem',
                            opacity: 0.8,
                            fontWeight: '500'
                          }}
                        >
                          {benefit.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* INGREDIENTS LIST */}
                <div>
                  <h4 
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                      fontWeight: '700',
                      margin: '0 0 1.5rem 0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em'
                    }}
                  >
                    REAL INGREDIENTS FOR REAL HUMANS
                  </h4>
                  
                  {/* INGREDIENT ITEMS */}
                  {[
                    'PREMIUM MALTED BARLEY',
                    'NATURAL HOP EXTRACTS',
                    'PURE FILTERED WATER',
                    'CRAFT BREWING YEAST',
                    'NATURAL FLAVORS',
                    'CITRIC ACID'
                  ].map((ingredient, index) => (
                    <div 
                      key={ingredient}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                        fontWeight: '800',
                        margin: '0 0 0.8rem 0',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.01em',
                        animationDelay: `${0.5 + index * 0.1}s`
                      }}
                      className="ingredient-item"
                    >
                      {ingredient}
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: ANIMATED PRODUCT SHOWCASE */}
              <div 
                className="product-showcase animate-slide-right"
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'slideInRight 1s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                }}
              >
                {/* MAIN PRODUCT IMAGE */}
                <img
                  src={getProductImage(product.handle)}
                  alt={product.title}
                  style={{
                    width: 'clamp(280px, 35vw, 400px)',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))',
                    zIndex: 2,
                    position: 'relative'
                  }}
                  className="hero-product-image"
                />

                {/* FLOATING BEER INGREDIENTS - ANIMATED SVG */}
                <div 
                  className="floating-ingredient hop-floating"
                  style={{
                    position: 'absolute',
                    top: '15%',
                    left: '10%',
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'float 3s ease-in-out infinite',
                    animationDelay: '0s',
                    color: '#fff'
                  }}
                  dangerouslySetInnerHTML={{ 
                    __html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L8 6v6c0 3.31 2.69 6 6 6s6-2.69 6-6V6l-4-4h-4z" fill="currentColor" opacity="0.8"/>
                      <circle cx="10" cy="10" r="1" fill="currentColor"/>
                      <circle cx="14" cy="10" r="1" fill="currentColor"/>
                      <circle cx="12" cy="13" r="1" fill="currentColor"/>
                    </svg>` 
                  }}
                />

                <div 
                  className="floating-ingredient barley-floating"
                  style={{
                    position: 'absolute',
                    top: '60%',
                    right: '15%',
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'float 3s ease-in-out infinite',
                    animationDelay: '1s',
                    color: '#fff'
                  }}
                  dangerouslySetInnerHTML={{ 
                    __html: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="11" y="2" width="2" height="20" fill="currentColor" opacity="0.8"/>
                      <ellipse cx="12" cy="5" rx="3" ry="1.5" fill="currentColor"/>
                      <ellipse cx="12" cy="8" rx="2.5" ry="1" fill="currentColor"/>
                      <ellipse cx="12" cy="11" rx="2.5" ry="1" fill="currentColor"/>
                      <ellipse cx="12" cy="14" rx="2.5" ry="1" fill="currentColor"/>
                    </svg>` 
                  }}
                />

                <div 
                  className="floating-ingredient water-floating"
                  style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '20%',
                    width: '45px',
                    height: '45px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'float 3s ease-in-out infinite',
                    animationDelay: '2s',
                    color: '#fff'
                  }}
                  dangerouslySetInnerHTML={{ 
                    __html: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C9.5 4 8 7 8 10c0 2.21 1.79 4 4 4s4-1.79 4-4c0-3-1.5-6-4-8z" fill="currentColor" opacity="0.8"/>
                      <path d="M10 12c0 1.1.9 2 2 2s2-.9 2-2" fill="none" stroke="currentColor" stroke-width="1"/>
                    </svg>` 
                  }}
                />
              </div>
            </div>
          </div>

          {/* ANIMATION STYLES */}
          <style>{`
            @keyframes slideInLeft {
              from {
                transform: translateX(-100px);
                opacity: 0;
              }
              to {
                transform: translateX(0);
                opacity: 1;
              }
            }

            @keyframes slideInRight {
              from {
                transform: translateX(100px);
                opacity: 0;
              }
              to {
                transform: translateX(0);
                opacity: 1;
              }
            }

            @keyframes float {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-10px);
              }
            }

            @keyframes fadeInUp {
              from {
                transform: translateY(30px);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }

            .benefit-card {
              animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              opacity: 0;
            }

            .ingredient-item {
              animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              opacity: 0;
            }

            @media (max-width: 768px) {
              .craft-excellence-grid {
                grid-template-columns: 1fr !important;
                gap: 3rem !important;
              }
              
              .benefits-section {
                order: 2;
              }
              
              .product-showcase {
                order: 1;
              }
            }
          `}</style>
        </section>

        {/* You May Like Section - Seamless with Hero */}
      <section style={{
          padding: '4rem 2rem 2rem',
          background: '#000',
        textAlign: 'center',
          position: 'relative'
      }}>
          <div style={{ marginBottom: '2rem' }}>
          <h1 
            className="you-may-like-header"
            style={{
                fontSize: 'clamp(1.8rem, 4vw + 0.5rem, 5.5rem)', // Advanced clamping: much smaller start, better scaling
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              textTransform: 'none',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#fff',
              marginBottom: '1.5rem',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
            }}
          >
            You May Also Like
          </h1>
          <p 
            className="you-may-like-description"
            style={{
                fontSize: '1.3rem',
              fontFamily: 'var(--font-primary)',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: 1.7,
              fontWeight: 300
            }}
          >
            Discover our complete collection of premium craft beverages.
            </p>
          </div>
        
          {/* Mobile Controls */}
        <div 
          className="carousel-controls-container"
          style={{
            position: 'absolute',
              top: '80%',
            right: '2rem',
              display: 'none',
        alignItems: 'center',
            gap: '0.5rem',
            zIndex: 100
          }}
        >
          <button 
            className="carousel-control carousel-control-left"
            style={{
              width: '50px',
              height: '50px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              color: '#fff',
              cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
            justifyContent: 'center',
              fontSize: '1.4rem',
              fontWeight: 400,
              transition: 'all 0.3s ease',
              WebkitTapHighlightColor: 'transparent',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
            }}
            aria-label="Previous products"
          >
            ‹
          </button>
          
          <button 
            className="carousel-control carousel-control-right"
            style={{
              width: '50px',
              height: '50px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              fontWeight: 400,
              transition: 'all 0.3s ease',
              WebkitTapHighlightColor: 'transparent',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
            }}
            aria-label="Next products"
          >
            ›
          </button>
        </div>
      </section>

        {/* Product Carousel - Seamless */}
       <section 
         className="product-carousel-section"
         style={{
            padding: 'clamp(2rem, 6vw, 3rem) 0 clamp(4rem, 8vw, 6rem) 0',
            background: '#000',
           overflow: 'hidden',
           position: 'relative'
         }}
       >
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
              ...recommendations,
              ...recommendations
            ].map((rec: any, index: number) => (
              <div 
                key={`${rec.id}-${index}`}
               className="product-card-wrapper"
               style={{ 
                  flex: '0 0 clamp(200px, 28vw, 400px)',
                 display: 'flex',
                 justifyContent: 'center'
               }}
             >
               <ProductCard
                  id={rec.id}
                  handle={rec.handle}
                  title={rec.title}
                  image={getProductImage(rec.handle)}
               />
              </div>
            ))}
          </div>

          {/* Styles */}
         <style>
           {`
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(calc(-50%));
                }
              }

             .you-may-like-header {
                font-size: clamp(1.6rem, 3.5vw + 0.3rem, 2.2rem) !important; /* Advanced mobile clamping */
                margin-bottom: 2rem !important;
                font-family: var(--font-display) !important;
                font-weight: 700 !important;
                text-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;
             }
             
             .you-may-like-description {
               display: none !important;
             }
             
             .carousel-controls-container {
               display: flex !important;
                top: 85% !important;
             }
             
             @media (min-width: 768px) {
               .you-may-like-header {
                 font-size: clamp(2.5rem, 5vw + 0.5rem, 5.5rem) !important; /* Advanced desktop clamping */
               }
               
               .product-carousel-section {
                  padding: 3rem 0 2rem 0 !important;
               }
               
               .product-card-wrapper {
                  margin-right: -1.4rem !important;
               }
               
               .carousel-control:hover {
                 background: rgba(255, 255, 255, 0.3) !important;
                 transform: scale(1.05) !important;
               }
             }
             
             @media (max-width: 767px) {
               .product-card-wrapper {
                  flex: 0 0 calc(85vw - 2rem) !important;
                 min-width: 280px !important;
                 max-width: 350px !important;
                  margin-right: 0.5rem !important;
               }
               
               .product-carousel-section {
                  padding: 3rem 0 1rem 0 !important;
               }
               
               .carousel-control:active {
                 background: rgba(255, 255, 255, 0.3) !important;
                 transform: scale(0.95) !important;
               }
             }
           `}
         </style>
      </section>
    </div>
    </>
  );
}