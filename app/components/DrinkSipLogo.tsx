import { useState, useEffect } from 'react';

interface DrinkSipLogoProps {
  variant?: 'light' | 'dark';
  height?: string;
  className?: string;
}

export function DrinkSipLogo({ variant = 'light', height = '32px', className = '' }: DrinkSipLogoProps) {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Try different potential logo URLs from Shopify
    const potentialLogos = [
      `https://cdn.shopify.com/s/files/1/drinksip-logo-${variant}.png`,
      `https://drinksip.myshopify.com/cdn/shop/files/logo-${variant}.png`,
      `https://drinksip.myshopify.com/cdn/shop/files/drinksip-logo-${variant}.svg`,
      `https://cdn.shopify.com/s/files/1/drinksip-${variant}.png`
    ];

    // Try to load the first available logo
    const tryLoadLogo = async (urls: string[], index = 0): Promise<void> => {
      if (index >= urls.length) {
        setHasError(true);
        return;
      }

      const img = new Image();
      img.onload = () => {
        setLogoSrc(urls[index]);
      };
      img.onerror = () => {
        tryLoadLogo(urls, index + 1);
      };
      img.src = urls[index];
    };

    tryLoadLogo(potentialLogos);
  }, [variant]);

  if (hasError || !logoSrc) {
    // Fallback to styled text logo
    return (
      <div className={className} style={{
        fontSize: height === '32px' ? '1.2rem' : '1.5rem',
        fontWeight: 900,
        color: variant === 'light' ? '#fff' : '#000',
        textTransform: 'uppercase',
        letterSpacing: '-0.02em',
        fontFamily: 'Arial Black, Helvetica, Arial, sans-serif'
      }}>
        DrinkSip
      </div>
    );
  }

  return (
    <img 
      src={logoSrc}
      alt="DrinkSip"
      className={className}
      style={{
        height,
        width: 'auto',
        maxWidth: '200px'
      }}
      onError={() => setHasError(true)}
    />
  );
}

// Alternative logo component that uses SVG for crisp rendering
export function DrinkSipLogoSVG({ variant = 'light', height = '32px', className = '' }: DrinkSipLogoProps) {
  const fillColor = variant === 'light' ? '#ffffff' : '#000000';
  
  return (
    <svg 
      width="auto" 
      height={height} 
      viewBox="0 0 200 40" 
      className={className}
      style={{ maxWidth: '200px' }}
    >
      {/* Custom DrinkSip logo design */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E8B122" />
          <stop offset="50%" stopColor="#F05757" />
          <stop offset="100%" stopColor="#77C14A" />
        </linearGradient>
      </defs>
      
      {/* Background circle for beer can effect */}
      <circle cx="20" cy="20" r="15" fill={variant === 'light' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
      
      {/* Beer can icon */}
      <rect x="15" y="10" width="10" height="20" rx="2" fill="url(#logoGradient)" />
      <rect x="16" y="12" width="8" height="2" fill={fillColor} opacity="0.3" />
      
      {/* DrinkSip text */}
      <text 
        x="45" 
        y="16" 
        fill={fillColor}
        fontSize="12" 
        fontWeight="900" 
        fontFamily="Arial Black, Helvetica, Arial, sans-serif"
        letterSpacing="-0.5px"
      >
        DRINK
      </text>
      <text 
        x="45" 
        y="28" 
        fill={fillColor}
        fontSize="12" 
        fontWeight="900" 
        fontFamily="Arial Black, Helvetica, Arial, sans-serif"
        letterSpacing="-0.5px"
      >
        SIP
      </text>
      
      {/* Accent dot */}
      <circle cx="85" cy="24" r="2" fill="#E8B122" />
    </svg>
  );
}
