# Task: Comprehensive Audit Trail System

## Objective
Build an audit logging system that captures all user and system actions for compliance and debugging.

## Requirements

1. **Event Capture**
   - User actions (login, CRUD operations, settings changes)
   - System events (scheduled jobs, integrations)
   - API calls with request/response summary
   - Capture: who, what, when, where, before/after state

2. **Log Storage**
   - Append-only log (immutable)
   - Efficient time-range queries
   - Retention policies (archive after 90 days)
   - Export to S3 for compliance

3. **Query API**
   - `GET /audit/logs` - Search with filters
   - Filter by: user, action, resource, date range
   - Full-text search on log content
   - Export to CSV/JSON

4. **Middleware**
   - Auto-capture all API mutations
   - Extract user context from JWT
   - Capture IP, user agent, request ID
   - Async write to avoid latency

## Technical Stack
- Go 1.21+
- Chi or Gin
- PostgreSQL with partitioning
- Elasticsearch for search (optional)

## Files to Create
- `internal/audit/logger.go` - Audit logger
- `internal/audit/middleware.go` - Auto-capture middleware
- `internal/audit/storage.go` - Log storage
- `internal/audit/export.go` - Export functionality
- `internal/handlers/audit.go` - Query endpoints

## Success Criteria
- [ ] All mutations automatically logged
- [ ] Before/after state captured for updates
- [ ] Logs are immutable (no update/delete)
- [ ] Time-range queries perform well
- [ ] Export to CSV works correctly
