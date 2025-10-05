# 🎨 DrinkSip Visual Audit Checklist

## **Purpose: Verify Layout, Alignment, and Design System Integration**

---

## 📋 **Audit Overview**

This checklist ensures all pages have:
- ✅ Correct alignment and spacing
- ✅ No elements pushed off screen
- ✅ All CSS variables properly applied
- ✅ Responsive layouts working
- ✅ Animations smooth and timed correctly
- ✅ Typography hierarchy consistent
- ✅ Colors from design system

---

## 🏠 **Homepage Audit**

### **Desktop (1920px)**
- [ ] Header: UnifiedHeader visible and centered
- [ ] Hero carousel: Full viewport height, controls visible
- [ ] Hero carousel: Nav dots bottom-left, arrows visible
- [ ] Hero carousel: Pill navigation top-center
- [ ] Product sections: Centered, proper spacing
- [ ] Product cards: Equal sizing, proper gaps
- [ ] Footer: All sections visible, newsletter form working
- [ ] Animations: Smooth fade-in on scroll
- [ ] Typography: Large H1s (clamp working)
- [ ] Colors: Black background, white text

### **Tablet (768px)**
- [ ] Header: Hamburger menu appears
- [ ] Hero: Maintains aspect ratio
- [ ] Product grid: 2 columns
- [ ] Spacing: Reduced but proportional
- [ ] Navigation: Touch targets 48px minimum

### **Mobile (375px)**
- [ ] Header: 120px height, menu overlay works
- [ ] Hero: Full-screen, controls centered
- [ ] Product grid: Single column
- [ ] Cards: Full width with padding
- [ ] Footer: Stacked layout
- [ ] All text readable

---

## 🍺 **Product Detail Pages (PDPs)**

### **Test Products:**
- [ ] Hazy IPA (`/products/hazy-ipa`)
- [ ] Watermelon Refresher (`/products/watermelon-refresher`)
- [ ] 311 Hazy IPA (`/products/311-hazy-ipa`)

### **Desktop Layout:**
- [ ] Hero: Full viewport, color background matches product
- [ ] Title: Large, behind can image
- [ ] Can image: Slides in from left (400ms delay)
- [ ] Content: Right side, fades in (800ms delay)
- [ ] Chips: Horizontal row, proper spacing
- [ ] Buttons: "Shop Now" and "Find Near Me" visible
- [ ] "You May Like" carousel: Auto-plays, thick white borders
- [ ] Carousel: Navigation arrows work
- [ ] Carousel: Dots indicate position

### **Mobile Layout:**
- [ ] Title: Overlaps can at 35% from top
- [ ] Can: Centered, 70vw width
- [ ] Chips: Bottom 32vh, horizontal row
- [ ] Buttons: Bottom 16vh, stacked
- [ ] All elements within viewport
- [ ] No horizontal scroll

### **Animation Timing:**
- [ ] Desktop: Title (100ms) → Can (400ms) → Content (800ms)
- [ ] Mobile: Title (200ms) → Can (600ms) → Chips (1200ms) → Buttons (1400ms)
- [ ] Smooth, no jank
- [ ] Hardware-accelerated (no layout shifts)

---

## 📦 **Collection Pages**

### **Test Collections:**
- [ ] Core Series (`/collections/core-series`)
- [ ] Refresher Series (`/collections/refresher-series`)
- [ ] Artist Series (`/collections/artist-series`)

### **Desktop Layout:**
- [ ] Header: Large title (clamp(4rem, 8vw, 7rem))
- [ ] Description: Centered, max-width 700px
- [ ] Grid: 3 columns, equal spacing
- [ ] Cards: 3:4 aspect ratio
- [ ] Cards: 16px border radius
- [ ] Hover: translateY(-8px) + scale(1.02)
- [ ] Hover: Shadow intensifies
- [ ] Hover: Title overlay fades in
- [ ] Hover: Arrow indicator appears

### **Tablet Layout:**
- [ ] Grid: 2 columns
- [ ] Cards: Maintain aspect ratio
- [ ] Spacing: Proportional

### **Mobile Layout:**
- [ ] Grid: 1 column
- [ ] Cards: Full width
- [ ] Spacing: Increased gap
- [ ] All text centered

### **Animation:**
- [ ] Staggered entrance (100ms between cards)
- [ ] Smooth fade-in
- [ ] No layout shift

---

## 🤝 **Partners Page**

