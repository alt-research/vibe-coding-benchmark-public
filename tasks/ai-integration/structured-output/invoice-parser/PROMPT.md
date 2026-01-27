# Invoice PDF Parser

Build an invoice parser that extracts structured data from PDF invoices using an LLM.

## Output Schema

```python
class LineItem(BaseModel):
    description: str
    quantity: float
    unit_price: float
    total: float

class Invoice(BaseModel):
    invoice_number: str
    invoice_date: date
    due_date: date | None
    vendor_name: str
    vendor_address: str | None
    customer_name: str
    customer_address: str | None
    line_items: list[LineItem]
    subtotal: float
    tax_amount: float | None
    tax_rate: float | None
    total_amount: float
    currency: str
    payment_terms: str | None
```

## Requirements

1. Use PyMuPDF or pdfplumber for PDF text extraction
2. Use OpenAI or Anthropic with function calling for structured extraction
3. Handle multi-page invoices
4. Validate extracted data (totals should sum correctly)
5. Return confidence scores for each field

## API Endpoint

```python
@app.post("/parse")
async def parse_invoice(file: UploadFile) -> Invoice:
    ...
```

## Test Cases

1. Simple single-page invoice
2. Multi-page invoice with many line items
3. Invoice with taxes and discounts
4. Invoice in different currency (EUR, GBP)
5. Poorly formatted/scanned invoice

## Acceptance Criteria

- [ ] Extracts all required fields
- [ ] Line item totals sum to subtotal
- [ ] Handles different date formats
- [ ] Works with various invoice layouts
- [ ] Returns validation errors for malformed invoices
