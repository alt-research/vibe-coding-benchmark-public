# Task: Multi-Document Semantic Search

## Objective
Build a semantic search engine in Go that searches across multiple documents using embeddings.

## Requirements

1. **Document Ingestion**
   - Accept PDF, TXT, MD files
   - Chunk documents intelligently
   - Generate embeddings per chunk
   - Store metadata (source, page, etc.)

2. **Search Features**
   - Natural language queries
   - Hybrid search (semantic + keyword)
   - Filters (date, source, type)
   - Pagination and ranking

3. **Results**
   - Return relevant passages
   - Highlight matching content
   - Source attribution
   - Relevance scores

4. **API**
   - `POST /documents` - Upload document
   - `GET /search?q=query` - Search
   - `DELETE /documents/{id}` - Remove doc
   - `GET /documents` - List documents

## Technical Stack
- Go 1.21+
- OpenAI Embeddings API
- pgvector or Milvus
- Chi or Gin router

## Files to Create
- `cmd/search/main.go` - Entry point
- `internal/ingestion/processor.go` - Doc processing
- `internal/ingestion/chunker.go` - Text chunking
- `internal/embeddings/client.go` - Embedding API
- `internal/search/engine.go` - Search logic
- `internal/handlers/api.go` - HTTP handlers

## Success Criteria
- [ ] Documents indexed correctly
- [ ] Semantic search returns relevant results
- [ ] Filters work correctly
- [ ] Results include source info
- [ ] Handles large document sets
