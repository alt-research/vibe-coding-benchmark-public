# Task: High-Performance Image Resizer

## Objective
Build a high-performance image processing service in Rust for resizing, converting, and optimizing images.

## Requirements

1. **Operations**
   - Resize (fit, fill, cover)
   - Crop (center, smart)
   - Format conversion (JPEG, PNG, WebP, AVIF)
   - Quality adjustment
   - Strip metadata

2. **Performance**
   - Process images in memory
   - SIMD acceleration
   - Parallel processing
   - Streaming for large images

3. **API**
   - `POST /process` - Process image
   - Query params: width, height, format, quality
   - Accept file upload or URL
   - Return processed image

4. **Presets**
   - Thumbnail: 150x150, crop center
   - Preview: 800x600, fit
   - Full: max 2000px, preserve aspect
   - Configurable custom presets

## Technical Stack
- Rust 1.70+
- image crate or libvips bindings
- Actix-web or Axum
- Tokio for async

## Files to Create
- `src/main.rs` - HTTP server
- `src/processor/mod.rs` - Image processor
- `src/processor/resize.rs` - Resize operations
- `src/processor/convert.rs` - Format conversion
- `src/handlers/process.rs` - HTTP handlers
- `src/presets.rs` - Preset definitions

## Success Criteria
- [ ] Resize works correctly
- [ ] Format conversion works
- [ ] WebP output is optimized
- [ ] Processes 100+ images/sec
- [ ] Memory usage stays bounded
