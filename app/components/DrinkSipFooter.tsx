import { Link } from 'react-router';

export function DrinkSipFooter() {
  return (
    <footer style={{
      background: '#1a1a1a', // Lighter gray for cleaner visual separation
      color: '#fff',
      borderTop: '1px solid rgba(255, 255, 255, 0.15)',
      marginTop: 'auto'
    }}>
      {/* Main Footer Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 2rem 2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '4rem',
          marginBottom: '4rem'
        }}>
          
          {/* Brand Section */}
          <div>
            <Link to="/" style={{
              fontSize: '2rem',
              fontWeight: 900,
              color: '#fff',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              display: 'block',
              marginBottom: '1rem'
            }}>
              DrinkSip
            </Link>
            <p style={{
              fontSize: '1rem',
              color: '#888',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: '300px'
            }}>
              Non-alcoholic beer with real taste. Lower calories, delicious taste. Wake up happy with DrinkSip.
            </p>
            
            {/* Social Links */}
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              {['Instagram', 'Twitter', 'Facebook', 'TikTok'].map((social) => (
                <a
                  key={social}
                  href={`#${social.toLowerCase()}`}
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
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease'
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
                  {social.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Products Section */}
          <div>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '2rem',
              color: '#fff',
              borderBottom: '2px solid #fff',
              paddingBottom: '0.5rem',
              display: 'inline-block'
            }}>
              Products
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { label: 'Core Series', href: '/collections/core-series' },
                { label: 'Refresher Series', href: '/collections/refresher-series' },
                { label: 'Artist Series', href: '/collections/artist-series' },
                { label: 'All Products', href: '/collections/all' },
                { label: 'New Releases', href: '/collections/new' },
                { label: 'Limited Edition', href: '/collections/limited' }
              ].map((item) => (
                <li key={item.label} style={{ marginBottom: '0.75rem' }}>
                  <Link
                    to={item.href}
                    style={{
                      color: '#888',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      transition: 'color 0.3s ease',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em'
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
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '2rem',
              color: '#fff',
              borderBottom: '2px solid #fff',
              paddingBottom: '0.5rem',
              display: 'inline-block'
            }}>
              Company
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { label: 'About Us', href: '/pages/about' },
                { label: 'Our Story', href: '/pages/story' },
                { label: 'Sustainability', href: '/pages/sustainability' },
                { label: 'Press & Media', href: '/pages/press' },
                { label: 'Careers', href: '/pages/careers' },
                { label: 'Contact Us', href: '/pages/contact-us' }
              ].map((item) => (
                <li key={item.label} style={{ marginBottom: '0.75rem' }}>
                  <Link
                    to={item.href}
                    style={{
                      color: '#888',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      transition: 'color 0.3s ease',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em'
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
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '2rem',
              color: '#fff',
              borderBottom: '2px solid #fff',
              paddingBottom: '0.5rem',
              display: 'inline-block'
            }}>
              Support
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { label: 'Where to Buy', href: '/pages/where-to-buy' },
                { label: 'Partners', href: '/pages/partners' },
                { label: 'Distributor Portal', href: '/pages/distributor-portal' },
                { label: 'FAQ', href: '/pages/faq' },
                { label: 'Returns', href: '/policies/refund-policy' },
                { label: 'Shipping Info', href: '/policies/shipping-policy' }
              ].map((item) => (
                <li key={item.label} style={{ marginBottom: '0.75rem' }}>
                  <Link
                    to={item.href}
                    style={{
                      color: '#888',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      transition: 'color 0.3s ease',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em'
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
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div style={{
          background: '#2a2a2a', // Slightly lighter to complement the footer background
          borderRadius: '15px',
          padding: '3rem 2rem',
          textAlign: 'center',
          marginBottom: '3rem',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            color: '#fff'
          }}>
            Stay in the Loop
          </h3>
          <p style={{
            fontSize: '1.1rem',
            color: '#888',
            marginBottom: '2rem',
            maxWidth: '500px',
            margin: '0 auto 2rem'
          }}>
            Get the latest on new releases, artist collaborations, and exclusive drops.
          </p>
          <div style={{
            display: 'flex',
            maxWidth: '400px',
            margin: '0 auto',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: '1',
                minWidth: '250px',
                padding: '1rem 1.5rem',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                background: 'transparent',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#fff';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            />
            <button
              style={{
                padding: '1rem 2rem',
                border: '2px solid #fff',
                borderRadius: '8px',
                background: '#fff',
                color: '#000',
                fontSize: '1rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#000';
              }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.15)', // Consistent with updated footer styling
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <p style={{
              color: '#888',
              fontSize: '0.9rem',
              margin: 0
            }}>
              © 2024 DrinkSip. All rights reserved.
            </p>
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}>
              {[
                { label: 'Privacy Policy', href: '/policies/privacy-policy' },
                { label: 'Terms of Service', href: '/policies/terms-of-service' },
                { label: 'Accessibility', href: '/pages/accessibility' }
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  style={{
                    color: '#888',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease'
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
            fontSize: '0.9rem',
            textAlign: 'right'
          }}>
            <span style={{
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              DrinkSip Responsibly
            </span>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#666'
            }}>
              #wakeuphappy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

