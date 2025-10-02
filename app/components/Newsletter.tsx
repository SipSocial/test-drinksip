import { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface NewsletterProps {
  variant?: 'inline' | 'modal' | 'footer';
  className?: string;
}

export function Newsletter({ variant = 'inline', className = '' }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Mock API call - replace with real newsletter service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would integrate with services like:
      // - Mailchimp
      // - Klaviyo
      // - ConvertKit
      // - Shopify Email
      
      setIsSuccess(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    inline: {
      container: {
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '15px',
        padding: '3rem 2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center' as const,
        maxWidth: '600px',
        margin: '0 auto'
      },
      title: {
        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
        fontWeight: 900,
        textTransform: 'uppercase' as const,
        marginBottom: '1rem',
        color: '#fff'
      },
      description: {
        color: '#ccc',
        fontSize: '1rem',
        marginBottom: '2rem',
        lineHeight: 1.5
      }
    },
    footer: {
      container: {
        textAlign: 'center' as const
      },
      title: {
        fontSize: '1.2rem',
        fontWeight: 900,
        textTransform: 'uppercase' as const,
        marginBottom: '0.5rem',
        color: '#fff'
      },
      description: {
        color: '#888',
        fontSize: '0.9rem',
        marginBottom: '1.5rem'
      }
    },
    modal: {
      container: {
        background: '#000',
        borderRadius: '20px',
        padding: '3rem',
        textAlign: 'center' as const,
        maxWidth: '500px',
        margin: '0 auto'
      },
      title: {
        fontSize: '2rem',
        fontWeight: 900,
        textTransform: 'uppercase' as const,
        marginBottom: '1rem',
        color: '#fff'
      },
      description: {
        color: '#ccc',
        fontSize: '1rem',
        marginBottom: '2rem',
        lineHeight: 1.5
      }
    }
  };

  const currentStyles = styles[variant];

  if (isSuccess) {
    return (
      <div style={currentStyles.container} className={className}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <h3 style={currentStyles.title}>Welcome to the Family!</h3>
        <p style={currentStyles.description}>
          Thanks for subscribing! You'll be the first to know about new releases, exclusive offers, and DrinkSip news.
        </p>
      </div>
    );
  }

  return (
    <div style={currentStyles.container} className={className}>
      <h3 style={currentStyles.title}>
        {variant === 'modal' ? 'Stay in the Loop' : 'Join the DrinkSip Family'}
      </h3>
      <p style={currentStyles.description}>
        Be the first to know about new releases, exclusive offers, and behind-the-scenes content.
      </p>

      <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          maxWidth: '400px',
          margin: '0 auto',
          flexDirection: variant === 'footer' ? 'column' : 'row'
        }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={isSubmitting}
            style={{
              flex: 1,
              padding: '1rem 1.5rem',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: variant === 'footer' ? '8px' : '50px',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#fff';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
          />
          <button
            type="submit"
            disabled={isSubmitting || !email}
            style={{
              padding: '1rem 2rem',
              border: '2px solid #fff',
              borderRadius: variant === 'footer' ? '8px' : '50px',
              background: '#fff',
              color: '#000',
              fontSize: '0.9rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: isSubmitting || !email ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: isSubmitting || !email ? 0.6 : 1,
              minWidth: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting && email) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#fff';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting && email) {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#000';
              }
            }}
          >
            {isSubmitting ? <LoadingSpinner size="small" color="#000" /> : 'Subscribe'}
          </button>
        </div>

        {error && (
          <p style={{
            color: '#ff6b6b',
            fontSize: '0.9rem',
            marginTop: '1rem',
            textAlign: 'center'
          }}>
            {error}
          </p>
        )}
      </form>

      <p style={{
        fontSize: '0.8rem',
        color: '#888',
        marginTop: '1.5rem',
        textAlign: 'center'
      }}>
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}

// Newsletter modal component
export function NewsletterModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem'
    }}
    onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer',
            zIndex: 1001
          }}
          aria-label="Close newsletter signup"
        >
          ×
        </button>
        <Newsletter variant="modal" />
      </div>
    </div>
  );
}
