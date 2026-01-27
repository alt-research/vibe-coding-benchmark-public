# Contributing to VibeCodingBench

Thank you for your interest in contributing! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Adding New Tasks](#adding-new-tasks)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)

## Code of Conduct

We are committed to providing a welcoming environment. Please be respectful and constructive in all interactions.

## How to Contribute

### Types of Contributions

1. **🆕 New Benchmark Tasks** - Most valuable contribution!
2. **🐛 Bug Fixes** - Fix issues in CLI, evaluator, or tasks
3. **✨ Features** - New CLI commands, evaluation metrics, etc.
4. **📚 Documentation** - Improve README, task prompts, tutorials
5. **🧪 Tests** - Improve task test coverage

### Where to Start

- Look for issues labeled `good first issue`
- Check the [task ideas we need](#task-ideas-we-need)
- Review existing tasks and suggest improvements

## Adding New Tasks

This is the most impactful way to contribute!

### Step 1: Choose a Task

Pick something based on **real-world developer needs**:

- What do you build frequently?
- What's common in freelance/consulting work?
- What do tutorials teach?

**Good tasks:**
- "Implement Stripe subscription with webhooks"
- "Add full-text search with Postgres"
- "Build responsive navbar from Figma design"

**Bad tasks:**
- "Reverse a linked list" (algorithmic, not real-world)
- "Write FizzBuzz" (too simple)

### Step 2: Create Task Directory

```bash
mkdir -p tasks/<category>/<subcategory>/<task-name>
cd tasks/<category>/<subcategory>/<task-name>
```

Categories:
- `saas-core` - Auth, payments, CRUD, files
- `glue-code` - Data transform, PDF, API sync
- `ai-integration` - RAG, structured output, agents
- `frontend` - Figma-to-code, responsive, animations
- `api-integrations` - Stripe, OAuth, AWS, webhooks
- `code-evolution` - Migrations, refactor, code review

### Step 3: Create task.yaml

```yaml
name: Your Task Name
category: saas-core
subcategory: auth
description: Brief description of what the agent should build
difficulty: easy | medium | hard
stack: nextjs-supabase | fastapi-postgres | go-fiber | python | nodejs
timeout: 300  # seconds
tokenLimit: 80000

promptFile: PROMPT.md

tests:
  functional: tests/main.test.ts
  visual: tests/visual.test.ts  # optional
  security: tests/security.test.ts  # optional

docker:
  compose: docker-compose.yaml  # optional

weight: 1.0  # scoring weight
tags:
  - typescript
  - auth
  - oauth

# Custom evaluation weights (optional)
evaluation:
  functional: 0.5
  visual: 0.1
  quality: 0.2
  cost: 0.1
  speed: 0.1
```

### Step 4: Write PROMPT.md

The prompt is what the agent sees. Be **specific and clear**:

```markdown
# Task: [Task Name]

## Objective
[1-2 sentences on what to build]

## Requirements
1. **Feature 1**
   - Specific requirement
   - Another requirement

2. **Feature 2**
   - Details...

## Technical Constraints
- Use [specific library/framework]
- Do not [constraint]
- Must [requirement]

## Files to Create/Modify
- `path/to/file.ts` - Description
- `path/to/another.ts` - Description

## Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
```

### Step 5: Write Tests

Tests should verify **behavior**, not implementation details.

**For Web Tasks (Playwright):**

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do expected behavior', async ({ page }) => {
    await page.goto('/path');
    await page.click('button');
    await expect(page.locator('.result')).toHaveText('expected');
  });
});
```

**For Backend Tasks (pytest):**

```python
import pytest

def test_feature():
    result = function_under_test(input)
    assert result == expected_output
```

### Step 6: Add docker-compose.yaml (if needed)

For tasks requiring databases or external services:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
```

### Step 7: Test Your Task

```bash
# Build the CLI
npm run build

# List tasks (yours should appear)
npm run cli -- list

# Run with mock agent
npm run cli -- run <your-task-id> --agent mock
```

### Step 8: Submit PR

Use the PR template and include:
- Why this task is valuable
- How you tested it
- Any known limitations

## Development Setup

### Prerequisites

- Node.js 20+
- Docker
- Python 3.11+ (for Python tasks)

### Install

```bash
git clone https://github.com/alt-research/vibe-coding-benchmark-public.git
cd vibe-coding-benchmark-public
npm install
```

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Lint

```bash
npm run lint
```

## Pull Request Process

1. **Fork** the repository
2. **Create branch**: `git checkout -b feat/my-feature`
3. **Make changes** following the style guide
4. **Test** your changes
5. **Commit** with conventional commits:
   - `feat: add new auth task`
   - `fix: correct token counting`
   - `docs: update contributing guide`
6. **Push** and create PR
7. **Respond** to review feedback

### PR Checklist

- [ ] Tests pass
- [ ] Linting passes
- [ ] Documentation updated
- [ ] Conventional commit messages
- [ ] No secrets in code

## Style Guide

### TypeScript

- Use strict mode
- Prefer `const` over `let`
- Use explicit types for function parameters
- Use async/await over promises

### Python

- Follow PEP 8
- Use type hints
- Use `ruff` for linting

### Task Prompts

- Be specific, not vague
- Include concrete examples
- List files to create/modify
- Define clear success criteria

### Tests

- Test behavior, not implementation
- One assertion per test when possible
- Use descriptive test names
- Include edge cases

## Task Ideas We Need

High-priority tasks we'd love contributions for:

### SaaS Core
- [ ] Multi-factor authentication (TOTP)
- [ ] Role-based access control
- [ ] Audit logging
- [ ] Multi-tenant architecture

### Glue Code
- [ ] PDF invoice generation
- [ ] Image optimization pipeline
- [ ] CSV import with validation
- [ ] Email templating system

### AI Integration
- [ ] Multi-modal RAG (images + text)
- [ ] Agentic workflow orchestration
- [ ] Fine-tuning data preparation
- [ ] Embedding search with filters

### Frontend
- [ ] Dark mode toggle
- [ ] Infinite scroll
- [ ] Drag-and-drop file upload
- [ ] Form with complex validation

### API Integrations
- [ ] GitHub Actions workflow
- [ ] Slack bot
- [ ] Twilio SMS notifications
- [ ] SendGrid email campaigns

### Code Evolution
- [ ] Express → Fastify migration
- [ ] Class → functional refactor
- [ ] Add TypeScript to JS project
- [ ] Upgrade React 17 → 18

## Questions?

- Open an issue with the `question` label
- Join our Discord (coming soon)

Thank you for contributing! 🎉
