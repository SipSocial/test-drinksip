import { useState, useEffect } from 'react';

interface BrandIntroProps {
  onComplete: () => void;
}

export function BrandIntro({ onComplete }: BrandIntroProps) {
  const [phase, setPhase] = useState<'tagline' | 'logo' | 'exit'>('tagline');

  useEffect(() => {
    // Phase 1: "A New Type of Beer" (2.5 seconds)
    const logoTimer = setTimeout(() => {
      setPhase('logo');
    }, 2500);

    // Phase 2: Logo + "Non-Alcoholic Beer" (2.5 seconds)
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 5000);

    // Phase 3: Complete and remove (after smooth fade)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 6000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <div 
      className="brand-intro-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        opacity: phase === 'exit' ? 0 : 1,
        transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: phase === 'exit' ? 'none' : 'auto'
      }}
    >
      {/* Continuous Beer GIF Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      >
        <img 
          src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/beer-10.gif?v=1759771077"
          alt="Beer Bubbles"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.95
          }}
        />
        {/* Dark overlay for readability */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)'
          }}
        />
      </div>

      {/* Content Layer */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        {/* Phase 1: Tagline */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '100%',
            padding: '0 2rem',
            opacity: phase === 'tagline' ? 1 : 0,
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: phase === 'tagline' ? 'auto' : 'none'
          }}
        >
          <div
            style={{
              fontFamily: 'Peridot PE, Inter, sans-serif',
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#FFFFFF',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            A New Type<br/>of Beer
          </div>
        </div>

        {/* Phase 2: Logo + Tagline */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            width: '100%',
            padding: '0 2rem',
            opacity: phase === 'logo' || phase === 'exit' ? 1 : 0,
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: phase === 'logo' || phase === 'exit' ? 'auto' : 'none'
          }}
        >
          {/* DrinkSip Logo */}
          <img 
            src="https://cdn.shopify.com/s/files/1/0407/8580/5468/files/DrinkSip_Logo_SVG.svg?v=1759624477"
            alt="DrinkSip"
            style={{
              width: 'clamp(200px, 40vw, 500px)',
              height: 'auto',
              maxWidth: '90vw',
              filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3))'
            }}
          />
          
          {/* Non-Alcoholic Beer Tagline */}
          <div
            style={{
              fontFamily: 'Peridot PE, Inter, sans-serif',
              fontSize: 'clamp(1.2rem, 3vw, 2rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#FFFFFF',
              textAlign: 'center',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
            }}
          >
            Non-Alcoholic Beer
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}