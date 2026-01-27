# Analytics Chart Dashboard

Build an analytics dashboard displaying key metrics with interactive charts.

## Dashboard Layout

### Top Row - KPI Cards
- Total Revenue (with % change)
- Active Users (with trend)
- Conversion Rate (with target)
- Avg Order Value (with comparison)

### Middle Row - Charts
1. **Revenue Over Time** - Area chart with daily/weekly/monthly toggle
2. **User Acquisition** - Stacked bar chart by source

### Bottom Row - Charts
3. **Top Products** - Horizontal bar chart
4. **Geographic Distribution** - World map or top countries table

## Features

### Date Range Picker
- Preset ranges: Today, Yesterday, Last 7/30/90 days, This month, Last month
- Custom date range
- Compare to previous period

### Chart Interactions
- Hover tooltips with detailed data
- Click to drill down (optional)
- Export chart as PNG
- Fullscreen mode

### Filters
- Filter by product category
- Filter by region
- Filter by user segment

## Technical Requirements

### Data Schema
```typescript
interface DashboardData {
  kpis: {
    revenue: { value: number; change: number };
    users: { value: number; change: number };
    conversion: { value: number; target: number };
    avgOrder: { value: number; previous: number };
  };
  revenueTimeSeries: Array<{ date: string; revenue: number }>;
  userAcquisition: Array<{ date: string; source: string; count: number }>;
  topProducts: Array<{ name: string; revenue: number; units: number }>;
  geoData: Array<{ country: string; revenue: number; users: number }>;
}
```

### API Endpoint
```typescript
GET /api/analytics?start=2024-01-01&end=2024-01-31&category=all&region=all
```

### Libraries
- Use `recharts` or `chart.js` for charts
- Use `date-fns` for date handling
- Use Tailwind CSS for styling

## UI Requirements

1. **Loading States** - Skeleton loaders for each chart
2. **Error States** - Graceful error handling with retry
3. **Empty States** - Meaningful messages when no data
4. **Responsive** - Charts resize on mobile (stack vertically)
5. **Print Friendly** - Dashboard can be printed/PDF

## Acceptance Criteria

- [ ] All 4 KPI cards display correctly
- [ ] Charts render with sample data
- [ ] Date picker filters data
- [ ] Charts are interactive (hover, click)
- [ ] Mobile responsive layout
- [ ] Loading states shown during fetch
- [ ] Export to PNG works
