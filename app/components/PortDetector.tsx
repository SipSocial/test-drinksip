/**
 * Port Detection Utility
 * Helps users identify when they're on the wrong port
 */

import React, { useEffect, useState } from 'react';

export function PortDetector() {
  const [wrongPort, setWrongPort] = useState(false);
  const [correctPort, setCorrectPort] = useState<number | null>(null);

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    const currentPort = window.location.port;
    const currentHost = window.location.hostname;

    // Check if we're on localhost and not on the expected ports
    if (currentHost === 'localhost') {
      // Try to detect if server is running on different ports
      const tryPorts = [3012, 3011, 3010, 3009, 3008, 3007, 3006, 3005, 3004, 3003, 3002, 3001, 3000];
      
      const checkPort = async (port: number) => {
        try {
          const response = await fetch(`http://localhost:${port}/`, { method: 'HEAD', mode: 'no-cors' });
          return true;
        } catch {
          return false;
        }
      };

      // If we're getting 500 errors or on a likely wrong port
      if (currentPort === '3000' && document.title.includes('500')) {
        Promise.all(tryPorts.map(async (port) => {
          if (port.toString() !== currentPort) {
            const available = await checkPort(port);
            if (available && !correctPort) {
              setCorrectPort(port);
              setWrongPort(true);
            }
          }
        }));
      }
    }
  }, [correctPort]);

  if (!wrongPort || !correctPort) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
        color: '#fff',
        padding: '1rem',
        textAlign: 'center',
        zIndex: 10000,
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <div style={{ fontSize: '1.5rem' }}>⚠️</div>
        <div>
          <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
            Wrong Port Detected!
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
            DrinkSip is running on port {correctPort}. 
            <a 
              href={`http://localhost:${correctPort}${window.location.pathname}`}
              style={{ 
                color: '#fff', 
                textDecoration: 'underline', 
                fontWeight: '600', 
                marginLeft: '0.5rem' 
              }}
            >
              Click here to switch to the correct URL
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
