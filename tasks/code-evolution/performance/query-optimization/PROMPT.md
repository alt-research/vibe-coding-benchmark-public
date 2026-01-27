# Task: Database Query Optimization

## Objective
Identify and fix slow database queries in a Python application.

## Given Issues
- N+1 query problems
- Missing indexes
- Full table scans
- Large result sets
- No query caching

## Requirements

1. **Query Analysis**
   - Profile slow queries
   - Identify N+1 patterns
   - Check execution plans
   - Find missing indexes

2. **Optimization Techniques**
   - Add proper indexes
   - Eager loading (joinedload)
   - Pagination
   - Select only needed columns
   - Query caching

3. **Specific Fixes**
   - Fix N+1 in list views
   - Optimize search queries
   - Batch bulk operations
   - Add compound indexes

4. **Validation**
   - Measure before/after
   - Query count tests
   - Performance benchmarks

## Files to Modify
- `app/repositories/*.py` - Query logic
- `migrations/` - Index migrations
- `tests/performance/` - Benchmarks

## Success Criteria
- [ ] N+1 queries eliminated
- [ ] Response times < 100ms
- [ ] Indexes added where needed
- [ ] Query counts reduced
- [ ] Benchmarks documented
