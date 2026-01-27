# Task: Role-Based Access Control System

## Objective
Implement a comprehensive RBAC system with hierarchical roles and fine-grained permissions using Java Spring Boot.

## Requirements

1. **Role Hierarchy**
   - Support role inheritance (Admin > Manager > User)
   - Roles can have multiple permissions
   - Users can have multiple roles
   - Scope roles to organizations/teams

2. **Permissions**
   - Resource-based permissions (e.g., `posts:read`, `posts:write`)
   - Support wildcards (`posts:*` = all post permissions)
   - Dynamic permission checks at runtime

3. **API Endpoints**
   - `GET /roles` - List all roles
   - `POST /roles` - Create role with permissions
   - `PUT /roles/{id}` - Update role
   - `POST /users/{id}/roles` - Assign role to user
   - `GET /users/{id}/permissions` - Get effective permissions

4. **Middleware**
   - `@RequirePermission("posts:write")` annotation
   - Check permissions before controller execution
   - Return 403 if permission denied

## Technical Stack
- Java 17+
- Spring Boot 3.x
- Spring Security
- PostgreSQL
- JPA/Hibernate

## Files to Create
- `src/main/java/com/app/security/RbacConfig.java`
- `src/main/java/com/app/models/Role.java`
- `src/main/java/com/app/models/Permission.java`
- `src/main/java/com/app/services/RbacService.java`
- `src/main/java/com/app/annotations/RequirePermission.java`
- `src/main/java/com/app/aspects/PermissionAspect.java`

## Success Criteria
- [ ] Role hierarchy works correctly
- [ ] Permission wildcards expand properly
- [ ] Users inherit permissions from all roles
- [ ] @RequirePermission blocks unauthorized access
- [ ] Organization scoping isolates permissions
