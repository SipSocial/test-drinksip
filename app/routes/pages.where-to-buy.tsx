import { useState } from 'react';
import type { MetaFunction } from '@shopify/remix-oxygen';

export const meta: MetaFunction = () => ([
  { title: 'Where to Buy DrinkSip | Find Stores Near You' },
  { name: 'description', content: 'Find DrinkSip non-alcoholic beer at stores near you. Available at major retailers nationwide.' }
]);

export default function WhereToBuy() {
  const [zipCode, setZipCode] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipCode) return;

    setIsSearching(true);
    
    // Mock search results - replace with real store locator API
    setTimeout(() => {
      setSearchResults([
        {
          id: 1,
          name: 'Whole Foods Market',
          address: '123 Main St, Your City, ST 12345',
          distance: '0.5 miles',
          phone: '(555) 123-4567',
          hours: 'Mon-Sun: 7AM-10PM',
          type: 'Grocery Store'
        },
        {
          id: 2,
          name: 'Target',
          address: '456 Oak Ave, Your City, ST 12345',
          distance: '1.2 miles',
          phone: '(555) 234-5678',
          hours: 'Mon-Sun: 8AM-10PM',
          type: 'Department Store'
        },
        {
          id: 3,
          name: 'Kroger',
          address: '789 Pine St, Your City, ST 12345',
          distance: '2.1 miles',
          phone: '(555) 345-6789',
          hours: 'Mon-Sun: 6AM-12AM',
          type: 'Grocery Store'
        }
      ]);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div style={{
      background: '#000',
      color: '#fff',
      minHeight: '100vh',
      paddingTop: '120px'
    }}>
      {/* Hero Section */}
      <section style={{
        padding: '4rem 2rem',
        background: '#000',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            lineHeight: 0.9,
            color: '#fff',
            marginBottom: '2rem'
          }}>
            Find DrinkSip Near You
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: '#ccc',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            lineHeight: 1.5
          }}>
            Discover where to buy DrinkSip non-alcoholic beer at stores nationwide. Enter your zip code to find the nearest retailers.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} style={{
            maxWidth: '500px',
            margin: '0 auto',
            display: 'flex',
            gap: '1rem'
          }}>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Enter your zip code"
              style={{
                flex: 1,
                padding: '1.2rem 1.5rem',
                fontSize: '1.1rem',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
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
              disabled={isSearching || !zipCode}
              style={{
                padding: '1.2rem 2rem',
                border: '2px solid #fff',
                background: '#fff',
                color: '#000',
                fontSize: '1rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                borderRadius: '8px',
                cursor: isSearching || !zipCode ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: isSearching || !zipCode ? 0.6 : 1,
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                if (!isSearching && zipCode) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#fff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSearching && zipCode) {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#000';
                }
              }}
            >
              {isSearching ? 'Searching...' : 'Find Stores'}
            </button>
          </form>
        </div>
      </section>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <section style={{
          padding: '4rem 2rem',
          background: '#000'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              marginBottom: '3rem',
              color: '#fff',
              textAlign: 'center'
            }}>
              {searchResults.length} Stores Found Near {zipCode}
            </h2>

            <div style={{
              display: 'grid',
              gap: '2rem'
            }}>
              {searchResults.map((store) => (
                <div key={store.id} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '15px',
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '2rem',
                  alignItems: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: 900,
                        color: '#fff'
                      }}>
                        {store.name}
                      </h3>
                      <span style={{
                        background: '#E8B122',
                        color: '#000',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        textTransform: 'uppercase'
                      }}>
                        {store.type}
                      </span>
                    </div>
                    <p style={{
                      color: '#ccc',
                      fontSize: '1.1rem',
                      marginBottom: '0.5rem'
                    }}>
                      📍 {store.address}
                    </p>
                    <p style={{
                      color: '#ccc',
                      fontSize: '1rem',
                      marginBottom: '0.5rem'
                    }}>
                      📞 {store.phone}
                    </p>
                    <p style={{
                      color: '#ccc',
                      fontSize: '1rem'
                    }}>
                      🕒 {store.hours}
                    </p>
                  </div>
                  <div style={{
                    textAlign: 'right'
                  }}>
                    <div style={{
                      fontSize: '1.2rem',
                      fontWeight: 900,
                      color: '#E8B122',
                      marginBottom: '1rem'
                    }}>
                      {store.distance}
                    </div>
                    <button style={{
                      padding: '0.75rem 1.5rem',
                      border: '2px solid #fff',
                      background: 'transparent',
                      color: '#fff',
                      fontSize: '0.9rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.color = '#000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#fff';
                    }}>
                      Get Directions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Major Retailers Section */}
      <section style={{
        padding: '6rem 2rem',
        background: '#111',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
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
            Available At Major Retailers
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}>
            {[
              { name: 'Whole Foods', logo: '🥬', description: 'Premium organic section' },
              { name: 'Target', logo: '🎯', description: 'Beverage aisle' },
              { name: 'Kroger', logo: '🛒', description: 'Beer & wine section' },
              { name: 'Walmart', logo: '🏪', description: 'Grocery department' },
              { name: 'Safeway', logo: '🛍️', description: 'Beverage section' },
              { name: '7-Eleven', logo: '🏪', description: 'Cooler section' }
            ].map((retailer, index) => (
              <div key={index} style={{
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
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>
                  {retailer.logo}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                  color: '#fff'
                }}>
                  {retailer.name}
                </h3>
                <p style={{
                  color: '#ccc',
                  fontSize: '0.9rem'
                }}>
                  {retailer.description}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(232, 177, 34, 0.1)',
            borderRadius: '15px',
            padding: '3rem',
            border: '1px solid rgba(232, 177, 34, 0.3)',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              marginBottom: '1rem',
              color: '#E8B122'
            }}>
              Can't Find Us?
            </h3>
            <p style={{
              color: '#ccc',
              fontSize: '1.1rem',
              marginBottom: '2rem',
              lineHeight: 1.5
            }}>
              Request DrinkSip at your local store! Most retailers are happy to stock products their customers want.
            </p>
            <button style={{
              padding: '1rem 2rem',
              border: '2px solid #E8B122',
              background: '#E8B122',
              color: '#000',
              fontSize: '1rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#E8B122';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#E8B122';
              e.currentTarget.style.color = '#000';
            }}>
              Request at Your Store
            </button>
          </div>
        </div>
      </section>

      {/* Online Ordering Section */}
      <section style={{
        padding: '6rem 2rem',
        background: '#000',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
            color: '#fff'
          }}>
            Order Online
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: '#ccc',
            marginBottom: '4rem',
            maxWidth: '600px',
            margin: '0 auto 4rem'
          }}>
            Get DrinkSip delivered straight to your door. Available on major delivery platforms.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { name: 'Amazon', description: 'Prime delivery available', cta: 'Shop on Amazon' },
              { name: 'Instacart', description: 'Same-day delivery', cta: 'Order on Instacart' },
              { name: 'DoorDash', description: 'Fast delivery', cta: 'Order on DoorDash' }
            ].map((platform, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '15px',
                padding: '2.5rem 2rem',
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
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  color: '#fff'
                }}>
                  {platform.name}
                </h3>
                <p style={{
                  color: '#ccc',
                  fontSize: '1rem',
                  marginBottom: '2rem'
                }}>
                  {platform.description}
                </p>
                <button style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #fff',
                  background: 'transparent',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#fff';
                }}>
                  {platform.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
