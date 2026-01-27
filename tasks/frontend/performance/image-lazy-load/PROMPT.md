# Task: Optimized Image Loading

## Objective
Build an optimized image component with lazy loading, blur-up, and responsive srcset.

## Requirements

1. **Lazy Loading**
   - Intersection Observer
   - Load when near viewport
   - Placeholder until loaded
   - Native lazy loading fallback

2. **Progressive Loading**
   - Blur-up placeholder
   - Low-quality image placeholder (LQIP)
   - Fade in on load
   - Error fallback

3. **Responsive**
   - srcset for different sizes
   - sizes attribute
   - WebP/AVIF with fallback
   - Art direction support

4. **Performance**
   - Preconnect to CDN
   - Priority hints for LCP
   - Decode async
   - Aspect ratio preservation

## Files to Create
- `lib/Image.svelte` - Image component
- `lib/actions/lazyload.ts` - Lazy load action
- `lib/utils/srcset.ts` - Srcset generator
- `lib/Placeholder.svelte` - Placeholder component

## Success Criteria
- [ ] Images lazy load
- [ ] Blur-up transition smooth
- [ ] Correct srcset generated
- [ ] WebP served when supported
- [ ] CLS score zero
