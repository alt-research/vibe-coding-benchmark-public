# Task: Google Maps Geocoding

## Objective
Implement address geocoding and reverse geocoding with Google Maps API.

## Requirements

1. **Geocoding**
   - Address to coordinates
   - Address autocomplete
   - Place details
   - Component filtering (country)

2. **Reverse Geocoding**
   - Coordinates to address
   - Address components
   - Formatted address
   - Place ID

3. **Caching**
   - Cache geocoding results
   - TTL configuration
   - Cache invalidation

4. **API**
   - `GET /geocode?address=...` - Geocode
   - `GET /reverse?lat=...&lng=...` - Reverse
   - `GET /autocomplete?input=...` - Autocomplete

## Files to Create
- `src/services/maps.ts` - Google Maps client
- `src/services/geocoder.ts` - Geocoding logic
- `src/services/cache.ts` - Caching layer
- `src/routes/maps.ts` - API endpoints

## Success Criteria
- [ ] Addresses geocode correctly
- [ ] Autocomplete works
- [ ] Reverse geocoding works
- [ ] Results cached
- [ ] Rate limits respected
