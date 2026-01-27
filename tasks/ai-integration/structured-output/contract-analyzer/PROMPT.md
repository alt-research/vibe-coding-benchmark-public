# Task: Legal Contract Analyzer

## Objective
Build a contract analysis tool that extracts key terms, identifies risks, and summarizes legal documents.

## Requirements

1. **Document Processing**
   - Accept PDF contracts
   - Handle multi-page documents
   - Extract text with section structure
   - Identify document type (NDA, SLA, Employment)

2. **Key Terms Extraction**
   ```json
   {
     "parties": [{"name": "string", "role": "string"}],
     "effectiveDate": "date",
     "terminationDate": "date",
     "renewalTerms": "string",
     "paymentTerms": {
       "amount": "number",
       "currency": "string",
       "schedule": "string"
     },
     "obligations": [{
       "party": "string",
       "description": "string",
       "deadline": "string"
     }],
     "termination": {
       "noticePeriod": "string",
       "causes": ["string"]
     }
   }
   ```

3. **Risk Analysis**
   - Identify unusual clauses
   - Flag liability concerns
   - Highlight missing standard clauses
   - Compare against templates

4. **API**
   - `POST /analyze` - Upload contract
   - Return extracted terms + risks
   - `POST /compare` - Compare two contracts

## Technical Stack
- Python 3.11+
- FastAPI
- LangChain for chunking
- OpenAI/Anthropic API

## Files to Create
- `app/services/extractor.py` - Document processing
- `app/services/analyzer.py` - Term extraction
- `app/services/risk_detector.py` - Risk analysis
- `app/schemas/contract.py` - Data models
- `app/routers/contracts.py` - API endpoints

## Success Criteria
- [ ] Parties identified correctly
- [ ] Dates extracted accurately
- [ ] Payment terms parsed
- [ ] Risks flagged appropriately
- [ ] Handles various contract types
