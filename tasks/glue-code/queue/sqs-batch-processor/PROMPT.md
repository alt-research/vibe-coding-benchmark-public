# Task: AWS SQS Batch Processor

## Objective
Build an efficient SQS batch processor with partial failure handling and visibility timeout management.

## Requirements

1. **Batch Receiving**
   - Receive up to 10 messages per request
   - Long polling for efficiency
   - Parse message body (JSON)
   - Extract message attributes

2. **Batch Processing**
   - Process messages in parallel
   - Individual message error handling
   - Partial batch failure support
   - Report failed message IDs

3. **Visibility Timeout**
   - Extend timeout for long-running jobs
   - Heartbeat mechanism
   - Release messages on failure

4. **Dead Letter Queue**
   - Configure DLQ on max receives
   - Move manually to DLQ on permanent failure
   - Redrive from DLQ

## Technical Stack
- TypeScript/Node.js
- AWS SDK v3
- Zod for validation

## Files to Create
- `src/processor.ts` - Main processor
- `src/handlers/index.ts` - Message handlers
- `src/visibility.ts` - Visibility management
- `src/dlq.ts` - DLQ operations
- `src/types.ts` - Type definitions

## Success Criteria
- [ ] Batch receiving works efficiently
- [ ] Partial failures don't block batch
- [ ] Visibility extended for long jobs
- [ ] Failed messages go to DLQ
- [ ] Redrive from DLQ works
