import React from 'react';
import { useScrollAnimation } from '~/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideFromLeft' | 'slideFromRight' | 'scaleIn';
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Animated Section Component
 * 
 * Wraps content with scroll-triggered animations using Intersection Observer
 * 
 * @param children - Content to animate
 * @param animation - Type of animation to apply
 * @param delay - Animation delay in milliseconds
 * @param duration - Animation duration (uses CSS variable by default)
 * @param threshold - Percentage of element visibility to trigger (0-1)
 * @param triggerOnce - Whether animation should only trigger once
 * @param className - Additional CSS classes
 * @param style - Additional inline styles
 * @param as - HTML element type (default: 'div')
 * 
 * @example
 * <AnimatedSection animation="fadeIn" delay={200}>
 *   <h1>Animated Heading</h1>
 * </AnimatedSection>
 * 
 * @example
 * <AnimatedSection 
 *   animation="slideUp" 
 *   delay={400}
 *   threshold={0.3}
 *   as="section"
 * >
 *   <p>Animated paragraph</p>
 * </AnimatedSection>
 */
export function AnimatedSection({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  style = {},
  as: Component = 'div'
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce });

  const animationClass = isVisible ? `animate-${animation}` : '';
  
  const combinedStyle = {
    ...style,
    opacity: isVisible ? undefined : 0,
    animationDelay: delay ? `${delay}ms` : undefined,
    animationDuration: duration ? `${duration}ms` : undefined
  } as React.CSSProperties;

  return (
    <Component
      ref={ref as any}
      className={`${animationClass} ${className}`.trim()}
      style={combinedStyle}
    >
      {children}
    </Component>
  );
}

/**
 * Staggered Animation Container
 * 
 * Animates children with staggered delays
 * 
 * @param children - Array of elements to animate
 * @param animation - Type of animation to apply
 * @param staggerDelay - Delay between each child animation in milliseconds
 * @param threshold - Percentage of element visibility to trigger (0-1)
 * @param className - Additional CSS classes
 * 
 * @example
 * <StaggeredAnimation animation="slideUp" staggerDelay={100}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </StaggeredAnimation>
 */
export function StaggeredAnimation({
  children,
  animation = 'fadeIn',
  staggerDelay = 100,
  threshold = 0.1,
  className = ''
}: {
  children: React.ReactNode;
  animation?: AnimatedSectionProps['animation'];
  staggerDelay?: number;
  threshold?: number;
  className?: string;
}) {
  const childrenArray = React.Children.toArray(children);

  return (
    <>
      {childrenArray.map((child, index) => (
        <AnimatedSection
          key={index}
          animation={animation}
          delay={index * staggerDelay}
          threshold={threshold}
          className={className}
        >
          {child}
        </AnimatedSection>
      ))}
    </>
  );
}

/**
 * Fade In On Scroll
 * 
 * Simple fade-in animation wrapper
 * 
 * @example
 * <FadeInOnScroll>
 *   <h2>This fades in on scroll</h2>
 * </FadeInOnScroll>
 */
export function FadeInOnScroll({
  children,
  delay = 0,
  threshold = 0.1
}: {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
}) {
  return (
    <AnimatedSection animation="fadeIn" delay={delay} threshold={threshold}>
      {children}
    </AnimatedSection>
  );
}

/**
 * Slide Up On Scroll
 * 
 * Slide up animation wrapper
 * 
 * @example
 * <SlideUpOnScroll delay={200}>
 *   <p>This slides up on scroll</p>
 * </SlideUpOnScroll>
 */
export function SlideUpOnScroll({
  children,
  delay = 0,
  threshold = 0.1
}: {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
}) {
  return (
    <AnimatedSection animation="slideUp" delay={delay} threshold={threshold}>
      {children}
    </AnimatedSection>
  );
}
