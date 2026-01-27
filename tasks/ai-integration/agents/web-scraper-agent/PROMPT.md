# Task: Autonomous Web Scraper Agent

## Objective
Build an LLM-powered agent that autonomously navigates websites and extracts structured data.

## Requirements

1. **Agent Capabilities**
   - Navigate to URLs
   - Click elements by description
   - Fill forms
   - Extract data from pages
   - Handle pagination

2. **Tools**
   - `navigate(url)` - Go to URL
   - `click(selector/description)` - Click element
   - `fill(selector, value)` - Fill input
   - `extract(schema)` - Extract data
   - `screenshot()` - Capture page

3. **Task Execution**
   - Accept natural language task
   - Plan navigation steps
   - Execute with error recovery
   - Return structured results

4. **API**
   - `POST /tasks` - Create scraping task
   - `GET /tasks/{id}` - Get task status
   - `GET /tasks/{id}/results` - Get results

## Example Task
```
"Go to Amazon, search for 'wireless headphones',
extract the top 10 products with name, price, and rating"
```

## Technical Stack
- Python 3.11+
- Playwright for browser
- LangChain or custom agent
- OpenAI/Anthropic for planning

## Files to Create
- `agent/core.py` - Agent loop
- `agent/tools.py` - Agent tools
- `agent/planner.py` - Task planning
- `agent/browser.py` - Browser control
- `app/routers/tasks.py` - API endpoints

## Success Criteria
- [ ] Agent navigates to target pages
- [ ] Forms filled correctly
- [ ] Data extracted matches schema
- [ ] Handles errors and retries
- [ ] Pagination handled
