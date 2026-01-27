# Task: High-Throughput Kafka Producer

## Objective
Build a high-throughput Kafka producer in Go with batching, compression, and delivery guarantees.

## Requirements

1. **Producer Configuration**
   - Async batching for throughput
   - Compression (snappy/lz4)
   - Configurable acks (0, 1, all)
   - Idempotent producer for exactly-once

2. **Message Publishing**
   - Publish to specific partition (key-based)
   - Headers support
   - Async with callbacks
   - Sync option for critical messages

3. **Performance**
   - Batch by size and time
   - Connection pooling
   - Metrics (throughput, latency)
   - Handle backpressure

4. **API**
   - `POST /publish` - Publish single message
   - `POST /publish/batch` - Publish batch
   - `GET /metrics` - Producer metrics
   - Health check endpoint

## Technical Stack
- Go 1.21+
- confluent-kafka-go or segmentio/kafka-go
- Prometheus metrics

## Files to Create
- `cmd/producer/main.go` - Entry point
- `internal/kafka/producer.go` - Producer wrapper
- `internal/kafka/config.go` - Configuration
- `internal/handlers/publish.go` - HTTP handlers
- `internal/metrics/metrics.go` - Metrics

## Success Criteria
- [ ] Achieves 100K+ messages/sec
- [ ] Batching works correctly
- [ ] Compression reduces size
- [ ] Delivery callbacks work
- [ ] Metrics exposed correctly
