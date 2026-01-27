# Pricing Card Component

## Context

Build a pixel-perfect pricing card component that matches the provided design reference. The component should be responsive and accessible.

## Design Specifications

See `reference/design.png` for the visual reference.

### Card Layout

- Width: 320px (desktop), 100% (mobile < 640px)
- Border radius: 16px
- Background: White (#FFFFFF)
- Box shadow: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`

### Header Section

- Background: Linear gradient `from-indigo-500 to-purple-600`
- Padding: 24px
- Plan name: White, 14px, uppercase, letter-spacing 0.1em
- Price: White, 48px, font-bold
- Period: White/80, 16px

### Features Section

- Padding: 24px
- Feature list with check icons
- Check icon: Green (#22C55E), 20px
- Feature text: Gray-700, 16px
- Line height: 1.75

### CTA Button

- Full width
- Height: 48px
- Background: Indigo-600 (#4F46E5)
- Hover: Indigo-700 (#4338CA)
- Text: White, 16px, font-semibold
- Border radius: 8px

### Popular Badge (if applicable)

- Position: Top right, -12px offset
- Background: Amber-400 (#FBBF24)
- Text: Amber-900, 12px, font-bold
- Padding: 4px 12px
- Border radius: 999px

## Requirements

### Component API

```tsx
interface PricingCardProps {
  planName: string;
  price: number;
  period: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
  onCtaClick?: () => void;
}
```

### Functionality

1. Display all pricing information
2. Render feature list with check icons
3. Show popular badge when `isPopular` is true
4. Handle CTA button click
5. Be fully responsive

### Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigable button
- Screen reader friendly

## Files to Create

- `components/PricingCard.tsx` - Main component
- `components/PricingCard.test.tsx` - Unit tests

## Acceptance Criteria

- [ ] Visual match > 95% similarity to reference
- [ ] Responsive at all breakpoints
- [ ] Accessible (passes axe-core)
- [ ] Button click handler works
- [ ] Popular badge conditional render
