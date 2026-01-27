# Task: LLM-Driven API Orchestrator

## Objective
Build a system where LLM orchestrates multiple API calls to complete complex tasks using function calling.

## Requirements

1. **API Registry**
   - Register available APIs
   - Define function schemas
   - Authentication handling
   - Rate limit awareness

2. **Function Definitions**
   ```typescript
   const functions = [
     {
       name: "get_user",
       description: "Get user by ID",
       parameters: { userId: "string" }
     },
     {
       name: "send_email",
       description: "Send email to user",
       parameters: { to: "string", subject: "string", body: "string" }
     },
     // More functions...
   ];
   ```

3. **Orchestration**
   - Accept natural language request
   - LLM determines needed API calls
   - Execute calls in correct order
   - Handle dependencies between calls
   - Aggregate results

4. **API**
   - `POST /execute` - Execute task
   - `GET /functions` - List available functions
   - `POST /functions` - Register new function

## Technical Stack
- TypeScript/Node.js
- OpenAI function calling
- Express or Hono

## Files to Create
- `src/orchestrator/engine.ts` - Main orchestrator
- `src/orchestrator/executor.ts` - Function executor
- `src/registry/functions.ts` - Function registry
- `src/registry/schemas.ts` - JSON schemas
- `src/routes/execute.ts` - API endpoints

## Success Criteria
- [ ] LLM selects correct functions
- [ ] Functions called in right order
- [ ] Dependencies handled
- [ ] Results aggregated correctly
- [ ] Errors handled gracefully
