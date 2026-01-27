# Task: Avro Schema Evolution Handler

## Objective
Build a schema evolution system for Avro that handles forward and backward compatibility.

## Requirements

1. **Schema Registry**
   - Store schema versions
   - Validate compatibility before registration
   - Get schema by ID or subject
   - List all versions of a subject

2. **Compatibility Modes**
   - BACKWARD: new schema can read old data
   - FORWARD: old schema can read new data
   - FULL: both directions
   - NONE: no compatibility check

3. **Evolution Operations**
   - Add field with default
   - Remove optional field
   - Rename field (aliases)
   - Change field type (promotions)
   - Validate evolution is compatible

4. **API Endpoints**
   - `POST /schemas` - Register schema
   - `GET /schemas/{id}` - Get schema by ID
   - `GET /subjects/{subject}/versions` - List versions
   - `POST /compatibility` - Check compatibility

## Technical Stack
- Java 17+
- Spring Boot
- Apache Avro
- PostgreSQL for schema storage

## Files to Create
- `src/main/java/services/SchemaRegistryService.java`
- `src/main/java/services/CompatibilityChecker.java`
- `src/main/java/models/SchemaVersion.java`
- `src/main/java/controllers/SchemaController.java`
- `src/main/java/validators/EvolutionValidator.java`

## Success Criteria
- [ ] Schemas registered with version tracking
- [ ] Compatibility validated before registration
- [ ] BACKWARD compatibility correctly checked
- [ ] FORWARD compatibility correctly checked
- [ ] Schema retrieval by ID works
