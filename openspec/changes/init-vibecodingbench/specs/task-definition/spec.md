## ADDED Requirements

### Requirement: Task Schema
The system SHALL validate task definitions against a JSON Schema.

#### Scenario: Valid task.yaml
- **WHEN** task.yaml contains all required fields (id, name, category, prompt, timeout)
- **THEN** system loads task without errors

#### Scenario: Invalid task.yaml
- **WHEN** task.yaml is missing required fields
- **THEN** system reports validation errors with line numbers

### Requirement: Task Structure
Each task SHALL be a self-contained directory with standardized layout.

#### Scenario: Minimal task
- **WHEN** task directory contains `task.yaml` and `tests/`
- **THEN** system can execute and evaluate the task

#### Scenario: Full task with template
- **WHEN** task directory contains `task.yaml`, `template/`, `tests/`, `golden/`
- **THEN** system uses template as starter code and golden for reference comparison

### Requirement: Task Metadata
Task definitions SHALL include metadata for filtering and scoring.

#### Scenario: Category and weight
- **WHEN** task.yaml specifies `category: saas-core` and `weight: 1.5`
- **THEN** system applies weight multiplier to final score

#### Scenario: Difficulty level
- **WHEN** task.yaml specifies `difficulty: hard`
- **THEN** system adjusts timeout and token limits accordingly

### Requirement: Prompt Specification
Tasks SHALL define agent prompts with clear success criteria.

#### Scenario: Prompt file
- **WHEN** task.yaml specifies `prompt_file: PROMPT.md`
- **THEN** system reads prompt from that file with variable substitution

#### Scenario: Inline prompt
- **WHEN** task.yaml contains `prompt:` field directly
- **THEN** system uses inline prompt text
