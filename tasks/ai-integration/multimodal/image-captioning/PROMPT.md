# Task: Image Caption Generator

## Objective
Build an image captioning service using vision-language models.

## Requirements

1. **Image Input**
   - Accept image uploads
   - Accept image URLs
   - Support JPEG, PNG, WebP
   - Handle various sizes

2. **Caption Generation**
   - Descriptive captions
   - Configurable style (brief, detailed)
   - Multiple captions per image
   - Language selection

3. **Additional Features**
   - Object detection/listing
   - Scene classification
   - Text extraction (OCR)
   - Alt-text optimization

4. **API**
   - `POST /caption` - Generate caption
   - `POST /describe` - Detailed description
   - `POST /objects` - List objects
   - `POST /batch` - Batch processing

## Technical Stack
- Python 3.11+
- FastAPI
- OpenAI Vision API or BLIP-2
- Pillow for image processing

## Files to Create
- `app/services/vision.py` - Vision model client
- `app/services/captioner.py` - Caption generation
- `app/services/analyzer.py` - Image analysis
- `app/routers/images.py` - API endpoints

## Success Criteria
- [ ] Captions are accurate
- [ ] Style variations work
- [ ] Objects detected correctly
- [ ] Various formats handled
- [ ] Batch processing works
