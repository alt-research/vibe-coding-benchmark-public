# Task: Add Dependency Injection

## Objective
Refactor legacy Java code to use Spring dependency injection.

## Given Code
- Static getInstance() singletons
- new keyword everywhere
- Hardcoded dependencies
- Untestable classes

## Requirements

1. **Bean Configuration**
   - Convert singletons to beans
   - Use constructor injection
   - Define configuration classes
   - Component scanning

2. **Dependency Inversion**
   - Extract interfaces
   - Inject abstractions
   - Remove static methods
   - Eliminate new in business logic

3. **Testing**
   - Enable mock injection
   - Unit test isolation
   - Integration test config
   - Test slices

4. **Lifecycle**
   - Proper bean scopes
   - Initialization callbacks
   - Destruction callbacks
   - Lazy initialization

## Files to Modify
- `src/main/java/services/*.java` - Service classes
- `src/main/java/config/*.java` - Configuration

## Success Criteria
- [ ] No static singletons
- [ ] Constructor injection used
- [ ] Interfaces extracted
- [ ] Tests isolated
- [ ] Application starts
