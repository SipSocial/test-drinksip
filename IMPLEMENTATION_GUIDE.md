# DrinkSip Complete Refactor - Implementation Guide

## 🎯 Overview

This guide provides a step-by-step approach to implementing the complete responsive refactor of the DrinkSip website. The work has been broken down into manageable phases that can be executed systematically.

---

## ✅ Phase 1: Foundation (COMPLETE)

- [x] Created `DESIGN_SYSTEM.md` with comprehensive design tokens
- [x] Created `design-tokens.css` with CSS variables and animations
- [x] Created `REFACTOR_PLAN.md` with detailed roadmap
- [x] Imported design tokens into `tailwind.css`
- [x] Captured baseline screenshots for reference
- [x] **Committed to GitHub**

---

## 🚧 Phase 2: Core Components (IN PROGRESS)

### 2.1 Unified Header Component ✅
**File:** `app/components/UnifiedHeader.tsx`

**Status:** Created - needs integration

**Features:**
- Responsive design (desktop/tablet/mobile)
- Glassmorphic pill navigation
- Mobile hamburger menu with full-screen overlay
- Adaptive colors based on background
- Hardware-accelerated animations
- 48px minimum tap targets on mobile

**Integration Steps:**
1. Update `PageLayout.tsx` to use `UnifiedHeader`
2. Remove old header components (after testing)
3. Test across all viewport sizes

### 2.2 Unified Footer Component
**File:** `app/components/UnifiedFooter.tsx`

**Current State:** `DrinkSipFooter.tsx` is good but needs responsive refinement

**Tasks:**
- [ ] Make grid fully responsive (4 cols → 2 cols → 1 col)
- [ ] Ensure proper spacing on mobile
- [ ] Test newsletter signup form
- [ ] Verify all links work
- [ ] Add proper form validation

**Responsive Breakpoints:**
```css
/* Desktop: 4 columns */
grid-template-columns: repeat(4, 1fr);

/* Tablet: 2 columns */
@media (max-width: 1024px) {
  grid-template-columns: repeat(2, 1fr);
}

/* Mobile: 1 column */
@media (max-width: 768px) {
  grid-template-columns: 1fr;
}
```

### 2.3 PageLayout Refactor
**File:** `app/components/PageLayout.tsx`

**Tasks:**
- [ ] Replace multiple header components with `UnifiedHeader`
- [ ] Add proper padding-top for fixed header
- [ ] Ensure no horizontal overflow
- [ ] Add scroll restoration
- [ ] Implement loading states

**Updated Structure:**
```tsx
export function PageLayout({ ... }: PageLayoutProps) {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  
  // Determine header background color based on route
  const getHeaderBackground = () => {
    if (isHomepage) return undefined; // Transparent
    if (location.pathname.startsWith('/products/')) {
      // Get product color from loader data
      return productColor;
    }
    return '#000'; // Default black
  };

  return (
    <Aside.Provider>
      <CartAside cart={cart} />
      <SearchAside />
      
      <UnifiedHeader 
        backgroundColor={getHeaderBackground()}
        isTransparent={isHomepage}
      />
      
      <main style={{ 
        paddingTop: isMobile ? '120px' : '203px',
        minHeight: '100vh'
      }}>
        {children}
      </main>
      
      <UnifiedFooter />
    </Aside.Provider>
  );
}
```

---

## 📋 Phase 3: Homepage Refactor

### 3.1 Hero Carousel
**File:** `app/components/HeroCarousel.tsx`

**Tasks:**
- [ ] Make fully responsive
- [ ] Polish autoplay transitions (hardware-accelerated)
- [ ] Desktop: Nav dots bottom-left, arrows visible
- [ ] Mobile: Controls in center overlay, large tap targets
- [ ] Add proper ARIA labels
- [ ] Implement lazy loading for images

**Animation Requirements:**
```css
/* Slide transition */
transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
transform: translateZ(0); /* Hardware acceleration */
```

### 3.2 Product Showcase Carousel
**File:** `app/components/ProductShowcaseCarousel.tsx`

**Tasks:**
- [ ] Ensure smooth autoplay
- [ ] Make responsive (adjust card sizes)
- [ ] Polish entrance animations
- [ ] Add intersection observer for scroll-triggered animations

### 3.3 "You May Like" Section
**File:** `app/components/AutoPlayProductCarousel.tsx`

**Tasks:**
- [ ] Maintain jumbo card style with thick white borders
- [ ] Ensure infinite loop works smoothly
- [ ] Make responsive (grid → carousel on mobile)
- [ ] Optimize image loading

---

## 📋 Phase 4: Product Detail Pages (PDPs)

### 4.1 PDP Hero Section
**File:** `app/routes/products.$handle.tsx`

