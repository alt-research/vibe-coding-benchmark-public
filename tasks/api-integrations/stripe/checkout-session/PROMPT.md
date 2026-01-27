# Task: Stripe Checkout Session

## Objective
Implement Stripe Checkout session creation and handling in Go.

## Requirements

1. **Checkout Creation**
   - One-time payment checkout
   - Subscription checkout
   - Custom line items
   - Apply discounts/coupons

2. **Session Config**
   - Success/cancel URLs
   - Customer email prefill
   - Shipping address collection
   - Tax calculation

3. **Endpoints**
   - `POST /checkout/session` - Create session
   - `GET /checkout/session/{id}` - Get session
   - `POST /checkout/webhook` - Handle completion

4. **Webhook Events**
   - `checkout.session.completed`
   - `checkout.session.expired`
   - Create order on completion

## Files to Create
- `internal/stripe/client.go` - Stripe client
- `internal/stripe/checkout.go` - Checkout logic
- `internal/handlers/checkout.go` - HTTP handlers
- `internal/handlers/webhook.go` - Webhook handler

## Success Criteria
- [ ] Checkout session created
- [ ] Redirect URL works
- [ ] Webhook verifies signature
- [ ] Order created on completion
- [ ] Coupons apply correctly
