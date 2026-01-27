# Task: Segment Event Tracking

## Objective
Implement server-side event tracking with Segment Analytics.

## Requirements

1. **Core Methods**
   - identify() - User identification
   - track() - Event tracking
   - page() - Page views
   - group() - Company/team

2. **Event Structure**
   - Event name conventions
   - Property schemas
   - User traits
   - Context (IP, UA)

3. **Batching**
   - Batch API calls
   - Flush on threshold
   - Async processing
   - Error handling

4. **API**
   - `POST /analytics/identify` - Identify user
   - `POST /analytics/track` - Track event
   - `POST /analytics/batch` - Batch events

## Files to Create
- `src/services/segment.ts` - Segment client
- `src/services/analytics.ts` - Analytics wrapper
- `src/middleware/tracking.ts` - Auto-tracking
- `src/routes/analytics.ts` - API endpoints

## Success Criteria
- [ ] Users identified
- [ ] Events tracked
- [ ] Batching works
- [ ] Context captured
- [ ] Error handling works
