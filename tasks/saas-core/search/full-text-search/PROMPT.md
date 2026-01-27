# Task: Full-Text Search with Elasticsearch

## Objective
Implement a full-text search system using Elasticsearch that searches across users, documents, and comments.

## Requirements

1. **Index Management**
   - Create indices for: users, documents, comments
   - Define mappings with proper analyzers
   - Handle index versioning for schema changes
   - Reindex on mapping changes

2. **Data Sync**
   - Sync database changes to Elasticsearch
   - Handle creates, updates, deletes
   - Bulk indexing for initial load
   - Near real-time sync (< 1 second)

3. **Search Features**
   - Full-text search across fields
   - Fuzzy matching for typos
   - Highlighting matched terms
   - Faceted search (filter by type, date, author)
   - Pagination with cursor

4. **API Endpoints**
   - `GET /search?q=term` - Global search
   - `GET /search/users?q=term` - Search users
   - `GET /search/documents?q=term` - Search docs
   - `POST /search/reindex` - Trigger reindex

## Technical Stack
- TypeScript/Node.js
- Express or Hono
- Elasticsearch 8.x
- PostgreSQL (source of truth)

## Files to Create
- `src/services/elasticsearch.ts` - ES client wrapper
- `src/services/indexer.ts` - Data sync logic
- `src/services/search.ts` - Search logic
- `src/routes/search.ts` - Search endpoints
- `src/mappings/` - Index mappings

## Success Criteria
- [ ] Search returns relevant results
- [ ] Fuzzy matching handles typos
- [ ] Results highlight matched terms
- [ ] Facets filter correctly
- [ ] DB changes sync to ES quickly
