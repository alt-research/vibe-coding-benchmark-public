# Task: Advanced Data Grid

## Objective
Build a high-performance data grid component with virtual scrolling for large datasets.

## Requirements

1. **Core Features**
   - Virtual scrolling (render only visible rows)
   - Column sorting (multi-column)
   - Column resizing
   - Column reordering
   - Fixed columns (freeze left/right)

2. **Data Features**
   - Pagination or infinite scroll
   - Row selection (single/multi)
   - Row expansion
   - Cell editing (inline)
   - Filter per column

3. **Performance**
   - Handle 100K+ rows smoothly
   - 60fps scrolling
   - Lazy load data
   - Memoized cells

4. **Customization**
   - Custom cell renderers
   - Custom header renderers
   - Row styling based on data
   - Column templates

## Props Interface
```typescript
interface DataGridProps<T> {
  data: T[];
  columns: Column<T>[];
  rowHeight?: number;
  headerHeight?: number;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onRowClick?: (row: T) => void;
  selectable?: boolean;
}
```

## Files to Create
- `components/DataGrid/DataGrid.tsx` - Main component
- `components/DataGrid/VirtualScroller.tsx` - Virtual scroll
- `components/DataGrid/Header.tsx` - Header row
- `components/DataGrid/Row.tsx` - Data row
- `components/DataGrid/Cell.tsx` - Cell renderer

## Success Criteria
- [ ] Renders 100K rows without lag
- [ ] Sorting works correctly
- [ ] Column resize works
- [ ] Selection state managed
- [ ] Filters work
