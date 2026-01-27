# API Rate Limiter

Implement a distributed rate limiter for API endpoints using Redis.

## Rate Limit Strategies

### 1. Fixed Window
- Count requests in fixed time windows
- Simple but has edge case issues

### 2. Sliding Window Log
- Track timestamps of each request
- More accurate but memory intensive

### 3. Sliding Window Counter (Recommended)
- Weighted average between windows
- Good balance of accuracy and efficiency

### 4. Token Bucket
- Tokens replenish over time
- Allows burst traffic

## Technical Requirements

### Rate Limit Configuration
```typescript
interface RateLimitConfig {
  window: number;        // Window size in seconds
  max: number;           // Max requests per window
  keyGenerator?: (req) => string;  // Custom key generation
  skip?: (req) => boolean;         // Skip rate limiting
  onLimit?: (req, res) => void;    // Custom limit handler
}

// Different limits for different endpoints
const limits = {
  '/api/auth/login': { window: 60, max: 5 },
  '/api/auth/register': { window: 3600, max: 3 },
  '/api/search': { window: 60, max: 30 },
  '/api/*': { window: 60, max: 100 },
};
```

### Response Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1640000000
Retry-After: 30  (when limited)
```

### Key Strategies
```typescript
// By IP address
const key = `ratelimit:ip:${req.ip}`;

// By user ID (authenticated)
const key = `ratelimit:user:${req.userId}`;

// By API key
const key = `ratelimit:apikey:${req.headers['x-api-key']}`;

// Composite key
const key = `ratelimit:${req.userId}:${req.path}`;
```

## Middleware Implementation

```typescript
// Express/Hono middleware
app.use('/api', rateLimiter({
  window: 60,
  max: 100,
  keyGenerator: (req) => req.userId || req.ip,
}));

// Route-specific limits
app.post('/api/auth/login', rateLimiter({ window: 60, max: 5 }), handler);
```

## Requirements

1. Use Redis for distributed state
2. Implement sliding window counter
3. Support multiple limit tiers (free/pro/enterprise)
4. Bypass for whitelisted IPs/keys
5. Return proper headers
6. Log rate limit events
7. Work without Redis (in-memory fallback)

## Acceptance Criteria

- [ ] Rate limits enforced correctly
- [ ] Sliding window accurate
- [ ] Headers returned properly
- [ ] Multiple tiers work
- [ ] Whitelist bypass works
- [ ] In-memory fallback functional
- [ ] Distributed across instances
