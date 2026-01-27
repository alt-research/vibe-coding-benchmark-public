# Task: Excel to JSON Transformer

## Objective
Create a Python script that transforms messy Excel files into clean, schema-compliant JSON.

## Input Data Issues
The input Excel file (`data/sales.xlsx`) has these common problems:
- Merged cells in headers
- Inconsistent date formats (MM/DD/YYYY, DD-MM-YYYY, YYYY.MM.DD)
- Currency values with mixed symbols ($, €, £)
- Empty rows and columns
- Leading/trailing whitespace
- Duplicate entries

## Requirements

1. **Read Excel File**
   - Handle merged cells (unmerge and fill)
   - Skip empty rows
   - Detect header row automatically

2. **Clean Data**
   - Normalize dates to ISO 8601 format (YYYY-MM-DD)
   - Convert currency to numeric (float, USD)
   - Trim whitespace from strings
   - Remove duplicate rows (based on order_id)

3. **Output JSON Schema**
   ```json
   {
     "orders": [
       {
         "order_id": "string",
         "customer_name": "string",
         "order_date": "string (YYYY-MM-DD)",
         "amount": "number",
         "status": "string (pending|completed|cancelled)"
       }
     ],
     "metadata": {
       "total_orders": "number",
       "total_amount": "number",
       "generated_at": "string (ISO 8601)"
     }
   }
   ```

4. **Error Handling**
   - Log rows that couldn't be parsed
   - Continue processing despite individual row errors
   - Include error summary in output

## Files to Create
- `transform.py` - Main transformation script
- `schema.json` - JSON Schema for validation

## Usage
```bash
python transform.py data/sales.xlsx output.json
```

## Success Criteria
- [ ] Correctly parses all valid rows from test Excel file
- [ ] Output matches JSON schema exactly
- [ ] Handles all date format variations
- [ ] Currency conversion is accurate to 2 decimal places
- [ ] Duplicates are removed
