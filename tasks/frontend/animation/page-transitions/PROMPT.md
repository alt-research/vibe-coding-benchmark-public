# Task: Page Transition Animations

## Objective
Build smooth page transitions using Framer Motion in Next.js App Router.

## Requirements

1. **Transition Types**
   - Fade transition
   - Slide (left/right/up/down)
   - Scale/zoom
   - Shared element transitions

2. **Navigation Aware**
   - Different animation for back
   - Stack-based transitions
   - Preserve scroll position
   - Loading state animation

3. **Performance**
   - No layout shift
   - Hardware accelerated
   - Reduced motion support
   - No blocking navigation

4. **Advanced**
   - Shared element between pages
   - Staggered children
   - Exit animations complete
   - Gesture-based navigation

## Files to Create
- `components/Transitions/PageTransition.tsx` - Wrapper
- `components/Transitions/variants.ts` - Animation variants
- `components/Transitions/SharedElement.tsx` - Shared element
- `hooks/useNavigationDirection.ts` - Direction detection
- `app/template.tsx` - Layout template

## Success Criteria
- [ ] Transitions work on all routes
- [ ] Back navigation has correct direction
- [ ] Exit animations complete
- [ ] Reduced motion respected
- [ ] No layout shift
