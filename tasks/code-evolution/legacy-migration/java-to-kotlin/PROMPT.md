# Task: Java to Kotlin Migration

## Objective
Migrate Java Spring Boot code to idiomatic Kotlin.

## Given Code
- Java POJOs
- Spring annotations
- Java streams
- Null checks everywhere

## Requirements

1. **Data Classes**
   - Convert to data classes
   - Use val/var properly
   - Named parameters
   - Default values

2. **Null Safety**
   - Leverage Kotlin null safety
   - Remove defensive null checks
   - Use ?. and ?: operators
   - Eliminate NullPointerException risks

3. **Kotlin Idioms**
   - Extension functions
   - Collection operations
   - Scope functions (let, run, with)
   - Destructuring

4. **Spring Kotlin**
   - Kotlin DSL where applicable
   - Coroutines for async
   - Spring Boot Kotlin extensions

## Files to Convert
- `src/main/java/*.java` → `src/main/kotlin/*.kt`

## Success Criteria
- [ ] No Java files remain
- [ ] Idiomatic Kotlin
- [ ] Null safety utilized
- [ ] Tests pass
- [ ] Build succeeds
