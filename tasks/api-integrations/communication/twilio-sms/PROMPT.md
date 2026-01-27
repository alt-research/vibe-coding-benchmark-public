# Task: Twilio SMS Integration

## Objective
Integrate Twilio for sending SMS notifications with delivery tracking.

## Requirements

1. **Send SMS**
   - Single message
   - Bulk messages
   - Template support
   - Phone validation

2. **Features**
   - Delivery status webhook
   - Message scheduling
   - Opt-out handling
   - Rate limiting

3. **API**
   - `POST /sms/send` - Send message
   - `POST /sms/bulk` - Bulk send
   - `POST /sms/webhook` - Status webhook
   - `GET /sms/{id}` - Message status

4. **Templates**
   - Variable substitution
   - Character count
   - Multi-segment handling

## Files to Create
- `app/services/twilio.py` - Twilio client
- `app/services/sms.py` - SMS logic
- `app/routers/sms.py` - API endpoints
- `app/webhooks/twilio.py` - Webhooks

## Success Criteria
- [ ] Messages sent successfully
- [ ] Delivery status tracked
- [ ] Templates work
- [ ] Bulk sending works
- [ ] Opt-outs respected
