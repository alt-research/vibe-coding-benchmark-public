<p align="center">
  <h1 align="center">🚀 VibeCodingBench</h1>
  <p align="center">
    <strong>The benchmark that measures what AI coding agents actually do in production</strong>
  </p>
  <p align="center">
    <a href="#why-vibecodingbench">Why</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#task-categories">Tasks</a> •
    <a href="#evaluation">Evaluation</a> •
    <a href="#leaderboard">Leaderboard</a> •
    <a href="#contributing">Contributing</a>
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/tasks-180-blue" alt="Tasks">
    <img src="https://img.shields.io/badge/models-15-green" alt="Models">
    <img src="https://img.shields.io/badge/languages-10-orange" alt="Languages">

    <img src="https://img.shields.io/badge/version-1.0.0-brightgreen" alt="Version">
  </p>
</p>

---

## Why VibeCodingBench?

**Existing benchmarks are disconnected from reality.** See our [full thesis](docs/THESIS.md) for detailed analysis.

| Benchmark | Focus | Real-World Signal | Limitation |
|-----------|-------|-------------------|------------|
| HumanEval | Algorithmic puzzles | ❌ Low | Not production code |
| SWE-bench | Bug fixes in 12 repos | ⚠️ Medium | [63% suspicious patches](https://runloop.ai/blog/swe-bench-deep-dive-unmasking-the-limitations-of-a-popular-benchmark) |
| SWE-bench Pro | Multi-file tasks | ⚠️ Medium | [70% → 23% performance drop](https://scale.com/leaderboard/swe_bench_pro_public) |
| **VibeCodingBench** | Full-stack features | ✅ **High** | Production-aligned tasks |

### The Evidence

**Developer Time Distribution** ([Sonar Research](https://www.sonarsource.com/blog/how-much-time-do-developers-spend-actually-writing-code/)):
- Writing new code: 32% | Code maintenance: 19% | Testing: 12%
- Developers code only **52 minutes/day** on average

**The Boilerplate Burden** ([GitHub Octoverse 2025](https://github.blog/news-insights/octoverse/)):
- 2.4M repos use Notebooks (+75% YoY)
- 1.9M repos use Dockerfiles (+120% YoY)
- Developers need help with **repetitive patterns**: auth, CRUD, integrations

**SWE-EVO Exposes the Gap** ([arxiv:2512.18470](https://arxiv.org/abs/2512.18470)):
- Best models: 65% on simple fixes → **only 21% on code evolution**
- "Current AI agents struggle with comprehensive planning and execution"

**Quality Beyond Pass Rate** ([Qodo 2025](https://www.qodo.ai/reports/state-of-ai-code-quality/)):
- "Claude Sonnet 4 averaged **2.11 issues per passing task**"
- Pass rate alone hides production risks

**Developer Frustration** ([Stack Overflow 2025](https://survey.stackoverflow.co/2025/)):
- 66% cite "AI solutions almost right, but not quite" as top frustration
- 45% say "debugging AI code is more time-consuming"

## Quick Start

### From Source

```bash
git clone https://github.com/alt-research/vibe-coding-benchmark-public.git
cd coding-model-benchmark
npm install
npm run build

# List tasks
node packages/cli/dist/index.js list

# Run a task with mock agent
node packages/cli/dist/index.js run saas-core/auth/supabase-oauth --agent mock

# Run with real agent (requires API key)
export ANTHROPIC_API_KEY=your_key
node packages/cli/dist/index.js run saas-core/auth/supabase-oauth --agent claude

# Run full evaluation across agents
node packages/cli/dist/index.js eval --agents claude,glm,minimax

# Watch live execution
node packages/cli/dist/index.js run <task-id> --agent claude --live
```

## Task Categories

| Category | Weight | Tasks | Languages | Examples |
|----------|--------|-------|-----------|----------|
| **SaaS Core** | 25% | 20 | TS, Go, Python, Java, Rust | `supabase-oauth`, `jwt-refresh-tokens`, `rbac-permissions` |
| **Glue Code** | 20% | 20 | Python, Go, TS, Java, Rust | `csv-normalizer`, `kafka-producer`, `cdc-pipeline` |
| **AI Integration** | 20% | 20 | Python, TS, Go | `pdf-qa`, `research-agent`, `semantic-search` |
| **Frontend** | 15% | 20 | React, Vue, Svelte, RN | `landing-page`, `data-grid`, `collaborative-editor` |
| **API Integrations** | 10% | 20 | TS, Go, Python, Java | `checkout-session`, `twilio-sms`, `saml-sso` |
| **Code Evolution** | 10% | 20 | TS, Python, Go, Kotlin | `flask-to-fastapi`, `java-to-kotlin`, `secrets-rotation` |

**Total: 180 tasks** across **10 languages** (TypeScript, Python, Go, Java, Kotlin, Rust, C#, React, Vue, Svelte)

### Language Distribution

Based on [GitHub Octoverse 2025](https://github.blog/news-insights/octoverse/) and [Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/):

| Language | % of Tasks | Rationale |
|----------|------------|-----------|
| TypeScript/JavaScript | 40% | #1 on GitHub, dominant in web dev |
| Python | 25% | #2 on GitHub, AI/ML leader |
| Go | 15% | Rising for cloud-native, microservices |
| Java/Kotlin | 10% | Enterprise, Android development |
| Rust | 5% | Systems programming, performance-critical |
| C# | 5% | Enterprise, game development |

### Task Structure

Each task is a self-contained directory:

```
tasks/saas-core/auth/supabase-oauth/
├── task.yaml           # Metadata, constraints
├── PROMPT.md           # Instructions for the agent
├── tests/              # Evaluation tests
│   └── auth.test.ts    # Playwright E2E tests
├── docker-compose.yaml # Services (DB, mock APIs)
└── golden/             # Reference implementation (optional)
```

**Hot-reload support**: Add new tasks while the benchmark is running!

## Evaluation

### Multi-Dimensional Scoring

We measure what senior engineers care about:

| Dimension | Weight | Method | Why It Matters |
|-----------|--------|--------|----------------|
| **Functional** | 40% | Playwright E2E, Pass@k | Does it work? |
| **Visual** | 20% | Pixel diff vs reference | Does it look right? |
| **Quality** | 20% | ESLint + Semgrep + complexity | Is it maintainable? |
| **Cost** | 10% | Tokens used, context pollution | Is it efficient? |
| **Speed** | 10% | Wall-clock time, step count | Is it fast? |

### Security Gate

Any **Critical/High** vulnerability = **automatic fail**. We use Semgrep with OWASP rules.

### The Scoring Formula

```
Final = (Functional × 0.4) + (Visual × 0.2) + (Quality × 0.2)
        - (Cost Penalty) - (Speed Penalty)

Security Fail → Final = 0
```

## Supported Agents

| Agent | Model | Status | Config | Pricing (Input/Output per MTok) |
|-------|-------|--------|--------|--------------------------------|
| Claude | Haiku 4.5 | ✅ Supported | `ANTHROPIC_API_KEY` | $1.00 / $5.00 |
| Claude | Opus 4.5 | ✅ Supported | `ANTHROPIC_API_KEY` | $5.00 / $25.00 |
| Qwen | Qwen3-Max | ✅ Supported | `QWEN_API_KEY` | $1.20 / $6.00 |
| GLM | GLM-4.7 | ✅ Supported | `GLM_API_KEY` | $0.60 / $2.20 |
| MiniMax | M2.1 | ✅ Supported | `MINIMAX_API_KEY` | $0.30 / $1.20 |
| OpenAI | GPT-5.2 | ✅ Supported | `OPENAI_API_KEY` | $1.75 / $14.00 |
| DeepSeek | Chat-v3 | ✅ Supported | `DEEPSEEK_API_KEY` | $0.40 / $1.60 |
| Gemini | 3-Flash Preview | ✅ Supported | `GOOGLE_API_KEY` | $0.50 / $3.00 |

## Leaderboard

```
📈 LEADERBOARD (2026-01-27) - 180 tasks evaluated, 15 models

╔══════╤══════════════════════╤═══════╤═══════════╤════════════╤════════════╤══════════════╤═════════════╗
║ Rank │ Model                │ Final │ Pass Rate │ Total Cost │ Total Time │ Avg Time/Task│ Total Tokens║
╟──────┼──────────────────────┼───────┼───────────┼────────────┼────────────┼──────────────┼─────────────╢
║ #1   │ Claude Opus 4.5      │ 89.2% │ 100.0%    │ $12.31     │ 2h 12m     │ 44s          │ 648K        ║
╟──────┼──────────────────────┼───────┼───────────┼────────────┼────────────┼──────────────┼─────────────╢
║ #2   │ Claude Haiku 4.5     │ 89.0% │ 99.4%     │ $3.03      │ 1h 5m      │ 22s          │ 798K        ║
╟──────┼──────────────────────┼───────┼───────────┼────────────┼────────────┼──────────────┼─────────────╢
║ #3   │ Grok 4 Fast          │ 88.8% │ 98.9%     │ $0.21      │ 1h 57m     │ 70s          │ 520K        ║
╟──────┼──────────────────────┼───────┼───────────┼────────────┼────────────┼──────────────┼─────────────╢
║ #4   │ OpenAI GPT-5.2       │ 88.8% │ 98.3%     │ $5.01      │ 1h 24m     │ 28s          │ 485K        ║
╟──────┼──────────────────────┼───────┼───────────┼────────────┼────────────┼──────────────┼─────────────╢
║ #5   │ Qwen3 Max            │ 88.6% │ 100.0%    │ $5.42      │ 2h 15m     │ 45s          │ 949K        ║
╟──────┼──────────────────────┼───────┼───────────┼────────────┼────────────┼──────────────┼─────────────╢
║ #6   │ Claude Sonnet 4.5    │ 88.6% │ 98.3%     │ $6.98      │ 2h 6m      │ 42s          │ 612K        ║
╟──────┼──────────────────────┼───────┼───────────┼────────────┼────────────┼──────────────┼─────────────╢
║ #7   │ GLM 4-Plus           │ 88.2% │ 98.9%     │ $0.93      │ 4h 49m     │ 96s          │ 794K        ║
╟──────┼──────────────────────┼───────┼───────────┼────────────┼────────────┼──────────────┼─────────────╢
║ #8   │ DeepSeek v3.2        │ 88.2% │ 98.3%     │ $0.50      │ 4h 29m     │ 90s          │ 543K        ║
╟──────┼──────────────────────┼───────┼───────────┼────────────┼────────────┼──────────────┼─────────────╢
║ #9   │ Grok 4               │ 88.0% │ 97.8%     │ $5.47      │ 2h 5m      │ 75s          │ 480K        ║
╟──────┼──────────────────────┼───────┼───────────┼────────────┼────────────┼──────────────┼─────────────╢
║ #10  │ MiniMax M2.1         │ 87.4% │ 99.4%     │ $2.40      │ 8h 15m     │ 165s         │ 2.78M       ║
╟──────┼──────────────────────┼───────┼───────────┼────────────┼────────────┼──────────────┼─────────────╢
║ #11  │ Grok 4.1 Fast        │ 86.8% │ 97.2%     │ $0.24      │ 2h 27m     │ 89s          │ 580K        ║
╟──────┼──────────────────────┼───────┼───────────┼────────────┼────────────┼──────────────┼─────────────╢
║ #12  │ Gemini 3 Pro Preview │ 85.8% │ 95.0%     │ $10.34     │ 1h 36m     │ 32s          │ 738K        ║
╟──────┼──────────────────────┼───────┼───────────┼────────────┼────────────┼──────────────┼─────────────╢
║ #13  │ GLM-4.7              │ 83.9% │ 85.6%     │ $0.73      │ 2h 50m     │ 57s          │ 623K        ║
╟──────┼──────────────────────┼───────┼───────────┼────────────┼────────────┼──────────────┼─────────────╢
║ #14  │ GLM 4.7 Flash        │ 83.8% │ 92.8%     │ $1.11      │ 2h 15m     │ 45s          │ 650K        ║
╟──────┼──────────────────────┼───────┼───────────┼────────────┼────────────┼──────────────┼─────────────╢
║ #15  │ Gemini 3 Flash       │ 83.4% │ 92.2%     │ $0.86      │ 1h 23m     │ 28s          │ 384K        ║
╚══════╧══════════════════════╧═══════╧═══════════╧════════════╧════════════╧══════════════╧═════════════╝
```

### Pricing (OpenRouter 2026-01-27)

| Model | Input $/M | Output $/M |
|-------|-----------|------------|
| Claude Opus 4.5 | $5.00 | $25.00 |
| Claude Sonnet 4.5 | $3.00 | $15.00 |
| Claude Haiku 4.5 | $1.00 | $5.00 |
| Qwen3 Max | $1.20 | $6.00 |
| OpenAI GPT-5.2 | $1.75 | $14.00 |
| Grok 4 | $3.00 | $15.00 |
| Grok 4 Fast | $0.20 | $0.50 |
| Grok 4.1 Fast | $0.20 | $0.50 |
| GLM 4-Plus/4.7 | $0.40 | $1.50 |
| GLM 4.7 Flash | $0.07 | $0.40 |
| DeepSeek v3.2 | $0.30 | $1.20 |
| Gemini 3 Flash | $0.50 | $3.00 |
| Gemini 3 Pro | $2.00 | $12.00 |
| MiniMax M2.1 | $0.27 | $1.12 |

### Detailed Metrics

| Model | Functional | Quality | Cost/Task | Tokens/Task |
|-------|------------|---------|-----------|-------------|
| Claude Opus 4.5 | 85.0% | 80.0% | $0.0684 | 3,599 |
| Claude Haiku 4.5 | 84.5% | 79.6% | $0.0168 | 4,435 |
| Grok 4 Fast | 84.1% | 80.0% | $0.0012 | 2,889 |
| Qwen3 Max | 85.0% | 80.0% | $0.0301 | 5,273 |
| OpenAI GPT-5.2 | 83.6% | 79.6% | $0.0278 | 2,694 |
| Claude Sonnet 4.5 | 83.6% | 80.0% | $0.0388 | 3,400 |
| GLM 4-Plus | 84.1% | 80.0% | $0.0052 | 4,412 |
| DeepSeek v3.2 | 83.6% | 80.0% | $0.0028 | 3,015 |
| Grok 4 | 83.6% | 80.0% | $0.0304 | 2,667 |
| MiniMax M2.1 | 84.5% | 80.0% | $0.0133 | 15,436 |
| Grok 4.1 Fast | 82.6% | 78.7% | $0.0013 | 3,222 |
| Gemini 3 Pro Preview | 80.8% | 77.3% | $0.0574 | 4,099 |
| GLM-4.7 | 72.7% | 79.6% | $0.0041 | 3,464 |
| GLM 4.7 Flash | 78.9% | 79.6% | $0.0062 | 3,611 |
| Gemini 3 Flash | 78.4% | 75.1% | $0.0048 | 2,133 |

**Live Dashboard**: http://benchmark.altllm.ai/

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Adding a New Task

1. **Create task directory**:
   ```bash
   mkdir -p tasks/<category>/<subcategory>/<task-name>
   ```

2. **Add task.yaml**:
   ```yaml
   name: My New Task
   category: saas-core
   difficulty: medium
   stack: nextjs-supabase
   tags: [typescript, auth]
   ```

3. **Write PROMPT.md** with clear requirements

4. **Add tests** (Playwright for web, pytest for Python)

5. **Submit PR** using the template

## Architecture

```
vibecodingbench/
├── packages/
│   ├── cli/              # CLI tool
│   ├── evaluator/        # Scoring engine
│   └── leaderboard/      # Web dashboard
├── tasks/                # 120 benchmark tasks
│   ├── saas-core/        # 20 tasks
│   ├── glue-code/        # 20 tasks
│   ├── ai-integration/   # 20 tasks
│   ├── frontend/         # 20 tasks
│   ├── api-integrations/ # 20 tasks
│   └── code-evolution/   # 20 tasks
├── templates/            # Starter codebases
│   ├── nextjs-supabase/
│   ├── fastapi-postgres/
│   ├── go-fiber/
│   └── rust-axum/
└── docker/               # Base images
```

## Deployment

### GitHub Pages (Actions)

The repository deploys the Vite dashboard from `packages/dashboard` through
`.github/workflows/pages.yaml`.

1. In GitHub, open **Settings → Pages** and set **Build and deployment → Source**
   to **GitHub Actions**.
2. Push to `main`, or run **Deploy Dashboard To GitHub Pages** manually from the
   Actions tab.
3. By default the build uses `/<repo-name>/` as the Vite base path for a project
   Pages URL. For `http://benchmark.altllm.ai/`, set the repository variable
   `PAGES_BASE_PATH` to `/`.

### Self-Hosted (Docker)

```bash
# Build and run production stack
./scripts/deploy.sh docker

# Or in background
./scripts/deploy.sh docker --detach

# Services available at:
# - Dashboard: http://localhost:3000
# - API: http://localhost:3001
```

### Fly.io

```bash
cd packages/leaderboard
fly launch --config fly.toml
fly deploy
```

## Environment Setup

```bash
# Required
export ANTHROPIC_API_KEY=...            # Claude (Anthropic)
export OPENAI_API_KEY=...               # OpenAI
export GOOGLE_API_KEY=...               # Gemini (Google AI)

# Optional
export GLM_API_KEY=...                  # GLM (Zhipu AI)
export MINIMAX_API_KEY=...              # MiniMax
export QWEN_API_KEY=...                 # Qwen (Alibaba DashScope)
export DEEPSEEK_API_KEY=...             # DeepSeek
```

## Citation

If you use VibeCodingBench in your research, please cite:

```bibtex
@software{vibecodingbench2025,
  title = {VibeCodingBench: A Benchmark for AI Coding Agents on Real-World Developer Tasks},
  year = {2025},
  url = {https://github.com/alt-research/vibe-coding-benchmark-public}
}
```


---

<p align="center">
  <sub>Built with ❤️ by the open-source community</sub>
</p>
