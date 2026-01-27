---
description: TypeScript and Go language conventions
---

# TypeScript

## Type Safety
- Enable `strict` mode in tsconfig
- Avoid `any` - use `unknown` when type is uncertain
- Prefer type inference, explicit types at boundaries
- Use discriminated unions over type assertions

## Modern Patterns
- Prefer `const` over `let`, never use `var`
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Prefer async/await over raw promises
- Use `satisfies` for type checking while preserving inference

## Vue 3 Patterns
- Prefer `<script setup>` with Composition API
- Use `defineProps` and `defineEmits` with TypeScript
- Prefer `ref` for primitives, `reactive` for objects
- Use `computed` for derived state

---

# Go

## Error Handling
- Always check error returns: `if err != nil`
- Return errors, don't panic for recoverable situations
- Wrap errors with context: `fmt.Errorf("doing x: %w", err)`

## Resource Management
- Use `defer` for cleanup immediately after acquiring resource
- Close files, connections, response bodies

## Naming
- Short variable names for small scopes
- Capitalize exported identifiers
- Receiver names: 1-2 letter abbreviation

## Concurrency
- Prefer channels over shared memory
- Always handle channel closing
- Use context for cancellation
