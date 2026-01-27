# Task: Data Backfill Pipeline

## Objective
Build a data backfill system that migrates/transforms large datasets with progress tracking and resumability.

## Requirements

1. **Batch Processing**
   - Process records in batches
   - Configurable batch size
   - Parallel batch processing
   - Memory-efficient iteration

2. **Progress Tracking**
   - Track processed record count
   - Estimate time remaining
   - Save checkpoint periodically
   - Resume from checkpoint

3. **Error Handling**
   - Log failed records
   - Continue on individual failures
   - Retry failed batches
   - Generate error report

4. **CLI Interface**
   - `backfill run <job>` - Start backfill
   - `backfill status <job>` - Check progress
   - `backfill resume <job>` - Resume from checkpoint
   - `backfill retry-failed <job>` - Retry failures

## Technical Stack
- Python 3.11+
- SQLAlchemy for DB access
- Click for CLI
- Redis for progress state

## Files to Create
- `backfill/cli.py` - CLI commands
- `backfill/runner.py` - Backfill executor
- `backfill/checkpoint.py` - Checkpoint management
- `backfill/jobs/user_migration.py` - Example job
- `backfill/reporter.py` - Progress reporting

## Success Criteria
- [ ] Processes all records correctly
- [ ] Progress persists across restarts
- [ ] Resume continues from checkpoint
- [ ] Failed records logged
- [ ] Retry-failed processes failures only
