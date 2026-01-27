# Task: PDF Merger and Manipulator

## Objective
Build a PDF manipulation service that merges, splits, and transforms PDF files.

## Requirements

1. **Merge Operations**
   - Merge multiple PDFs into one
   - Specify page order
   - Add blank pages between docs
   - Set output metadata

2. **Split Operations**
   - Split by page ranges
   - Extract specific pages
   - Split into single pages
   - Split by size limit

3. **Transform Operations**
   - Rotate pages
   - Add watermark (text or image)
   - Add page numbers
   - Compress/optimize

4. **API Endpoints**
   - `POST /pdf/merge` - Merge PDFs
   - `POST /pdf/split` - Split PDF
   - `POST /pdf/rotate` - Rotate pages
   - `POST /pdf/watermark` - Add watermark

## Technical Stack
- Python 3.11+
- FastAPI
- pypdf or PyMuPDF
- Pillow for image watermarks

## Files to Create
- `app/main.py` - FastAPI app
- `app/services/merger.py` - Merge logic
- `app/services/splitter.py` - Split logic
- `app/services/transformer.py` - Transform ops
- `app/routers/pdf.py` - API endpoints

## Success Criteria
- [ ] Merge creates valid PDF
- [ ] Split extracts correct pages
- [ ] Rotation works correctly
- [ ] Watermark appears on all pages
- [ ] Output is valid PDF
