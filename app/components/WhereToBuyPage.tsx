import React, { useState } from 'react';
import { AnimatedSection, StaggeredAnimation } from '~/components/AnimatedSection';

interface Retailer {
  id: string;
  name: string;
  logo: string;
  type: 'online' | 'retail' | 'grocery' | 'convenience';
  url?: string;
  locations?: number;
}

interface WhereToBuyPageProps {
  retailers?: Retailer[];
}

/**
 * Where to Buy Page Component
 * 
 * Premium page showcasing where customers can purchase DrinkSip products
 * Features:
 * - Hero section with search/location
 * - Retailer categories (online, retail, grocery, convenience)
 * - Interactive retailer cards
 * - Store locator integration
 * - Responsive grid layouts
 * - Smooth animations
 */
export function WhereToBuyPage({ retailers = mockRetailers }: WhereToBuyPageProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredRetailers = activeFilter === 'all' 
    ? retailers 
    : retailers.filter(r => r.type === activeFilter);

  const onlineRetailers = retailers.filter(r => r.type === 'online');
  const physicalRetailers = retailers.filter(r => r.type !== 'online');

  return (
    <div 
      style={{
        background: '#000',
        minHeight: '100vh',
        width: '100%',
        color: '#fff'
      }}
    >
      {/* Hero Section */}
      <WhereToBuyHero />

      {/* Online Retailers Section */}
      {onlineRetailers.length > 0 && (
        <OnlineRetailersSection retailers={onlineRetailers} />
      )}

      {/* Store Locator Section */}
      <StoreLocatorSection />

      {/* Physical Retailers Section */}
      {physicalRetailers.length > 0 && (
        <PhysicalRetailersSection retailers={physicalRetailers} />
      )}

      {/* CTA Section */}
      <WhereToBuyCTA />
    </div>
  );
}

/**
 * Where to Buy Hero Section
 */
function WhereToBuyHero() {
  return (
    <AnimatedSection
      animation="fadeIn"
      duration={800}
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)',
        padding: 'clamp(10rem, 20vh, 15rem) clamp(2rem, 4vw, 4rem) clamp(6rem, 12vh, 10rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none'
        }}
      />

      <div 
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Subtitle */}
        <div 
          style={{
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: 'var(--spacing-6)'
          }}
        >
          Find DrinkSip
        </div>

        {/* Main Title */}
        <h1 
          style={{
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            lineHeight: 0.9,
            marginBottom: 'var(--spacing-8)',
            background: 'linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.6) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Where to Buy
        </h1>

        {/* Description */}
        <p 
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '700px',
            margin: '0 auto',
            marginBottom: 'var(--spacing-10)'
          }}
        >
          Find DrinkSip at your favorite retailers nationwide, or order online for delivery 
          straight to your door.
        </p>

        {/* Quick Stats */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 'var(--spacing-6)',
            maxWidth: '600px',
            margin: '0 auto'
          }}
        >
          <QuickStat number="1000+" label="Locations" />
          <QuickStat number="10+" label="States" />
          <QuickStat number="50+" label="Retailers" />
        </div>
      </div>
    </AnimatedSection>
  );
}

/**
 * Quick Stat Component
 */
function QuickStat({ number, label }: { number: string; label: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div 
        style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 900,
          color: '#fff',
          marginBottom: 'var(--spacing-2)'
        }}
      >
        {number}
      </div>
      <div 
        style={{
          fontSize: 'var(--font-size-xs)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'rgba(255, 255, 255, 0.6)'
        }}
      >
        {label}
      </div>
    </div>
  );
}

/**
 * Online Retailers Section
 */
function OnlineRetailersSection({ retailers }: { retailers: Retailer[] }) {
  return (
    <section 
      style={{
        padding: 'clamp(6rem, 12vh, 10rem) clamp(2rem, 4vw, 4rem)',
        background: '#000',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div 
        style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >
        {/* Section Header */}
        <AnimatedSection
          animation="fadeIn"
          duration={600}
          threshold={0.2}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(4rem, 8vh, 6rem)'
          }}
        >
          <h2 
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
              marginBottom: 'var(--spacing-4)',
              color: '#fff'
            }}
          >
            Shop Online
          </h2>
          <p 
            style={{
              fontSize: 'var(--font-size-lg)',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            Get DrinkSip delivered straight to your door
          </p>
        </AnimatedSection>

        {/* Online Retailers Grid */}
        <StaggeredAnimation
          animation="fadeIn"
          staggerDelay={100}
          threshold={0.1}
        >
          <div 
            className="online-retailers-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--spacing-6)',
              maxWidth: '1000px',
              margin: '0 auto'
            }}
          >
            {retailers.map((retailer) => (
              <OnlineRetailerCard key={retailer.id} retailer={retailer} />
            ))}
          </div>
        </StaggeredAnimation>
      </div>
    </section>
  );
}

