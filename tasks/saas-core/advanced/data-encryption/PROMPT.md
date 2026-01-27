# Field-Level Encryption

Implement field-level encryption for sensitive data at rest.

## Requirements
1. AES-256-GCM encryption for fields
2. Envelope encryption with DEK/KEK
3. Automatic key rotation without downtime
4. Searchable encryption (order-preserving or deterministic)
5. HSM integration for key storage
6. Per-tenant encryption keys
7. Audit logging for key access
8. Secure key derivation (HKDF)
9. Emergency key recovery procedures
10. Performance: < 1ms encryption overhead
