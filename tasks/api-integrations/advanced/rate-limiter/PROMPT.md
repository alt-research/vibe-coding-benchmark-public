# Distributed Rate Limiter

Build production rate limiting service.

## Requirements
1. Multiple algorithms (token bucket, sliding window, leaky bucket)
2. Distributed state with Redis
3. Per-user/org/API key limits
4. Quota management API
5. Burst handling
6. Rate limit headers (RFC 6585)
7. Graceful degradation
8. Real-time analytics
9. Exemption rules
10. Sub-millisecond latency
