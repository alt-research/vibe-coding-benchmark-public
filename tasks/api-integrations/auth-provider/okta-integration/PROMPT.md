# Task: Okta User Management

## Objective
Integrate Okta for centralized user management and provisioning.

## Requirements

1. **User Operations**
   - Create users
   - Update user profile
   - Deactivate/reactivate
   - Delete users

2. **Group Management**
   - List groups
   - Add user to group
   - Remove from group
   - Sync with local roles

3. **Sync**
   - Webhook for user changes
   - Bulk import users
   - Periodic sync
   - Handle conflicts

4. **API**
   - `GET /okta/users` - List users
   - `POST /okta/users` - Create user
   - `PUT /okta/users/{id}` - Update user
   - `POST /okta/sync` - Trigger sync

## Files to Create
- `src/services/okta/client.ts` - Okta API client
- `src/services/okta/users.ts` - User operations
- `src/services/okta/groups.ts` - Group operations
- `src/routes/okta.ts` - API endpoints
- `src/webhooks/okta.ts` - Webhook handlers

## Success Criteria
- [ ] Users created in Okta
- [ ] Group membership works
- [ ] Webhooks processed
- [ ] Local data synced
- [ ] Conflicts handled
