# Data Table Dashboard

Build a full-featured data table component with the following requirements:

## Features

1. **Sortable columns** - Click column header to sort ascending/descending
2. **Search/filter** - Global search and per-column filters
3. **Pagination** - Show 10/25/50/100 items per page with navigation
4. **Bulk actions** - Select multiple rows, delete/export selected
5. **Responsive** - Works on mobile with horizontal scroll

## Data Schema

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLogin: string;
}
```

## API Endpoints

- `GET /api/users?page=1&limit=10&sort=name&order=asc&search=john`
- `DELETE /api/users` with body `{ ids: string[] }`
- `GET /api/users/export?ids=1,2,3` returns CSV

## Requirements

1. Use React with TypeScript
2. Use Tailwind CSS for styling
3. Handle loading states and errors
4. Debounce search input (300ms)
5. Persist page size preference in localStorage

## Acceptance Criteria

- [ ] Table displays data from API
- [ ] All columns are sortable
- [ ] Search filters results in real-time
- [ ] Pagination works correctly
- [ ] Can select and delete multiple rows
- [ ] Mobile responsive
