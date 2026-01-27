# Task: Screen Reader Navigation

## Objective
Build a navigation system that is fully accessible with screen readers.

## Requirements

1. **Semantic HTML**
   - Proper heading hierarchy
   - Landmark regions (nav, main, aside)
   - Skip links
   - Focus management

2. **ARIA**
   - aria-label for icons
   - aria-expanded for dropdowns
   - aria-current for active page
   - Live regions for updates

3. **Navigation**
   - Skip to main content
   - Breadcrumb trail
   - Accessible dropdown menus
   - Mobile menu with focus trap

4. **Testing**
   - Works with VoiceOver
   - Works with NVDA
   - Keyboard-only navigation
   - Color contrast compliant

## Files to Create
- `components/Navigation/Nav.tsx` - Main nav
- `components/Navigation/SkipLink.tsx` - Skip links
- `components/Navigation/Dropdown.tsx` - Accessible dropdown
- `components/Navigation/MobileMenu.tsx` - Mobile nav
- `hooks/useFocusTrap.ts` - Focus trap hook

## Success Criteria
- [ ] Skip links work
- [ ] Dropdowns announce state
- [ ] Focus visible at all times
- [ ] Keyboard navigation works
- [ ] Passes axe-core tests
