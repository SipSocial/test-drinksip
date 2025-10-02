import { useState, useEffect } from 'react';

interface CookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

export function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    functional: false
  });
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('drinksip-cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentData = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('drinksip-cookie-consent', JSON.stringify(consentData));
    setIsVisible(false);
    onAccept?.();
  };

  const handleDeclineAll = () => {
    const consentData = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('drinksip-cookie-consent', JSON.stringify(consentData));
    setIsVisible(false);
    onDecline?.();
  };

  const handleSavePreferences = () => {
    const consentData = {
      ...preferences,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('drinksip-cookie-consent', JSON.stringify(consentData));
    setIsVisible(false);
    
    if (preferences.analytics || preferences.marketing || preferences.functional) {
      onAccept?.();
    } else {
      onDecline?.();
    }
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderBottom: 'none',
      color: '#fff',
      padding: '2rem',
      zIndex: 1000,
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {!showDetails ? (
          /* Simple consent banner */
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  color: '#fff'
                }}>
                  We Value Your Privacy
                </h3>
                <p style={{
                  color: '#ccc',
                  fontSize: '0.95rem',
                  lineHeight: 1.5,
                  marginBottom: '1.5rem'
                }}>
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                  By clicking "Accept All", you consent to our use of cookies.
                </p>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  alignItems: 'center'
                }}>
                  <button
                    onClick={handleAcceptAll}
                    style={{
                      padding: '0.8rem 1.5rem',
                      border: '2px solid #fff',
                      background: '#fff',
                      color: '#000',
                      fontSize: '0.9rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      borderRadius: '6px',
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
                    }}
                  >
                    Accept All
                  </button>
                  
                  <button
                    onClick={handleDeclineAll}
                    style={{
                      padding: '0.8rem 1.5rem',
                      border: '2px solid rgba(255, 255, 255, 0.5)',
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
                      e.currentTarget.style.borderColor = '#fff';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    Decline All
                  </button>
                  
                  <button
                    onClick={() => setShowDetails(true)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#ccc',
                      fontSize: '0.9rem',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#ccc';
                    }}
                  >
                    Customize Settings
                  </button>
                </div>
              </div>
              
              <div style={{
                fontSize: '4rem',
                opacity: 0.3
              }}>
                🍪
              </div>
            </div>
          </div>
        ) : (
          /* Detailed preferences */
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                color: '#fff'
              }}>
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ccc',
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>

            <div style={{
              display: 'grid',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {/* Necessary Cookies */}
              <div style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#fff'
                  }}>
                    Necessary Cookies
                  </h4>
                  <div style={{
                    width: '50px',
                    height: '25px',
                    background: '#4CAF50',
                    borderRadius: '15px',
                    position: 'relative',
                    opacity: 0.7
                  }}>
                    <div style={{
                      width: '21px',
                      height: '21px',
                      background: '#fff',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '2px',
                      right: '2px'
                    }} />
                  </div>
                </div>
                <p style={{
                  color: '#ccc',
                  fontSize: '0.9rem',
                  lineHeight: 1.4
                }}>
                  These cookies are essential for the website to function properly. They enable basic features like page navigation and access to secure areas.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#fff'
                  }}>
                    Analytics Cookies
                  </h4>
                  <label style={{
                    width: '50px',
                    height: '25px',
                    background: preferences.analytics ? '#4CAF50' : '#666',
                    borderRadius: '15px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease'
                  }}>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                      style={{ display: 'none' }}
                    />
                    <div style={{
                      width: '21px',
                      height: '21px',
                      background: '#fff',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '2px',
                      left: preferences.analytics ? '27px' : '2px',
                      transition: 'left 0.3s ease'
                    }} />
                  </label>
                </div>
                <p style={{
                  color: '#ccc',
                  fontSize: '0.9rem',
                  lineHeight: 1.4
                }}>
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#fff'
                  }}>
                    Marketing Cookies
                  </h4>
                  <label style={{
                    width: '50px',
                    height: '25px',
                    background: preferences.marketing ? '#4CAF50' : '#666',
                    borderRadius: '15px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease'
                  }}>
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                      style={{ display: 'none' }}
                    />
                    <div style={{
                      width: '21px',
                      height: '21px',
                      background: '#fff',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '2px',
                      left: preferences.marketing ? '27px' : '2px',
                      transition: 'left 0.3s ease'
                    }} />
                  </label>
                </div>
                <p style={{
                  color: '#ccc',
                  fontSize: '0.9rem',
                  lineHeight: 1.4
                }}>
                  These cookies are used to deliver personalized advertisements and track the effectiveness of our marketing campaigns.
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={handleSavePreferences}
                style={{
                  padding: '0.8rem 1.5rem',
                  border: '2px solid #fff',
                  background: '#fff',
                  color: '#000',
                  fontSize: '0.9rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  borderRadius: '6px',
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
                }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
