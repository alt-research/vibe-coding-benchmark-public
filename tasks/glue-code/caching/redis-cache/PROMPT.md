# Redis Caching Layer

Implement a caching layer using Redis for API responses and database queries.

## Cache Strategies

### 1. Cache-Aside (Lazy Loading)
- Check cache first
- On miss, fetch from source
- Store result in cache
- Return data

### 2. Write-Through
- Write to cache AND database
- Ensures consistency
- For critical data

### 3. Cache Invalidation
- Time-based (TTL)
- Event-based (on update/delete)
- Pattern-based (wildcard delete)

## Technical Requirements

### Cache Interface
```typescript
interface CacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  deletePattern(pattern: string): Promise<void>;
  getOrSet<T>(key: string, fetcher: () => Promise<T>, ttl?: number): Promise<T>;
}
```

### Cache Key Patterns
```
users:{id}              - Single user
users:list:{page}       - User list page
products:{id}           - Single product
products:search:{query} - Search results
sessions:{token}        - User sessions
```

### Middleware Integration
```typescript
// Express/Hono middleware
app.get('/api/products/:id', cacheMiddleware({ ttl: 300 }), handler);

// Decorator pattern
@Cached({ ttl: 300, key: 'products:{id}' })
async getProduct(id: string) { ... }
```

## Requirements

1. Use `ioredis` for Redis client
2. Connection pooling
3. Graceful degradation (work without cache)
4. Cache hit/miss metrics
5. Compression for large values (>1KB)
6. JSON serialization with dates

## Cache Configuration
```typescript
interface CacheConfig {
  defaultTTL: number;      // seconds
  maxMemory: string;       // e.g., "100mb"
  evictionPolicy: 'lru' | 'lfu' | 'volatile-lru';
  keyPrefix: string;
}
```

## Acceptance Criteria

- [ ] Cache-aside pattern works
- [ ] Write-through updates cache
- [ ] TTL expiration works
- [ ] Pattern invalidation works
- [ ] Graceful fallback without Redis
- [ ] Metrics tracked (hits/misses)
- [ ] Large values compressed
