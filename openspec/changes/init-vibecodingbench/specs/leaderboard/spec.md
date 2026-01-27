## ADDED Requirements

### Requirement: Submission API
The system SHALL accept evaluation submissions via REST API.

#### Scenario: Submit run results
- **WHEN** POST /api/submissions with run results JSON
- **THEN** system validates, stores, and queues for leaderboard update

#### Scenario: Agent identification
- **WHEN** submission includes `agent_id` and `model_version`
- **THEN** system groups results by agent for comparison

### Requirement: Leaderboard Display
The system SHALL display ranked agents with multi-dimensional scores.

#### Scenario: Overall leaderboard
- **WHEN** GET /api/leaderboard
- **THEN** system returns agents ranked by final_score with all dimension breakdowns

#### Scenario: Category leaderboard
- **WHEN** GET /api/leaderboard?category=saas-core
- **THEN** system returns agents ranked by performance in that category only

#### Scenario: Spider chart data
- **WHEN** GET /api/leaderboard/:agent_id/chart
- **THEN** system returns 5-axis radar chart data (func, visual, quality, cost, speed)

### Requirement: Historical Tracking
The system SHALL track agent performance over time.

#### Scenario: Version comparison
- **WHEN** same agent submits new model version
- **THEN** system shows delta vs previous version

#### Scenario: Trend graphs
- **WHEN** viewing agent detail page
- **THEN** system displays score trends over last 30 days

### Requirement: Live Demo Dashboard
The system SHALL provide real-time task execution viewing.

#### Scenario: Active runs
- **WHEN** tasks are running
- **THEN** dashboard shows live terminal streams and browser recordings

#### Scenario: Replay recordings
- **WHEN** user selects completed run
- **THEN** system plays back asciinema recording synced with browser video

#### Scenario: Side-by-side comparison
- **WHEN** user selects 2+ agents for same task
- **THEN** system shows parallel playback of each agent's execution

### Requirement: Fairness Controls
The system SHALL enforce fair comparison conditions.

#### Scenario: Docker isolation
- **WHEN** submitting results
- **THEN** system verifies run was in fresh Docker container (via attestation)

#### Scenario: Held-out validation
- **WHEN** task is marked `held_out: true`
- **THEN** system only accepts submissions from last 14 days (prevents training contamination)

#### Scenario: Standardized scaffolding
- **WHEN** displaying leaderboard
- **THEN** system shows which agent tooling was used (raw API vs Claude Code CLI vs Codex CLI)
