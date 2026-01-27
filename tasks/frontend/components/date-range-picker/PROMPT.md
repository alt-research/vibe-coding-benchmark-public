# Task: Date Range Picker

## Objective
Build a date range picker component with Svelte supporting presets and comparison.

## Requirements

1. **Calendar UI**
   - Two-month view
   - Month/year navigation
   - Week starts configurable
   - Today highlighting

2. **Range Selection**
   - Click start, click end
   - Hover preview of range
   - Min/max date limits
   - Disabled dates

3. **Presets**
   - Today
   - Last 7 days
   - Last 30 days
   - This month
   - Custom range

4. **Advanced**
   - Compare with previous period
   - Time selection (optional)
   - Timezone support
   - Localization

## Props
```typescript
interface DateRangePickerProps {
  value: { start: Date; end: Date };
  onChange: (range: { start: Date; end: Date }) => void;
  minDate?: Date;
  maxDate?: Date;
  presets?: Preset[];
  compare?: boolean;
}
```

## Files to Create
- `lib/DateRangePicker.svelte` - Main component
- `lib/Calendar.svelte` - Calendar grid
- `lib/Presets.svelte` - Preset buttons
- `lib/stores/dateStore.ts` - State management
- `lib/utils/dates.ts` - Date utilities

## Success Criteria
- [ ] Range selection works
- [ ] Presets work correctly
- [ ] Min/max enforced
- [ ] Localization works
- [ ] Compare mode works