/**
 * Online Retailer Card
 */
function OnlineRetailerCard({ retailer }: { retailer: Retailer }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={retailer.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: 'none',
        display: 'block'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: 'var(--spacing-8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          minHeight: '280px',
          transition: 'all var(--duration-normal) var(--easing-smooth)',
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
          boxShadow: isHovered 
            ? '0 20px 60px rgba(0, 0, 0, 0.4)' 
            : '0 4px 20px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer'
        }}
      >
        {/* Logo */}
        <div 
          style={{
            width: '100%',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--spacing-6)',
            transition: 'transform var(--duration-normal) var(--easing-smooth)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          <img 
            src={retailer.logo}
            alt={retailer.name}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* Name */}
        <h3 
          style={{
            fontSize: 'var(--font-size-xl)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: 'var(--spacing-4)'
          }}
        >
          {retailer.name}
        </h3>

        {/* CTA Button */}
        <div 
          style={{
            marginTop: 'auto',
            padding: 'var(--spacing-3) var(--spacing-6)',
            background: isHovered ? '#fff' : 'rgba(255, 255, 255, 0.9)',
            color: '#000',
            borderRadius: '50px',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            transition: 'all var(--duration-fast) var(--easing-smooth)'
          }}
        >
          Shop Now →
        </div>
      </div>
    </a>
  );
}

/**
 * Store Locator Section
 */
function StoreLocatorSection() {
  const [zipCode, setZipCode] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement store locator logic
    console.log('Searching for stores near:', zipCode);
  };

  return (
    <AnimatedSection
      animation="fadeIn"
      duration={800}
      threshold={0.2}
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)',
        padding: 'clamp(8rem, 15vh, 12rem) clamp(2rem, 4vw, 4rem)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div 
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center'
        }}
      >
        <h2 
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            marginBottom: 'var(--spacing-6)',
            color: '#fff'
          }}
        >
          Find a Store Near You
        </h2>

        <p 
          style={{
            fontSize: 'var(--font-size-lg)',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: 'var(--spacing-10)'
          }}
        >
          Enter your ZIP code to find the nearest retailers carrying DrinkSip products
        </p>

        {/* Search Form */}
        <form 
          onSubmit={handleSearch}
          style={{
            display: 'flex',
            gap: 'var(--spacing-4)',
            maxWidth: '500px',
            margin: '0 auto',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <input
            type="text"
            placeholder="Enter ZIP Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            style={{
              flex: '1 1 250px',
              padding: 'var(--spacing-4) var(--spacing-6)',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50px',
              color: '#fff',
              fontSize: 'var(--font-size-base)',
              fontWeight: 600,
              outline: 'none',
              transition: 'all var(--duration-fast) var(--easing-smooth)'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          />

          <button
            type="submit"
            style={{
              padding: 'var(--spacing-4) var(--spacing-8)',
              background: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: '50px',
              fontSize: 'var(--font-size-base)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all var(--duration-normal) var(--easing-smooth)',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Search
          </button>
        </form>
      </div>
    </AnimatedSection>
  );
}

/**
 * Physical Retailers Section
 */
function PhysicalRetailersSection({ retailers }: { retailers: Retailer[] }) {
  return (
    <section 
      style={{
        padding: 'clamp(6rem, 12vh, 10rem) clamp(2rem, 4vw, 4rem)',
        background: '#000'
      }}
    >
      <div 
        style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >
        {/* Section Header */}
        <AnimatedSection
          animation="fadeIn"
          duration={600}
          threshold={0.2}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(4rem, 8vh, 6rem)'
          }}
        >
          <h2 
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
              marginBottom: 'var(--spacing-4)',
              color: '#fff'
            }}
          >
            In-Store Retailers
          </h2>
          <p 
            style={{
              fontSize: 'var(--font-size-lg)',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            Find DrinkSip at these trusted retailers near you
          </p>
        </AnimatedSection>

        {/* Retailers Grid */}
        <StaggeredAnimation
          animation="fadeIn"
          staggerDelay={80}
          threshold={0.1}
        >
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: 'var(--spacing-6)'
            }}
          >
            {retailers.map((retailer) => (
              <PhysicalRetailerCard key={retailer.id} retailer={retailer} />
            ))}
          </div>
        </StaggeredAnimation>
      </div>
    </section>
  );
}

/**
 * Physical Retailer Card
 */
