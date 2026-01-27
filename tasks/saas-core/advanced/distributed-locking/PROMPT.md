# Distributed Locking with Redis (Redlock)

Implement a production-ready distributed locking system using Redis with the Redlock algorithm.

## Requirements

### Core Features
1. Implement Redlock algorithm with N Redis instances (minimum 3)
2. Handle automatic lock extension (fencing tokens)
3. Implement lock acquisition with configurable retry and timeout
4. Handle clock drift compensation
5. Implement proper lock release with ownership verification

### Edge Cases
1. Handle network partitions gracefully
2. Implement deadlock detection and prevention
3. Handle Redis instance failures during lock operations
4. Implement lock queuing for fair acquisition
5. Handle split-brain scenarios

### API Design
```typescript
interface DistributedLock {
  acquire(resource: string, ttl: number): Promise<LockHandle | null>;
  extend(handle: LockHandle, ttl: number): Promise<boolean>;
  release(handle: LockHandle): Promise<boolean>;
  isLocked(resource: string): Promise<boolean>;
}

interface LockHandle {
  resource: string;
  token: string;
  validUntil: number;
}
```

### Performance Requirements
- Lock acquisition: < 50ms for uncontested locks
- Support 10,000+ concurrent lock operations
- Handle 5 Redis instances with 2 allowed failures

## Evaluation Criteria
- Correctness of Redlock implementation
- Proper handling of all edge cases
- Performance under contention
- Code quality and test coverage
