# Task: Real-time In-App Notifications

## Objective
Build a real-time in-app notification system using WebSockets with Spring Boot.

## Requirements

1. **Notification Types**
   - System announcements
   - User mentions
   - Task assignments
   - Comment replies
   - Each type has icon, color, priority

2. **Real-time Delivery**
   - WebSocket connection per user
   - Deliver notifications instantly
   - Queue for offline users
   - Deliver queued on reconnect

3. **Notification Center**
   - `GET /notifications` - List notifications (paginated)
   - `PUT /notifications/{id}/read` - Mark as read
   - `PUT /notifications/read-all` - Mark all read
   - `GET /notifications/unread-count` - Unread count

4. **Preferences**
   - Per-type enable/disable
   - Quiet hours
   - Channel preferences (in-app, email, push)

## Technical Stack
- Java 17+
- Spring Boot 3.x
- Spring WebSocket (STOMP)
- PostgreSQL
- Redis for pub/sub

## Files to Create
- `src/main/java/config/WebSocketConfig.java`
- `src/main/java/services/NotificationService.java`
- `src/main/java/controllers/NotificationController.java`
- `src/main/java/models/Notification.java`
- `src/main/java/websocket/NotificationHandler.java`

## Success Criteria
- [ ] Notifications delivered in real-time via WebSocket
- [ ] Offline notifications queued and delivered
- [ ] Read/unread status tracked
- [ ] Unread count updates in real-time
- [ ] User preferences respected