### **Desktop Layout:**
- [ ] Hero: Gradient title, background pattern
- [ ] Stats: 3 cards (50+ Partners, 1000+ Locations, 10+ States)
- [ ] Featured Partner: 2-column layout
- [ ] Featured Partner: Logo left, content right
- [ ] Brand Partners: Grid layout
- [ ] Retailers: 4-column grid
- [ ] Distributors: 3-column grid
- [ ] CTA: Centered, buttons visible

### **Tablet Layout:**
- [ ] Featured Partner: Stacks vertically
- [ ] Grids: Reduce to 2 columns
- [ ] Spacing: Maintained

### **Mobile Layout:**
- [ ] All sections: Single column
- [ ] Cards: Full width
- [ ] Logos: Centered
- [ ] Buttons: Full width (max 280px)

### **Interactions:**
- [ ] Card hover: translateY(-8px)
- [ ] Logo hover: scale(1.05)
- [ ] Button hover: Shadow + lift
- [ ] Click: Opens website in new tab

---

## 📍 **Where to Buy Page**

### **Desktop Layout:**
- [ ] Hero: Gradient title, quick stats
- [ ] Online Retailers: 3-column grid
- [ ] Store Locator: Centered form
- [ ] Search input: Rounded, proper padding
- [ ] Search button: White, proper sizing
- [ ] Physical Retailers: Multi-column grid
- [ ] CTA: Centered, button visible

### **Tablet Layout:**
- [ ] Online grid: 2 columns
- [ ] Physical grid: 2 columns
- [ ] Form: Maintains layout

### **Mobile Layout:**
- [ ] All grids: Single column
- [ ] Form: Stacks vertically
- [ ] Input: Full width
- [ ] Button: Below input

### **Interactions:**
- [ ] Card hover: Border color changes
- [ ] Card hover: Scale + shadow
- [ ] Input focus: Border brightens
- [ ] Button hover: Lift + shadow
- [ ] Click: Opens retailer website

---

## 🎨 **Design System Verification**

### **CSS Variables Applied:**
- [ ] `--spacing-*` used throughout
- [ ] `--font-size-*` used for typography
- [ ] `--duration-*` used for animations
- [ ] `--easing-smooth` used for transitions
- [ ] Colors: #000 (black), #fff (white)
- [ ] Responsive: clamp() functions working

### **Typography Scale:**
- [ ] H1: clamp(3.5rem, 8vw, 7rem)
- [ ] H2: clamp(2.5rem, 5vw, 4rem)
- [ ] H3: clamp(2rem, 4vw, 3.5rem)
- [ ] Body: var(--font-size-base)
- [ ] Small: var(--font-size-sm)
- [ ] Font weight: 900 for titles, 600-700 for body

### **Spacing Scale:**
- [ ] Sections: clamp(6rem, 12vh, 10rem) padding
- [ ] Cards: var(--spacing-6) gap
- [ ] Elements: var(--spacing-4) internal padding
- [ ] Consistent throughout

### **Animation Timing:**
- [ ] Fade-in: 600-800ms
- [ ] Slide-up: 800ms
- [ ] Hover: 300ms (--duration-normal)
- [ ] Stagger: 80-100ms delay
- [ ] Easing: cubic-bezier(0.65, 0, 0.35, 1)

---

## 📱 **Responsive Breakpoints**

### **Desktop (1024px+):**
- [ ] All grids: Full column count
- [ ] Max-width: 1400px containers
- [ ] Padding: clamp(2rem, 4vw, 4rem)
- [ ] Typography: Maximum sizes

### **Tablet (768px - 1023px):**
- [ ] Grids: Reduce to 2 columns
- [ ] Padding: Reduced proportionally
- [ ] Typography: Middle range
- [ ] Touch targets: 48px minimum

### **Mobile (< 768px):**
- [ ] Grids: Single column
- [ ] Padding: Minimum values
- [ ] Typography: Minimum sizes
- [ ] Full-width buttons
- [ ] Stacked layouts

---

## 🔍 **Common Issues to Check**

### **Layout Issues:**
- [ ] No horizontal scroll on any page
- [ ] No elements cut off at edges
- [ ] No overlapping text
- [ ] Consistent margins/padding
- [ ] Proper z-index layering

### **Typography Issues:**
- [ ] All text readable
- [ ] Line-height appropriate
- [ ] Letter-spacing consistent
- [ ] No text overflow
- [ ] Hierarchy clear

### **Color Issues:**
- [ ] Sufficient contrast
- [ ] Colors match design system
- [ ] Hover states visible
- [ ] Active states clear
- [ ] Disabled states apparent

### **Animation Issues:**
- [ ] No jank or stuttering
- [ ] Timing feels natural
- [ ] No layout shift
- [ ] Hardware-accelerated
- [ ] Reduced motion respected

