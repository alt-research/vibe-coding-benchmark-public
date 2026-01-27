# Task: Subdomain-Based Tenant Routing

## Objective
Implement subdomain-based tenant routing that maps subdomains to tenant contexts in a Go application.

## Requirements

1. **Subdomain Parsing**
   - Extract tenant slug from subdomain (acme.app.com → acme)
   - Support custom domains (acme.com → acme tenant)
   - Handle apex domain (app.com → public/landing)
   - Validate tenant exists and is active

2. **Custom Domain Mapping**
   - Store custom domain → tenant mappings
   - SSL certificate management hints
   - Domain verification (DNS TXT record)
   - `POST /tenants/{id}/domains` - Add custom domain
   - `DELETE /tenants/{id}/domains/{domain}` - Remove domain

3. **Middleware**
   - Inject tenant context into request
   - 404 for unknown subdomains
   - Redirect inactive tenants to suspended page
   - Cache tenant lookups

4. **URL Generation**
   - Generate tenant-specific URLs
   - Support both subdomain and custom domain
   - Email links point to correct tenant URL

## Technical Stack
- Go 1.21+
- Chi or Gin router
- PostgreSQL
- Redis for caching

## Files to Create
- `internal/middleware/tenant.go` - Tenant middleware
- `internal/services/domain.go` - Domain management
- `internal/services/tenant.go` - Tenant service
- `internal/handlers/domains.go` - Domain endpoints
- `internal/cache/tenant.go` - Tenant cache

## Success Criteria
- [ ] Subdomain correctly maps to tenant
- [ ] Custom domains work with verification
- [ ] Unknown subdomains return 404
- [ ] Tenant context available in handlers
- [ ] Domain lookups are cached
