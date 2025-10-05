import React from 'react';
import { Link } from 'react-router';
import { AnimatedSection, StaggeredAnimation } from '~/components/AnimatedSection';

interface Product {
  id: string;
  handle: string;
  title: string;
  image: string;
  color?: string;
}

interface CollectionGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

/**
 * Collection Grid Component
 * 
 * Responsive product grid for collection pages
 * Features:
 * - Configurable column count (2, 3, or 4)
 * - Staggered entrance animations
 * - Consistent spacing and sizing
 * - Hover effects with smooth transitions
 * - Fully responsive (grid → 2 cols → 1 col)
 * - Design system integration
 */
export function CollectionGrid({ products, columns = 3 }: CollectionGridProps) {
  return (
    <section 
      style={{
        padding: 'clamp(4rem, 8vh, 8rem) clamp(1rem, 4vw, 4rem)',
        background: '#000',
        width: '100%'
      }}
    >
      <div 
        className="collection-grid-container"
        style={{
          maxWidth: '1600px',
          margin: '0 auto'
        }}
      >
        <StaggeredAnimation
          animation="fadeIn"
          staggerDelay={100}
          threshold={0.1}
        >
          <div 
            className={`collection-grid-${columns}`}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: 'var(--spacing-6)',
              width: '100%'
            }}
          >
            {products.map((product) => (
              <CollectionProductCard key={product.id} product={product} />
            ))}
          </div>
        </StaggeredAnimation>
      </div>

      {/* Responsive Styles */}
      <style>{`
        /* Desktop - maintain column count */
        @media (min-width: 1024px) {
          .collection-grid-2,
          .collection-grid-3,
          .collection-grid-4 {
            /* Columns set by inline style */
          }
        }

        /* Tablet - reduce to 2 columns */
        @media (min-width: 768px) and (max-width: 1023px) {
          .collection-grid-3,
          .collection-grid-4 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          .collection-grid-2 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* Mobile - single column */
        @media (max-width: 767px) {
          .collection-grid-2,
          .collection-grid-3,
          .collection-grid-4 {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-8) !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * Collection Product Card
 * 
 * Individual product card with hover effects
 */
function CollectionProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link
      to={`/products/${product.handle}`}
      style={{
        textDecoration: 'none',
        display: 'block'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="collection-product-card"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3 / 4',
          borderRadius: '16px',
          overflow: 'hidden',
          background: product.color || '#1a1a1a',
          transition: 'all var(--duration-normal) var(--easing-smooth)',
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          boxShadow: isHovered 
            ? '0 20px 60px rgba(0, 0, 0, 0.4)' 
            : '0 4px 20px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer'
        }}
      >
        {/* Product Image */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--spacing-6)',
            transition: 'transform var(--duration-normal) var(--easing-smooth)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          <img 
            src={product.image}
            alt={product.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transition: 'transform var(--duration-normal) var(--easing-smooth)'
            }}
          />
        </div>

        {/* Overlay with Product Title */}
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 'var(--spacing-6)',
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity var(--duration-normal) var(--easing-smooth)'
          }}
        >
          <h3 
            style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: '#fff',
              margin: 0,
              lineHeight: 1.1
            }}
          >
            {product.title}
          </h3>
        </div>

        {/* Hover Indicator */}
        <div 
          style={{
            position: 'absolute',
            top: 'var(--spacing-4)',
            right: 'var(--spacing-4)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#000',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-90deg)',
            transition: 'all var(--duration-normal) var(--easing-smooth)'
          }}
        >
          →
        </div>
      </div>
    </Link>
  );
}

/**
 * Collection Header Component
 * 
 * Hero section for collection pages
 */
interface CollectionHeaderProps {
  title: string;
  description: string;
  backgroundColor?: string;
}

export function CollectionHeader({ 
  title, 
  description, 
  backgroundColor = '#000' 
}: CollectionHeaderProps) {
  return (
    <AnimatedSection
      animation="fadeIn"
      duration={800}
      style={{
        background: backgroundColor,
        padding: 'clamp(8rem, 15vh, 12rem) clamp(2rem, 4vw, 4rem) clamp(4rem, 8vh, 6rem)',
        textAlign: 'center',
        width: '100%'
      }}
    >
      <div 
        style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}
      >
        {/* Collection Title */}
        <h1 
          style={{
            fontSize: 'clamp(4rem, 8vw, 7rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            lineHeight: 0.9,
            color: '#fff',
            marginBottom: 'var(--spacing-6)',
            margin: 0
          }}
        >
          {title}
        </h1>

        {/* Collection Description */}
        <p 
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '700px',
            margin: '0 auto',
            marginTop: 'var(--spacing-6)'
          }}
        >
          {description}
        </p>
      </div>
    </AnimatedSection>
  );
}

/**
 * Complete Collection Page Layout
 * 
 * Combines header and grid for full collection page
 */
interface CollectionPageProps {
  title: string;
  description: string;
  products: Product[];
  columns?: 2 | 3 | 4;
  backgroundColor?: string;
}

export function CollectionPage({ 
  title, 
  description, 
  products, 
  columns = 3,
  backgroundColor = '#000'
}: CollectionPageProps) {
  return (
    <div 
      style={{
        background: '#000',
        minHeight: '100vh',
        width: '100%'
      }}
    >
      <CollectionHeader 
        title={title}
        description={description}
        backgroundColor={backgroundColor}
      />
      <CollectionGrid 
        products={products}
        columns={columns}
      />
    </div>
  );
}
