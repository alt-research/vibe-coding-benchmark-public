# Task: WYSIWYG Rich Text Editor

## Objective
Build a rich text editor with Vue 3 and Tiptap supporting common formatting and embeds.

## Requirements

1. **Text Formatting**
   - Bold, italic, underline, strikethrough
   - Headings (H1-H6)
   - Lists (bullet, numbered, checklist)
   - Blockquotes
   - Code blocks with syntax highlighting

2. **Media & Embeds**
   - Image upload and resize
   - YouTube/Vimeo embeds
   - Link insertion with preview
   - Tables with editing

3. **Toolbar**
   - Floating toolbar on selection
   - Fixed toolbar option
   - Keyboard shortcuts
   - Undo/redo

4. **Output**
   - HTML output
   - JSON (Tiptap format)
   - Markdown export
   - Plain text

## Files to Create
- `components/Editor/Editor.vue` - Main editor
- `components/Editor/Toolbar.vue` - Toolbar
- `components/Editor/FloatingMenu.vue` - Floating menu
- `components/Editor/extensions/` - Custom extensions
- `composables/useEditor.ts` - Editor composable

## Success Criteria
- [ ] All formatting works
- [ ] Images upload and display
- [ ] Tables are editable
- [ ] Keyboard shortcuts work
- [ ] Output formats correct
