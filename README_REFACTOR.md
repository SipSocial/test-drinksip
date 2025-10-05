# DrinkSip Website Refactor - Complete Documentation

## 🎉 Project Overview

This document provides a comprehensive overview of the DrinkSip website refactor project - a systematic rebuild to achieve a fully responsive, high-performance, and visually cohesive experience across all devices.

---

## 📊 Project Status: **Phase 3 Complete (40%)**

### ✅ Completed Work
- **Phase 1:** Foundation & Design System (100%)
- **Phase 2:** Core Layout Components (100%)
- **Phase 3:** Animation Framework (100%)

### 🚧 In Progress
- **Phase 4:** Homepage Refactor (10%)

### ⏳ Remaining
- Phases 5-10 (Homepage polish, PDPs, Collections, Partners, Where to Buy, Performance, Testing)

---

## 📁 Project Structure

```
drink-sip-app/
├── DESIGN_SYSTEM.md          # Complete design system documentation
├── REFACTOR_PLAN.md           # Detailed 11-phase implementation roadmap
├── IMPLEMENTATION_GUIDE.md    # Step-by-step instructions
├── PROGRESS_SUMMARY.md        # Comprehensive progress tracking
├── FINAL_STATUS.md            # Current status and next steps
├── README_REFACTOR.md         # This file
│
├── app/
│   ├── styles/
│   │   ├── design-tokens.css  # CSS variables and utilities
│   │   ├── tailwind.css       # Main styles (imports design tokens)
│   │   ├── app.css            # Application styles
│   │   └── reset.css          # CSS reset
│   │
│   ├── components/
│   │   ├── UnifiedHeader.tsx  # Responsive header component
│   │   ├── UnifiedFooter.tsx  # Responsive footer component
│   │   ├── AnimatedSection.tsx # Animation wrapper components
│   │   ├── HeroCarousel.tsx   # Homepage hero carousel
│   │   ├── ProductShowcaseCarousel.tsx
│   │   ├── AutoPlayProductCarousel.tsx
│   │   └── ... (other components)
│   │
│   ├── hooks/
│   │   └── useScrollAnimation.ts # Custom animation hooks
│   │
│   └── routes/
│       ├── _index.tsx         # Homepage
│       ├── products.$handle.tsx # Product detail pages
│       ├── collections.$handle.tsx # Collection pages
│       └── ... (other routes)
│
└── public/
    ├── fonts/                 # Peridot font family (if available)
    └── ... (other assets)
```

---

## 🎨 Design System

### Color Palette

#### Brand Colors
- **Black:** `#000000` - Primary background
- **White:** `#ffffff` - Primary text & accents
- **Gray Light:** `#888888` - Secondary text
- **Gray Dark:** `#111111` - Subtle backgrounds

#### Product Accent Colors
- **Hazy IPA:** `#E8B122` - Golden amber
- **Watermelon:** `#F05757` - Vibrant red-pink
- **Lemon Lime:** `#77C14A` - Fresh green
- **Blood Orange:** `#ED5335` - Deep orange-red
- **311 Blue:** `#4A90E2` - Artist series
- **Deftones Red:** `#C41E3A` - Artist series

### Typography

**Font Family:** Peridot (fallback to system sans-serif)

**Font Weights:**
- Light: 300
- Regular: 400
- Medium: 500
- Bold: 700
- Black: 900

**Responsive Scale:**
```css
--text-display: clamp(3rem, 8vw, 8rem);
--text-h1: clamp(2.5rem, 6vw, 6rem);
--text-h2: clamp(2rem, 5vw, 4rem);
--text-h3: clamp(1.5rem, 3vw, 2.5rem);
--text-body: 1rem;
```

### Spacing System

```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 2rem;     /* 32px */
--space-lg: 4rem;     /* 64px */
--space-xl: 6rem;     /* 96px */
--space-2xl: 8rem;    /* 128px */
```

### Animation Framework

