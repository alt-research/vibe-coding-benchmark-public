# Task: XSS Prevention

## Objective
Add comprehensive XSS protection to a TypeScript web application.

## Vulnerable Areas
- User-generated content display
- URL parameters in pages
- Dynamic HTML generation
- JSON responses with HTML

## Requirements

1. **Output Encoding**
   - HTML entity encoding
   - JavaScript string encoding
   - URL encoding
   - CSS encoding

2. **Input Sanitization**
   - Sanitize HTML input (DOMPurify)
   - Validate expected formats
   - Strip dangerous tags
   - Whitelist allowed HTML

3. **Security Headers**
   - Content-Security-Policy
   - X-XSS-Protection
   - X-Content-Type-Options

4. **Framework Protection**
   - Use framework escaping
   - Safe template rendering
   - JSON response encoding

## Files to Modify
- `src/middleware/security.ts` - Security headers
- `src/utils/sanitize.ts` - Sanitization
- `src/templates/*.ts` - Safe rendering
- `tests/xss.test.ts` - XSS tests

## Success Criteria
- [ ] All output encoded
- [ ] User input sanitized
- [ ] CSP header set
- [ ] XSS tests pass
- [ ] Security scanner clean
