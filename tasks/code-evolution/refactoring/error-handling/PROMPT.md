# Task: Standardize Error Handling

## Objective
Standardize error handling across a Go codebase using best practices.

## Given Code
- Inconsistent error handling
- Silent error swallowing
- No error wrapping
- Generic error messages

## Requirements

1. **Error Types**
   - Define domain errors
   - Sentinel errors
   - Custom error types
   - Error codes for API

2. **Error Wrapping**
   - Use fmt.Errorf with %w
   - Preserve error chain
   - Add context at each level
   - Unwrap for inspection

3. **Error Handling**
   - Check all errors
   - Handle or propagate
   - Log at appropriate level
   - No panic in library code

4. **API Errors**
   - Map to HTTP status
   - Consistent response format
   - Don't leak internals
   - Include error codes

## Files to Modify
- `internal/errors/errors.go` - Error definitions
- `internal/*/` - Apply patterns
- `internal/handlers/` - API error mapping

## Success Criteria
- [ ] Custom error types defined
- [ ] All errors wrapped with context
- [ ] No ignored errors
- [ ] API errors consistent
- [ ] Error chain inspectable
