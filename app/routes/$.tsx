import { Link } from 'react-router';
import type { MetaFunction } from '@shopify/remix-oxygen';

export const meta: MetaFunction = () => ([
  { title: '404 - Page Not Found | DrinkSip' },
  { name: 'description', content: 'The page you\'re looking for doesn\'t exist. Explore our premium non-alcoholic beer collection instead.' },
  { name: 'robots', content: 'noindex, nofollow' }
]);

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      paddingTop: '120px' // Account for header
    }}>
      {/* 404 Visual */}
      <div style={{
        fontSize: 'clamp(8rem, 20vw, 12rem)',
        fontWeight: 900,
        lineHeight: 0.8,
        marginBottom: '2rem',
        background: 'linear-gradient(45deg, #E8B122, #F05757, #77C14A, #ED5335)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textTransform: 'uppercase',
        letterSpacing: '-0.05em'
      }}>
        404
      </div>

      {/* Error Message */}
      <h1 style={{
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '-0.02em',
        marginBottom: '1rem',
        color: '#fff'
      }}>
        Page Not Found
      </h1>

      <p style={{
        fontSize: '1.2rem',
        color: '#888',
        marginBottom: '3rem',
        maxWidth: '600px',
        lineHeight: 1.5
      }}>
        Looks like this page went missing. Don't worry, there's plenty more to explore in our premium non-alcoholic beer collection.
      </p>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '1.5rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '4rem'
      }}>
        <Link to="/" style={{
          padding: '1.2rem 2.5rem',
          border: '3px solid #fff',
          background: '#fff',
          color: '#000',
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
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#fff';
          e.currentTarget.style.color = '#000';
        }}>
          Back to Home
        </Link>
        
        <Link to="/collections/all" style={{
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
          e.currentTarget.style.color = '#000';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#fff';
        }}>
          Shop All Products
        </Link>
      </div>

      {/* Popular Links */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        maxWidth: '800px',
        width: '100%'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '15px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            marginBottom: '1rem',
            color: '#E8B122'
          }}>
            Core Series
          </h3>
          <p style={{
            color: '#ccc',
            fontSize: '0.9rem',
            marginBottom: '1rem'
          }}>
            Bold, traditional beers for clean daytime refreshment
          </p>
          <Link to="/collections/core-series" style={{
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Explore Core Series →
          </Link>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '15px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            marginBottom: '1rem',
            color: '#F05757'
          }}>
            Refresher Series
          </h3>
          <p style={{
            color: '#ccc',
            fontSize: '0.9rem',
            marginBottom: '1rem'
          }}>
            Crisp, refreshing beers with real fruit extracts
          </p>
          <Link to="/collections/refresher-series" style={{
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Explore Refresher Series →
          </Link>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '15px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            marginBottom: '1rem',
            color: '#ED5335'
          }}>
            Artist Series
          </h3>
          <p style={{
            color: '#ccc',
            fontSize: '0.9rem',
            marginBottom: '1rem'
          }}>
            Limited edition collaborations with legendary artists
          </p>
          <Link to="/collections/artist-series" style={{
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Explore Artist Series →
          </Link>
        </div>
      </div>
    </div>
  );
}