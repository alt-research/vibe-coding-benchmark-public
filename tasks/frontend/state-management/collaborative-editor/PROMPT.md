# Task: Real-time Collaborative Editor

## Objective
Build a collaborative text editor with Vue 3 and Y.js where multiple users can edit simultaneously.

## Requirements

1. **Collaboration**
   - Real-time sync between users
   - Cursor positions shown
   - User presence indicators
   - Conflict resolution (CRDT)

2. **Editor Features**
   - Rich text formatting
   - Comments/annotations
   - Version history
   - Offline support

3. **Awareness**
   - Show who's editing
   - User cursors with names
   - Selection highlighting
   - Active users list

4. **Sync**
   - WebSocket provider
   - Handle reconnection
   - Merge offline changes
   - Persistence

## Files to Create
- `components/CollabEditor/Editor.vue` - Main editor
- `components/CollabEditor/Cursors.vue` - Remote cursors
- `components/CollabEditor/Presence.vue` - User list
- `composables/useYjs.ts` - Y.js integration
- `providers/WebSocketProvider.ts` - Sync provider

## Success Criteria
- [ ] Multiple users can edit
- [ ] Changes sync in real-time
- [ ] Cursors show correctly
- [ ] Conflicts resolved
- [ ] Works offline
