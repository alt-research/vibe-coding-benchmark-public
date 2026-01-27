# Task: Natural Language to SQL

## Objective
Build a system that converts natural language questions into SQL queries and executes them safely.

## Requirements

1. **Schema Awareness**
   - Ingest database schema
   - Understand table relationships
   - Know column types
   - Maintain schema cache

2. **Query Generation**
   - Natural language to SQL
   - Support SELECT queries
   - Handle JOINs
   - Aggregations (COUNT, SUM, AVG)
   - Filters and sorting

3. **Safety**
   - Read-only queries only
   - Query validation
   - Injection prevention
   - Result size limits

4. **API**
   - `POST /schema` - Upload schema
   - `POST /query` - Ask question
   - Response includes SQL and results

## Example
```
User: "How many orders did each customer place last month?"

SQL: SELECT c.name, COUNT(o.id) as order_count
     FROM customers c
     JOIN orders o ON c.id = o.customer_id
     WHERE o.created_at >= '2025-12-01'
     GROUP BY c.id, c.name
     ORDER BY order_count DESC
```

## Technical Stack
- Python 3.11+
- FastAPI
- SQLAlchemy
- OpenAI/Anthropic

## Files to Create
- `app/services/schema_parser.py` - Schema ingestion
- `app/services/query_generator.py` - NL to SQL
- `app/services/query_executor.py` - Safe execution
- `app/services/validator.py` - Query validation
- `app/routers/query.py` - API endpoints

## Success Criteria
- [ ] Simple queries generated correctly
- [ ] JOINs work properly
- [ ] Aggregations correct
- [ ] Only SELECT allowed
- [ ] Results returned accurately
