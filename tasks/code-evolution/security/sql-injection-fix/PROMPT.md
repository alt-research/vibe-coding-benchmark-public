# Task: Fix SQL Injection

## Objective
Find and fix SQL injection vulnerabilities in a Python application.

## Vulnerable Patterns
- String concatenation in queries
- f-strings with user input
- .format() with user input
- Raw SQL with interpolation

## Requirements

1. **Identify Vulnerabilities**
   - Search for string concat queries
   - Find raw SQL usage
   - Check dynamic ORDER BY
   - Inspect LIKE patterns

2. **Fixes**
   - Use parameterized queries
   - ORM methods properly
   - Whitelist for dynamic columns
   - Escape LIKE wildcards

3. **Code Patterns**
   ```python
   # Bad
   query = f"SELECT * FROM users WHERE id = {user_id}"

   # Good
   query = "SELECT * FROM users WHERE id = :id"
   db.execute(query, {"id": user_id})
   ```

4. **Testing**
   - SQL injection test cases
   - Malicious input tests
   - Boundary testing

## Files to Modify
- `app/repositories/*.py` - Query fixes
- `tests/security/` - Security tests

## Success Criteria
- [ ] No string concat in queries
- [ ] All queries parameterized
- [ ] Security tests pass
- [ ] Static analysis clean
- [ ] OWASP compliant
