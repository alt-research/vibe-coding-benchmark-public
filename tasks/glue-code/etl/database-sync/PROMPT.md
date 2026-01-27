# Task: PostgreSQL to MongoDB Sync

## Objective
Build a data sync pipeline that replicates data from PostgreSQL to MongoDB with transformation support.

## Requirements

1. **Initial Sync**
   - Full table dump from PostgreSQL
   - Transform relational to document model
   - Batch inserts to MongoDB
   - Progress tracking and resumability

2. **Incremental Sync**
   - Track changes via updated_at timestamp
   - Detect inserts, updates, deletes
   - Sync only changed records
   - Handle deletions (soft delete support)

3. **Transformation**
   - Map table columns to document fields
   - Embed related data (denormalize)
   - Handle foreign keys → embedded docs
   - Custom field transformations

4. **Configuration**
   ```yaml
   tables:
     - name: users
       collection: users
       transform:
         - embed: orders
           via: user_id
     - name: products
       collection: products
   ```

## Files to Create
- `sync/main.py` - Entry point
- `sync/extractor.py` - PostgreSQL extraction
- `sync/transformer.py` - Data transformation
- `sync/loader.py` - MongoDB loading
- `sync/config.py` - Configuration parser
- `config.yaml` - Sync configuration

## Success Criteria
- [ ] Initial sync transfers all data
- [ ] Incremental sync captures changes
- [ ] Transformations apply correctly
- [ ] Embedded documents work
- [ ] Sync is resumable on failure
