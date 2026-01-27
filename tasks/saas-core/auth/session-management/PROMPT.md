# Task: Secure Session Management

## Objective
Implement secure server-side session management with Redis backend using Rust and Actix-web.

## Requirements

1. **Session Creation**
   - Generate cryptographically secure session IDs
   - Store session data in Redis with TTL
   - Set HTTP-only, Secure, SameSite cookies
   - Bind session to user agent and IP

2. **Session Storage**
   - Store user ID, roles, preferences in session
   - Encrypt sensitive session data at rest
   - Automatic session extension on activity
   - Maximum session lifetime (24 hours absolute)

3. **Session Security**
   - Regenerate session ID on privilege change
   - Detect session fixation attempts
   - Concurrent session limits per user
   - Session invalidation on password change

4. **Endpoints**
   - `POST /session` - Create session (login)
   - `GET /session` - Get current session info
   - `DELETE /session` - Destroy session (logout)
   - `GET /sessions` - List active sessions for user
   - `DELETE /sessions/{id}` - Revoke specific session

## Technical Stack
- Rust 1.70+
- Actix-web 4.x
- Redis
- PostgreSQL with sqlx

## Files to Create
- `src/main.rs` - Application entry
- `src/session/mod.rs` - Session module
- `src/session/store.rs` - Redis session store
- `src/session/middleware.rs` - Session middleware
- `src/handlers/session.rs` - Session endpoints
- `src/crypto.rs` - Encryption utilities

## Success Criteria
- [ ] Sessions stored securely in Redis
- [ ] Cookie attributes set correctly
- [ ] Session regeneration on login
- [ ] Concurrent session limit enforced
- [ ] Sessions invalidated on password change
