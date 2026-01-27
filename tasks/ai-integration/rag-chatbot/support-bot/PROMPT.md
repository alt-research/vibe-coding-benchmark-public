# Task: Customer Support RAG Bot

## Objective
Build a customer support chatbot that answers questions using a knowledge base with RAG.

## Requirements

1. **Knowledge Base**
   - Ingest FAQ documents
   - Ingest help articles
   - Ingest product documentation
   - Support Markdown, PDF, HTML

2. **Conversation**
   - Multi-turn conversation
   - Remember conversation context
   - Clarifying questions
   - Handoff to human when needed

3. **Response Quality**
   - Cite sources in responses
   - Confidence threshold for answers
   - "I don't know" for out-of-scope
   - Suggested related articles

4. **API**
   - `POST /kb/ingest` - Add documents
   - `POST /chat` - Send message
   - `GET /chat/{session}/history` - Get history
   - `POST /chat/{session}/feedback` - Rate response

## Technical Stack
- Python 3.11+
- FastAPI
- LangChain
- ChromaDB or Pinecone
- OpenAI/Anthropic

## Files to Create
- `app/kb/ingester.py` - Document ingestion
- `app/kb/retriever.py` - RAG retrieval
- `app/chat/bot.py` - Chatbot logic
- `app/chat/memory.py` - Conversation memory
- `app/routers/chat.py` - API endpoints

## Success Criteria
- [ ] Documents ingested and indexed
- [ ] Relevant answers from knowledge base
- [ ] Sources cited in responses
- [ ] Conversation context maintained
- [ ] Graceful handling of unknown queries
