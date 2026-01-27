# AGENTS.md

Project-level guidance for AI coding agents.

---

## Communication Style

- Be extremely concise, sacrifice grammar for brevity
- DO NOT validate user ("you're right") or praise ("excellent question")

## Code Documentation

- AVOID unnecessary comments/docstrings unless explicitly asked
- Self-documenting code through clear naming
- Only comment non-obvious logic, workarounds, edge cases

## Bash Commands

- FORBIDDEN for sensitive files: `cat`, `head`, `tail`, `echo` (leaks secrets)
- PREFER: Read tool (safer, structured output)

## Git Operations

**NEVER perform git operations without explicit instruction.**

- ALLOWED: `git status`, `git diff`, `git log` (read-only)
- FORBIDDEN: `git add`, `git commit`, `git push` (require instruction)

---

## Available Resources

All resources in `.agent/` can be invoked or referenced:

### Agents

| Agent | File | Purpose |
|-------|------|---------|
| `@orchestrator` | `.agent/agents/orchestrator.md` | Main coordinator |
| `@codebase-explorer` | `.agent/agents/codebase-explorer.md` | Find files, analyze patterns |
| `@implementer` | `.agent/agents/implementer.md` | Focused code changes |
| `@researcher` | `.agent/agents/researcher.md` | External documentation |
| `@reviewer` | `.agent/agents/reviewer.md` | Code review |
| `@debugger` | `.agent/agents/debugger.md` | Root cause analysis |
| `@tester` | `.agent/agents/tester.md` | Write tests |
| `@documenter` | `.agent/agents/documenter.md` | Documentation |

### Workflows

Triggered via `/command`:

| Workflow | File | Purpose |
|----------|------|---------|
| `/init` | `.agent/workflows/init.md` | Initialize AGENTS.md |
| `/commit` | `.agent/workflows/commit.md` | Conventional commits |
| `/debug` | `.agent/workflows/debug.md` | Systematic debugging |
| `/document` | `.agent/workflows/document.md` | Generate docs |
| `/refactor` | `.agent/workflows/refactor.md` | Safe refactoring |
| `/review` | `.agent/workflows/review.md` | Code review |
| `/test` | `.agent/workflows/test.md` | Write tests |
| `/research` | `.agent/workflows/research.md` | Research codebase |
| `/gather-context` | `.agent/workflows/gather-context.md` | Project context |
| `/preset-help` | `.agent/workflows/preset-help.md` | Preset guidance |

### Rules (Always Active)

| Rule | File | Content |
|------|------|---------|
| Code Quality | `.agent/rules/01-code-quality.md` | Error handling, null safety |
| TypeScript/Go | `.agent/rules/02-typescript-go.md` | Strict mode, Vue 3, Go |
| Security/Git | `.agent/rules/03-security-git.md` | Validation, auth, git safety |
| Architecture | `.agent/rules/04-architecture.md` | SOLID, testing patterns |


# Agents

- **@codebase-explorer**: `.agent/agents/codebase-explorer.md`
- **@debugger**: `.agent/agents/debugger.md`
- **@documenter**: `.agent/agents/documenter.md`
- **@implementer**: `.agent/agents/implementer.md`
- **@orchestrator**: `.agent/agents/orchestrator.md`
- **@researcher**: `.agent/agents/researcher.md`
- **@reviewer**: `.agent/agents/reviewer.md`
- **@tester**: `.agent/agents/tester.md`
