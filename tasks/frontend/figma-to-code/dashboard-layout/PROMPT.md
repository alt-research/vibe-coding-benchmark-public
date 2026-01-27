# Task: Admin Dashboard Layout

## Objective
Build an admin dashboard layout with Vue 3 including sidebar, header, and content areas.

## Design Requirements
- Collapsible sidebar navigation
- Top header with search and user menu
- Main content area with cards
- Responsive layout

## Technical Requirements

1. **Layout Structure**
   - Fixed sidebar (collapsible)
   - Fixed header
   - Scrollable content area
   - Nested routes support

2. **Sidebar**
   - Navigation items with icons
   - Nested menu support
   - Active state highlighting
   - Collapse to icons only

3. **Header**
   - Global search
   - Notifications dropdown
   - User profile menu
   - Breadcrumbs

4. **Dashboard Cards**
   - Stats cards with icons
   - Chart placeholders
   - Recent activity list
   - Quick actions

## Files to Create
- `src/layouts/DashboardLayout.vue` - Main layout
- `src/components/Sidebar.vue` - Sidebar nav
- `src/components/Header.vue` - Top header
- `src/views/Dashboard.vue` - Dashboard view
- `src/composables/useSidebar.ts` - Sidebar state

## Success Criteria
- [ ] Layout matches design
- [ ] Sidebar collapses correctly
- [ ] Responsive on all screens
- [ ] Navigation works
- [ ] Dropdowns functional
