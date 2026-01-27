# Task: CSV Data Normalizer

## Objective
Create a Python tool that cleans and normalizes messy CSV files with inconsistent formatting.

## Input Data Issues
- Mixed delimiters (comma, semicolon, tab)
- Inconsistent quoting
- Mixed encodings (UTF-8, Latin-1, CP1252)
- Whitespace in headers and values
- Inconsistent null representations (NA, N/A, null, -, empty)
- Duplicate columns with different names

## Requirements

1. **Auto-Detection**
   - Detect delimiter automatically
   - Detect encoding automatically
   - Detect header row position

2. **Normalization**
   - Strip whitespace from all values
   - Normalize column names (lowercase, underscore)
   - Standardize null values to None/NaN
   - Remove duplicate rows
   - Fix data types (dates, numbers)

3. **Output**
   - Clean UTF-8 CSV
   - Consistent date format (ISO 8601)
   - Numbers without formatting (no commas, currency symbols)
   - Report of changes made

## Usage
```bash
python normalizer.py input.csv output.csv --report report.json
```

## Files to Create
- `normalizer.py` - Main script
- `detectors.py` - Auto-detection utilities
- `cleaners.py` - Data cleaning functions

## Success Criteria
- [ ] Correctly detects delimiter and encoding
- [ ] Column names are normalized
- [ ] Null values are standardized
- [ ] Dates converted to ISO 8601
- [ ] Report shows all transformations
