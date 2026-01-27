# VibeCodingBench Task Expansion Plan

## Overview
Expanding from 18 tasks to 120 tasks (20 per category) with multi-language support.

## Language Distribution
Based on GitHub Octoverse 2025 and Stack Overflow 2025:
- **TypeScript/JavaScript**: 40% (most used on GitHub)
- **Python**: 25% (dominant in AI/data)
- **Go**: 15% (cloud-native, microservices)
- **Java/Kotlin**: 10% (enterprise)
- **Rust**: 5% (systems, performance)
- **C#**: 5% (enterprise, game dev)

---

## Category 1: saas-core (20 tasks)

### Existing (6):
1. auth/supabase-oauth (TypeScript)
2. auth/mfa-totp (TypeScript)
3. crud/dashboard-table (TypeScript)
4. settings/user-preferences (TypeScript)
5. realtime/websocket-chat (TypeScript)
6. security/rate-limiter (TypeScript)

### New (14):
7. auth/jwt-refresh-tokens (Go) - Implement JWT with refresh token rotation
8. auth/magic-link-email (Python/FastAPI) - Passwordless email authentication
9. auth/rbac-permissions (Java/Spring) - Role-based access control system
10. auth/session-management (Rust/Actix) - Secure session handling with Redis
11. billing/stripe-subscriptions (TypeScript) - Subscription management with Stripe
12. billing/usage-metering (Go) - Track and bill based on API usage
13. billing/invoice-generation (Python) - Generate PDF invoices with line items
14. multi-tenant/org-isolation (TypeScript) - Database-per-tenant isolation
15. multi-tenant/subdomain-routing (Go) - Route requests by subdomain
16. notifications/email-queue (Python) - Async email notification system
17. notifications/push-notifications (TypeScript) - Web push with service workers
18. notifications/in-app-alerts (Java/Spring) - Real-time in-app notifications
19. audit/activity-logging (Go) - Comprehensive audit trail system
20. search/full-text-search (TypeScript) - Elasticsearch integration for search

---

## Category 2: glue-code (20 tasks)

### Existing (3):
1. data-transform/excel-to-json (Python)
2. api-sync/rest-to-graphql (TypeScript)
3. caching/redis-cache (TypeScript)

### New (17):
4. data-transform/csv-normalizer (Python) - Clean and normalize CSV data
5. data-transform/json-to-xml (Go) - Bidirectional JSON/XML conversion
6. data-transform/protobuf-converter (Rust) - Protocol buffer serialization
7. data-transform/avro-schema-evolution (Java) - Handle Avro schema changes
8. etl/database-sync (Python) - Sync data between PostgreSQL and MongoDB
9. etl/s3-to-warehouse (Go) - Load S3 files into data warehouse
10. etl/cdc-pipeline (TypeScript) - Change data capture with Debezium
11. queue/rabbitmq-consumer (Python) - Reliable message queue processing
12. queue/kafka-producer (Go) - High-throughput Kafka event publishing
13. queue/sqs-batch-processor (TypeScript) - AWS SQS batch processing
14. scheduler/cron-job-manager (Go) - Distributed cron job scheduling
15. scheduler/delayed-tasks (Python) - Celery-based delayed task execution
16. file-processing/image-resizer (Rust) - High-performance image processing
17. file-processing/pdf-merger (Python) - Merge and manipulate PDFs
18. file-processing/video-transcoder (Go) - FFmpeg-based video processing
19. migration/database-versioning (TypeScript) - Schema migration system
20. migration/data-backfill (Python) - Backfill data with progress tracking

---

## Category 3: ai-integration (20 tasks)

### Existing (2):
1. structured-output/invoice-parser (Python)
2. rag-chatbot/pdf-qa (Python)

### New (18):
3. structured-output/resume-parser (Python) - Extract structured data from resumes
4. structured-output/receipt-scanner (TypeScript) - OCR + LLM receipt extraction
5. structured-output/contract-analyzer (Python) - Legal document analysis
6. rag-chatbot/code-assistant (TypeScript) - Codebase Q&A with RAG
7. rag-chatbot/support-bot (Python) - Customer support with knowledge base
8. rag-chatbot/doc-search (Go) - Multi-document semantic search
9. agents/web-scraper-agent (Python) - Autonomous web data extraction
10. agents/research-agent (TypeScript) - Multi-step research automation
11. agents/code-review-agent (Python) - Automated PR review with LLM
12. function-calling/api-orchestrator (TypeScript) - LLM-driven API calls
13. function-calling/database-query (Python) - Natural language to SQL
14. function-calling/calendar-assistant (TypeScript) - Schedule management agent
15. embeddings/semantic-search (Python) - Vector similarity search
16. embeddings/recommendation-engine (Go) - Content recommendations
17. embeddings/duplicate-detection (Python) - Find similar documents
18. fine-tuning/classification-model (Python) - Fine-tune for text classification
19. multimodal/image-captioning (Python) - Generate image descriptions
20. multimodal/chart-interpreter (TypeScript) - Extract data from chart images

---

## Category 4: frontend (20 tasks)

### Existing (3):
1. figma-to-code/pricing-card (TypeScript)
2. visualization/chart-dashboard (TypeScript)
3. components/form-builder (TypeScript)

