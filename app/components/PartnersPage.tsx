import React from 'react';
import { Link } from 'react-router';
import { AnimatedSection, StaggeredAnimation } from '~/components/AnimatedSection';

interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: 'brand' | 'retailer' | 'distributor';
  website?: string;
  featured?: boolean;
}

interface PartnersPageProps {
  partners: Partner[];
}

/**
 * Partners Page Component
 * 
 * Premium layout showcasing brand partners, retailers, and distributors
 * Features:
 * - Hero section with brand storytelling
 * - Categorized partner sections
 * - Featured partner spotlight
 * - Responsive grid layouts
 * - Smooth animations
 * - Call-to-action buttons
 */
export function PartnersPage({ partners }: PartnersPageProps) {
  const brandPartners = partners.filter(p => p.category === 'brand');
  const retailers = partners.filter(p => p.category === 'retailer');
  const distributors = partners.filter(p => p.category === 'distributor');
  const featuredPartner = partners.find(p => p.featured);

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
      <PartnersHero />

      {/* Featured Partner Spotlight */}
      {featuredPartner && (
        <FeaturedPartnerSection partner={featuredPartner} />
      )}

      {/* Brand Partners Section */}
      {brandPartners.length > 0 && (
        <PartnerSection
          title="Brand Partners"
          description="Collaborating with legendary brands to create unique experiences"
          partners={brandPartners}
        />
      )}

      {/* Retailers Section */}
      {retailers.length > 0 && (
        <PartnerSection
          title="Where to Find Us"
          description="Available at these premium retailers nationwide"
          partners={retailers}
          columns={4}
        />
      )}

      {/* Distributors Section */}
      {distributors.length > 0 && (
        <PartnerSection
          title="Distribution Partners"
          description="Working with industry leaders to bring DrinkSip everywhere"
          partners={distributors}
          columns={3}
        />
      )}

      {/* CTA Section */}
      <PartnerCTA />
    </div>
  );
}

/**
 * Partners Hero Section
 */
function PartnersHero() {
  return (
    <AnimatedSection
      animation="fadeIn"
      duration={800}
      style={{
        background: '#000',
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
          backgroundSize: '50px 50px',
          pointerEvents: 'none'
        }}
      />

      <div 
        style={{
          maxWidth: '1000px',
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
          Our Partners
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
          Building the Future Together
        </h1>

        {/* Description */}
        <p 
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '800px',
            margin: '0 auto',
            marginBottom: 'var(--spacing-8)'
          }}
        >
          We collaborate with world-class brands, retailers, and distributors who share our vision 
          of creating exceptional non-alcoholic experiences. Together, we're redefining what it means 
          to drink consciously.
        </p>

        {/* Stats */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 'var(--spacing-8)',
            maxWidth: '700px',
            margin: '0 auto',
            marginTop: 'var(--spacing-12)'
          }}
        >
          <StatCard number="50+" label="Partners" />
          <StatCard number="1000+" label="Locations" />
          <StatCard number="10+" label="States" />
        </div>
      </div>
    </AnimatedSection>
  );
}

/**
 * Stat Card Component
 */
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div 
      style={{
        textAlign: 'center'
      }}
    >
      <div 
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 900,
          color: '#fff',
          marginBottom: 'var(--spacing-2)'
        }}
      >
        {number}
      </div>
      <div 
        style={{
          fontSize: 'var(--font-size-sm)',
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
 * Featured Partner Section
 */
function FeaturedPartnerSection({ partner }: { partner: Partner }) {
  return (
    <AnimatedSection
      animation="fadeIn"
      duration={800}
      threshold={0.2}
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)',
        padding: 'clamp(6rem, 12vh, 10rem) clamp(2rem, 4vw, 4rem)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div 
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(4rem, 8vw, 8rem)',
          alignItems: 'center'
        }}
        className="featured-partner-grid"
      >
        {/* Left: Partner Logo */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--spacing-12)',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <img 
            src={partner.logo}
            alt={partner.name}
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '300px',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* Right: Partner Info */}
        <div>
          <div 
            style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: 'var(--spacing-4)'
            }}
          >
            Featured Partner
          </div>

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
            {partner.name}
          </h2>

          <p 
            style={{
              fontSize: 'var(--font-size-lg)',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: 'var(--spacing-8)'
            }}
          >
            {partner.description}
          </p>

          {partner.website && (
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-3)',
                padding: 'var(--spacing-4) var(--spacing-8)',
                background: '#fff',
                color: '#000',
                border: 'none',
                borderRadius: '50px',
                fontSize: 'var(--font-size-base)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                transition: 'all var(--duration-normal) var(--easing-smooth)',
                cursor: 'pointer'
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
              Learn More →
            </a>
          )}
        </div>
      </div>

      {/* Mobile Responsive */}
      <style>{`
        @media (max-width: 767px) {
          .featured-partner-grid {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-8) !important;
          }
        }
      `}</style>
    </AnimatedSection>
  );
}

/**
 * Partner Section Component
 */
interface PartnerSectionProps {
  title: string;
  description: string;
  partners: Partner[];
  columns?: 2 | 3 | 4;
}

