# Task: RabbitMQ Message Consumer

## Objective
Build a reliable RabbitMQ consumer with proper acknowledgment, retry, and dead letter handling.

## Requirements

1. **Consumer Setup**
   - Connect with automatic reconnection
   - Prefetch for flow control
   - Multiple consumer instances (scaling)
   - Graceful shutdown

2. **Message Processing**
   - Process different message types
   - Validate message schema
   - Handle processing errors
   - Manual acknowledgment

3. **Retry Logic**
   - Retry failed messages with backoff
   - Max retry count per message
   - Move to dead letter after max retries
   - Track retry count in headers

4. **Dead Letter Queue**
   - Capture failed messages
   - Include error information
   - API to inspect dead letters
   - Replay dead letters

## Technical Stack
- Python 3.11+
- aio-pika (async RabbitMQ)
- Pydantic for validation
- PostgreSQL for state

## Files to Create
- `consumer/main.py` - Entry point
- `consumer/handlers.py` - Message handlers
- `consumer/retry.py` - Retry logic
- `consumer/dlq.py` - Dead letter handling
- `consumer/models.py` - Message models

## Success Criteria
- [ ] Messages processed reliably
- [ ] Failed messages retried with backoff
- [ ] Dead letters captured after max retries
- [ ] Consumer reconnects on connection loss
- [ ] Graceful shutdown completes in-flight
