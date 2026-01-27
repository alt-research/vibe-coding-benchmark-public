# Task: Change Data Capture Pipeline

## Objective
Build a CDC pipeline using Debezium that streams database changes to downstream systems.

## Requirements

1. **Debezium Setup**
   - Configure PostgreSQL connector
   - Capture inserts, updates, deletes
   - Stream to Kafka topics
   - Handle schema changes

2. **Consumer Service**
   - Consume CDC events from Kafka
   - Parse Debezium event format
   - Apply changes to target system
   - Maintain ordering guarantees

3. **Target Systems**
   - Elasticsearch (search index)
   - Cache invalidation (Redis)
   - Webhook notifications
   - Configurable per-table targets

4. **Operations**
   - Snapshot for initial sync
   - Resume from offset on restart
   - Monitor lag and health
   - Dead letter handling

## Technical Stack
- TypeScript/Node.js
- Debezium (Kafka Connect)
- Kafka (KafkaJS)
- PostgreSQL
- Elasticsearch/Redis

## Files to Create
- `src/consumer/index.ts` - Kafka consumer
- `src/consumer/parser.ts` - Event parser
- `src/handlers/elasticsearch.ts` - ES handler
- `src/handlers/cache.ts` - Cache handler
- `src/handlers/webhook.ts` - Webhook handler
- `docker-compose.yaml` - Infrastructure

## Success Criteria
- [ ] Database changes captured in real-time
- [ ] Events correctly parsed
- [ ] Elasticsearch updated on changes
- [ ] Cache invalidated correctly
- [ ] Consumer resumes after restart
