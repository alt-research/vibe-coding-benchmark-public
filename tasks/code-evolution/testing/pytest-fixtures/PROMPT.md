# Task: Refactor Tests with Fixtures

## Objective
Refactor Python tests to use pytest fixtures for better reusability.

## Given Code
- setUp/tearDown methods
- Duplicated test data
- Slow test execution
- No fixture reuse

## Requirements

1. **Fixture Creation**
   - Extract common setup
   - Parameterized fixtures
   - Fixture dependencies
   - Scope management (function/class/module/session)

2. **Database Fixtures**
   - Test database setup
   - Transaction rollback
   - Factory fixtures
   - Seed data fixtures

3. **Mock Fixtures**
   - API mock fixtures
   - Time freezing
   - Environment fixtures
   - Autouse fixtures

4. **Conftest Organization**
   - conftest.py hierarchy
   - Plugin fixtures
   - Fixture documentation

## Files to Modify
- `tests/conftest.py` - Root fixtures
- `tests/*/conftest.py` - Module fixtures
- `tests/*.py` - Test files

## Success Criteria
- [ ] No setUp/tearDown
- [ ] Fixtures reused
- [ ] Tests run faster
- [ ] Less code duplication
- [ ] Clear fixture hierarchy
