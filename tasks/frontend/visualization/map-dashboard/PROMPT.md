# Task: Geographic Map Dashboard

## Objective
Build an interactive map dashboard with Vue 3 and Mapbox for visualizing geographic data.

## Requirements

1. **Map Features**
   - Clustered markers
   - Heat maps
   - Polygon overlays (regions)
   - Custom marker icons

2. **Interactivity**
   - Click for details popup
   - Filter by categories
   - Search locations
   - Draw regions

3. **Dashboard Integration**
   - Stats sidebar
   - Legend component
   - Layer toggles
   - Zoom to selection

4. **Data**
   - Load GeoJSON data
   - Real-time marker updates
   - Aggregate by region
   - Export selected area

## Files to Create
- `components/Map/MapContainer.vue` - Main map
- `components/Map/Markers.vue` - Marker layer
- `components/Map/HeatMap.vue` - Heat map layer
- `components/Dashboard/Sidebar.vue` - Stats sidebar
- `composables/useMap.ts` - Map composable

## Success Criteria
- [ ] Map renders correctly
- [ ] Clusters work at zoom levels
- [ ] Heat map displays properly
- [ ] Filters update map
- [ ] Popups show details
