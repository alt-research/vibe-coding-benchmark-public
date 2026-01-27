# Task: GitHub OAuth Integration

## Objective
Implement GitHub OAuth2 authentication flow with user data fetching.

## Requirements

1. **OAuth Flow**
   - Authorization URL generation
   - State parameter for CSRF
   - Code exchange for token
   - Token storage

2. **User Data**
   - Fetch user profile
   - Get user email (primary)
   - Fetch organizations
   - Check team membership

3. **Endpoints**
   - `GET /auth/github` - Start OAuth
   - `GET /auth/github/callback` - Handle callback
   - `GET /auth/github/user` - Get user info

4. **Token Management**
   - Store encrypted tokens
   - Token refresh
   - Revoke on logout
   - Scope validation

## Files to Create
- `internal/oauth/github.go` - GitHub OAuth
- `internal/oauth/token.go` - Token management
- `internal/handlers/auth.go` - Auth handlers
- `internal/models/user.go` - User model

## Success Criteria
- [ ] OAuth flow completes
- [ ] User data fetched
- [ ] Email retrieved
- [ ] State validated
- [ ] Tokens stored securely
