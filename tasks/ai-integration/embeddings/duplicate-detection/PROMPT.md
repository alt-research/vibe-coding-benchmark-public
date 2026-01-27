# Task: Document Duplicate Detection

## Objective
Build a system to find near-duplicate documents using semantic embeddings.

## Requirements

1. **Document Processing**
   - Accept various formats (text, PDF, HTML)
   - Normalize text content
   - Generate embeddings
   - Store document fingerprints

2. **Duplicate Detection**
   - Exact duplicates (hash)
   - Near duplicates (embedding similarity)
   - Configurable threshold
   - Cluster duplicates together

3. **Batch Processing**
   - Process large document sets
   - Incremental updates
   - Compare new vs existing
   - Parallel processing

4. **API**
   - `POST /documents` - Add document
   - `POST /check` - Check single doc for dupes
   - `POST /batch/analyze` - Analyze batch
   - `GET /clusters` - Get duplicate clusters

## Technical Stack
- Python 3.11+
- FastAPI
- sentence-transformers
- FAISS or pgvector

## Files to Create
- `app/services/processor.py` - Document processing
- `app/services/embedder.py` - Embedding generation
- `app/services/detector.py` - Duplicate detection
- `app/services/clusterer.py` - Clustering logic
- `app/routers/documents.py` - API endpoints

## Success Criteria
- [ ] Exact duplicates found
- [ ] Near duplicates detected
- [ ] Threshold configurable
- [ ] Clusters make sense
- [ ] Handles large batches
