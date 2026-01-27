# Task: Virtualized Infinite Scroll

## Objective
Build an infinite scroll list with virtualization for optimal performance with large datasets.

## Requirements

1. **Virtualization**
   - Render only visible items
   - Variable height items
   - Smooth scrolling
   - Scroll position restoration

2. **Infinite Loading**
   - Load more on scroll
   - Loading indicator
   - Error retry
   - End of list detection

3. **Features**
   - Pull to refresh
   - Scroll to top button
   - Preserve scroll on back
   - Keyboard navigation

4. **Performance**
   - 60fps scrolling
   - Minimal DOM nodes
   - Efficient re-renders
   - Memory bounded

## Files to Create
- `components/VirtualList/VirtualList.tsx` - Main list
- `components/VirtualList/VirtualItem.tsx` - Item wrapper
- `components/VirtualList/LoadingMore.tsx` - Loading indicator
- `hooks/useVirtualScroll.ts` - Virtualization hook
- `hooks/useInfiniteLoad.ts` - Load more hook

## Success Criteria
- [ ] Only visible items rendered
- [ ] Variable heights work
- [ ] 60fps maintained
- [ ] Load more triggers correctly
- [ ] Scroll position preserved
