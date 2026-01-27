# Real-time WebSocket Chat

Build a real-time chat application using WebSocket with the following features.

## Features

### Core Messaging
- Send and receive messages in real-time
- Message history (last 100 messages)
- Message timestamps
- Support multiple chat rooms

### Presence System
- Show online/offline status
- Display list of users in room
- Join/leave notifications

### Typing Indicators
- Show when users are typing
- Debounced typing events (stop after 2s idle)
- Multiple users typing support

## Technical Requirements

### WebSocket Server
```typescript
interface Message {
  id: string;
  roomId: string;
  userId: string;
  content: string;
  timestamp: Date;
}

interface PresenceEvent {
  type: 'join' | 'leave' | 'typing';
  userId: string;
  roomId: string;
}
```

### Events
```
Client -> Server:
- join_room { roomId }
- leave_room { roomId }
- send_message { roomId, content }
- typing { roomId, isTyping }

Server -> Client:
- room_joined { roomId, users, history }
- user_joined { userId }
- user_left { userId }
- new_message { message }
- typing_update { roomId, users[] }
```

### API Endpoints
```
GET  /api/rooms          - List available rooms
POST /api/rooms          - Create room
GET  /api/rooms/:id/messages - Get message history
```

## Requirements

1. Use `ws` or `socket.io` for WebSocket
2. Handle reconnection gracefully
3. Implement heartbeat/ping-pong
4. Scale-ready (Redis pub/sub adapter optional)
5. Rate limit messages (max 10/second per user)

## Acceptance Criteria

- [ ] Messages delivered in real-time
- [ ] Presence updates work correctly
- [ ] Typing indicators debounced
- [ ] Reconnection restores state
- [ ] Message history loads on join
- [ ] Handles 100+ concurrent connections
