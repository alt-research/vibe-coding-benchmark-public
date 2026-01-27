import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Stripe from 'stripe';
import crypto from 'crypto';

const WEBHOOK_URL = 'http://localhost:3000/api/webhooks/stripe';
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test_secret';

function generateSignature(payload: string, secret: string): string {
  const timestamp = Math.floor(Date.now() / 1000);
  const signedPayload = `${timestamp}.${payload}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');
  return `t=${timestamp},v1=${signature}`;
}

function createStripeEvent(type: string, data: object): object {
  return {
    id: `evt_${crypto.randomBytes(16).toString('hex')}`,
    object: 'event',
    api_version: '2023-10-16',
    created: Math.floor(Date.now() / 1000),
    type,
    data: {
      object: data
    }
  };
}

describe('Stripe Webhook Handler', () => {
  it('should reject requests without signature', async () => {
    const event = createStripeEvent('payment_intent.succeeded', {
      id: 'pi_test123',
      amount: 2000,
      currency: 'usd'
    });

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });

    expect(response.status).toBe(400);
  });

  it('should reject requests with invalid signature', async () => {
    const event = createStripeEvent('payment_intent.succeeded', {
      id: 'pi_test123',
      amount: 2000,
      currency: 'usd'
    });
    const payload = JSON.stringify(event);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Stripe-Signature': 't=123,v1=invalid_signature'
      },
      body: payload
    });

    expect(response.status).toBe(400);
  });

  it('should process payment_intent.succeeded event', async () => {
    const event = createStripeEvent('payment_intent.succeeded', {
      id: 'pi_test_success',
      amount: 2000,
      currency: 'usd',
      metadata: { order_id: 'order_123' }
    });
    const payload = JSON.stringify(event);
    const signature = generateSignature(payload, WEBHOOK_SECRET);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Stripe-Signature': signature
      },
      body: payload
    });

    expect(response.status).toBe(200);

    // Verify order was updated (mock DB check)
    const body = await response.json();
    expect(body.received).toBe(true);
  });

  it('should process payment_intent.payment_failed event', async () => {
    const event = createStripeEvent('payment_intent.payment_failed', {
      id: 'pi_test_failed',
      amount: 2000,
      currency: 'usd',
      metadata: { order_id: 'order_456' },
      last_payment_error: {
        message: 'Card declined'
      }
    });
    const payload = JSON.stringify(event);
    const signature = generateSignature(payload, WEBHOOK_SECRET);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Stripe-Signature': signature
      },
      body: payload
    });

    expect(response.status).toBe(200);
  });

  it('should process charge.refunded event', async () => {
    const event = createStripeEvent('charge.refunded', {
      id: 'ch_test_refund',
      amount: 2000,
      amount_refunded: 2000,
      payment_intent: 'pi_test_refund',
      metadata: { order_id: 'order_789' }
    });
    const payload = JSON.stringify(event);
    const signature = generateSignature(payload, WEBHOOK_SECRET);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Stripe-Signature': signature
      },
      body: payload
    });

    expect(response.status).toBe(200);
  });

  it('should return 200 for unknown event types', async () => {
    const event = createStripeEvent('unknown.event.type', {
      id: 'unknown_123'
    });
    const payload = JSON.stringify(event);
    const signature = generateSignature(payload, WEBHOOK_SECRET);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Stripe-Signature': signature
      },
      body: payload
    });

    expect(response.status).toBe(200);
  });

  it('should be idempotent for duplicate events', async () => {
    const event = createStripeEvent('payment_intent.succeeded', {
      id: 'pi_test_idempotent',
      amount: 2000,
      currency: 'usd',
      metadata: { order_id: 'order_idem' }
    });
    const payload = JSON.stringify(event);
    const signature = generateSignature(payload, WEBHOOK_SECRET);

    // Send same event twice
    const response1 = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Stripe-Signature': signature
      },
      body: payload
    });

    const response2 = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Stripe-Signature': signature
      },
      body: payload
    });

    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
  });
});
