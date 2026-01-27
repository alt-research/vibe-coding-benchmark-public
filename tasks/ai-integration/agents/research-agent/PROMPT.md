# Task: Multi-Step Research Agent

## Objective
Build an LLM agent that performs multi-step research by searching, reading, and synthesizing information.

## Requirements

1. **Research Tools**
   - Web search (Google/Bing API)
   - Page content fetcher
   - PDF reader
   - Note taking
   - Citation management

2. **Agent Workflow**
   - Decompose research question
   - Search for relevant sources
   - Read and extract key info
   - Synthesize findings
   - Generate report with citations

3. **Output Format**
   ```typescript
   interface ResearchReport {
     question: string;
     summary: string;
     keyFindings: string[];
     sources: Array<{
       url: string;
       title: string;
       relevantQuotes: string[];
     }>;
     confidence: number;
   }
   ```

4. **API**
   - `POST /research` - Start research
   - `GET /research/{id}` - Get status
   - `GET /research/{id}/report` - Get report
   - Stream progress updates via SSE

## Technical Stack
- TypeScript/Node.js
- LangChain or custom agent
- Bing/Google Search API
- OpenAI/Anthropic

## Files to Create
- `src/agent/researcher.ts` - Main agent
- `src/agent/tools/search.ts` - Search tool
- `src/agent/tools/reader.ts` - Content reader
- `src/agent/synthesizer.ts` - Report generation
- `src/routes/research.ts` - API endpoints

## Success Criteria
- [ ] Searches relevant sources
- [ ] Extracts key information
- [ ] Synthesizes coherent report
- [ ] Citations are accurate
- [ ] Handles multi-step queries
