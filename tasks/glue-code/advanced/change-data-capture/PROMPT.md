# Change Data Capture System

Build log-based CDC system for database replication.

## Requirements
1. WAL/binlog parsing for PostgreSQL/MySQL
2. Schema tracking and evolution
3. Multi-sink fanout (Kafka, S3, Elasticsearch)
4. Exactly-once delivery guarantees
5. Initial snapshot with streaming cutover
6. Table filtering and transformation
7. Heartbeat for lag monitoring
8. Tombstone handling for deletes
9. Transaction boundary preservation
10. Automatic failover and recovery
