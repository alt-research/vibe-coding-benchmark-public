# Dynamic Form Builder

Build a drag-and-drop form builder that allows users to create custom forms visually.

## Features

### Field Types
- Text input (single line)
- Textarea (multi-line)
- Number input
- Email input
- Phone input
- Date picker
- Dropdown select
- Multi-select
- Radio buttons
- Checkboxes
- File upload
- Signature pad
- Section header
- Paragraph text

### Field Properties
- Label
- Placeholder
- Help text
- Required toggle
- Validation rules (min/max, pattern, custom)
- Conditional visibility
- Default value
- CSS class override

### Builder Features
1. **Drag & Drop** - Reorder fields by dragging
2. **Live Preview** - Real-time form preview
3. **Field Settings** - Click to edit field properties
4. **Multi-column** - Support 1, 2, or 3 column layouts
5. **Undo/Redo** - History navigation
6. **Templates** - Save and load form templates

## Technical Requirements

### Form Schema (JSON)
```typescript
interface FormSchema {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  settings: {
    columns: 1 | 2 | 3;
    submitText: string;
    showProgress: boolean;
  };
}

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  name: string;
  required: boolean;
  placeholder?: string;
  helpText?: string;
  validation?: ValidationRule[];
  options?: { label: string; value: string }[];
  conditional?: {
    field: string;
    operator: 'equals' | 'not_equals' | 'contains';
    value: string;
  };
}
```

### Components
- `<FormBuilder />` - Main builder canvas
- `<FieldPalette />` - Draggable field types
- `<FieldEditor />` - Property panel
- `<FormPreview />` - Live preview
- `<FormRenderer />` - Renders saved forms

### Libraries
- Use `@dnd-kit/core` for drag and drop
- Use `react-hook-form` + `zod` for form handling
- Use Tailwind CSS for styling

## Acceptance Criteria

- [ ] All field types render correctly
- [ ] Drag and drop reordering works
- [ ] Field properties save correctly
- [ ] Validation rules apply in preview
- [ ] Export produces valid JSON schema
- [ ] Import loads existing schemas
- [ ] Responsive on tablet+
- [ ] Keyboard accessible
