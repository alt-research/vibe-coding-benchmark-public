# Task: Distributed Cron Job Manager

## Objective
Build a distributed cron scheduling system that runs jobs across multiple workers with leader election.

## Requirements

1. **Job Definition**
   - Cron expression parsing
   - HTTP webhook jobs
   - Function jobs (local execution)
   - Job timeout configuration

2. **Distributed Execution**
   - Leader election for scheduler
   - Worker pool for job execution
   - Prevent duplicate execution
   - Handle worker failures

3. **Job Management**
   - `POST /jobs` - Create job
   - `GET /jobs` - List jobs
   - `PUT /jobs/{id}` - Update job
   - `DELETE /jobs/{id}` - Delete job
   - `POST /jobs/{id}/run` - Trigger manually

4. **Monitoring**
   - Job execution history
   - Success/failure rates
   - Execution duration
   - Next run time

## Technical Stack
- Go 1.21+
- Redis for locking/leader election
- PostgreSQL for job storage
- robfig/cron for parsing

## Files to Create
- `cmd/scheduler/main.go` - Scheduler process
- `cmd/worker/main.go` - Worker process
- `internal/scheduler/leader.go` - Leader election
- `internal/scheduler/cron.go` - Cron parsing
- `internal/worker/executor.go` - Job execution
- `internal/handlers/jobs.go` - API handlers

## Success Criteria
- [ ] Cron expressions parsed correctly
- [ ] Only leader schedules jobs
- [ ] Jobs execute exactly once
- [ ] Failed jobs tracked
- [ ] Manual trigger works