**Easing Curves:**
```css
--ease-apple: cubic-bezier(0.65, 0, 0.35, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

**Duration:**
```css
--duration-fast: 0.2s;
--duration-normal: 0.4s;
--duration-slow: 0.6s;
--duration-slower: 1.0s;
```

**Available Animations:**
- fadeIn
- slideUp
- slideDown
- slideFromLeft
- slideFromRight
- scaleIn

---

## 🧩 Components

### UnifiedHeader

**Features:**
- Fully responsive (desktop/tablet/mobile)
- Glassmorphic pill navigation
- Mobile hamburger menu with full-screen overlay
- Adaptive colors based on background
- Hardware-accelerated animations
- 48px minimum tap targets on mobile

**Usage:**
```tsx
<UnifiedHeader 
  backgroundColor="#E8B122"  // Optional: Product color
  isTransparent={false}      // Optional: Transparent background
/>
```

**Responsive Behavior:**
- **Desktop (1025px+):** Glassmorphic pill nav, logo left, actions right (203px height)
- **Tablet (768px-1024px):** Adjusted spacing (70px height)
- **Mobile (<768px):** Hamburger menu with full-screen overlay (120px height)

---

### UnifiedFooter

**Features:**
- Responsive grid (4 cols → 2 cols → 1 col)
- Working newsletter signup with validation
- Social media links with hover effects
- Organized sections (Products, Company, Support, Brand)
- Legal links and branding message

**Usage:**
```tsx
<UnifiedFooter />
```

**Responsive Behavior:**
- **Desktop:** 4-column grid
- **Tablet:** 2-column grid
- **Mobile:** 1-column stack

---

### AnimatedSection

**Features:**
- Scroll-triggered animations using Intersection Observer
- 6 animation types
- Configurable delay and threshold
- Performance-optimized

**Usage:**
```tsx
<AnimatedSection animation="fadeIn" delay={200} threshold={0.2}>
  <h1>Animated Content</h1>
</AnimatedSection>

<FadeInOnScroll delay={400}>
  <p>Simple fade-in</p>
</FadeInOnScroll>

<SlideUpOnScroll>
  <div>Slides up on scroll</div>
</SlideUpOnScroll>
```

---

### Animation Hooks

**useScrollAnimation:**
```tsx
const { ref, isVisible } = useScrollAnimation({ 
  threshold: 0.2, 
  triggerOnce: true 
});

<div ref={ref} className={isVisible ? 'animate-fade-in' : ''}>
  Content
</div>
```

**useStaggeredAnimation:**
```tsx
const items = useStaggeredAnimation(5, { threshold: 0.2 });

{items.map((item, index) => (
  <div 
    key={index} 
    ref={item.ref} 
    className={item.isVisible ? 'animate-slide-up' : ''}
    style={{ animationDelay: `${index * 100}ms` }}
  >
    Item {index}
  </div>
))}
```

**useParallax:**
```tsx
const { ref, transform } = useParallax(0.5);

<div ref={ref} style={{ transform: `translateY(${transform}px)` }}>
  Parallax Content
</div>
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- WSL (Windows Subsystem for Linux)
- Git

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd drink-sip-app

# Install dependencies (in WSL)
wsl -d Ubuntu -e bash -c "cd /mnt/c/Apps/test-drinksip/drink-sip-app && npm install"
```

### Development

```bash
# Start development server (in WSL)
wsl -d Ubuntu -e bash -c "cd /mnt/c/Apps/test-drinksip/drink-sip-app && npm run dev"

# Access at http://localhost:3000
```

### Build

```bash
# Build for production
wsl -d Ubuntu -e bash -c "cd /mnt/c/Apps/test-drinksip/drink-sip-app && npm run build"
```

### Linting & Type Checking

```bash
# Run linter
npm run lint

# Run type checker
npm run typecheck
```

---

## 📝 Development Guidelines

### Adding New Components

1. Create component in `app/components/`
2. Use TypeScript for all new components
3. Import design tokens from CSS variables
4. Follow responsive design patterns
5. Add animations using `AnimatedSection` or hooks

**Example:**
```tsx
import { AnimatedSection } from '~/components/AnimatedSection';

