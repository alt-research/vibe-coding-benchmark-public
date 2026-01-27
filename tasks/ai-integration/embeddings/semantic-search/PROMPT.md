# Task: Vector Similarity Search

## Objective
Build a semantic search system using vector embeddings for finding similar content.

## Requirements

1. **Embedding Generation**
   - Text to embedding conversion
   - Batch processing
   - Caching embeddings
   - Model selection (OpenAI, sentence-transformers)

2. **Vector Storage**
   - Store embeddings with metadata
   - Efficient similarity search
   - Support filtering
   - Handle updates/deletes

3. **Search Features**
   - Semantic similarity search
   - Hybrid (semantic + keyword)
   - Top-K retrieval
   - Similarity threshold

4. **API**
   - `POST /embed` - Generate embedding
   - `POST /index` - Add to index
   - `POST /search` - Similarity search
   - `DELETE /index/{id}` - Remove item

## Technical Stack
- Python 3.11+
- FastAPI
- OpenAI Embeddings or sentence-transformers
- pgvector or FAISS

## Files to Create
- `app/services/embedder.py` - Embedding generation
- `app/services/vector_store.py` - Vector storage
- `app/services/searcher.py` - Search logic
- `app/routers/search.py` - API endpoints
- `app/models/document.py` - Data models

## Success Criteria
- [ ] Embeddings generated correctly
- [ ] Similar items retrieved
- [ ] Filters work properly
- [ ] Performance acceptable
- [ ] Handles large datasets
