# Task: JWT Authentication with Refresh Token Rotation

## Objective
Implement a secure JWT authentication system in Go with refresh token rotation to prevent token theft.

## Requirements

1. **Access Tokens**
   - Short-lived JWT access tokens (15 minutes)
   - Include user ID, email, and roles in claims
   - Sign with RS256 algorithm

2. **Refresh Tokens**
   - Long-lived refresh tokens (7 days)
   - Store hashed in database with device fingerprint
   - Implement token rotation (new refresh token on each use)
   - Invalidate old token after rotation

3. **Endpoints**
   - `POST /auth/login` - Issue access + refresh tokens
   - `POST /auth/refresh` - Rotate refresh token, issue new access token
   - `POST /auth/logout` - Invalidate refresh token
   - `POST /auth/logout-all` - Invalidate all user sessions

4. **Security**
   - Detect refresh token reuse (potential theft)
   - Invalidate entire token family on reuse detection
   - Rate limit auth endpoints
   - Store refresh tokens with bcrypt hash

## Technical Stack
- Go 1.21+
- Gin or Echo framework
- PostgreSQL
- golang-jwt/jwt/v5

## Files to Create
- `cmd/server/main.go` - Entry point
- `internal/auth/jwt.go` - JWT utilities
- `internal/auth/refresh.go` - Refresh token logic
- `internal/handlers/auth.go` - HTTP handlers
- `internal/middleware/auth.go` - Auth middleware
- `internal/models/token.go` - Token models

## Success Criteria
- [ ] Access tokens expire in 15 minutes
- [ ] Refresh token rotation works correctly
- [ ] Token reuse detection invalidates all tokens
- [ ] Logout invalidates specific session
- [ ] Logout-all invalidates all user sessions
