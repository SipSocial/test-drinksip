interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

export function LoadingSpinner({ size = 'medium', color = '#fff', className = '' }: LoadingSpinnerProps) {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px'
  };

  return (
    <div 
      className={`loading-spinner ${className}`}
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        border: `3px solid rgba(255, 255, 255, 0.2)`,
        borderTop: `3px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        display: 'inline-block'
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }} />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '15px',
      padding: '2rem',
      textAlign: 'center',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      minHeight: '300px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem'
    }}>
      <LoadingSpinner size="large" color="#000" />
      <p style={{
        color: '#666',
        fontSize: '0.9rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        Loading Product...
      </p>
    </div>
  );
}

export function LoadingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem'
    }}>
      <LoadingSpinner size="large" color="#fff" />
      <div style={{ textAlign: 'center' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          marginBottom: '0.5rem'
        }}>
          Loading DrinkSip
        </h2>
        <p style={{
          color: '#888',
          fontSize: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Preparing your experience...
        </p>
      </div>
    </div>
  );
}
