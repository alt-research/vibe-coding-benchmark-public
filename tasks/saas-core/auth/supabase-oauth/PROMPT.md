# Task: Implement Google OAuth with Supabase

## Objective
Add Google OAuth authentication to an existing Next.js application using Supabase Auth.

## Requirements

1. **Sign In Button**
   - Add a "Sign in with Google" button on the `/login` page
   - Button should be styled with Google's brand guidelines
   - Show loading state while authentication is in progress

2. **OAuth Flow**
   - Configure Supabase Auth for Google OAuth
   - Handle the OAuth callback at `/auth/callback`
   - Redirect to `/dashboard` on successful authentication
   - Show error message on authentication failure

3. **Session Management**
   - Store session in Supabase
   - Create middleware to protect `/dashboard` route
   - Redirect unauthenticated users to `/login`

4. **User Profile**
   - Display user's email and profile picture on dashboard
   - Add a "Sign Out" button that clears the session

## Technical Constraints
- Use `@supabase/ssr` for server-side auth
- Use Next.js App Router (not Pages Router)
- Do not hardcode any credentials

## Files to Modify/Create
- `src/app/login/page.tsx` - Login page with Google button
- `src/app/auth/callback/route.ts` - OAuth callback handler
- `src/app/dashboard/page.tsx` - Protected dashboard
- `src/middleware.ts` - Route protection
- `src/lib/supabase/server.ts` - Server-side Supabase client
- `src/lib/supabase/client.ts` - Client-side Supabase client

## Success Criteria
- [ ] User can click "Sign in with Google" and complete OAuth flow
- [ ] Session persists across page refreshes
- [ ] Unauthenticated users are redirected from /dashboard to /login
- [ ] User can sign out and session is cleared
