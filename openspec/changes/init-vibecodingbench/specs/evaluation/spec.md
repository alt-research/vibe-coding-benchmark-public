## ADDED Requirements

### Requirement: Multi-Dimensional Scoring
The system SHALL compute scores across five dimensions with configurable weights.

#### Scenario: Default weights
- **WHEN** no custom weights specified
- **THEN** system uses: Functional 40%, Visual 20%, Quality 20%, Cost 10%, Speed 10%

#### Scenario: Custom weights
- **WHEN** user specifies `--weights func=50,visual=0,quality=30,cost=10,speed=10`
- **THEN** system applies custom weight distribution

### Requirement: Functional Correctness (Pass@k)
The system SHALL measure functional correctness via execution-based testing.

#### Scenario: Pass@1
- **WHEN** test suite runs once and passes
- **THEN** functional score = 100%

#### Scenario: Pass@n with retries
- **WHEN** task allows n attempts and any attempt passes
- **THEN** functional score = 100% but efficiency penalty applied

#### Scenario: Fail-to-Pass validation
- **WHEN** task is bug-fix type
- **THEN** system verifies agent's test fails before fix and passes after

### Requirement: Visual Fidelity
The system SHALL measure UI accuracy via screenshot comparison.

#### Scenario: Pixel diff scoring
- **WHEN** task has `reference.png` in golden/
- **THEN** system captures screenshot and computes pixel match percentage

#### Scenario: Responsive breakpoints
- **WHEN** task specifies `breakpoints: [375, 768, 1440]`
- **THEN** system tests at each width and averages scores

#### Scenario: Tolerance threshold
- **WHEN** pixel mismatch < 5%
- **THEN** visual score = 100% (allows font rendering variance)

### Requirement: Code Quality
The system SHALL measure code hygiene via static analysis.

#### Scenario: Linter errors
- **WHEN** generated code has linter errors
- **THEN** quality score reduced by error count (max -50 points)

#### Scenario: Cyclomatic complexity
- **WHEN** average complexity > 10
- **THEN** quality score reduced proportionally

#### Scenario: Security scan
- **WHEN** Semgrep finds Critical/High vulnerabilities
- **THEN** task auto-fails regardless of other scores

### Requirement: Hallucination Detection
The system SHALL detect fabricated dependencies.

#### Scenario: Import validation
- **WHEN** agent imports package not in npm/PyPI/Go modules
- **THEN** hallucination flag raised, quality score -20

### Requirement: Cost Efficiency
The system SHALL track token usage and compute costs.

#### Scenario: Token tracking
- **WHEN** task completes
- **THEN** system records input_tokens, output_tokens, total_cost

#### Scenario: Cost per solved task (CPST)
- **WHEN** computing leaderboard
- **THEN** CPST = total_cost / passed_tasks

#### Scenario: Context pollution rate
- **WHEN** agent reads files
- **THEN** pollution_rate = (files_read - files_edited) / files_read

### Requirement: Speed Metrics
The system SHALL track execution time and reasoning efficiency.

#### Scenario: Wall-clock time
- **WHEN** task completes
- **THEN** system records start_time, end_time, duration_seconds

#### Scenario: Step efficiency
- **WHEN** agent completes task
- **THEN** system counts LLM round-trips (fewer = better)

#### Scenario: Self-correction rate
- **WHEN** agent encounters error and retries
- **THEN** system tracks retry_count (target < 2)

### Requirement: Final Score Calculation
The system SHALL compute weighted final score with penalties.

#### Scenario: Score formula
- **WHEN** all dimensions computed
- **THEN** final_score = (func * w1) + (visual * w2) + (quality * w3) - (cost_penalty) - (speed_penalty)

#### Scenario: Leaderboard ranking
- **WHEN** displaying results
- **THEN** rank by final_score descending, show all dimensions in spider chart
