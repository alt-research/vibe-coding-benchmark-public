# Express to Fastify Migration

## Context

You have inherited a REST API built with Express.js. The team has decided to migrate to Fastify for better performance and TypeScript support.

## Requirements

Migrate the Express.js application to Fastify while:

1. **Preserving all API endpoints** - Same routes, methods, and response formats
2. **Maintaining middleware functionality** - Authentication, validation, error handling
3. **Keeping all tests passing** - The existing test suite must work unchanged
4. **No breaking changes** - External API consumers should see no difference

## Current Stack

- Express.js 4.x
- TypeScript
- Zod for validation
- JWT authentication
- PostgreSQL with Prisma

## Target Stack

- Fastify 4.x with @fastify/type-provider-zod
- Same database and validation libraries
- Fastify equivalent plugins for auth/cors/etc

## Files to Modify

- `src/app.ts` - Main application setup
- `src/routes/*.ts` - Route handlers
- `src/middleware/*.ts` - Middleware functions
- `src/plugins/*.ts` - Create Fastify plugins

## Acceptance Criteria

- [ ] All endpoints return identical responses
- [ ] Authentication works the same way
- [ ] Validation errors have same format
- [ ] All existing tests pass
- [ ] No Express dependencies remain in package.json

## Constraints

- Do not modify the test files
- Do not change the database schema or Prisma client
- Do not add new dependencies beyond Fastify ecosystem
