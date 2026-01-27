# Task: PayPal Payment Integration

## Objective
Integrate PayPal Checkout for payments and handle refunds.

## Requirements

1. **Checkout**
   - Create PayPal order
   - Smart payment buttons
   - Capture payment
   - Handle buyer approval

2. **Payment Flow**
   - `POST /paypal/orders` - Create order
   - `POST /paypal/orders/{id}/capture` - Capture
   - `GET /paypal/orders/{id}` - Get order

3. **Refunds**
   - Full refund
   - Partial refund
   - Refund status tracking

4. **Webhooks**
   - Payment completed
   - Payment refunded
   - Payment failed
   - Verify webhook signature

## Files to Create
- `app/services/paypal.py` - PayPal client
- `app/services/orders.py` - Order management
- `app/routers/paypal.py` - API endpoints
- `app/webhooks/paypal.py` - Webhook handlers

## Success Criteria
- [ ] Orders created successfully
- [ ] Payments captured
- [ ] Refunds processed
- [ ] Webhooks verified
- [ ] Error handling works
