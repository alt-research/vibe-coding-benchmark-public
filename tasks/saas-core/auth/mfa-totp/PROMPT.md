# TOTP Multi-Factor Authentication

Implement time-based one-time password (TOTP) multi-factor authentication for an existing Next.js + Supabase application.

## Requirements

### Setup Flow
1. User navigates to security settings
2. Click "Enable 2FA" button
3. Generate TOTP secret and display QR code
4. User scans with authenticator app (Google Authenticator, Authy)
5. User enters 6-digit code to verify
6. Store encrypted secret in database
7. Show recovery codes (one-time use)

### Login Flow
1. User enters email/password
2. If MFA enabled, redirect to MFA verification page
3. User enters 6-digit TOTP code
4. Validate code against stored secret
5. Allow login on success

### Recovery
1. User can use recovery code if device lost
2. Each recovery code is single-use
3. Admin can reset MFA for users

## Technical Specifications

### Database Schema
```sql
-- Add to users table or create separate table
ALTER TABLE users ADD COLUMN mfa_secret TEXT;
ALTER TABLE users ADD COLUMN mfa_enabled BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN mfa_recovery_codes TEXT[];
```

### API Endpoints
```typescript
POST /api/auth/mfa/setup     // Generate secret + QR code
POST /api/auth/mfa/verify    // Verify code and enable MFA
POST /api/auth/mfa/validate  // Validate during login
POST /api/auth/mfa/disable   // Disable MFA
POST /api/auth/mfa/recovery  // Use recovery code
```

### Libraries
- Use `otplib` for TOTP generation/validation
- Use `qrcode` for QR code generation
- 30-second time window with 1-step tolerance

## UI Components

1. **MFA Setup Modal**
   - QR code display
   - Manual secret entry option
   - Verification input
   - Recovery codes display

2. **MFA Verification Page**
   - 6-digit code input with auto-submit
   - "Use recovery code" link
   - "Remember this device" checkbox (optional)

## Security Requirements

- Encrypt MFA secret at rest
- Rate limit verification attempts (5 per minute)
- Log all MFA events
- Invalidate sessions on MFA disable

## Acceptance Criteria

- [ ] QR code generates correctly
- [ ] TOTP codes validate within time window
- [ ] Recovery codes work once only
- [ ] MFA blocks login when enabled
- [ ] Rate limiting prevents brute force
- [ ] Mobile responsive UI