**Current Issues:**
- Needs responsive refinement
- Animation sequence needs polish
- Mobile layout needs stacking

**Animation Sequence:**
```tsx
// 1. Title slides from middle → final position (0.6s delay)
// 2. Can image slides from left (0.8s delay)
// 3. Right-side content fades in sequentially (1.0s delay)

const heroAnimation = {
  title: {
    initial: { opacity: 0, transform: 'translate(0, 0) scale(0.9)' },
    animate: { opacity: 1, transform: 'translate(0, 0) scale(1)' },
    transition: { duration: 0.6, delay: 0, ease: [0.65, 0, 0.35, 1] }
  },
  canImage: {
    initial: { opacity: 0, transform: 'translateX(-100px) scale(0.9)' },
    animate: { opacity: 1, transform: 'translateX(0) scale(1)' },
    transition: { duration: 0.8, delay: 0.2, ease: [0.65, 0, 0.35, 1] }
  },
  content: {
    initial: { opacity: 0, transform: 'translateY(20px)' },
    animate: { opacity: 1, transform: 'translateY(0)' },
    transition: { duration: 0.6, delay: 0.4, ease: [0.65, 0, 0.35, 1] }
  }
};
```

**Responsive Layout:**
```css
/* Desktop: Side-by-side */
.pdp-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

/* Mobile: Stacked */
@media (max-width: 768px) {
  .pdp-hero {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
```

### 4.2 Product Details Section
**File:** `app/components/ProductTabs.tsx`

**Tasks:**
- [ ] Make tabs responsive (stack on mobile)
- [ ] Ensure chips/badges scale properly
- [ ] Make buttons responsive
- [ ] Test nutrition info, ingredients, reviews on mobile

### 4.3 "You May Like" Carousel
**Tasks:**
- [ ] Maintain jumbo card style
- [ ] Ensure carousel works on all devices
- [ ] Polish transitions and autoplay

---

## 📋 Phase 5: Collection Pages

### 5.1 Collection Grid
**File:** `app/routes/collections.$handle.tsx`

**Tasks:**
- [ ] Ensure equal spacing between all product cards
- [ ] Verify grid consistency
- [ ] Apply unified hover states
- [ ] Test across Core, Refresher, and Artist series

**Responsive Grid:**
```css
/* Desktop: 4 columns */
.collection-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

/* Tablet: 3 columns */
@media (max-width: 1024px) {
  .collection-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
}

/* Mobile: 2 columns */
@media (max-width: 768px) {
  .collection-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

/* Small Mobile: 1 column */
@media (max-width: 480px) {
  .collection-grid {
    grid-template-columns: 1fr;
  }
}
```

### 5.2 Product Cards
**File:** `app/components/ProductCard.tsx`

**Tasks:**
- [ ] Ensure images scale properly
- [ ] Add smooth hover animations
- [ ] Test on all viewport sizes
- [ ] Implement lazy loading

**Hover Animation:**
```css
.product-card {
  transition: transform 0.3s cubic-bezier(0.65, 0, 0.35, 1);
}

.product-card:hover {
  transform: translateY(-8px);
}
```

---

## 📋 Phase 6: Partners & Where to Buy Pages

### 6.1 Partners Page
**File:** `app/routes/pages.partners.tsx`

**Current State:** Needs complete rebuild

**Design Requirements:**
- Premium layout with brand storytelling
- Partner logos in elegant grid
- Short bios and value propositions
- Clear CTAs
- Fully responsive

**Suggested Structure:**
```tsx
<section className="partners-hero">
  <h1>Our Partners</h1>
  <p>Collaborating with the best to bring you DrinkSip</p>
</section>

<section className="partners-grid">
  {partners.map(partner => (
    <div className="partner-card">
      <img src={partner.logo} alt={partner.name} />
      <h3>{partner.name}</h3>
      <p>{partner.bio}</p>
      <a href={partner.url}>Learn More →</a>
    </div>
  ))}
</section>
```

### 6.2 Where to Buy Page
**File:** `app/routes/pages.where-to-buy.tsx`

**Current State:** Needs complete rebuild

**Design Requirements:**
- Retailer/distributor visibility
- Location-based search (optional)
- Logos and links
- Fully responsive
- Map integration (optional)

---

## 📋 Phase 7: Animation Framework

### 7.1 Create Animation Utilities
**Files to Create:**
- `app/hooks/useScrollAnimation.ts`
- `app/components/AnimatedSection.tsx`

**useScrollAnimation Hook:**
```tsx
import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

**AnimatedSection Component:**
```tsx
import { useScrollAnimation } from '~/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideFromLeft' | 'slideFromRight';
  delay?: number;
}

