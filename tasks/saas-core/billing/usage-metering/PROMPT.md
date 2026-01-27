# Task: Usage-Based Metering System

## Objective
Build a high-performance usage metering system for API calls with Go that tracks, aggregates, and reports usage for billing.

## Requirements

1. **Usage Tracking**
   - Track API calls per customer in real-time
   - Capture: timestamp, endpoint, response time, tokens used
   - Handle high throughput (10K+ requests/sec)
   - Buffer and batch writes to database

2. **Aggregation**
   - Hourly/daily/monthly rollups
   - Per-endpoint breakdowns
   - Dimension by: customer, API key, endpoint
   - Background workers for aggregation

3. **Quota Management**
   - Set usage limits per plan
   - Real-time quota checking
   - Soft limits (warning) vs hard limits (block)
   - Quota reset on billing cycle

4. **API Endpoints**
   - `GET /usage/current` - Current period usage
   - `GET /usage/history` - Historical usage data
   - `GET /usage/breakdown` - Per-endpoint breakdown
   - `POST /usage/record` - Record usage event (internal)

## Technical Stack
- Go 1.21+
- Gin or Chi router
- Redis for real-time counters
- PostgreSQL for historical data
- TimescaleDB for time-series

## Files to Create
- `cmd/metering/main.go` - Entry point
- `internal/metering/tracker.go` - Usage tracking
- `internal/metering/aggregator.go` - Aggregation workers
- `internal/metering/quota.go` - Quota management
- `internal/handlers/usage.go` - API handlers
- `internal/middleware/metering.go` - Auto-track middleware

## Success Criteria
- [ ] Usage tracked with <10ms latency overhead
- [ ] Aggregations computed correctly
- [ ] Quota limits enforced in real-time
- [ ] Historical data queryable efficiently
- [ ] Handles 10K+ req/sec without dropping
