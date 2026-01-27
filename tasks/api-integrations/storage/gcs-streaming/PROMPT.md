# Task: GCS Streaming Upload

## Objective
Implement streaming upload of large files to Google Cloud Storage.

## Requirements

1. **Streaming Upload**
   - Chunked uploads
   - Progress tracking
   - Resume interrupted uploads
   - Concurrent chunks

2. **Resumable Uploads**
   - Initialize upload session
   - Upload in parts
   - Resume from offset
   - Complete upload

3. **API**
   - `POST /uploads/init` - Start upload
   - `PUT /uploads/{id}` - Upload chunk
   - `POST /uploads/{id}/complete` - Finalize
   - `GET /uploads/{id}/status` - Get progress

4. **Features**
   - Handle network failures
   - Checksum verification
   - Metadata setting
   - Lifecycle policies

## Files to Create
- `app/services/gcs.py` - GCS client
- `app/services/streaming.py` - Streaming logic
- `app/routers/uploads.py` - API endpoints
- `app/models/upload.py` - Upload tracking

## Success Criteria
- [ ] Large files upload correctly
- [ ] Progress trackable
- [ ] Resume works after failure
- [ ] Checksums verified
- [ ] Metadata preserved