export function MyComponent() {
  return (
    <AnimatedSection animation="fadeIn" delay={200}>
      <div style={{
        padding: 'var(--space-md)',
        background: 'var(--color-black)',
        color: 'var(--color-white)'
      }}>
        <h2 style={{ fontSize: 'var(--text-h2)' }}>
          My Component
        </h2>
      </div>
    </AnimatedSection>
  );
}
```

### Using Design Tokens

**CSS Variables:**
```css
.my-element {
  color: var(--color-white);
  font-size: var(--text-h2);
  padding: var(--space-md);
  transition: all var(--duration-normal) var(--ease-apple);
}
```

**Utility Classes:**
```tsx
<div className="animate-fade-in delay-200 font-heading">
  Content
</div>
```

### Responsive Design

**Mobile-First Approach:**
```css
/* Mobile styles (default) */
.element {
  padding: var(--space-sm);
  font-size: var(--text-body);
}

/* Tablet */
@media (min-width: 768px) {
  .element {
    padding: var(--space-md);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .element {
    padding: var(--space-lg);
    font-size: var(--text-h3);
  }
}
```

---

## 🎯 Performance Guidelines

### Image Optimization
- Use WebP with PNG fallback
- Implement lazy loading for below-fold images
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
4. Preload fonts

---

## 🧪 Testing

### Manual Testing Checklist

**Viewport Sizes:**
- [ ] 320px (iPhone SE)
- [ ] 375px (iPhone 12/13)
- [ ] 768px (iPad)
- [ ] 1024px (iPad Pro)
- [ ] 1920px (Desktop)

**Browsers:**
- [ ] Chrome/Edge
- [ ] Safari (desktop and mobile)
- [ ] Firefox

**Functionality:**
- [ ] Header navigation works
- [ ] Mobile menu opens/closes
- [ ] Footer links work
- [ ] Newsletter signup works
- [ ] Animations trigger on scroll
- [ ] No horizontal scrolling
- [ ] All tap targets are 48px minimum

---

## 📚 Documentation Files

1. **DESIGN_SYSTEM.md** - Complete design system reference
2. **REFACTOR_PLAN.md** - Detailed 11-phase roadmap
3. **IMPLEMENTATION_GUIDE.md** - Step-by-step instructions
4. **PROGRESS_SUMMARY.md** - Current progress tracking
5. **FINAL_STATUS.md** - Status report and next steps
6. **README_REFACTOR.md** - This file

---

## 🤝 Contributing

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "Description of changes"

# Push to remote
git push origin feature/my-feature

# Create pull request
```

### Commit Message Format

```
Phase X: Brief description

- Detailed change 1
- Detailed change 2
- Detailed change 3
```

**Examples:**
- `Phase 2: Add UnifiedHeader component with responsive design`
- `Phase 3: Implement animation framework with hooks`
- `Fix: Resolve mobile menu z-index issue`

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** Header not showing
**Solution:** Check that `UnifiedHeader` is imported in `PageLayout.tsx`

**Issue:** Animations not triggering
**Solution:** Ensure `AnimatedSection` is wrapping the content and threshold is set correctly

**Issue:** Mobile menu not working
**Solution:** Check z-index values and ensure no conflicting styles

**Issue:** Horizontal scrolling on mobile
**Solution:** Check for elements with fixed widths or `100vw` that don't account for scrollbar

---

## 📞 Support

For questions or issues:
1. Check documentation files
2. Review `IMPLEMENTATION_GUIDE.md`
3. Check git commit history for examples
4. Review component source code

---

## 🎊 Acknowledgments

This refactor was built with:
- **React Router v7** - Routing
- **Shopify Hydrogen** - E-commerce framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS
- **Custom Design System** - Consistent theming

---

## 📄 License

[Your License Here]

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Status:** Phase 3 Complete - Core Infrastructure Built
