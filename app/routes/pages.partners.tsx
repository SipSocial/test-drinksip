import { useState } from 'react';
import type { MetaFunction } from '@shopify/remix-oxygen';

export const meta: MetaFunction = () => ([
  { title: 'Partners | DrinkSip - Collaborate With Us' },
  { name: 'description', content: 'Partner with DrinkSip. Explore opportunities for retail partnerships, collaborations, and distribution.' }
]);

export default function Partners() {
  const [selectedPartnerType, setSelectedPartnerType] = useState('retail');

  const partnerTypes = [
    { id: 'retail', label: 'Retail Partners', icon: '🏪' },
    { id: 'distribution', label: 'Distribution', icon: '🚛' },
    { id: 'collaboration', label: 'Brand Collaborations', icon: '🤝' },
    { id: 'events', label: 'Events & Venues', icon: '🎪' }
  ];

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
            Partner With DrinkSip
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: '#ccc',
            maxWidth: '700px',
            margin: '0 auto 3rem',
            lineHeight: 1.5
          }}>
            Join the DrinkSip family and be part of the non-alcoholic beer revolution. We're looking for partners who share our passion for quality and innovation.
          </p>
        </div>
      </section>

      {/* Partner Types Navigation */}
      <section style={{
        padding: '2rem',
        background: '#000',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            {partnerTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedPartnerType(type.id)}
                style={{
                  padding: '1rem 2rem',
                  border: selectedPartnerType === type.id ? '2px solid #E8B122' : '2px solid rgba(255, 255, 255, 0.2)',
                  background: selectedPartnerType === type.id ? '#E8B122' : 'transparent',
                  color: selectedPartnerType === type.id ? '#000' : '#fff',
                  fontSize: '1rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  if (selectedPartnerType !== type.id) {
                    e.currentTarget.style.borderColor = '#fff';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPartnerType !== type.id) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Content */}
      <section style={{
        padding: '6rem 2rem',
        background: '#000'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {selectedPartnerType === 'retail' && (
            <div>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                marginBottom: '3rem',
                color: '#fff',
                textAlign: 'center'
              }}>
                Retail Partners
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '6rem',
                alignItems: 'center',
                marginBottom: '4rem'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    marginBottom: '2rem',
                    color: '#E8B122'
                  }}>
                    Why Partner With Us?
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {[
                      'Premium non-alcoholic beer with authentic taste',
                      'Growing market demand and consumer interest',
                      'Strong brand recognition and marketing support',
                      'Competitive margins and flexible terms',
                      'Dedicated account management team'
                    ].map((benefit, index) => (
                      <li key={index} style={{
                        padding: '1rem 0',
                        fontSize: '1.1rem',
                        color: '#ccc',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        <span style={{
                          width: '8px',
                          height: '8px',
                          background: '#E8B122',
                          borderRadius: '50%',
                          flexShrink: 0
                        }} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{
                  background: 'rgba(232, 177, 34, 0.1)',
                  borderRadius: '20px',
                  padding: '3rem',
                  border: '1px solid rgba(232, 177, 34, 0.3)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🏪</div>
                  <h4 style={{
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                    color: '#E8B122'
                  }}>
                    Join Our Network
                  </h4>
                  <p style={{
                    color: '#ccc',
                    fontSize: '1rem',
                    marginBottom: '2rem',
                    lineHeight: 1.5
                  }}>
                    Over 500+ retail locations nationwide trust DrinkSip to deliver quality and drive sales.
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
                    Become a Retailer
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedPartnerType === 'distribution' && (
            <div>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                marginBottom: '3rem',
                color: '#fff',
                textAlign: 'center'
              }}>
                Distribution Partners
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '3rem',
                marginBottom: '4rem'
              }}>
                {[
                  {
                    title: 'Regional Distribution',
                    description: 'Expand your portfolio with premium non-alcoholic beer',
                    icon: '🌎'
                  },
                  {
                    title: 'Logistics Support',
                    description: 'Comprehensive supply chain and inventory management',
                    icon: '📦'
                  },
                  {
                    title: 'Marketing Co-op',
                    description: 'Joint marketing programs and promotional support',
                    icon: '📢'
                  }
                ].map((item, index) => (
                  <div key={index} style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '15px',
                    padding: '2.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    textAlign: 'center',
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
                    <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{item.icon}</div>
                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      marginBottom: '1rem',
                      color: '#fff'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      color: '#ccc',
                      fontSize: '1rem',
                      lineHeight: 1.5
                    }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedPartnerType === 'collaboration' && (
            <div>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                marginBottom: '3rem',
                color: '#fff',
                textAlign: 'center'
              }}>
                Brand Collaborations
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '6rem',
                alignItems: 'center',
                marginBottom: '4rem'
              }}>
                <div style={{
                  background: 'rgba(237, 83, 53, 0.1)',
                  borderRadius: '20px',
                  padding: '3rem',
                  border: '1px solid rgba(237, 83, 53, 0.3)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🎨</div>
                  <h4 style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                    color: '#ED5335'
                  }}>
                    Artist Series
                  </h4>
                  <p style={{
                    color: '#ccc',
                    fontSize: '1.1rem',
                    lineHeight: 1.5
                  }}>
                    Limited edition collaborations with musicians, artists, and cultural icons. Join our exclusive Artist Series.
                  </p>
                </div>
                <div>
                  <h3 style={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    marginBottom: '2rem',
                    color: '#ED5335'
                  }}>
                    Creative Partnerships
                  </h3>
                  <p style={{
                    color: '#ccc',
                    fontSize: '1.2rem',
                    marginBottom: '2rem',
                    lineHeight: 1.6
                  }}>
                    We believe in the power of collaboration. Partner with DrinkSip to create unique, limited-edition products that tell your story.
                  </p>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {[
                      'Custom flavor development',
                      'Unique packaging design',
                      'Co-branded marketing campaigns',
                      'Exclusive launch events'
                    ].map((feature, index) => (
                      <li key={index} style={{
                        padding: '0.75rem 0',
                        fontSize: '1rem',
                        color: '#ccc',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <span style={{
                          width: '6px',
                          height: '6px',
                          background: '#ED5335',
                          borderRadius: '50%',
                          flexShrink: 0
                        }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {selectedPartnerType === 'events' && (
            <div>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                marginBottom: '3rem',
                color: '#fff',
                textAlign: 'center'
              }}>
                Events & Venues
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                marginBottom: '4rem'
              }}>
                {[
                  { type: 'Music Festivals', icon: '🎵', description: 'Premium beverage partner for festivals and concerts' },
                  { type: 'Sports Events', icon: '⚽', description: 'Official non-alcoholic beer for sporting events' },
                  { type: 'Corporate Events', icon: '🏢', description: 'Elevate your corporate gatherings with premium options' },
                  { type: 'Restaurants & Bars', icon: '🍽️', description: 'Expand your beverage menu with craft non-alcoholic beer' }
                ].map((venue, index) => (
                  <div key={index} style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '15px',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    textAlign: 'center',
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
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{venue.icon}</div>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      marginBottom: '1rem',
                      color: '#fff'
                    }}>
                      {venue.type}
                    </h3>
                    <p style={{
                      color: '#ccc',
                      fontSize: '0.9rem',
                      lineHeight: 1.5
                    }}>
                      {venue.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section style={{
        padding: '6rem 2rem',
        background: '#111',
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
            Ready to Partner?
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: '#ccc',
            marginBottom: '4rem',
            maxWidth: '600px',
            margin: '0 auto 4rem'
          }}>
            Let's discuss how we can work together to bring DrinkSip to more people and create something amazing.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '15px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{
                fontSize: '1.2rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                marginBottom: '1rem',
                color: '#E8B122'
              }}>
                Business Development
              </h4>
              <p style={{ color: '#ccc', marginBottom: '1rem' }}>partnerships@drinksip.com</p>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>For retail and distribution inquiries</p>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '15px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{
                fontSize: '1.2rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                marginBottom: '1rem',
                color: '#ED5335'
              }}>
                Brand Collaborations
              </h4>
              <p style={{ color: '#ccc', marginBottom: '1rem' }}>collabs@drinksip.com</p>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>For artist and brand partnerships</p>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '15px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{
                fontSize: '1.2rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                marginBottom: '1rem',
                color: '#77C14A'
              }}>
                Events & Venues
              </h4>
              <p style={{ color: '#ccc', marginBottom: '1rem' }}>events@drinksip.com</p>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>For event partnerships and sponsorships</p>
            </div>
          </div>

          <button style={{
            padding: '1.5rem 3rem',
            border: '3px solid #fff',
            background: '#fff',
            color: '#000',
            fontSize: '1.1rem',
            fontWeight: 900,
            textTransform: 'uppercase',
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
            e.currentTarget.style.color = '#000';
          }}>
            Start a Partnership
          </button>
        </div>
      </section>
    </div>
  );
}
