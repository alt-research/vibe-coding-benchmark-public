# Task: Real-time Streaming Charts

## Objective
Build real-time updating charts that display streaming data via WebSocket.

## Requirements

1. **Chart Types**
   - Line chart (time series)
   - Area chart
   - Bar chart (updating)
   - Gauge/meter

2. **Real-time Features**
   - WebSocket data connection
   - Smooth transitions
   - Rolling window (keep last N points)
   - Pause/resume updates

3. **Interactivity**
   - Hover tooltips
   - Click to zoom
   - Time range selection
   - Export snapshot

4. **Performance**
   - Handle 100+ updates/second
   - Canvas rendering for performance
   - Debounced re-renders

## Files to Create
- `components/RealtimeChart/LineChart.tsx` - Line chart
- `components/RealtimeChart/AreaChart.tsx` - Area chart
- `components/RealtimeChart/Gauge.tsx` - Gauge meter
- `hooks/useRealtimeData.ts` - WebSocket hook
- `lib/chartUtils.ts` - Chart utilities

## Success Criteria
- [ ] Charts update smoothly
- [ ] Handles high update frequency
- [ ] Tooltips work during updates
- [ ] Memory stable over time
- [ ] Pause/resume works
