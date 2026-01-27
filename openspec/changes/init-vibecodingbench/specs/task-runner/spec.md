## ADDED Requirements

### Requirement: Task Discovery
The system SHALL discover tasks from the `tasks/` directory by scanning for `task.yaml` files.

#### Scenario: List all tasks
- **WHEN** user runs `vibecodingbench list`
- **THEN** system displays all tasks grouped by category with metadata

#### Scenario: Filter by category
- **WHEN** user runs `vibecodingbench list --category saas-core`
- **THEN** system displays only tasks in that category

### Requirement: Task Execution
The system SHALL execute tasks in isolated Docker containers with configurable timeouts.

#### Scenario: Run single task
- **WHEN** user runs `vibecodingbench run <task-id> --agent claude-code`
- **THEN** system spawns Docker container, injects prompt, captures agent output

#### Scenario: Timeout enforcement
- **WHEN** agent exceeds task timeout (default 300s)
- **THEN** system kills container and records timeout failure

#### Scenario: Token limit enforcement
- **WHEN** agent exceeds token limit (default 100k)
- **THEN** system stops agent and records token limit failure

### Requirement: Agent Interface
The system SHALL support multiple agent connection methods.

#### Scenario: Stdio agent
- **WHEN** task.yaml specifies `agent_interface.type: stdio`
- **THEN** system communicates via stdin/stdout pipes

#### Scenario: HTTP agent
- **WHEN** task.yaml specifies `agent_interface.type: http`
- **THEN** system communicates via REST API on localhost:8080

### Requirement: Live Demo Mode
The system SHALL support live streaming of task execution for demos.

#### Scenario: Stream execution
- **WHEN** user runs `vibecodingbench run <task-id> --live`
- **THEN** system streams agent actions, terminal output, and browser (if applicable) to web UI

#### Scenario: Record session
- **WHEN** user runs `vibecodingbench run <task-id> --record`
- **THEN** system saves asciinema recording and browser video to `results/<run-id>/`
