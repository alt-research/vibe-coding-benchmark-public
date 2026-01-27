# Task: Codebase Q&A Assistant

## Objective
Build a RAG-powered assistant that answers questions about a codebase using semantic code search.

## Requirements

1. **Code Indexing**
   - Parse source files (TS, JS, Python, Go)
   - Chunk by functions/classes
   - Extract docstrings and comments
   - Store code embeddings

2. **Semantic Search**
   - Natural language queries
   - Find relevant code snippets
   - Rank by relevance
   - Filter by file type/path

3. **Q&A Interface**
   - Answer questions about code
   - Explain function behavior
   - Find usage examples
   - Suggest improvements

4. **API**
   - `POST /index` - Index a repository
   - `POST /query` - Ask question
   - `GET /search` - Semantic search
   - `DELETE /index/{repo}` - Clear index

## Technical Stack
- TypeScript/Node.js
- OpenAI Embeddings
- Pinecone or Qdrant
- Tree-sitter for parsing

## Files to Create
- `src/indexer/parser.ts` - Code parsing
- `src/indexer/chunker.ts` - Code chunking
- `src/indexer/embedder.ts` - Embedding generation
- `src/search/retriever.ts` - Retrieval logic
- `src/qa/assistant.ts` - Q&A generation
- `src/routes/api.ts` - API endpoints

## Success Criteria
- [ ] Code indexed correctly
- [ ] Relevant snippets retrieved
- [ ] Questions answered accurately
- [ ] Context includes related code
- [ ] Handles large codebases
