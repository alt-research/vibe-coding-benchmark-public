# Task: Project Gantt Chart

## Objective
Build an interactive Gantt chart for project timeline visualization.

## Requirements

1. **Timeline**
   - Day/week/month views
   - Zoom in/out
   - Today marker
   - Scroll synchronization

2. **Tasks**
   - Task bars with duration
   - Drag to move tasks
   - Resize to change duration
   - Dependencies (arrows)

3. **Hierarchy**
   - Parent/child tasks
   - Collapsible groups
   - Summary bars
   - Progress indicators

4. **Interactivity**
   - Click to edit
   - Drag to link tasks
   - Context menu
   - Keyboard navigation

## Data Structure
```typescript
interface GanttTask {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress: number;
  dependencies: string[];
  parentId?: string;
}
```

## Files to Create
- `components/Gantt/GanttChart.tsx` - Main component
- `components/Gantt/Timeline.tsx` - Time header
- `components/Gantt/TaskList.tsx` - Left sidebar
- `components/Gantt/TaskBar.tsx` - Task bar
- `components/Gantt/Dependencies.tsx` - Dependency lines

## Success Criteria
- [ ] Tasks display correctly
- [ ] Drag to move works
- [ ] Dependencies render
- [ ] View switching works
- [ ] Progress shows correctly
