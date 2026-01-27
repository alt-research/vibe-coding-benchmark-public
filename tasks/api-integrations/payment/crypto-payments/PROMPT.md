# Task: Cryptocurrency Payments

## Objective
Integrate cryptocurrency payments using Coinbase Commerce.

## Requirements

1. **Payment Creation**
   - Create charge with price
   - Support multiple coins (BTC, ETH, USDC)
   - Generate payment page
   - QR code for payment

2. **Payment Status**
   - Pending payment
   - Detected (unconfirmed)
   - Confirmed
   - Expired/cancelled

3. **Webhooks**
   - charge:created
   - charge:pending
   - charge:confirmed
   - charge:failed

4. **Order Flow**
   - Create order → Generate charge
   - Monitor payment status
   - Confirm on completion
   - Handle underpayments

## Files to Create
- `src/services/coinbase.ts` - Coinbase client
- `src/services/crypto-orders.ts` - Order handling
- `src/routes/crypto.ts` - API endpoints
- `src/webhooks/coinbase.ts` - Webhook handlers

## Success Criteria
- [ ] Charges created correctly
- [ ] Multiple coins supported
- [ ] Status updates via webhook
- [ ] Orders marked paid correctly
- [ ] Expired charges handled
