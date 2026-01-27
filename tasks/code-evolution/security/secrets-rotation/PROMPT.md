# Task: Secrets Rotation System

## Objective
Implement automatic secrets rotation for database credentials and API keys.

## Current State
- Hardcoded credentials
- No rotation capability
- Long-lived secrets
- Manual updates required

## Requirements

1. **Secrets Manager**
   - Integrate with Vault or AWS Secrets Manager
   - Fetch secrets at runtime
   - Cache with TTL
   - Handle rotation events

2. **Database Credentials**
   - Dual-credential rotation
   - Graceful connection switch
   - No downtime during rotation
   - Rollback capability

3. **API Keys**
   - Key versioning
   - Overlap period
   - Automatic deprecation
   - Usage tracking

4. **Implementation**
   - Secrets wrapper
   - Auto-refresh on expiry
   - Health checks
   - Audit logging

## Files to Create
- `internal/secrets/manager.go` - Secrets manager
- `internal/secrets/rotator.go` - Rotation logic
- `internal/secrets/database.go` - DB credential rotation
- `internal/secrets/apikeys.go` - API key rotation

## Success Criteria
- [ ] Secrets fetched from manager
- [ ] Auto-rotation works
- [ ] No downtime during rotation
- [ ] Audit trail exists
- [ ] Rollback tested