export function AnimatedSection({ 
  children, 
  animation = 'fadeIn',
  delay = 0
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={isVisible ? `animate-${animation}` : ''}
      style={{
        opacity: isVisible ? 1 : 0,
        animationDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}
```

### 7.2 Apply Animations
**Tasks:**
- [ ] Homepage hero entrance
- [ ] PDP hero sequence
- [ ] Carousel transitions
- [ ] Button hover states
- [ ] Card hover effects

---

## 📋 Phase 8: Mobile Optimization

### 8.1 Touch Interactions
**Tasks:**
- [ ] Verify all tap targets are 48px minimum
- [ ] Test swipe gestures on carousels
- [ ] Ensure smooth scrolling
- [ ] Test on actual mobile devices

### 8.2 Mobile Performance
**Tasks:**
- [ ] Lazy load images below the fold
- [ ] Defer non-critical CSS
- [ ] Test on actual mobile devices
- [ ] Optimize for 3G/4G networks

---

## 📋 Phase 9: Performance Optimization

### 9.1 Image Optimization
**Tasks:**
- [ ] Convert all images to WebP with PNG fallback
- [ ] Implement responsive images with srcset
- [ ] Add lazy loading to all below-fold images
- [ ] Compress images (target <200KB each)

**Example:**
```tsx
<img
  src="/images/product.webp"
  srcSet="/images/product-400.webp 400w, /images/product-800.webp 800w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Product"
  loading="lazy"
/>
```

### 9.2 Font Loading
**Tasks:**
- [ ] Implement font-display: swap
- [ ] Preload critical Peridot fonts
- [ ] Subset fonts if possible

### 9.3 Lighthouse Audit
**Tasks:**
- [ ] Run Lighthouse on all pages
- [ ] Fix any performance issues
- [ ] Target 90+ performance score
- [ ] Ensure 95+ accessibility score

---

## 📋 Phase 10: Testing & QA

### 10.1 Cross-Device Testing
**Viewports to Test:**
- 1920px (large desktop)
- 1440px (standard desktop)
- 1024px (tablet landscape)
- 768px (tablet portrait)
- 375px (mobile)
- 320px (small mobile)

### 10.2 Browser Testing
**Browsers:**
- Chrome/Edge
- Safari (desktop and mobile)
- Firefox
- Test on actual devices, not just DevTools

### 10.3 Accessibility Audit
**Tasks:**
- [ ] Verify keyboard navigation works
- [ ] Test with screen reader
- [ ] Check color contrast ratios
- [ ] Ensure all images have alt text
- [ ] Verify ARIA labels are correct

---

## 🚀 Quick Start Commands

### Start Development Server
```bash
wsl -d Ubuntu -e bash -c "cd /mnt/c/Apps/test-drinksip/drink-sip-app && npm run dev"
```

### Run Linter
```bash
wsl -d Ubuntu -e bash -c "cd /mnt/c/Apps/test-drinksip/drink-sip-app && npm run lint"
```

### Type Check
```bash
wsl -d Ubuntu -e bash -c "cd /mnt/c/Apps/test-drinksip/drink-sip-app && npm run typecheck"
```

### Build for Production
```bash
wsl -d Ubuntu -e bash -c "cd /mnt/c/Apps/test-drinksip/drink-sip-app && npm run build"
```

---

## 📝 Git Workflow

### Commit After Each Phase
```bash
git add .
git commit -m "Phase X: [Description]"
git push origin main
```

### Example Commits
- "Phase 2: Add UnifiedHeader component with responsive design"
- "Phase 3: Refactor homepage hero carousel for mobile"
- "Phase 4: Implement PDP entrance animations"
- "Phase 5: Make collection grids fully responsive"

---

## 🎯 Success Metrics

### Performance
- ✅ Lighthouse Performance: 90+
- ✅ Lighthouse Accessibility: 95+
- ✅ LCP: ≤ 2.5s
- ✅ FID: ≤ 100ms
- ✅ CLS: ≤ 0.1

### Responsive Design
- ✅ Works on 320px - 1920px viewports
- ✅ No horizontal scrolling
- ✅ All tap targets 48px minimum on mobile
- ✅ Typography readable at all sizes

### Visual Consistency
- ✅ Same spacing across all pages
- ✅ Unified animation timing
- ✅ Consistent button styles
- ✅ Matching typography hierarchy

---

## 📞 Next Steps

1. **Integrate UnifiedHeader** into PageLayout
2. **Test on mobile** to ensure menu works
3. **Refactor homepage** hero and carousels
4. **Polish PDPs** with entrance animations
5. **Make collection pages** fully responsive
6. **Rebuild Partners & Where to Buy** pages
7. **Run performance audit** and optimize
8. **Test across devices** and browsers
9. **Final QA** and polish
10. **Deploy to production**

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Status:** Phase 2 - Core Components In Progress
