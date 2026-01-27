# Task: Stripe Customer Portal

## Objective
Integrate Stripe Customer Portal for self-service subscription management.

## Requirements

1. **Portal Session**
   - Create portal session
   - Redirect to hosted portal
   - Return URL configuration

2. **Portal Features**
   - Update payment method
   - View invoices
   - Change subscription
   - Cancel subscription

3. **Configuration**
   - Configure portal via API
   - Enable/disable features
   - Custom branding
   - Product configuration

4. **Sync**
   - Handle portal webhooks
   - Update local database
   - Email notifications

## Files to Create
- `src/services/stripe/portal.ts` - Portal service
- `src/routes/billing.ts` - Billing endpoints
- `src/webhooks/stripe.ts` - Webhook handlers
- `src/config/stripe-portal.ts` - Portal config

## Success Criteria
- [ ] Portal session created
- [ ] Payment method updates
- [ ] Subscription changes reflected
- [ ] Cancellations processed
- [ ] Local data stays in sync
