# Task: Multi-Tenant Organization Isolation

## Objective
Implement database-per-tenant isolation with dynamic connection routing for a multi-tenant SaaS application.

## Requirements

1. **Tenant Database Management**
   - Create new database per organization on signup
   - Run migrations automatically on new tenant DBs
   - Connection pooling per tenant
   - Lazy connection initialization

2. **Request Routing**
   - Extract tenant from JWT or subdomain
   - Route to correct tenant database
   - Middleware to inject tenant context
   - Prevent cross-tenant data access

3. **Tenant Lifecycle**
   - `POST /tenants` - Provision new tenant
   - `DELETE /tenants/{id}` - Deprovision (soft delete + archive)
   - `POST /tenants/{id}/export` - Export all tenant data
   - `POST /tenants/{id}/migrate` - Run pending migrations

4. **Connection Management**
   - Connection pool per tenant
   - Idle connection timeout
   - Max connections per tenant limit
   - Health check per tenant DB

## Technical Stack
- TypeScript/Node.js
- Express or Fastify
- PostgreSQL (one DB per tenant)
- Prisma with dynamic datasource

## Files to Create
- `src/middleware/tenant.ts` - Tenant resolution
- `src/services/tenant-manager.ts` - Tenant provisioning
- `src/db/connection-pool.ts` - Dynamic connections
- `src/db/migrations.ts` - Migration runner
- `src/routes/tenants.ts` - Admin endpoints

## Success Criteria
- [ ] New tenant DB created on signup
- [ ] Requests route to correct tenant DB
- [ ] Cross-tenant access is impossible
- [ ] Connection pools are properly managed
- [ ] Migrations run on all tenant DBs
