# DrinkSip Design System
## Comprehensive Responsive Refactor - Design Tokens & Guidelines

---

## 🎨 Color Palette

### Brand Colors
```css
--color-black: #000000;           /* Primary background */
--color-white: #ffffff;           /* Primary text & accents */
--color-gray-light: #888888;      /* Secondary text */
--color-gray-dark: #111111;       /* Subtle backgrounds */
```

### Product Accent Colors
```css
--color-hazy-ipa: #E8B122;        /* Golden amber */
--color-watermelon: #F05757;      /* Vibrant red-pink */
--color-lemon-lime: #77C14A;      /* Fresh green */
--color-blood-orange: #ED5335;    /* Deep orange-red */
--color-311-blue: #4A90E2;        /* Artist series blue */
--color-deftones-red: #C41E3A;    /* Artist series red */
```

---

## 📝 Typography

### Font Family
**Primary:** Peridot (when available), fallback to system sans-serif
```css
font-family: 'Peridot', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```

### Font Weights
- **Light (300):** Body text, descriptions
- **Regular (400):** Default text
- **Medium (500):** Navigation, UI elements
- **Bold (700):** Headings, emphasis
- **Black (900):** Hero text, display titles

### Typography Scale (Responsive)
```css
/* Desktop (1920px) */
--text-display: clamp(4rem, 8vw, 8rem);      /* Hero titles */
--text-h1: clamp(3rem, 6vw, 6rem);           /* Page titles */
--text-h2: clamp(2.5rem, 5vw, 4rem);         /* Section titles */
--text-h3: clamp(1.5rem, 3vw, 2.5rem);       /* Subsections */
--text-body-lg: 1.25rem;                     /* Large body */
--text-body: 1rem;                           /* Default body */
--text-body-sm: 0.875rem;                    /* Small text */
--text-caption: 0.75rem;                     /* Captions, labels */

/* Letter Spacing */
--ls-tight: -0.04em;     /* Display text */
--ls-normal: -0.02em;    /* Headings */
--ls-wide: 0.05em;       /* Navigation */
--ls-wider: 0.1em;       /* Buttons, labels */
```

---

## 📏 Spacing System

### Container & Layout
```css
--container-max: 1400px;          /* Max content width */
--container-padding: 2rem;        /* Desktop padding */
--container-padding-tablet: 1rem; /* Tablet padding */
--container-padding-mobile: 0.75rem; /* Mobile padding */
```

### Spacing Scale
```css
--space-xs: 0.5rem;    /* 8px */
--space-sm: 1rem;      /* 16px */
--space-md: 2rem;      /* 32px */
--space-lg: 4rem;      /* 64px */
--space-xl: 6rem;      /* 96px */
--space-2xl: 8rem;     /* 128px */
```

---

## 🎬 Animation Framework

### Easing Curves
```css
--ease-apple: cubic-bezier(0.65, 0, 0.35, 1);    /* Primary easing */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);     /* Standard */
--ease-out: cubic-bezier(0, 0, 0.2, 1);          /* Exit */
--ease-in: cubic-bezier(0.4, 0, 1, 1);           /* Enter */
```

### Duration Scale
```css
--duration-fast: 0.2s;       /* Micro-interactions */
--duration-normal: 0.4s;     /* Standard transitions */
--duration-slow: 0.6s;       /* Hero animations */
--duration-slower: 1.0s;     /* Entrance animations */
```

