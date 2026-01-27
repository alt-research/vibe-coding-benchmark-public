# User Preferences Panel

Build a comprehensive user settings page for a SaaS application.

## Features

### 1. Profile Settings
- Display name
- Avatar upload (with crop)
- Bio/description
- Timezone selection
- Language preference

### 2. Appearance
- Theme toggle (light/dark/system)
- Accent color picker
- Font size preference
- Compact mode toggle

### 3. Notifications
- Email notifications (digest frequency)
- Push notifications toggle
- In-app notifications
- Per-category toggles:
  - Marketing emails
  - Product updates
  - Security alerts
  - Activity summaries

### 4. Privacy
- Profile visibility (public/private)
- Show online status
- Allow mentions
- Data export request

## Technical Requirements

### Database Schema
```sql
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  theme VARCHAR(20) DEFAULT 'system',
  accent_color VARCHAR(7) DEFAULT '#3B82F6',
  font_size VARCHAR(10) DEFAULT 'medium',
  compact_mode BOOLEAN DEFAULT false,
  timezone VARCHAR(50) DEFAULT 'UTC',
  language VARCHAR(10) DEFAULT 'en',
  email_digest VARCHAR(20) DEFAULT 'daily',
  push_enabled BOOLEAN DEFAULT true,
  profile_public BOOLEAN DEFAULT true,
  show_online BOOLEAN DEFAULT true,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### API Endpoints
```typescript
GET  /api/settings          // Get all preferences
PATCH /api/settings         // Update preferences
POST /api/settings/avatar   // Upload avatar
POST /api/settings/export   // Request data export
```

## UI Requirements

1. **Tabbed Navigation** - Profile | Appearance | Notifications | Privacy
2. **Auto-save** - Changes save automatically with debounce
3. **Confirmation** - Critical changes require confirmation
4. **Reset** - Option to reset to defaults per section

## Acceptance Criteria

- [ ] All preference changes persist
- [ ] Theme changes apply immediately
- [ ] Avatar upload with preview
- [ ] Form validation on all fields
- [ ] Mobile responsive layout
- [ ] Accessible (keyboard navigation, ARIA)
