# Task: PDF Invoice Generation

## Objective
Build an invoice generation system that creates professional PDF invoices with proper tax calculations and localization.

## Requirements

1. **Invoice Data**
   - Company details (logo, address, tax ID)
   - Customer billing info
   - Line items with quantity, unit price, total
   - Subtotal, tax breakdown, grand total
   - Payment terms and due date

2. **Tax Handling**
   - Support multiple tax rates (VAT, GST, Sales Tax)
   - Tax-inclusive vs tax-exclusive pricing
   - Tax exemption for certain customers
   - Per-line-item tax rate support

3. **PDF Generation**
   - Professional template with branding
   - Table of line items with proper alignment
   - QR code for payment (optional)
   - Invoice numbering (INV-2025-00001)

4. **API Endpoints**
   - `POST /invoices` - Create invoice
   - `GET /invoices/{id}` - Get invoice details
   - `GET /invoices/{id}/pdf` - Download PDF
   - `POST /invoices/{id}/send` - Email invoice to customer

## Technical Stack
- Python 3.11+
- FastAPI
- WeasyPrint or ReportLab for PDF
- Jinja2 for templates
- PostgreSQL

## Files to Create
- `app/services/invoice.py` - Invoice logic
- `app/services/pdf_generator.py` - PDF generation
- `app/services/tax_calculator.py` - Tax calculations
- `app/routers/invoices.py` - API endpoints
- `app/templates/invoice.html` - PDF template
- `app/models/invoice.py` - SQLAlchemy models

## Success Criteria
- [ ] PDF generated with all invoice details
- [ ] Tax calculations are accurate
- [ ] Invoice numbers are sequential and unique
- [ ] PDF renders correctly with line items table
- [ ] Email delivery works with attachment
