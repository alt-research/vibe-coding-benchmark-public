# Task: Chart Data Extractor

## Objective
Build a service that extracts underlying data from chart images using vision LLMs.

## Requirements

1. **Chart Types**
   - Bar charts
   - Line charts
   - Pie charts
   - Scatter plots
   - Tables

2. **Data Extraction**
   ```typescript
   interface ChartData {
     title: string;
     type: 'bar' | 'line' | 'pie' | 'scatter' | 'table';
     xAxis?: { label: string; values: string[] };
     yAxis?: { label: string; unit?: string };
     series: Array<{
       name: string;
       data: Array<{ x: string | number; y: number }>;
     }>;
     insights: string[];
   }
   ```

3. **Features**
   - Identify chart type
   - Extract axis labels
   - Extract data points
   - Generate insights
   - Export to CSV/JSON

4. **API**
   - `POST /extract` - Extract chart data
   - `POST /analyze` - Analyze and describe
   - `POST /export` - Export as CSV

## Technical Stack
- TypeScript/Node.js
- OpenAI Vision API
- Express or Hono
- Sharp for preprocessing

## Files to Create
- `src/services/vision.ts` - Vision API client
- `src/services/extractor.ts` - Data extraction
- `src/services/analyzer.ts` - Chart analysis
- `src/exporters/csv.ts` - CSV export
- `src/routes/charts.ts` - API endpoints

## Success Criteria
- [ ] Chart type identified
- [ ] Data points extracted accurately
- [ ] Axis labels captured
- [ ] CSV export works
- [ ] Handles various chart styles