function PartnerSection({ 
  title, 
  description, 
  partners, 
  columns = 3 
}: PartnerSectionProps) {
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
            {title}
          </h2>
          <p 
            style={{
              fontSize: 'var(--font-size-lg)',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            {description}
          </p>
        </AnimatedSection>

        {/* Partners Grid */}
        <StaggeredAnimation
          animation="fadeIn"
          staggerDelay={80}
          threshold={0.1}
        >
          <div 
            className={`partners-grid-${columns}`}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: 'var(--spacing-6)'
            }}
          >
            {partners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </StaggeredAnimation>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (min-width: 1024px) {
          .partners-grid-2,
          .partners-grid-3,
          .partners-grid-4 {
            /* Columns set by inline style */
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .partners-grid-3,
          .partners-grid-4 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 767px) {
          .partners-grid-2,
          .partners-grid-3,
          .partners-grid-4 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * Partner Card Component
 */
function PartnerCard({ partner }: { partner: Partner }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: 'var(--spacing-8)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'all var(--duration-normal) var(--easing-smooth)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 20px 60px rgba(0, 0, 0, 0.4)' 
          : '0 4px 20px rgba(0, 0, 0, 0.2)',
        cursor: partner.website ? 'pointer' : 'default'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (partner.website) {
          window.open(partner.website, '_blank');
        }
      }}
    >
      {/* Partner Logo */}
      <div 
        style={{
          width: '100%',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--spacing-6)',
          transition: 'transform var(--duration-normal) var(--easing-smooth)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
      >
        <img 
          src={partner.logo}
          alt={partner.name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* Partner Name */}
      <h3 
        style={{
          fontSize: 'var(--font-size-xl)',
          fontWeight: 700,
          color: '#fff',
          marginBottom: 'var(--spacing-3)'
        }}
      >
        {partner.name}
      </h3>

      {/* Partner Description */}
      <p 
        style={{
          fontSize: 'var(--font-size-sm)',
          lineHeight: 1.6,
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: 'var(--spacing-4)'
        }}
      >
        {partner.description}
      </p>

      {/* Visit Link */}
      {partner.website && (
        <div 
          style={{
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginTop: 'auto',
            opacity: isHovered ? 1 : 0.6,
            transition: 'opacity var(--duration-fast) var(--easing-smooth)'
          }}
        >
          Visit →
        </div>
      )}
    </div>
  );
}

/**
 * Partner CTA Section
 */
function PartnerCTA() {
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
          maxWidth: '800px',
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
          Become a Partner
        </h2>

        <p 
          style={{
            fontSize: 'var(--font-size-lg)',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: 'var(--spacing-10)'
          }}
        >
          Interested in partnering with DrinkSip? We're always looking for like-minded brands 
          and retailers who share our passion for quality and innovation.
        </p>

        <div 
          style={{
            display: 'flex',
            gap: 'var(--spacing-4)',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Link
            to="/contact"
            style={{
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
              transition: 'all var(--duration-normal) var(--easing-smooth)',
              display: 'inline-block'
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
            Get in Touch
          </Link>

          <a
            href="mailto:partners@drinksip.com"
            style={{
              padding: 'var(--spacing-4) var(--spacing-10)',
              background: 'transparent',
              color: '#fff',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50px',
              fontSize: 'var(--font-size-base)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              transition: 'all var(--duration-normal) var(--easing-smooth)',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Email Us
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}

/**
 * Default Export with Mock Data
 */
export default function PartnersPageWithMockData() {
  const mockPartners: Partner[] = [
    {
      id: '1',
      name: '311',
      logo: 'https://via.placeholder.com/300x150/1E3A8A/FFFFFF?text=311',
      description: 'Legendary rock band collaboration bringing unique flavors to life',
      category: 'brand',
      website: 'https://311.com',
      featured: true
    },
    {
      id: '2',
      name: 'Deftones',
      logo: 'https://via.placeholder.com/300x150/000000/FFFFFF?text=Deftones',
      description: 'Alternative metal icons partnering for bold, premium experiences',
      category: 'brand',
      website: 'https://deftones.com'
    },
    {
      id: '3',
      name: 'Whole Foods',
      logo: 'https://via.placeholder.com/300x150/00674B/FFFFFF?text=Whole+Foods',
      description: 'Premium natural and organic retailer',
      category: 'retailer',
      website: 'https://wholefoodsmarket.com'
    },
    {
      id: '4',
      name: 'Target',
      logo: 'https://via.placeholder.com/300x150/CC0000/FFFFFF?text=Target',
      description: 'Nationwide retail partner',
      category: 'retailer',
      website: 'https://target.com'
    },
    {
      id: '5',
      name: 'Kroger',
      logo: 'https://via.placeholder.com/300x150/0057B8/FFFFFF?text=Kroger',
      description: 'Leading grocery retailer',
      category: 'retailer',
      website: 'https://kroger.com'
    },
    {
      id: '6',
      name: 'Safeway',
      logo: 'https://via.placeholder.com/300x150/E31837/FFFFFF?text=Safeway',
      description: 'Trusted grocery chain',
      category: 'retailer',
      website: 'https://safeway.com'
    },
    {
      id: '7',
      name: 'UNFI',
      logo: 'https://via.placeholder.com/300x150/003DA5/FFFFFF?text=UNFI',
      description: 'Leading natural products distributor',
      category: 'distributor',
      website: 'https://unfi.com'
    },
    {
      id: '8',
      name: 'KeHE',
      logo: 'https://via.placeholder.com/300x150/00A651/FFFFFF?text=KeHE',
      description: 'Specialty and natural products distributor',
      category: 'distributor',
      website: 'https://kehe.com'
    },
    {
      id: '9',
      name: 'Southern Glazer\'s',
      logo: 'https://via.placeholder.com/300x150/8B0000/FFFFFF?text=Southern+Glazers',
      description: 'North America\'s largest beverage distributor',
      category: 'distributor',
      website: 'https://southernglazers.com'
    }
  ];

  return <PartnersPage partners={mockPartners} />;
}
