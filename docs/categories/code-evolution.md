# Code Evolution Category

Research shows 80% of real engineering work is maintenance/evolution, not greenfield development. The SWE-EVO benchmark demonstrates that agents score only 21% on evolution tasks vs 65% on simple fixes, highlighting a critical gap in current benchmarks.

## Motivation

Most existing benchmarks focus on:
- Bug fixes with clear error messages
- Greenfield implementations with no constraints
- Isolated changes without broader context

Real-world developers primarily:
- Migrate legacy codebases to modern frameworks
- Extend features in existing, complex systems
- Refactor code while maintaining backwards compatibility
- Review PRs and suggest improvements

## Subcategories

### 1. Legacy Migration (`legacy-migration/`)

Tasks involving upgrading dependencies or migrating between frameworks while preserving functionality.

**Examples:**
- jQuery → React migration
- Express → Fastify migration
- Class components → Hooks
- CommonJS → ESM
- Upgrade from deprecated APIs

**Evaluation Criteria:**
- All existing tests pass
- No functional regressions
- Migration completeness (no legacy remnants)
- Code quality improvement

### 2. Feature Extension (`feature-extension/`)

Adding new features to existing codebases, not greenfield. The agent must understand and integrate with existing architecture.

**Examples:**
- Add pagination to existing list endpoint
- Add caching layer to existing service
- Add audit logging to existing operations
- Add rate limiting to existing API

**Evaluation Criteria:**
- Feature works correctly
- Integrates with existing patterns
- Doesn't break existing functionality
- Follows codebase conventions

### 3. Refactor & Preserve (`refactor-preserve/`)

Restructuring code while maintaining all existing tests and behavior. Emphasizes understanding invariants.

**Examples:**
- Extract service from monolith
- Convert sync to async operations
- Improve error handling patterns
- Reduce cyclomatic complexity

**Evaluation Criteria:**
- All tests still pass
- Same API surface (unless explicitly changing)
- Measurable improvement (complexity, coverage, etc.)
- No behavioral changes

### 4. Code Review (`code-review/`)

Given a PR diff, identify issues, suggest fixes, and potentially implement corrections.

**Examples:**
- Security vulnerability detection
- Performance issue identification
- Logic bug detection
- Style/pattern consistency review

**Evaluation Criteria:**
- Issues correctly identified
- False positive rate
- Fix suggestions are correct
- Explanation quality

## Task Structure

Each task in code-evolution provides:

```yaml
name: "Migration/Feature Name"
category: code-evolution
subcategory: legacy-migration | feature-extension | refactor-preserve | code-review
difficulty: easy | medium | hard
baseCode: path/to/existing/codebase
tests:
  existing: tests/  # Must continue to pass
  new: tests/new/   # New tests for added functionality
constraints:
  - "Must not modify public API"
  - "All existing tests must pass"
  - "No new dependencies unless approved"
```

## Scoring

Evolution tasks use weighted scoring:

| Dimension | Weight | Description |
|-----------|--------|-------------|
| Existing Tests | 40% | All pre-existing tests must pass |
| New Functionality | 30% | New feature/migration works correctly |
| Code Quality | 15% | Maintainability, complexity reduction |
| Integration | 15% | Follows existing patterns, conventions |

## Example Task: Express to Fastify Migration

```yaml
name: Express to Fastify Migration
category: code-evolution
subcategory: legacy-migration
difficulty: medium
baseCode: examples/express-api/
stack: nodejs

description: |
  Migrate a REST API from Express.js to Fastify while
  maintaining all existing functionality and API contracts.

constraints:
  - All existing integration tests must pass
  - API endpoints must remain identical
  - Response formats must match exactly
  - Error handling patterns must be preserved

tests:
  existing: tests/integration/
  new: tests/fastify-specific/
```
