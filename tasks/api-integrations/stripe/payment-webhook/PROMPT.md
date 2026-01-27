# Task: Stripe Payment Webhook Handler

## Objective
Implement a webhook handler for Stripe payment events that updates order status in the database.

## Requirements

1. **Webhook Endpoint**
   - Create POST endpoint at `/api/webhooks/stripe`
   - Verify Stripe signature using webhook secret
   - Return 200 for successful processing, 400 for invalid signature

2. **Event Handling**
   Handle these Stripe events:
   - `payment_intent.succeeded` → Update order status to "paid"
   - `payment_intent.payment_failed` → Update order status to "failed"
   - `charge.refunded` → Update order status to "refunded"

3. **Database Updates**
   - Find order by `payment_intent_id` (stored in order metadata)
   - Update `status` and `updated_at` fields
   - Log the event for auditing

4. **Security**
   - Always verify webhook signature before processing
   - Use environment variable for webhook secret
   - Handle replay attacks (check event timestamp)

5. **Error Handling**
   - Return 200 even if order not found (to prevent retries)
   - Log errors but don't expose details in response
   - Implement idempotency (same event processed multiple times = same result)

## Technical Stack
- Express.js or Hono
- Prisma ORM
- PostgreSQL
- stripe npm package

## Files to Create/Modify
- `src/routes/webhooks/stripe.ts` - Webhook handler
- `src/lib/stripe.ts` - Stripe client configuration
- `src/services/order.ts` - Order update logic
- `prisma/schema.prisma` - Order model (if not exists)

## Environment Variables
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
DATABASE_URL=postgresql://...
```

## Success Criteria
- [ ] Webhook signature is verified correctly
- [ ] payment_intent.succeeded updates order to "paid"
- [ ] payment_intent.payment_failed updates order to "failed"
- [ ] charge.refunded updates order to "refunded"
- [ ] Invalid signatures return 400
- [ ] Unknown events return 200 (acknowledged but ignored)
- [ ] Duplicate events don't cause duplicate updates