### New (17):
4. figma-to-code/landing-page (TypeScript/React) - Full landing page from design
5. figma-to-code/dashboard-layout (TypeScript/Vue) - Admin dashboard UI
6. figma-to-code/mobile-app-screen (TypeScript/React Native) - Mobile UI
7. components/data-grid (TypeScript/React) - Advanced data grid with virtual scroll
8. components/rich-text-editor (TypeScript/Vue) - WYSIWYG editor with plugins
9. components/file-uploader (TypeScript/React) - Drag-drop with preview
10. components/date-range-picker (TypeScript/Svelte) - Complex date selection
11. visualization/realtime-charts (TypeScript/React) - Live updating charts
12. visualization/map-dashboard (TypeScript/Vue) - Geographic data viz
13. visualization/gantt-chart (TypeScript/React) - Project timeline view
14. state-management/shopping-cart (TypeScript/React) - Complex cart with Redux
15. state-management/collaborative-editor (TypeScript/Vue) - Real-time collab
16. accessibility/screen-reader-nav (TypeScript/React) - WCAG compliant nav
17. accessibility/keyboard-shortcuts (TypeScript/Vue) - Full keyboard support
18. performance/infinite-scroll (TypeScript/React) - Virtualized infinite list
19. performance/image-lazy-load (TypeScript/Svelte) - Optimized image loading
20. animation/page-transitions (TypeScript/React) - Smooth route animations

---

## Category 5: api-integrations (20 tasks)

### Existing (2):
1. stripe/payment-webhook (TypeScript)
2. email/transactional (TypeScript)

### New (18):
3. stripe/checkout-session (Go) - Create Stripe checkout flows
4. stripe/subscription-portal (TypeScript) - Customer billing portal
5. payment/paypal-integration (Python) - PayPal payments and refunds
6. payment/crypto-payments (TypeScript) - Accept cryptocurrency
7. storage/s3-presigned-urls (Go) - Secure file uploads to S3
8. storage/cloudinary-upload (TypeScript) - Image upload and transform
9. storage/gcs-streaming (Python) - Stream large files to GCS
10. auth-provider/oauth2-github (Go) - GitHub OAuth integration
11. auth-provider/saml-sso (Java/Spring) - Enterprise SAML SSO
12. auth-provider/okta-integration (TypeScript) - Okta user management
13. communication/twilio-sms (Python) - SMS notifications
14. communication/slack-bot (TypeScript) - Slack app with slash commands
15. communication/discord-webhook (Go) - Discord notifications
16. maps/google-maps-geocoding (TypeScript) - Address to coordinates
17. maps/mapbox-directions (Python) - Route calculation
18. analytics/segment-tracking (TypeScript) - Event tracking pipeline
19. analytics/mixpanel-events (Go) - User behavior analytics
20. social/twitter-api (Python) - Tweet posting and monitoring

---

## Category 6: code-evolution (20 tasks)

### Existing (2):
1. legacy-migration/express-to-fastify (TypeScript)
2. refactoring/class-to-hooks (TypeScript)

### New (18):
3. legacy-migration/callback-to-async (TypeScript) - Callback hell to async/await
4. legacy-migration/jquery-to-react (TypeScript) - jQuery app to React
5. legacy-migration/flask-to-fastapi (Python) - Flask to FastAPI migration
6. legacy-migration/java-to-kotlin (Kotlin) - Java codebase to Kotlin
7. legacy-migration/rest-to-grpc (Go) - REST API to gRPC
8. refactoring/monolith-to-modules (TypeScript) - Extract modules from monolith
9. refactoring/orm-migration (Python) - SQLAlchemy to async SQLModel
10. refactoring/dependency-injection (Java/Spring) - Add DI to legacy code
11. refactoring/error-handling (Go) - Standardize error handling
12. testing/add-unit-tests (TypeScript) - Add tests to untested code
13. testing/e2e-playwright (TypeScript) - Add E2E tests with Playwright
14. testing/pytest-fixtures (Python) - Refactor tests with fixtures
15. performance/query-optimization (Python) - Optimize slow DB queries
16. performance/memory-leak-fix (TypeScript) - Fix memory leaks in Node.js
17. performance/async-refactor (Python) - Sync to async for I/O bound
18. security/sql-injection-fix (Python) - Fix SQL injection vulnerabilities
19. security/xss-prevention (TypeScript) - Add XSS protection
20. security/secrets-rotation (Go) - Implement secrets rotation

---

## Implementation Priority

### Phase 1 (High Priority - Common Tasks)
- All auth tasks
- All billing tasks
- All payment integrations
- RAG and agent tasks

### Phase 2 (Medium Priority - Enterprise)
- Multi-tenant tasks
- SAML/SSO integrations
- Audit logging
- Migration tasks

### Phase 3 (Lower Priority - Specialized)
- Multimodal AI tasks
- Advanced visualizations
- Performance optimization tasks

---

## Sources
- [GitHub Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)
- [Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/)
- [HackerRank Real-World Coding Challenges 2025](https://www.hackerrank.com/writing/design-real-world-coding-challenges-junior-backend-developer-screening-2025)
- [LangChain State of Agent Engineering](https://www.langchain.com/state-of-agent-engineering)
- [WorkOS Multi-Tenant Architecture Guide](https://workos.com/blog/developers-guide-saas-multi-tenant-architecture)
