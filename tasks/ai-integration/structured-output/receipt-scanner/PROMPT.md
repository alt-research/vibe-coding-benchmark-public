# Task: Receipt Scanner with OCR + LLM

## Objective
Build a receipt scanner that extracts structured data from receipt images using OCR and LLM.

## Requirements

1. **Image Processing**
   - Accept JPEG, PNG images
   - Handle rotated/skewed images
   - Support various receipt formats
   - Multi-receipt in one image

2. **Data Extraction**
   ```typescript
   interface Receipt {
     merchant: {
       name: string;
       address?: string;
       phone?: string;
     };
     date: string; // ISO 8601
     items: Array<{
       name: string;
       quantity: number;
       unitPrice: number;
       totalPrice: number;
     }>;
     subtotal: number;
     tax: number;
     total: number;
     paymentMethod?: string;
   }
   ```

3. **LLM Integration**
   - Use vision model (GPT-4V, Claude Vision)
   - Or OCR + text LLM pipeline
   - Validate extracted amounts (sum check)
   - Handle unclear/damaged receipts

4. **API**
   - `POST /scan` - Upload receipt image
   - Return structured receipt data
   - Include confidence score

## Technical Stack
- TypeScript/Node.js
- Express or Hono
- OpenAI Vision API or Tesseract + LLM
- Sharp for image preprocessing

## Files to Create
- `src/routes/scan.ts` - API endpoint
- `src/services/ocr.ts` - OCR processing
- `src/services/parser.ts` - LLM parsing
- `src/services/validator.ts` - Data validation
- `src/types/receipt.ts` - Type definitions

## Success Criteria
- [ ] Receipt images processed correctly
- [ ] All line items extracted
- [ ] Totals match sum of items
- [ ] Date parsed correctly
- [ ] Handles various receipt formats
