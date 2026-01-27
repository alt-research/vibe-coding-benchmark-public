# Task: Sync to Async Refactor

## Objective
Convert synchronous I/O-bound code to async for better performance.

## Given Code
- Sync HTTP requests
- Sync file operations
- Sync database queries
- Sequential processing

## Requirements

1. **Async Conversion**
   - Async HTTP with aiohttp/httpx
   - Async file I/O with aiofiles
   - Async database with asyncpg
   - Async Redis with aioredis

2. **Concurrency**
   - Parallel requests with gather
   - Semaphores for rate limiting
   - Task groups
   - Proper cancellation

3. **Error Handling**
   - Async exception handling
   - Timeout handling
   - Retry logic
   - Graceful degradation

4. **Testing**
   - Async test fixtures
   - pytest-asyncio
   - Mock async functions

## Files to Modify
- `app/services/*.py` - Convert to async
- `app/clients/*.py` - Async clients
- `tests/*.py` - Async tests

## Success Criteria
- [ ] All I/O is async
- [ ] Parallel operations work
- [ ] Error handling preserved
- [ ] Tests pass
- [ ] Performance improved
