---
name: MealMate
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#564338'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#897266'
  outline-variant: '#ddc1b3'
  surface-tint: '#9b4500'
  primary: '#9b4500'
  on-primary: '#ffffff'
  primary-container: '#ff8c42'
  on-primary-container: '#6a2d00'
  inverse-primary: '#ffb68d'
  secondary: '#006e1c'
  on-secondary: '#ffffff'
  secondary-container: '#91f78e'
  on-secondary-container: '#00731e'
  tertiary: '#5e5e5c'
  on-tertiary: '#ffffff'
  tertiary-container: '#abaaa7'
  on-tertiary-container: '#3e3f3c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbc9'
  primary-fixed-dim: '#ffb68d'
  on-primary-fixed: '#331200'
  on-primary-fixed-variant: '#763300'
  secondary-fixed: '#94f990'
  secondary-fixed-dim: '#78dc77'
  on-secondary-fixed: '#002204'
  on-secondary-fixed-variant: '#005313'
  tertiary-fixed: '#e4e2de'
  tertiary-fixed-dim: '#c8c6c3'
  on-tertiary-fixed: '#1b1c1a'
  on-tertiary-fixed-variant: '#474744'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style

This design system is built on a foundation of **Minimalism** with a **Tactile** warmth. It prioritizes clarity and appetite appeal, drawing inspiration from high-end lifestyle platforms. The aesthetic is clean and systematic, yet avoids the coldness of traditional SaaS by using soft color transitions and generous whitespace. 

The target audience consists of home cooks and health-conscious individuals who value efficiency and inspiration. The UI evokes a sense of calm organization and culinary excitement. Every element is designed to feel "edible" and approachable, using physical metaphors like soft shadows and layered cards to mimic the experience of flipping through a premium cookbook.

## Colors

The palette is anchored by **Primary Orange (#FF8C42)**, a warm, appetizing hue used for call-to-actions and brand accents. **Secondary Green (#4CAF50)** represents freshness and nutritional balance, used primarily for health indicators, badges, and success states.

The canvas uses **Tertiary Cream (#FDFBF7)** as a soft, off-white background to reduce eye strain and provide a more organic feel than pure white. Text is set in **Neutral Deep Charcoal (#2D2D2D)** to ensure maximum legibility while maintaining a sophisticated, high-contrast look that isn't as harsh as true black. 

- **Surface-1:** #FFFFFF (Card backgrounds for maximum lift)
- **Surface-2:** #FDFBF7 (Global background)
- **Border-Subtle:** #E5E5E5 (Thin, low-opacity strokes)

## Typography

The design system utilizes **Geist** across all roles to maintain a technical yet modern and clean feel. The typographic hierarchy relies on significant scale shifts and weight contrast to guide the user's eye.

Headlines should use tighter letter-spacing and heavier weights to feel "anchored" on the page. For body text, the line height is kept generous (1.5x - 1.6x) to ensure recipes and instructions are easy to read while cooking. Labels and metadata use medium weights and slight tracking for clarity at smaller sizes.

## Layout & Spacing

This design system uses a **Fluid Grid** model based on an 8px rhythm. 

- **Desktop:** 12-column grid with a 1200px max-width container. 24px gutters.
- **Tablet:** 8-column grid with 24px gutters and 24px side margins.
- **Mobile:** 4-column grid with 16px gutters and 16px side margins.

Spacing should be used to create clear groupings. Use `xl` (32px) spacing between major sections and `md` (16px) spacing between elements within a card. Whitespace is treated as a design element to prevent the "cluttered" look common in utility-first recipe apps.

## Elevation & Depth

Visual hierarchy is established through **Ambient Shadows** and **Tonal Layers**. 

The design avoids harsh borders, instead using very soft, diffused shadows with a slight color tint derived from the Neutral Deep Charcoal (e.g., `rgba(45, 45, 45, 0.05)`). 

- **Level 0 (Base):** Cream background.
- **Level 1 (Cards/Inputs):** Pure white surface with a 1px subtle border or a very soft shadow (0px 4px 20px).
- **Level 2 (Dropdowns/Modals):** High-diffusion shadow (0px 12px 32px) to suggest significant lift.

Depth is also communicated through "staggered" content, where images slightly overlap containers to create a modern, editorial feel.

## Shapes

The shape language is defined by **Highly Rounded** corners to evoke friendliness and safety. 

- **Default (Standard Components):** 0.5rem (8px) for buttons and inputs.
- **Large (Cards/Containers):** 1.5rem (24px) for recipe cards and main content blocks.
- **Extra Large (Hero Sections):** 2rem (32px) for featured imagery.

All interactive elements should feel "soft" to the touch. Avoid sharp corners entirely to maintain the approachable brand personality.

## Components

### Buttons
Primary buttons are solid Primary Orange with bold white text. Secondary buttons use a Cream background with a Deep Charcoal border. All buttons use 8px rounded corners and a slight scale-down effect on press.

### Cards
Recipe cards are the core component. They feature a top-heavy image layout with 24px corner radius. The content area below the image has 16px padding. Titles are set in `headline-md`.

### Chips
Used for dietary tags (e.g., "Vegan", "Gluten-Free"). Chips have a 100px border radius (pill-shaped) and use low-saturation versions of the brand colors (e.g., light green background with dark green text) to remain secondary to the main content.

### Input Fields
Inputs are white with a 1px border. On focus, the border transitions to Primary Orange with a 2px outer glow. Labels are positioned above the field using `label-md`.

### Lists
Ingredient lists use custom checkboxes that, when checked, strike through the text and dim its opacity to 50% to provide a satisfying "completed" state.

### Icons
Use thin-stroke (1.5pt) linear icons. Icons are never filled unless they are in an "active" navigation state.