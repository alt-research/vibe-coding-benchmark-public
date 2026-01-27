# PDF Q&A RAG Chatbot

## Context

Build a Retrieval-Augmented Generation (RAG) chatbot that can answer questions about uploaded PDF documents. The system should extract, chunk, embed, and retrieve relevant content to answer user queries.

## Requirements

### 1. PDF Processing

- Accept PDF file uploads via API
- Extract text from PDF using pypdf or similar
- Handle multi-page documents
- Preserve document structure where possible

### 2. Text Chunking & Embedding

- Split documents into semantic chunks (500-1000 tokens)
- Generate embeddings using OpenAI text-embedding-ada-002 or similar
- Store embeddings in a vector database (Chroma, Pinecone, or pgvector)

### 3. Query Processing

- Accept natural language questions via API
- Retrieve top-k relevant chunks (k=3-5)
- Generate answers using retrieved context
- Include source citations in responses

### 4. API Endpoints

```
POST /documents
  - Upload PDF file
  - Returns: { documentId, pageCount, status }

GET /documents/{id}
  - Get document metadata
  - Returns: { documentId, name, pageCount, chunkCount }

POST /chat
  - Body: { documentId, question }
  - Returns: { answer, sources: [{ page, text }] }
```

## Technical Stack

- FastAPI for API
- LangChain for orchestration
- ChromaDB for vector storage
- OpenAI for embeddings and completion
- PyPDF2 for PDF extraction

## Acceptance Criteria

- [ ] PDF upload processes successfully
- [ ] Questions return relevant, grounded answers
- [ ] Sources are correctly cited
- [ ] Handles documents up to 100 pages
- [ ] Response time < 5 seconds for queries

## Test Document

The fixture `handbook.pdf` is a sample employee handbook. Test questions:

1. "What is the vacation policy?"
2. "How do I submit expenses?"
3. "What are the working hours?"

Answers must be grounded in the document content, not hallucinated.

## Environment Variables

```
OPENAI_API_KEY=your-key
CHROMA_PERSIST_DIR=./chroma_data
```
