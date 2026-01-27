# Task: Mixpanel User Analytics

## Objective
Track user behavior and engagement with Mixpanel.

## Requirements

1. **Event Tracking**
   - Track events with properties
   - User identification
   - Super properties
   - Time-based events

2. **User Profiles**
   - Set user properties
   - Increment counters
   - Append to lists
   - Union sets

3. **Advanced**
   - Cohort creation
   - A/B test tracking
   - Revenue tracking
   - Funnel events

4. **API**
   - `POST /mixpanel/track` - Track event
   - `POST /mixpanel/identify` - Identify user
   - `POST /mixpanel/profile` - Update profile

## Files to Create
- `internal/mixpanel/client.go` - Mixpanel client
- `internal/mixpanel/tracker.go` - Event tracking
- `internal/mixpanel/profile.go` - Profile management
- `internal/handlers/analytics.go` - HTTP handlers

## Success Criteria
- [ ] Events tracked correctly
- [ ] User profiles updated
- [ ] Super properties work
- [ ] Revenue tracked
- [ ] Batching efficient
