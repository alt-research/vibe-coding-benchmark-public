# Task: Callback to Async/Await

## Objective
Migrate callback-based Node.js code to modern async/await patterns.

## Given Code Issues
- Deeply nested callbacks
- Error handling scattered
- Hard to follow control flow
- No proper error propagation

## Requirements

1. **Promise Conversion**
   - Convert callback APIs to Promises
   - Use util.promisify where possible
   - Handle both success and error paths
   - Maintain same behavior

2. **Async/Await**
   - Replace .then() chains
   - Use try/catch for errors
   - Parallel execution where safe
   - Sequential when dependent

3. **Error Handling**
   - Centralize error handling
   - Proper error types
   - Error context preservation
   - Async error boundaries

4. **Testing**
   - All existing tests pass
   - Same API contracts
   - Edge cases handled

## Files to Modify
- `src/services/data.ts` - Data service
- `src/services/file.ts` - File operations
- `src/api/handlers.ts` - Request handlers

## Success Criteria
- [ ] No callbacks remain
- [ ] All tests pass
- [ ] Errors handled properly
- [ ] Code more readable
- [ ] Parallel operations optimized
