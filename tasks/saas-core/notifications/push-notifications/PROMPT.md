# Task: Web Push Notifications

## Objective
Implement web push notifications using the Web Push API with service worker support.

## Requirements

1. **Subscription Management**
   - Prompt user for notification permission
   - Generate VAPID keys for push service
   - Store push subscriptions in database
   - Handle subscription changes/revocations

2. **Service Worker**
   - Register service worker for push events
   - Handle push event and show notification
   - Handle notification click (open URL)
   - Background sync for offline queuing

3. **Sending Notifications**
   - `POST /push/subscribe` - Save subscription
   - `DELETE /push/subscribe` - Remove subscription
   - `POST /push/send` - Send to specific user
   - `POST /push/broadcast` - Send to all subscribers

4. **Notification Types**
   - Simple text notification
   - With image/icon
   - With action buttons
   - Silent push (data only)

## Technical Stack
- TypeScript/Node.js
- Express
- web-push library
- PostgreSQL
- Service Worker API

## Files to Create
- `src/routes/push.ts` - Push API endpoints
- `src/services/push.ts` - Push notification logic
- `public/sw.js` - Service worker
- `public/push-client.js` - Client subscription
- `src/models/subscription.ts` - Subscription model

## Success Criteria
- [ ] Users can subscribe to push
- [ ] Notifications delivered to subscribed users
- [ ] Service worker shows notifications
- [ ] Click handling opens correct URL
- [ ] Subscriptions persist across sessions
