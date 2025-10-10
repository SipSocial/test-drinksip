/**
 * Touch-enhanced components for premium mobile experience
 * Smooth gestures, haptic feedback, and ultra-responsive interactions
 */

import React, { useState, useRef, useCallback } from 'react';

interface TouchEnhancedProps {
  children: React.ReactNode;
  onTap?: () => void;
  onDoubleTap?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  className?: string;
  rippleEffect?: boolean;
  hapticFeedback?: boolean;
}

export function TouchEnhanced({
  children,
  onTap,
  onDoubleTap,
  onSwipeLeft,
  onSwipeRight,
  onLongPress,
  disabled = false,
  className = '',
  rippleEffect = true,
  hapticFeedback = true
}: TouchEnhancedProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isPressed, setIsPressed] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const longPressTimeoutRef = useRef<NodeJS.Timeout>();
  const tapCountRef = useRef(0);
  const doubleTapTimeoutRef = useRef<NodeJS.Timeout>();

  const triggerHaptic = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (hapticFeedback && 'navigator' in window && 'vibrate' in navigator) {
      const patterns = {
        light: 10,
        medium: 20,
        heavy: 50
      };
      navigator.vibrate(patterns[type]);
    }
  }, [hapticFeedback]);

  const createRipple = useCallback((x: number, y: number) => {
    if (!rippleEffect || !elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const rippleX = x - rect.left;
    const rippleY = y - rect.top;

    const newRipple = {
      id: Date.now(),
      x: rippleX,
      y: rippleY
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  }, [rippleEffect]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled) return;

    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    setIsPressed(true);
    triggerHaptic('light');

    // Long press detection
    if (onLongPress) {
      longPressTimeoutRef.current = setTimeout(() => {
        onLongPress();
        triggerHaptic('heavy');
      }, 500);
    }

    // Create ripple effect
    createRipple(touch.clientX, touch.clientY);
  }, [disabled, onLongPress, triggerHaptic, createRipple]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (disabled || !touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const startTouch = touchStartRef.current;
    
    const deltaX = touch.clientX - startTouch.x;
    const deltaY = touch.clientY - startTouch.y;
    const deltaTime = Date.now() - startTouch.time;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    setIsPressed(false);

    // Clear long press timeout
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }

    // Swipe detection
    if (distance > 50 && deltaTime < 300) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
          triggerHaptic('medium');
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
          triggerHaptic('medium');
        }
      }
      return;
    }

    // Tap detection (short touch with minimal movement)
    if (distance < 10 && deltaTime < 300) {
      tapCountRef.current++;

      if (doubleTapTimeoutRef.current) {
        clearTimeout(doubleTapTimeoutRef.current);
      }

      if (tapCountRef.current === 1) {
        doubleTapTimeoutRef.current = setTimeout(() => {
          if (onTap) {
            onTap();
            triggerHaptic('light');
          }
          tapCountRef.current = 0;
        }, 300);
      } else if (tapCountRef.current === 2) {
        if (onDoubleTap) {
          onDoubleTap();
          triggerHaptic('medium');
        }
        tapCountRef.current = 0;
      }
    }

    touchStartRef.current = null;
  }, [disabled, onTap, onDoubleTap, onSwipeLeft, onSwipeRight, triggerHaptic]);

  const handleTouchCancel = useCallback(() => {
    setIsPressed(false);
    touchStartRef.current = null;
    
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }
  }, []);

  return (
    <>
      <style>{`
        .touch-enhanced {
          position: relative;
          overflow: hidden;
          user-select: none;
          -webkit-user-select: none;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: transparent;
          cursor: pointer;
          transition: transform 0.1s ease-out;
        }

        .touch-enhanced.disabled {
          pointer-events: none;
          opacity: 0.6;
          cursor: not-allowed;
        }

        .touch-enhanced.pressed {
          transform: scale(0.98);
        }

        .touch-ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          animation: rippleAnimation 0.6s ease-out;
          pointer-events: none;
        }

        @keyframes rippleAnimation {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        /* Enhanced touch targets for accessibility */
        .touch-enhanced {
          min-height: 44px;
          min-width: 44px;
        }

        /* Premium feedback animations */
        .touch-enhanced:active {
          transform: scale(0.96);
        }

        /* Dark mode optimizations */
        @media (prefers-color-scheme: dark) {
          .touch-ripple {
            background: rgba(255, 255, 255, 0.2);
          }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .touch-enhanced {
            transition: none;
          }
          
          .touch-enhanced:active {
            transform: none;
          }
          
          .touch-ripple {
            animation: none;
            opacity: 0;
          }
        }
      `}</style>

      <div
        ref={elementRef}
        className={`touch-enhanced ${disabled ? 'disabled' : ''} ${isPressed ? 'pressed' : ''} ${className}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
      >
        {children}
        
        {/* Ripple effects */}
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="touch-ripple"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20
            }}
          />
        ))}
      </div>
    </>
  );
}

// Specialized touch components
export function TouchButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
} & Omit<TouchEnhancedProps, 'onTap' | 'children'>) {
  
  const variants = {
    primary: 'bg-white text-black font-medium px-6 py-3 rounded-none border-2 border-white',
    secondary: 'bg-transparent text-white font-medium px-6 py-3 rounded-none border-2 border-white',
    ghost: 'bg-transparent text-white font-medium px-4 py-2 rounded-none'
  };

  return (
    <TouchEnhanced
      onTap={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </TouchEnhanced>
  );
}

export function TouchCard({
  children,
  onTap,
  onDoubleTap,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  onTap?: () => void;
  onDoubleTap?: () => void;
  className?: string;
} & Omit<TouchEnhancedProps, 'children'>) {
  
  return (
    <TouchEnhanced
      onTap={onTap}
      onDoubleTap={onDoubleTap}
      className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 ${className}`}
      {...props}
    >
      {children}
    </TouchEnhanced>
  );
}

// Hook for touch gesture detection
export function useTouchGestures() {
  const [gestureState, setGestureState] = useState({
    isSwipeLeft: false,
    isSwipeRight: false,
    isLongPress: false,
    isPinching: false,
    scale: 1
  });

  const resetGestures = useCallback(() => {
    setGestureState({
      isSwipeLeft: false,
      isSwipeRight: false,
      isLongPress: false,
      isPinching: false,
      scale: 1
    });
  }, []);

  return {
    gestureState,
    resetGestures
  };
}

// Touch-optimized carousel component
export function TouchCarousel({
  children,
  className = '',
  onSwipeLeft,
  onSwipeRight
}: {
  children: React.ReactNode;
  className?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}) {
  return (
    <TouchEnhanced
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      className={`overflow-hidden ${className}`}
      rippleEffect={false}
    >
      {children}
    </TouchEnhanced>
  );
}
