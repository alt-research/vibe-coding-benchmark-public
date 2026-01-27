# Task: Automated Code Review Agent

## Objective
Build an LLM agent that reviews pull requests, identifies issues, and suggests improvements.

## Requirements

1. **PR Analysis**
   - Fetch PR diff from GitHub
   - Understand code context
   - Identify changed files
   - Parse code structure

2. **Review Categories**
   - Bugs and logic errors
   - Security vulnerabilities
   - Performance issues
   - Code style violations
   - Missing tests
   - Documentation gaps

3. **Review Output**
   ```json
   {
     "summary": "string",
     "overallScore": "number",
     "issues": [{
       "file": "string",
       "line": "number",
       "severity": "critical|major|minor|suggestion",
       "category": "string",
       "description": "string",
       "suggestion": "string"
     }],
     "positives": ["string"]
   }
   ```

4. **GitHub Integration**
   - Post review comments on PR
   - Add inline suggestions
   - Request changes or approve
   - Update on new commits

## Technical Stack
- Python 3.11+
- FastAPI
- PyGithub
- OpenAI/Anthropic

## Files to Create
- `agent/reviewer.py` - Review agent
- `agent/analyzers/security.py` - Security checks
- `agent/analyzers/style.py` - Style checks
- `github/client.py` - GitHub API
- `github/commenter.py` - PR commenting
- `app/routers/webhooks.py` - Webhook handler

## Success Criteria
- [ ] PR diff analyzed correctly
- [ ] Issues identified with line numbers
- [ ] Suggestions are actionable
- [ ] Comments posted to GitHub
- [ ] Handles various languages
