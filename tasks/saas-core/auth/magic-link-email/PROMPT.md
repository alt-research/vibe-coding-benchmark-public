# Task: Magic Link Email Authentication

## Objective
Implement passwordless authentication using magic links sent via email with Python FastAPI.

## Requirements

1. **Magic Link Generation**
   - Generate cryptographically secure tokens
   - Token expires in 15 minutes
   - One-time use (invalidate after use)
   - Include device/browser fingerprint for security

2. **Email Flow**
   - `POST /auth/magic-link` - Request magic link
   - Send email with link: `https://app.com/auth/verify?token=xxx`
   - Rate limit: max 3 requests per email per hour
   - Queue emails asynchronously

3. **Verification**
   - `GET /auth/verify` - Verify token and create session
   - Check token expiration
   - Check token hasn't been used
   - Create user if first login
   - Issue session cookie or JWT

4. **Security**
   - Store tokens hashed in database
   - Log all authentication attempts
   - Implement IP-based rate limiting
   - Detect suspicious patterns (multiple IPs)

## Technical Stack
- Python 3.11+
- FastAPI
- PostgreSQL with asyncpg
- Redis for rate limiting
- Resend or SendGrid for emails

## Files to Create
- `app/main.py` - FastAPI application
- `app/routers/auth.py` - Auth endpoints
- `app/services/magic_link.py` - Token generation/verification
- `app/services/email.py` - Email sending
- `app/models/auth.py` - SQLAlchemy models
- `app/core/security.py` - Security utilities

## Success Criteria
- [ ] Magic links are sent to valid emails
- [ ] Tokens expire after 15 minutes
- [ ] Tokens can only be used once
- [ ] Rate limiting prevents abuse
- [ ] New users are created on first login
