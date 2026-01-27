# Event Sourcing with Snapshots

Build a complete event sourcing system with optimized snapshot support.

## Requirements
1. Event store with PostgreSQL (append-only)
2. Automatic snapshot creation every N events
3. Event versioning and upcasting
4. Projection rebuilding from events
5. Optimistic concurrency control
6. Event replay with filtering
7. Idempotent event handlers
8. Dead letter queue for failed events

## API
```typescript
interface EventStore {
  append(streamId: string, events: Event[], expectedVersion: number): Promise<void>;
  read(streamId: string, fromVersion?: number): AsyncIterable<Event>;
  snapshot(streamId: string): Promise<Snapshot | null>;
  rebuild(projection: string): Promise<void>;
}
```
