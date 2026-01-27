# Design: VibeCodingBench Architecture

## Context
Building a comprehensive benchmark for coding agents (Claude Code, Gemini, Codex, DeepSeek, etc.) that measures real-world developer task performance. Must support both local execution and hosted leaderboard.

## Goals
- Reproducible evaluation across different agents
- Fair comparison with isolated Docker execution
- Multi-dimensional scoring (not just pass/fail)
- Easy task contribution workflow
- Support polyglot: TypeScript, Python, Go, Rust, Java

## Non-Goals
- Real-time collaboration features
- IDE integrations (agents run headless)
- Training data generation

## Decisions

### 1. Monorepo Structure
```
vibecodingbench/
├── packages/
│   ├── cli/              # Task runner CLI
│   ├── evaluator/        # Scoring engine
│   └── leaderboard/      # Web service
├── tasks/
│   ├── saas-core/        # 30% weight
│   ├── glue-code/        # 20% weight
│   ├── ai-integration/   # 20% weight
│   ├── frontend/         # 15% weight
│   └── api-integrations/ # 15% weight
├── templates/            # Starter codebases
│   ├── nextjs-supabase/
│   ├── fastapi-postgres/
│   ├── go-fiber/
│   └── rust-axum/
└── docker/               # Base images
```
**Rationale:** Single repo simplifies versioning, CI, and contributions.

### 2. Task Definition Format
Each task is a directory:
```
tasks/saas-core/auth/supabase-oauth/
├── task.yaml           # Metadata, prompt, constraints
├── docker-compose.yaml # Services (DB, mock APIs)
├── template/           # Starter code (optional)
├── tests/              # Evaluation tests
│   ├── functional/     # Must pass
│   ├── security/       # OWASP checks
│   └── visual/         # Screenshot diff (frontend)
└── golden/             # Reference implementation
```
**Rationale:** Self-contained, versionable, easy to add.

### 3. Execution Model
```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   CLI       │────▶│  Task Env    │────▶│  Evaluator  │
│  (host)     │     │  (Docker)    │     │  (Docker)   │
└─────────────┘     └──────────────┘     └─────────────┘
      │                    │                    │
      │   mount workspace  │   run agent        │   run tests
      │   inject prompt    │   capture output   │   compute scores
      └────────────────────┴────────────────────┘
```
- Agent runs inside container with network access (for package installs)
- Evaluation runs in separate container (no agent access)
- Time/token limits enforced by CLI

### 4. Scoring Dimensions
| Dimension | Weight | Method |
|-----------|--------|--------|
| Functional | 40% | Test pass rate |
| Code Quality | 20% | ESLint/Ruff + complexity metrics |
| Security | 20% | Semgrep OWASP rules |
| Efficiency | 20% | Tokens used + wall time |

### 5. Agent Interface
Agents connect via stdio or HTTP:
```yaml
# task.yaml
agent_interface:
  type: stdio  # or http
  prompt_file: PROMPT.md
  workspace: /workspace
  timeout: 300s
  token_limit: 100000
```

## Alternatives Considered

### Task Registry (rejected)
- Pros: Smaller local footprint
- Cons: More infrastructure, harder offline use
- Decision: Start monorepo, can extract registry later

### VM-per-task (rejected)
- Pros: Better isolation
- Cons: 10x cost, slower iteration
- Decision: Docker sufficient, VMs for hosted tier only

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Task contamination in training data | Version tasks, rotate variants |
| Agent gaming metrics | Multiple equivalent tasks per category |
| Unfair time comparisons | Normalize by model speed tier |
| Docker escape | Rootless containers, seccomp profiles |
