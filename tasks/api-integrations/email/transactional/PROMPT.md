# Transactional Email Service

Build an email service that handles transactional emails with templates and delivery tracking.

## Email Types

1. **Welcome Email** - New user registration
2. **Password Reset** - Reset password link
3. **Order Confirmation** - Purchase confirmation
4. **Invoice** - Monthly billing invoice
5. **Alert Notification** - System alerts

## Technical Requirements

### Email Template System
```typescript
interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlBody: string;
  textBody: string;
  variables: string[];
}

interface EmailRequest {
  templateId: string;
  to: string | string[];
  variables: Record<string, string>;
  attachments?: Attachment[];
}
```

### API Endpoints
```typescript
POST /api/emails/send        - Send single email
POST /api/emails/batch       - Send batch emails
GET  /api/emails/:id/status  - Check delivery status
GET  /api/emails/templates   - List templates
POST /api/emails/templates   - Create template
```

### Webhook Handling
```typescript
POST /api/webhooks/email     - Handle delivery events
  - delivered
  - bounced
  - opened
  - clicked
  - spam_reported
```

## Requirements

1. Use Resend, SendGrid, or AWS SES
2. Support HTML and plain text versions
3. Variable substitution in templates
4. Attachment support (max 10MB)
5. Track delivery status via webhooks
6. Queue failed emails for retry
7. Rate limiting (100 emails/minute)

## Template Variables

```handlebars
{{user.name}}
{{user.email}}
{{order.id}}
{{order.total}}
{{reset_link}}
{{unsubscribe_link}}
```

## Acceptance Criteria

- [ ] All 5 email types work
- [ ] Templates render correctly
- [ ] Variables substituted properly
- [ ] Attachments delivered
- [ ] Webhooks update status
- [ ] Failed emails retried
- [ ] Rate limiting enforced
