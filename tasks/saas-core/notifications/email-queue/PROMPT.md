# Task: Async Email Notification Queue

## Objective
Build an asynchronous email notification system using Celery that handles templated emails with retry logic and delivery tracking.

## Requirements

1. **Email Templates**
   - Welcome email
   - Password reset
   - Invoice notification
   - Weekly digest
   - Store templates in database or filesystem

2. **Queue Processing**
   - Async task execution with Celery
   - Priority queues (transactional > marketing)
   - Retry with exponential backoff
   - Dead letter queue for failed emails

3. **Delivery Tracking**
   - Log all email sends
   - Track delivery status via webhooks
   - Handle bounces and complaints
   - Unsubscribe management

4. **API Endpoints**
   - `POST /notifications/email` - Queue email
   - `GET /notifications/email/{id}` - Get delivery status
   - `POST /notifications/email/batch` - Queue batch emails
   - `GET /notifications/logs` - Email logs

## Technical Stack
- Python 3.11+
- FastAPI
- Celery with Redis broker
- Resend or SendGrid
- PostgreSQL

## Files to Create
- `app/tasks/email.py` - Celery email tasks
- `app/services/email_sender.py` - Email sending logic
- `app/services/template_renderer.py` - Template rendering
- `app/routers/notifications.py` - API endpoints
- `app/models/email_log.py` - Email log model
- `app/templates/emails/` - Email templates

## Success Criteria
- [ ] Emails queued and sent asynchronously
- [ ] Failed emails retry with backoff
- [ ] Delivery status tracked
- [ ] Batch sending works efficiently
- [ ] Unsubscribe links work
