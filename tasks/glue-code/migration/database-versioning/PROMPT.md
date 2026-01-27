# Task: Database Migration System

## Objective
Build a database schema migration system that tracks, applies, and rolls back migrations.

## Requirements

1. **Migration Files**
   - Timestamped migration files
   - Up and down functions
   - SQL or programmatic migrations
   - Migration template generation

2. **Operations**
   - `migrate up` - Apply pending
   - `migrate down` - Rollback last
   - `migrate status` - Show status
   - `migrate create <name>` - New migration

3. **Tracking**
   - Store applied migrations in DB
   - Lock to prevent concurrent runs
   - Checksum validation
   - Execution timing

4. **Safety**
   - Transaction per migration
   - Dry run mode
   - Backup before destructive ops
   - Validate before apply

## Technical Stack
- TypeScript/Node.js
- PostgreSQL
- Commander for CLI

## Files to Create
- `src/cli.ts` - CLI commands
- `src/migrator.ts` - Migration runner
- `src/tracker.ts` - Migration tracking
- `src/generator.ts` - Migration generator
- `src/lock.ts` - Concurrent lock
- `migrations/` - Migration files

## Success Criteria
- [ ] Migrations apply in order
- [ ] Rollback works correctly
- [ ] Status shows correct state
- [ ] Concurrent runs prevented
- [ ] Transactions rollback on error
