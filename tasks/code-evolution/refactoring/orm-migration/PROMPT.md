# Task: SQLAlchemy to SQLModel

## Objective
Migrate from SQLAlchemy models to SQLModel with async support.

## Given Code
- SQLAlchemy ORM models
- Sync database operations
- Session management
- Query patterns

## Requirements

1. **Model Conversion**
   - SQLModel class definitions
   - Field types with Pydantic
   - Relationships
   - Table configuration

2. **Async Operations**
   - AsyncSession usage
   - Async queries
   - Async relationship loading
   - Transaction handling

3. **Query Patterns**
   - Select statements
   - Joins and eager loading
   - Aggregations
   - Raw SQL where needed

4. **Session Management**
   - Async context managers
   - Dependency injection
   - Connection pooling

## Files to Modify
- `app/models/*.py` - Model files
- `app/repositories/*.py` - Query logic
- `app/database.py` - Session setup

## Success Criteria
- [ ] Models converted
- [ ] Async throughout
- [ ] Queries work
- [ ] Tests pass
- [ ] Performance maintained
