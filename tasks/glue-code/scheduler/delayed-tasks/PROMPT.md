# Task: Celery Delayed Task Executor

## Objective
Build a delayed task execution system using Celery for scheduling tasks at specific times or after delays.

## Requirements

1. **Task Scheduling**
   - Execute after delay (countdown)
   - Execute at specific time (eta)
   - Recurring tasks (periodic)
   - Cancel scheduled tasks

2. **Task Types**
   - Email reminders
   - Report generation
   - Data cleanup
   - Notification delivery

3. **API Endpoints**
   - `POST /tasks/schedule` - Schedule task
   - `GET /tasks/{id}` - Get task status
   - `DELETE /tasks/{id}` - Cancel task
   - `GET /tasks/pending` - List pending

4. **Features**
   - Task revocation
   - Result storage
   - Task chains/groups
   - Retry on failure

## Technical Stack
- Python 3.11+
- Celery with Redis broker
- FastAPI for API
- Redis for result backend

## Files to Create
- `app/main.py` - FastAPI app
- `app/tasks/email.py` - Email tasks
- `app/tasks/reports.py` - Report tasks
- `app/routers/tasks.py` - API endpoints
- `app/celery_app.py` - Celery config
- `celeryconfig.py` - Celery settings

## Success Criteria
- [ ] Tasks execute after countdown
- [ ] Tasks execute at specific eta
- [ ] Periodic tasks run on schedule
- [ ] Cancelled tasks don't execute
- [ ] Task status queryable