### Animation Patterns
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(40px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* Slide From Left */
@keyframes slideFromLeft {
  from { 
    opacity: 0; 
    transform: translateX(-60px); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
}

/* Scale In */
@keyframes scaleIn {
  from { 
    opacity: 0; 
    transform: scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: scale(1); 
  }
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-xs: 360px;   /* Extra small phones */
--breakpoint-sm: 480px;   /* Small phones */
--breakpoint-md: 768px;   /* Tablets portrait */
--breakpoint-lg: 1024px;  /* Tablets landscape */
--breakpoint-xl: 1440px;  /* Desktop */
--breakpoint-2xl: 1920px; /* Large desktop */
```

### Breakpoint Strategy
1. **Mobile (320px - 767px):** Single column, stacked layouts
2. **Tablet (768px - 1023px):** 2-column grids, adjusted spacing
3. **Desktop (1024px+):** Full multi-column layouts, maximum spacing

---

## 🎯 Component Guidelines

### Header
- **Height:** 80px (desktop), 70px (tablet), 60px (mobile)
- **Position:** Fixed top
- **Background:** Black with subtle border
- **Z-index:** 1000

### Hero Section
- **Height:** 100vh (desktop), auto with min-height (mobile)
- **Animation:** Staggered entrance (title → image → content)
- **Timing:** 0.6s - 1.0s per element

### Product Cards
- **Border:** 3px solid white
- **Padding:** 2rem (desktop), 1.5rem (tablet), 1rem (mobile)
- **Hover:** Transform translateY(-8px), shadow enhancement
- **Transition:** 0.3s ease

### Carousels
- **Gap:** 2rem (desktop), 1.5rem (tablet), 1rem (mobile)
- **Scroll:** Smooth, hardware-accelerated
- **Controls:** Always visible, 48px minimum tap target

### Buttons
- **Primary:** White background, black text
- **Secondary:** Transparent with white border
- **Padding:** 1rem 2rem (desktop), 0.75rem 1.5rem (mobile)
- **Font:** Bold, uppercase, 0.1em letter-spacing
- **Hover:** Background/color swap, 0.2s transition

---

## ⚡ Performance Guidelines

### Image Optimization
- Use WebP with PNG fallback
- Lazy load below-the-fold images
- Provide srcset for responsive images
- Max file size: 200KB per image

### Animation Performance
- Use `transform` and `opacity` only (GPU-accelerated)
- Add `will-change` sparingly
- Remove `will-change` after animation completes
- Avoid animating `width`, `height`, `top`, `left`

### Loading Strategy
1. Critical CSS inline in `<head>`
2. Defer non-critical CSS
3. Lazy load hero images
4. Preload fonts (Peridot family)

### Lighthouse Targets
- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 100

---

## 🎨 Design Principles

### 1. Consistency
- Unified spacing across all pages
- Same animation timing and easing
- Consistent button styles and hover states
- Matching typography hierarchy

### 2. Responsiveness
- Mobile-first approach
- Fluid grids and flexible layouts
- Touch-friendly tap targets (48px minimum)
- Readable text at all sizes

### 3. Performance
- Hardware-accelerated animations
- Lazy loading for heavy assets
- Optimized images and fonts
- Minimal layout shifts

### 4. Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- High contrast ratios (WCAG AA)

### 5. Brand Cohesion
- Bold, impactful typography
- Large product imagery
- Clean white-on-black aesthetic
- Smooth, cinematic transitions

---

## 📋 Implementation Checklist

### Global
- [ ] Create unified CSS variables
- [ ] Implement responsive container system
- [ ] Set up animation framework
- [ ] Configure font loading strategy

### Components
- [ ] Refactor Header (desktop/tablet/mobile)
- [ ] Refactor Footer (consistent across pages)
- [ ] Create unified Button component
- [ ] Standardize ProductCard component
- [ ] Refactor Carousel components

### Pages
- [ ] Homepage hero & carousels
- [ ] Product Detail Pages (PDPs)
- [ ] Collection pages
- [ ] Partners page
- [ ] Where to Buy page

### Testing
- [ ] Test on 320px (iPhone SE)
- [ ] Test on 375px (iPhone 12/13)
- [ ] Test on 768px (iPad)
- [ ] Test on 1024px (iPad Pro)
- [ ] Test on 1920px (Desktop)

### Performance
- [ ] Optimize images
- [ ] Implement lazy loading
- [ ] Run Lighthouse audit
- [ ] Fix any layout shifts

---

## 🚀 Next Steps

1. **Phase 1:** Create global CSS variables and responsive utilities
2. **Phase 2:** Refactor layout components (Header, Footer, PageLayout)
3. **Phase 3:** Refactor homepage (hero, carousels, product showcase)
4. **Phase 4:** Refactor PDPs (hero animations, product details, "You May Like")
5. **Phase 5:** Refactor collection pages (grid, filters, cards)
6. **Phase 6:** Rebuild Partners & Where to Buy pages
7. **Phase 7:** Mobile optimization pass
8. **Phase 8:** Performance optimization
9. **Phase 9:** Cross-device testing
10. **Phase 10:** Final polish & QA

---

**Last Updated:** January 2025
**Version:** 1.0.0
