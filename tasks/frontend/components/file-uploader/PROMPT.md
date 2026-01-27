# Task: Drag-Drop File Uploader

## Objective
Build a file upload component with drag-drop, preview, and progress tracking.

## Requirements

1. **Upload Methods**
   - Drag and drop zone
   - Click to browse
   - Paste from clipboard
   - Multiple files

2. **File Handling**
   - File type validation
   - Size limit enforcement
   - Image preview generation
   - File icon for non-images

3. **Progress**
   - Upload progress bar
   - Cancel upload
   - Retry failed uploads
   - Success/error states

4. **UI**
   - Drag-over highlighting
   - File list with remove
   - Thumbnail previews
   - Responsive design

## Props Interface
```typescript
interface FileUploaderProps {
  accept?: string[];
  maxSize?: number;
  maxFiles?: number;
  onUpload: (files: File[]) => Promise<void>;
  onRemove?: (file: File) => void;
}
```

## Files to Create
- `components/FileUploader/FileUploader.tsx` - Main component
- `components/FileUploader/DropZone.tsx` - Drop area
- `components/FileUploader/FileList.tsx` - File list
- `components/FileUploader/FilePreview.tsx` - Preview item
- `hooks/useFileUpload.ts` - Upload hook

## Success Criteria
- [ ] Drag-drop works
- [ ] Validation enforced
- [ ] Previews generated
- [ ] Progress displayed
- [ ] Cancel/retry works
