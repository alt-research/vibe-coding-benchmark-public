# Tasks: Initialize VibeCodingBench

## 1. Project Foundation

### Task 1.1: Monorepo Setup

**Files:**
- Create: `package.json` (workspace root)
- Create: `turbo.json` (build orchestration)
- Create: `tsconfig.base.json`
- Create: `.github/workflows/ci.yaml`

**Steps:**
- [x] 1.1.1 Initialize npm workspace with packages/* and tasks/*
- [x] 1.1.2 Configure Turborepo for parallel builds
- [x] 1.1.3 Add base TypeScript config with strict mode
- [x] 1.1.4 Create CI workflow (lint, test, build)
- [x] 1.1.5 Commit

### Task 1.2: CLI Package Scaffold

**Files:**
- Create: `packages/cli/package.json`
- Create: `packages/cli/src/index.ts`
- Create: `packages/cli/src/commands/run.ts`
- Create: `packages/cli/src/commands/list.ts`
- Test: `packages/cli/tests/cli.test.ts`

**Steps:**
- [x] 1.2.1 Write test for `vibecodingbench list` command
- [x] 1.2.2 Run test, verify failure
- [x] 1.2.3 Implement CLI with Commander.js
- [x] 1.2.4 Run test, verify pass
- [x] 1.2.5 Commit

### Task 1.3: Evaluator Package Scaffold

**Files:**
- Create: `packages/evaluator/package.json`
- Create: `packages/evaluator/src/index.ts`
- Create: `packages/evaluator/src/runners/functional.ts`
- Create: `packages/evaluator/src/runners/security.ts`
- Create: `packages/evaluator/src/runners/quality.ts`
- Test: `packages/evaluator/tests/scoring.test.ts`

**Steps:**
- [x] 1.3.1 Write test for score aggregation
- [x] 1.3.2 Run test, verify failure
- [x] 1.3.3 Implement scoring engine
- [x] 1.3.4 Run test, verify pass
- [x] 1.3.5 Commit

---

## 2. Task Definition System

### Task 2.1: Task Schema

**Files:**
- Create: `packages/cli/src/schema/task.schema.json`
- Create: `packages/cli/src/loader.ts`
- Test: `packages/cli/tests/loader.test.ts`

**Steps:**
- [x] 2.1.1 Write test for task.yaml parsing
- [x] 2.1.2 Run test, verify failure
- [x] 2.1.3 Define JSON Schema for task.yaml
- [x] 2.1.4 Implement loader with validation
- [x] 2.1.5 Run test, verify pass
- [x] 2.1.6 Commit

### Task 2.2: Docker Execution Runtime

**Files:**
- Create: `packages/cli/src/runtime/docker.ts`
- Create: `packages/cli/src/runtime/types.ts`
- Create: `docker/base/Dockerfile.node`
- Create: `docker/base/Dockerfile.python`
- Test: `packages/cli/tests/runtime.test.ts`

**Steps:**
- [x] 2.2.1 Write test for container lifecycle
- [x] 2.2.2 Run test, verify failure
- [x] 2.2.3 Implement Docker runtime with dockerode
- [x] 2.2.4 Build base images
- [x] 2.2.5 Run test, verify pass
- [x] 2.2.6 Commit

### Task 2.3: Agent Interface

**Files:**
- Create: `packages/cli/src/agent/stdio.ts`
- Create: `packages/cli/src/agent/http.ts`
- Create: `packages/cli/src/agent/types.ts`
- Test: `packages/cli/tests/agent.test.ts`

**Steps:**
- [x] 2.3.1 Write test for stdio agent communication
- [x] 2.3.2 Run test, verify failure
- [x] 2.3.3 Implement stdio adapter
- [x] 2.3.4 Implement HTTP adapter
- [x] 2.3.5 Run test, verify pass
- [x] 2.3.6 Commit

---

## 3. Evaluation Pipeline

### Task 3.1: Functional Test Runner

**Files:**
- Create: `packages/evaluator/src/runners/functional.ts`
- Test: `packages/evaluator/tests/functional.test.ts`

**Steps:**
- [x] 3.1.1 Write test for test discovery and execution
- [x] 3.1.2 Run test, verify failure
- [x] 3.1.3 Implement Jest/Pytest/Go test runner detection
- [x] 3.1.4 Run test, verify pass
- [x] 3.1.5 Commit

### Task 3.2: Security Scanner

**Files:**
- Create: `packages/evaluator/src/runners/security.ts`
- Create: `packages/evaluator/src/rules/owasp.yaml`
- Test: `packages/evaluator/tests/security.test.ts`

**Steps:**
- [x] 3.2.1 Write test for vulnerability detection
- [x] 3.2.2 Run test, verify failure
- [x] 3.2.3 Integrate Semgrep with OWASP rules
- [x] 3.2.4 Run test, verify pass
- [x] 3.2.5 Commit

### Task 3.3: Code Quality Analyzer

**Files:**
- Create: `packages/evaluator/src/runners/quality.ts`
- Test: `packages/evaluator/tests/quality.test.ts`

**Steps:**
- [x] 3.3.1 Write test for quality metrics
- [x] 3.3.2 Run test, verify failure
- [x] 3.3.3 Integrate ESLint, Ruff, golangci-lint
- [x] 3.3.4 Add complexity metrics (cyclomatic, cognitive)
- [x] 3.3.5 Run test, verify pass
- [x] 3.3.6 Commit

### Task 3.4: Visual Diff (Frontend)

**Files:**
- Create: `packages/evaluator/src/runners/visual.ts`
- Test: `packages/evaluator/tests/visual.test.ts`

**Steps:**
- [x] 3.4.1 Write test for screenshot comparison
- [x] 3.4.2 Run test, verify failure
- [x] 3.4.3 Implement Playwright screenshot capture
- [x] 3.4.4 Integrate pixelmatch for diff scoring
- [x] 3.4.5 Run test, verify pass
- [x] 3.4.6 Commit

---

## 4. Starter Templates

### Task 4.1: Next.js + Supabase Template

**Files:**
- Create: `templates/nextjs-supabase/package.json`
- Create: `templates/nextjs-supabase/docker-compose.yaml`
- Create: `templates/nextjs-supabase/src/app/page.tsx`

**Steps:**
- [x] 4.1.1 Scaffold Next.js 14 with App Router
- [x] 4.1.2 Configure Supabase local dev
- [x] 4.1.3 Add docker-compose with Supabase services
- [ ] 4.1.4 Verify template builds and runs
- [ ] 4.1.5 Commit

### Task 4.2: FastAPI + Postgres Template

**Files:**
- Create: `templates/fastapi-postgres/pyproject.toml`
- Create: `templates/fastapi-postgres/docker-compose.yaml`
- Create: `templates/fastapi-postgres/src/main.py`

**Steps:**
- [x] 4.2.1 Scaffold FastAPI with SQLAlchemy
- [x] 4.2.2 Configure Postgres + Alembic migrations
- [x] 4.2.3 Add docker-compose
- [ ] 4.2.4 Verify template runs
- [ ] 4.2.5 Commit

### Task 4.3: Go Fiber Template

**Files:**
- Create: `templates/go-fiber/go.mod`
- Create: `templates/go-fiber/docker-compose.yaml`
- Create: `templates/go-fiber/main.go`

**Steps:**
- [x] 4.3.1 Scaffold Fiber with GORM
- [x] 4.3.2 Configure Postgres connection
- [x] 4.3.3 Add docker-compose
- [ ] 4.3.4 Verify template runs
- [ ] 4.3.5 Commit

### Task 4.4: Rust Axum Template

**Files:**
- Create: `templates/rust-axum/Cargo.toml`
- Create: `templates/rust-axum/docker-compose.yaml`
- Create: `templates/rust-axum/src/main.rs`

**Steps:**
- [x] 4.4.1 Scaffold Axum with SQLx
- [x] 4.4.2 Configure Postgres migrations
- [x] 4.4.3 Add docker-compose
- [ ] 4.4.4 Verify template builds and runs
- [ ] 4.4.5 Commit

---

## 5. Code Evolution Category (Addressing SWE-bench Gap)

Based on research: 80% of real engineering is maintenance/evolution, not greenfield. SWE-EVO shows agents score 21% on evolution tasks vs 65% on simple fixes.

### Task 5.0: Add Category - Code Evolution

**Files:**
- Create: `tasks/code-evolution/` directory structure
- Create: `docs/categories/code-evolution.md`

**Subcategories:**
- `legacy-migration/` - Upgrade deps, migrate frameworks (jQuery→React, Express→Fastify)
- `feature-extension/` - Add feature to existing codebase (not greenfield)
- `refactor-preserve/` - Refactor while maintaining all tests passing
- `code-review/` - Review PR, identify issues, suggest fixes

**Steps:**
- [x] 5.0.1 Create directory structure
- [x] 5.0.2 Document category evaluation criteria
- [ ] 5.0.3 Commit

---

## 6. Sample Tasks (One per Category)

### Task 5.1: SaaS - Supabase OAuth

**Files:**
- Create: `tasks/saas-core/auth/supabase-oauth/task.yaml`
- Create: `tasks/saas-core/auth/supabase-oauth/PROMPT.md`
- Create: `tasks/saas-core/auth/supabase-oauth/tests/functional/auth.test.ts`
- Create: `tasks/saas-core/auth/supabase-oauth/docker-compose.yaml`

**Steps:**
- [x] 5.1.1 Define task.yaml with metadata
- [x] 5.1.2 Write prompt for Google OAuth setup
- [x] 5.1.3 Create Playwright functional tests
- [x] 5.1.4 Test with golden implementation
- [x] 5.1.5 Commit

### Task 5.2: Glue Code - Excel to JSON

**Files:**
- Create: `tasks/glue-code/data-transform/excel-to-json/task.yaml`
- Create: `tasks/glue-code/data-transform/excel-to-json/PROMPT.md`
- Create: `tasks/glue-code/data-transform/excel-to-json/tests/functional/transform.test.py`
- Create: `tasks/glue-code/data-transform/excel-to-json/fixtures/dirty.xlsx`

**Steps:**
- [x] 5.2.1 Define task.yaml
- [x] 5.2.2 Write prompt for Excel cleaning
- [x] 5.2.3 Create test with dirty fixture
- [x] 5.2.4 Test with golden implementation
- [x] 5.2.5 Commit

### Task 5.3: AI Integration - RAG Chatbot

**Files:**
- Create: `tasks/ai-integration/rag-chatbot/pdf-qa/task.yaml`
- Create: `tasks/ai-integration/rag-chatbot/pdf-qa/PROMPT.md`
- Create: `tasks/ai-integration/rag-chatbot/pdf-qa/tests/functional/qa.test.ts`
- Create: `tasks/ai-integration/rag-chatbot/pdf-qa/fixtures/handbook.pdf`

**Steps:**
- [x] 5.3.1 Define task.yaml
- [x] 5.3.2 Write prompt for PDF Q&A bot
- [x] 5.3.3 Create grounded answer tests
- [ ] 5.3.4 Test with golden implementation
- [ ] 5.3.5 Commit

### Task 5.4: Frontend - Pricing Card

**Files:**
- Create: `tasks/frontend/figma-to-code/pricing-card/task.yaml`
- Create: `tasks/frontend/figma-to-code/pricing-card/PROMPT.md`
- Create: `tasks/frontend/figma-to-code/pricing-card/reference.png`
- Create: `tasks/frontend/figma-to-code/pricing-card/tests/visual/diff.test.ts`

**Steps:**
- [x] 5.4.1 Define task.yaml
- [x] 5.4.2 Write prompt with design specs
- [x] 5.4.3 Create visual diff tests
- [ ] 5.4.4 Test with golden implementation
- [ ] 5.4.5 Commit

### Task 5.5: API Integration - Stripe Webhook

**Files:**
- Create: `tasks/api-integrations/stripe/payment-webhook/task.yaml`
- Create: `tasks/api-integrations/stripe/payment-webhook/PROMPT.md`
- Create: `tasks/api-integrations/stripe/payment-webhook/tests/functional/webhook.test.ts`
- Create: `tasks/api-integrations/stripe/payment-webhook/docker-compose.yaml`

**Steps:**
- [x] 5.5.1 Define task.yaml
- [x] 5.5.2 Write prompt for webhook handler
- [x] 5.5.3 Create tests with Stripe mock
- [x] 5.5.4 Test with golden implementation
- [x] 5.5.5 Commit

---

## 6. Leaderboard Service

### Task 6.1: API Backend

**Files:**
- Create: `packages/leaderboard/package.json`
- Create: `packages/leaderboard/src/index.ts`
- Create: `packages/leaderboard/src/routes/submissions.ts`
- Create: `packages/leaderboard/src/routes/leaderboard.ts`
- Test: `packages/leaderboard/tests/api.test.ts`

**Steps:**
- [x] 6.1.1 Write API tests
- [x] 6.1.2 Run test, verify failure
- [x] 6.1.3 Implement Hono API with Postgres
- [x] 6.1.4 Run test, verify pass
- [ ] 6.1.5 Commit

### Task 6.2: Frontend Dashboard

**Files:**
- Create: `packages/leaderboard/src/app/page.tsx`
- Create: `packages/leaderboard/src/app/submit/page.tsx`
- Create: `packages/leaderboard/src/components/LeaderboardTable.tsx`

**Steps:**
- [ ] 6.2.1 Scaffold Next.js frontend
- [x] 6.2.2 Build leaderboard table component
- [ ] 6.2.3 Build submission form
- [ ] 6.2.4 Verify E2E flow
- [ ] 6.2.5 Commit

---

## 7. Live Evaluation Dashboard

### Task 7.0: Real-time Status UI

**Files:**
- Create: `packages/leaderboard/src/app/live/page.tsx`
- Create: `packages/leaderboard/src/components/LiveRunCard.tsx`
- Create: `packages/leaderboard/src/components/TerminalStream.tsx`
- Create: `packages/leaderboard/src/components/BrowserPreview.tsx`
- Create: `packages/leaderboard/src/lib/websocket.ts`

**Steps:**
- [x] 7.0.1 Implement WebSocket server for run status streaming
- [x] 7.0.2 Build LiveRunCard component (agent name, task, progress, metrics)
- [x] 7.0.3 Build TerminalStream component (asciinema-player integration)
- [ ] 7.0.4 Build BrowserPreview component (noVNC for browser tasks)
- [ ] 7.0.5 Add side-by-side comparison view (2+ agents same task)
- [ ] 7.0.6 Add historical replay with scrubbing
- [ ] 7.0.7 Commit

### Task 7.1: Agent Status API

**Files:**
- Create: `packages/cli/src/reporter.ts`
- Create: `packages/leaderboard/src/routes/live.ts`
- Modify: `packages/cli/src/commands/run.ts`

**Steps:**
- [x] 7.1.1 Add --live flag to CLI run command
- [x] 7.1.2 Implement progress reporter (sends metrics every 5s)
- [x] 7.1.3 Create WebSocket endpoint for live subscriptions
- [x] 7.1.4 Stream: tokens used, files read/written, test status, time elapsed
- [ ] 7.1.5 Commit

---

## 8. Documentation

### Task 8.1: README and Contribution Guide

**Files:**
- Create: `README.md`
- Create: `CONTRIBUTING.md`
- Create: `docs/adding-tasks.md`
- Create: `docs/running-evaluations.md`

**Steps:**
- [x] 8.1.1 Write README with quick start
- [x] 8.1.2 Write contribution guidelines
- [x] 8.1.3 Document task authoring workflow
- [x] 8.1.4 Document evaluation workflow
- [x] 8.1.5 Commit