### **Interaction Issues:**
- [ ] All buttons clickable
- [ ] Hover states work
- [ ] Links navigate correctly
- [ ] Forms submit properly
- [ ] Touch targets adequate

---

## 🧪 **Testing Procedure**

### **Step 1: Desktop Audit (1920px)**
1. Open browser at 1920x1080
2. Navigate to each page
3. Take full-page screenshot
4. Check all items in checklist
5. Note any issues

### **Step 2: Tablet Audit (768px)**
1. Resize browser to 768x1024
2. Navigate to each page
3. Take full-page screenshot
4. Check responsive behavior
5. Test touch interactions

### **Step 3: Mobile Audit (375px)**
1. Resize browser to 375x667
2. Navigate to each page
3. Take full-page screenshot
4. Check mobile layout
5. Test all interactions

### **Step 4: Cross-Browser Testing**
1. Test in Chrome
2. Test in Firefox
3. Test in Safari
4. Test in Edge
5. Note any browser-specific issues

### **Step 5: Performance Testing**
1. Run Lighthouse audit
2. Check Core Web Vitals
3. Verify animation performance
4. Check load times
5. Optimize if needed

---

## 📸 **Screenshot Locations**

Save all screenshots to: `drink-sip-app/screenshots/`

### **Naming Convention:**
- Homepage: `homepage-desktop.png`, `homepage-tablet.png`, `homepage-mobile.png`
- PDPs: `pdp-hazy-ipa-desktop.png`, etc.
- Collections: `collection-core-desktop.png`, etc.
- Partners: `partners-desktop.png`, etc.
- Where to Buy: `where-to-buy-desktop.png`, etc.

---

## ✅ **Sign-Off Checklist**

After completing all audits:

- [ ] All pages load without errors
- [ ] All layouts correct on desktop
- [ ] All layouts correct on tablet
- [ ] All layouts correct on mobile
- [ ] All animations smooth
- [ ] All interactions working
- [ ] All typography correct
- [ ] All colors correct
- [ ] All spacing correct
- [ ] No console errors
- [ ] No linter errors
- [ ] Performance acceptable
- [ ] Accessibility good
- [ ] Cross-browser compatible

---

## 🐛 **Issue Tracking**

### **Found Issues:**
Document any issues found during audit:

| Page | Issue | Severity | Status |
|------|-------|----------|--------|
| Example | Text overflow on mobile | High | Fixed |
| | | | |

### **Severity Levels:**
- **Critical:** Breaks functionality or layout completely
- **High:** Significant visual or UX issue
- **Medium:** Minor visual inconsistency
- **Low:** Cosmetic issue, nice-to-have

---

## 📊 **Audit Results Summary**

### **Pages Audited:**
- [ ] Homepage
- [ ] Hazy IPA PDP
- [ ] Watermelon Refresher PDP
- [ ] 311 Hazy IPA PDP
- [ ] Core Series Collection
- [ ] Refresher Series Collection
- [ ] Artist Series Collection
- [ ] Partners Page
- [ ] Where to Buy Page

### **Devices Tested:**
- [ ] Desktop (1920px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

### **Browsers Tested:**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### **Overall Status:**
- **Total Issues Found:** _____
- **Critical Issues:** _____
- **High Issues:** _____
- **Medium Issues:** _____
- **Low Issues:** _____
- **Issues Fixed:** _____
- **Issues Remaining:** _____

---

## 🚀 **Next Steps After Audit**

1. **Fix Critical Issues** - Immediately
2. **Fix High Issues** - Before deployment
3. **Fix Medium Issues** - During polish phase
4. **Fix Low Issues** - As time permits
5. **Re-test Fixed Issues** - Verify fixes work
6. **Final Sign-Off** - Approve for deployment

---

**Audit Date:** _____________  
**Auditor:** _____________  
**Status:** In Progress / Complete  
**Approved for Deployment:** Yes / No  

---

## 💡 **Tips for Effective Auditing**

1. **Use Browser DevTools** - Inspect elements, check computed styles
2. **Test Slowly** - Don't rush, check every detail
3. **Document Everything** - Screenshots + notes
4. **Test Edge Cases** - Long text, missing images, etc.
5. **Test Interactions** - Click everything, hover everything
6. **Check Console** - Look for errors or warnings
7. **Test Performance** - Use Lighthouse, check FPS
8. **Get Fresh Eyes** - Have someone else review
9. **Test Real Devices** - Not just browser resize
10. **Compare to Designs** - Match original vision

---

**This checklist ensures a thorough visual audit of all pages, catching layout issues before deployment.**
