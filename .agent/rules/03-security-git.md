---
description: Security and safety conventions
---

# Security

## Input Validation
- Validate all external inputs at boundaries
- Never trust user input
- Sanitize before storage, escape before display
- Use parameterized queries (never string concatenation for SQL)

## Authentication/Authorization
- Validate auth on every request
- Use constant-time comparison for secrets
- Never log secrets, tokens, passwords

## Environment
- Secrets in environment variables, never in code
- Different configs for dev/staging/prod
- Never commit .env files

---

# Git Safety

## Read-Only by Default
- ALLOWED: `git status`, `git diff`, `git log`, `git show`
- FORBIDDEN without explicit instruction: `git commit`, `git push`, `git merge`, `git rebase`

## Why
- Users need full control over version control
- Autonomous commits create unwanted history
- Always let user decide when to commit
