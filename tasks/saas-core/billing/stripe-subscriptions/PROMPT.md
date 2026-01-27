# Task: Stripe Subscription Management

## Objective
Implement complete subscription lifecycle management with Stripe including upgrades, downgrades, and cancellations.

## Requirements

1. **Subscription Creation**
   - Create Stripe checkout session for new subscriptions
   - Support multiple pricing tiers (Basic, Pro, Enterprise)
   - Handle trial periods
   - Sync subscription to database on webhook

2. **Subscription Management**
   - `POST /subscriptions/checkout` - Create checkout session
   - `GET /subscriptions/current` - Get current subscription
   - `POST /subscriptions/change-plan` - Upgrade/downgrade
   - `POST /subscriptions/cancel` - Cancel with feedback
   - `POST /subscriptions/reactivate` - Reactivate before period ends

3. **Webhook Handling**
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

4. **Proration**
   - Immediate proration on upgrade
   - Credit for unused time on downgrade
   - Show prorated amount before confirming change

## Technical Stack
- TypeScript/Node.js
- Express or Hono
- Stripe SDK
- PostgreSQL with Prisma

## Files to Create
- `src/routes/subscriptions.ts` - Subscription endpoints
- `src/routes/webhooks/stripe.ts` - Webhook handler
- `src/services/stripe.ts` - Stripe service
- `src/services/subscription.ts` - Subscription logic
- `prisma/schema.prisma` - Subscription model

## Success Criteria
- [ ] Checkout creates subscription correctly
- [ ] Webhooks sync subscription status
- [ ] Plan changes prorate correctly
- [ ] Cancellation preserves access until period end
- [ ] Failed payments trigger dunning flow
