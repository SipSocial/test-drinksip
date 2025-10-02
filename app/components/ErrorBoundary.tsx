import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          minHeight: '400px',
          background: '#000',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem'
          }}>
            🍺
          </div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            color: '#fff'
          }}>
            Something Went Wrong
          </h2>
          <p style={{
            color: '#888',
            fontSize: '1rem',
            marginBottom: '2rem',
            maxWidth: '500px',
            lineHeight: 1.5
          }}>
            We're having trouble loading this section. Don't worry, our team has been notified and we're working on a fix.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '1rem 2rem',
              border: '2px solid #fff',
              background: '#fff',
              color: '#000',
              fontSize: '0.9rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
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
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ProductErrorFallback() {
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
      <div style={{ fontSize: '3rem' }}>🚫</div>
      <h3 style={{
        fontSize: '1.2rem',
        fontWeight: 900,
        textTransform: 'uppercase',
        color: '#000',
        marginBottom: '0.5rem'
      }}>
        Product Unavailable
      </h3>
      <p style={{
        color: '#666',
        fontSize: '0.9rem'
      }}>
        This product couldn't be loaded
      </p>
    </div>
  );
}
