# Task: Monolith to Modules

## Objective
Extract self-contained modules from a monolithic TypeScript application.

## Given Code
- Everything in one package
- Circular dependencies
- Shared global state
- No clear boundaries

## Requirements

1. **Module Boundaries**
   - Identify domain boundaries
   - Extract modules with clear interfaces
   - Define public APIs per module
   - Hide internal implementation

2. **Dependency Management**
   - Eliminate circular dependencies
   - Use dependency injection
   - Define module contracts
   - Explicit dependencies

3. **Module Structure**
   ```
   modules/
     users/
       index.ts (public API)
       internal/
     orders/
       index.ts
       internal/
   ```

4. **Testing**
   - Module-level tests
   - Integration tests
   - Mock modules for testing

## Files to Organize
- `src/*.ts` → `modules/*/`

## Success Criteria
- [ ] No circular dependencies
- [ ] Clear module boundaries
- [ ] Public APIs defined
- [ ] All tests pass
- [ ] Build still works
