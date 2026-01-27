# Task: AI Calendar Assistant

## Objective
Build an AI assistant that manages calendar events using natural language and function calling.

## Requirements

1. **Calendar Functions**
   - `list_events(start, end)` - Get events
   - `create_event(title, start, end, attendees)` - Create event
   - `update_event(id, changes)` - Modify event
   - `delete_event(id)` - Remove event
   - `find_free_time(duration, attendees)` - Find availability

2. **Natural Language**
   - "Schedule a meeting with John tomorrow at 2pm"
   - "What's on my calendar next week?"
   - "Move my 3pm to 4pm"
   - "Find a 30-minute slot with Sarah this week"

3. **Smart Features**
   - Timezone handling
   - Conflict detection
   - Recurring events
   - Attendee availability

4. **API**
   - `POST /assistant` - Send message
   - `GET /events` - List events
   - `POST /events` - Create event
   - Maintain conversation context

## Technical Stack
- TypeScript/Node.js
- Google Calendar API (or mock)
- OpenAI function calling

## Files to Create
- `src/assistant/agent.ts` - Main assistant
- `src/assistant/functions.ts` - Function definitions
- `src/calendar/client.ts` - Calendar API client
- `src/calendar/availability.ts` - Availability logic
- `src/routes/assistant.ts` - API endpoints

## Success Criteria
- [ ] Events created correctly
- [ ] Natural language understood
- [ ] Conflicts detected
- [ ] Free time found correctly
- [ ] Timezone handled
