# Task: Resume Parser with LLM

## Objective
Build a resume parser that extracts structured data from PDF/DOCX resumes using LLM with function calling.

## Requirements

1. **File Processing**
   - Accept PDF and DOCX files
   - Extract text with formatting hints
   - Handle multi-page resumes
   - Support multiple languages

2. **Data Extraction**
   ```json
   {
     "name": "string",
     "email": "string",
     "phone": "string",
     "location": "string",
     "summary": "string",
     "experience": [{
       "company": "string",
       "title": "string",
       "startDate": "YYYY-MM",
       "endDate": "YYYY-MM | Present",
       "description": "string",
       "highlights": ["string"]
     }],
     "education": [{
       "institution": "string",
       "degree": "string",
       "field": "string",
       "graduationDate": "YYYY-MM"
     }],
     "skills": ["string"],
     "certifications": ["string"]
   }
   ```

3. **LLM Integration**
   - Use function calling for structured output
   - Validate output against schema
   - Handle ambiguous data gracefully
   - Confidence scores for uncertain fields

4. **API**
   - `POST /parse` - Upload and parse resume
   - Return structured JSON

## Technical Stack
- Python 3.11+
- FastAPI
- OpenAI/Anthropic API
- PyMuPDF for PDF
- python-docx for DOCX

## Files to Create
- `app/main.py` - FastAPI app
- `app/services/extractor.py` - Text extraction
- `app/services/parser.py` - LLM parsing
- `app/schemas/resume.py` - Pydantic models
- `app/routers/parse.py` - API endpoint

## Success Criteria
- [ ] PDF and DOCX files parsed
- [ ] All fields extracted correctly
- [ ] Dates normalized to YYYY-MM
- [ ] Skills list is comprehensive
- [ ] Output validates against schema
