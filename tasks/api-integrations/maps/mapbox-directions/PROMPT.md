# Task: Mapbox Route Directions

## Objective
Calculate routes and directions using Mapbox Directions API.

## Requirements

1. **Route Calculation**
   - Point to point routing
   - Multiple waypoints
   - Route alternatives
   - Profile (driving, walking, cycling)

2. **Route Details**
   - Distance and duration
   - Turn-by-turn instructions
   - Route geometry (polyline)
   - Traffic-aware timing

3. **Optimization**
   - Waypoint optimization (TSP)
   - Avoid tolls/highways
   - Departure time

4. **API**
   - `POST /directions` - Get route
   - `POST /optimize` - Optimize waypoints
   - `GET /isochrone` - Travel time polygons

## Files to Create
- `app/services/mapbox.py` - Mapbox client
- `app/services/directions.py` - Routing logic
- `app/services/optimizer.py` - Route optimization
- `app/routers/directions.py` - API endpoints

## Success Criteria
- [ ] Routes calculated correctly
- [ ] Multiple waypoints work
- [ ] Turn instructions provided
- [ ] Traffic considered
- [ ] Optimization works
