---
description: Architecture and design patterns
---

# Architecture

## SOLID Principles
- Single Responsibility: One reason to change
- Open/Closed: Extend, don't modify
- Dependency Inversion: Depend on abstractions

## Layered Architecture
- Separate concerns: UI, business logic, data access
- Dependencies flow inward
- Domain logic independent of frameworks

## API Design
- Consistent naming conventions
- Predictable URL patterns
- Proper HTTP methods and status codes
- Version APIs when breaking changes needed

---

# Testing

## Test Behavior, Not Implementation
- Test what code does, not how it does it
- Avoid testing private methods directly
- Tests should survive refactoring

## Edge Cases
- Empty inputs, null values
- Boundary conditions
- Error paths

## Structure
- Arrange-Act-Assert pattern
- One assertion per test (conceptually)
- Descriptive test names
