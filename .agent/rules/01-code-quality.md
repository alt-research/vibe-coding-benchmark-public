---
description: Core coding standards and best practices (2025)
---

# Code Quality

## Self-Documenting Code
- Clear, descriptive naming over comments
- Only comment non-obvious logic, workarounds, edge cases
- No redundant docstrings that restate function names

## Error Handling
- Never silently swallow errors
- Always clean up resources in error paths (try-finally, defer, using)
- Provide context in error messages
- Validate inputs at boundaries

## Null Safety
- Prefer optional chaining and nullish coalescing
- Check for null/undefined before property access
- TypeScript: enable `strictNullChecks`
- Go: always check error returns

## Resource Management
- Close connections, files, streams explicitly
- Use language patterns: `defer`, `try-finally`, `using`, `with`
- Avoid memory leaks from unclosed resources

## Pure Functions
- Prefer pure functions where possible
- Minimize side effects
- Keep functions small and focused
- Single responsibility per function/method
