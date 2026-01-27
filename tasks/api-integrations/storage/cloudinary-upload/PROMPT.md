# Task: Cloudinary Image Management

## Objective
Integrate Cloudinary for image uploads with transformations and optimization.

## Requirements

1. **Upload**
   - Direct upload from browser
   - Server-side upload
   - Upload presets
   - Folder organization

2. **Transformations**
   - Resize and crop
   - Format conversion (WebP)
   - Quality optimization
   - Face detection crop

3. **URL Generation**
   - Signed URLs
   - Transformation URLs
   - Responsive srcset
   - Placeholder images

4. **Management**
   - Delete images
   - Rename/move
   - Tagging
   - Search by tags

## Files to Create
- `src/services/cloudinary.ts` - Cloudinary client
- `src/services/transforms.ts` - Transform helpers
- `src/routes/images.ts` - API endpoints
- `src/utils/url-builder.ts` - URL generation

## Success Criteria
- [ ] Images upload correctly
- [ ] Transformations apply
- [ ] WebP delivery works
- [ ] Responsive URLs generated
- [ ] Deletion works