function PhysicalRetailerCard({ retailer }: { retailer: Retailer }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: 'var(--spacing-6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'all var(--duration-normal) var(--easing-smooth)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 12px 40px rgba(0, 0, 0, 0.3)' 
          : '0 4px 20px rgba(0, 0, 0, 0.2)',
        cursor: retailer.url ? 'pointer' : 'default'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (retailer.url) {
          window.open(retailer.url, '_blank');
        }
      }}
    >
      {/* Logo */}
      <div 
        style={{
          width: '100%',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--spacing-4)'
        }}
      >
        <img 
          src={retailer.logo}
          alt={retailer.name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* Name */}
      <h3 
        style={{
          fontSize: 'var(--font-size-lg)',
          fontWeight: 700,
          color: '#fff',
          marginBottom: 'var(--spacing-2)'
        }}
      >
        {retailer.name}
      </h3>

      {/* Locations */}
      {retailer.locations && (
        <div 
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'rgba(255, 255, 255, 0.6)',
            fontWeight: 600
          }}
        >
          {retailer.locations}+ Locations
        </div>
      )}
    </div>
  );
}

/**
 * Where to Buy CTA Section
 */
function WhereToBuyCTA() {
  return (
    <AnimatedSection
      animation="fadeIn"
      duration={800}
      threshold={0.2}
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)',
        padding: 'clamp(8rem, 15vh, 12rem) clamp(2rem, 4vw, 4rem)',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div 
        style={{
          maxWidth: '700px',
          margin: '0 auto'
        }}
      >
        <h2 
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            marginBottom: 'var(--spacing-6)',
            color: '#fff'
          }}
        >
          Don't See Your Store?
        </h2>

        <p 
          style={{
            fontSize: 'var(--font-size-lg)',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: 'var(--spacing-10)'
          }}
        >
          We're expanding every day. Request DrinkSip at your local retailer or contact us 
          to find out when we'll be available in your area.
        </p>

        <a
          href="mailto:hello@drinksip.com"
          style={{
            display: 'inline-block',
            padding: 'var(--spacing-4) var(--spacing-10)',
            background: '#fff',
            color: '#000',
            border: 'none',
            borderRadius: '50px',
            fontSize: 'var(--font-size-base)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            textDecoration: 'none',
            transition: 'all var(--duration-normal) var(--easing-smooth)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Contact Us
        </a>
      </div>
    </AnimatedSection>
  );
}

/**
 * Mock Data
 */
const mockRetailers: Retailer[] = [
  // Online
  {
    id: '1',
    name: 'Amazon',
    logo: 'https://via.placeholder.com/200x80/FF9900/FFFFFF?text=Amazon',
    type: 'online',
    url: 'https://amazon.com'
  },
  {
    id: '2',
    name: 'Instacart',
    logo: 'https://via.placeholder.com/200x80/43B02A/FFFFFF?text=Instacart',
    type: 'online',
    url: 'https://instacart.com'
  },
  {
    id: '3',
    name: 'Drizly',
    logo: 'https://via.placeholder.com/200x80/FE6A00/FFFFFF?text=Drizly',
    type: 'online',
    url: 'https://drizly.com'
  },
  // Retail
  {
    id: '4',
    name: 'Whole Foods',
    logo: 'https://via.placeholder.com/200x80/00674B/FFFFFF?text=Whole+Foods',
    type: 'retail',
    url: 'https://wholefoodsmarket.com',
    locations: 500
  },
  {
    id: '5',
    name: 'Target',
    logo: 'https://via.placeholder.com/200x80/CC0000/FFFFFF?text=Target',
    type: 'retail',
    url: 'https://target.com',
    locations: 1900
  },
  {
    id: '6',
    name: 'Walmart',
    logo: 'https://via.placeholder.com/200x80/0071CE/FFFFFF?text=Walmart',
    type: 'retail',
    url: 'https://walmart.com',
    locations: 4700
  },
  // Grocery
  {
    id: '7',
    name: 'Kroger',
    logo: 'https://via.placeholder.com/200x80/0057B8/FFFFFF?text=Kroger',
    type: 'grocery',
    locations: 2800
  },
  {
    id: '8',
    name: 'Safeway',
    logo: 'https://via.placeholder.com/200x80/E31837/FFFFFF?text=Safeway',
    type: 'grocery',
    locations: 900
  },
  {
    id: '9',
    name: 'Publix',
    logo: 'https://via.placeholder.com/200x80/006341/FFFFFF?text=Publix',
    type: 'grocery',
    locations: 1300
  },
  // Convenience
  {
    id: '10',
    name: '7-Eleven',
    logo: 'https://via.placeholder.com/200x80/FF6600/FFFFFF?text=7-Eleven',
    type: 'convenience',
    locations: 9800
  },
  {
    id: '11',
    name: 'Circle K',
    logo: 'https://via.placeholder.com/200x80/ED1C24/FFFFFF?text=Circle+K',
    type: 'convenience',
    locations: 7200
  },
  {
    id: '12',
    name: 'Wawa',
    logo: 'https://via.placeholder.com/200x80/C8102E/FFFFFF?text=Wawa',
    type: 'convenience',
    locations: 900
  }
];

/**
 * Default Export
 */
export default function WhereToBuyPageWithMockData() {
  return <WhereToBuyPage retailers={mockRetailers} />;
}
