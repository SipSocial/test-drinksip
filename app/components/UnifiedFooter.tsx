import { Link } from 'react-router';
import { useState } from 'react';

export function UnifiedFooter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubmitMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call - replace with actual newsletter signup
    setTimeout(() => {
      setSubmitMessage('Thanks for subscribing!');
      setEmail('');
      setIsSubmitting(false);
      
      setTimeout(() => setSubmitMessage(''), 3000);
    }, 1000);
  };

  const productLinks = [
    { label: 'Core Series', href: '/collections/core-series' },
    { label: 'Refresher Series', href: '/collections/refresher-series' },
    { label: 'Artist Series', href: '/collections/artist-series' },
    { label: 'All Products', href: '/collections/all' },
    { label: 'New Releases', href: '/collections/new' },
    { label: 'Limited Edition', href: '/collections/limited' }
  ];

  const companyLinks = [
    { label: 'About Us', href: '/pages/about' },
    { label: 'Our Story', href: '/pages/story' },
    { label: 'Sustainability', href: '/pages/sustainability' },
    { label: 'Press & Media', href: '/pages/press' },
    { label: 'Careers', href: '/pages/careers' },
    { label: 'Contact Us', href: '/pages/contact-us' }
  ];

  const supportLinks = [
    { label: 'Where to Buy', href: '/pages/where-to-buy' },
    { label: 'Partners', href: '/pages/partners' },
    { label: 'Distributor Portal', href: '/pages/distributor-portal' },
    { label: 'FAQ', href: '/pages/faq' },
    { label: 'Returns', href: '/policies/refund-policy' },
    { label: 'Shipping Info', href: '/policies/shipping-policy' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/policies/privacy-policy' },
    { label: 'Terms of Service', href: '/policies/terms-of-service' },
    { label: 'Accessibility', href: '/pages/accessibility' }
  ];

  const socialLinks = [
    { name: 'Instagram', initial: 'I', href: '#instagram' },
    { name: 'Twitter', initial: 'T', href: '#twitter' },
    { name: 'Facebook', initial: 'F', href: '#facebook' },
    { name: 'TikTok', initial: 'T', href: '#tiktok' }
  ];

  return (
    <footer style={{
      background: '#1a1a1a',
      color: '#fff',
      borderTop: '1px solid rgba(255, 255, 255, 0.15)',
      marginTop: 'auto'
    }}>
      {/* Main Footer Content */}
      <div style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        padding: 'var(--space-xl) var(--container-padding) var(--space-md)'
      }}>
        {/* Footer Grid */}
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--space-lg)',
          marginBottom: 'var(--space-lg)'
        }}>
          
          {/* Brand Section */}
          <div>
            <Link to="/" style={{
              fontSize: 'var(--text-h3)',
              fontWeight: 'var(--font-weight-black)',
              color: '#fff',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: 'var(--ls-normal)',
              display: 'block',
              marginBottom: 'var(--space-sm)'
            }}>
              DrinkSip
            </Link>
            <p style={{
              fontSize: 'var(--text-body)',
              color: '#888',
              lineHeight: 'var(--lh-relaxed)',
              marginBottom: 'var(--space-md)',
              maxWidth: '300px'
            }}>
              Non-alcoholic beer with real taste. Lower calories, delicious taste. Wake up happy with DrinkSip.
            </p>
            
            {/* Social Links */}
            <div style={{
              display: 'flex',
              gap: 'var(--space-sm)',
              flexWrap: 'wrap'
            }}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: 'var(--font-weight-bold)',
                    transition: 'all var(--duration-normal) var(--ease-apple)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#fff';
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.color = '#000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#fff';
                  }}
                >
                  {social.initial}
                </a>
              ))}
            </div>
          </div>

          {/* Products Section */}
          <div>
            <h3 className="footer-heading">Products</h3>
            <ul className="footer-links">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="footer-heading">Support</h3>
            <ul className="footer-links">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div style={{
          background: '#2a2a2a',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-lg) var(--space-md)',
          textAlign: 'center',
          marginBottom: 'var(--space-lg)',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}>
          <h3 style={{
            fontSize: 'var(--text-h3)',
            fontWeight: 'var(--font-weight-black)',
            textTransform: 'uppercase',
            letterSpacing: 'var(--ls-normal)',
            marginBottom: 'var(--space-sm)',
            color: '#fff'
          }}>
            Stay in the Loop
          </h3>
          <p style={{
            fontSize: 'var(--text-body-lg)',
            color: '#888',
            marginBottom: 'var(--space-md)',
            maxWidth: '500px',
            margin: '0 auto var(--space-md)'
          }}>
            Get the latest on new releases, artist collaborations, and exclusive drops.
          </p>
          <form 
            onSubmit={handleNewsletterSubmit}
            style={{
              display: 'flex',
              maxWidth: '400px',
              margin: '0 auto',
              gap: 'var(--space-sm)',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
              style={{
                flex: '1',
                minWidth: '250px',
                padding: 'var(--space-sm) var(--space-md)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 'var(--radius-md)',
                background: 'transparent',
                color: '#fff',
                fontSize: 'var(--text-body)',
                outline: 'none',
                transition: 'border-color var(--duration-normal) var(--ease-apple)'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#fff';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="font-button"
              style={{
                padding: 'var(--space-sm) var(--space-md)',
                border: '2px solid #fff',
                borderRadius: 'var(--radius-md)',
                background: '#fff',
                color: '#000',
                fontSize: 'var(--text-body)',
                fontWeight: 'var(--font-weight-black)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--ls-wider)',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all var(--duration-normal) var(--ease-apple)',
                whiteSpace: 'nowrap',
                opacity: isSubmitting ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#fff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#000';
                }
              }}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {submitMessage && (
            <p style={{
              marginTop: 'var(--space-sm)',
              color: submitMessage.includes('Thanks') ? '#77C14A' : '#F05757',
              fontSize: 'var(--text-body-sm)',
              fontWeight: 'var(--font-weight-medium)'
            }}>
              {submitMessage}
            </p>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom" style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          paddingTop: 'var(--space-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-sm)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-md)',
            flexWrap: 'wrap'
          }}>
            <p style={{
              color: '#888',
              fontSize: 'var(--text-body-sm)',
              margin: 0
            }}>
              © 2024 DrinkSip. All rights reserved.
            </p>
            <div style={{
              display: 'flex',
              gap: 'var(--space-md)',
              flexWrap: 'wrap'
            }}>
              {legalLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  style={{
                    color: '#888',
                    textDecoration: 'none',
                    fontSize: 'var(--text-body-sm)',
                    transition: 'color var(--duration-normal) var(--ease-apple)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#888';
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* DrinkSip Responsible Message */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '0.25rem',
            color: '#888',
            fontSize: 'var(--text-body-sm)',
            textAlign: 'right'
          }}>
            <span style={{
              fontWeight: 'var(--font-weight-bold)',
              textTransform: 'uppercase',
              letterSpacing: 'var(--ls-wide)'
            }}>
              DrinkSip Responsibly
            </span>
            <span style={{
              fontSize: 'var(--text-caption)',
              fontWeight: 'var(--font-weight-medium)',
              color: '#666'
            }}>
              #wakeuphappy
            </span>
          </div>
        </div>
      </div>

      {/* Footer Styles */}
      <style>
        {`
          .footer-heading {
            font-size: var(--text-body-lg);
            font-weight: var(--font-weight-black);
            text-transform: uppercase;
            letter-spacing: var(--ls-wider);
            margin-bottom: var(--space-md);
            color: #fff;
            border-bottom: 2px solid #fff;
            padding-bottom: var(--space-xs);
            display: inline-block;
          }

          .footer-links {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .footer-links li {
            margin-bottom: 0.75rem;
          }

          .footer-link {
            color: #888;
            text-decoration: none;
            font-size: var(--text-body-sm);
            font-weight: var(--font-weight-medium);
            transition: color var(--duration-normal) var(--ease-apple);
            text-transform: uppercase;
            letter-spacing: var(--ls-base);
          }

          .footer-link:hover {
            color: #fff;
          }

          /* Responsive Grid */
          @media (max-width: 1024px) {
            .footer-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: var(--space-lg) !important;
            }
          }

          @media (max-width: 768px) {
            .footer-grid {
              grid-template-columns: 1fr !important;
              gap: var(--space-lg) !important;
            }

            .footer-bottom {
              flex-direction: column;
              align-items: flex-start !important;
              text-align: left;
            }

            .footer-bottom > div:last-child {
              align-items: flex-start !important;
              text-align: left !important;
            }
          }

          @media (max-width: 480px) {
            .footer-heading {
              font-size: var(--text-body);
            }

            .footer-link {
              font-size: 0.85rem;
            }
          }
        `}
      </style>
    </footer>
  );
}
