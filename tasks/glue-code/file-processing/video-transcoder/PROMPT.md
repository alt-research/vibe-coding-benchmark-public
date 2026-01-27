# Task: Video Transcoder Service

## Objective
Build a video transcoding service using FFmpeg that converts videos to multiple formats and resolutions.

## Requirements

1. **Transcoding**
   - Multiple output formats (MP4, WebM, HLS)
   - Multiple resolutions (1080p, 720p, 480p)
   - Codec selection (H.264, H.265, VP9)
   - Audio transcoding (AAC, Opus)

2. **HLS Output**
   - Generate HLS playlist
   - Segment videos for streaming
   - Multiple quality variants
   - Master playlist

3. **Job Management**
   - Queue transcoding jobs
   - Progress tracking
   - Cancel running jobs
   - Webhook on completion

4. **API Endpoints**
   - `POST /transcode` - Start job
   - `GET /jobs/{id}` - Get status
   - `DELETE /jobs/{id}` - Cancel job
   - `GET /jobs/{id}/progress` - Stream progress

## Technical Stack
- Go 1.21+
- FFmpeg (exec wrapper)
- Redis for job queue
- S3 for input/output storage

## Files to Create
- `cmd/transcoder/main.go` - Entry point
- `internal/ffmpeg/transcoder.go` - FFmpeg wrapper
- `internal/ffmpeg/hls.go` - HLS generation
- `internal/jobs/queue.go` - Job queue
- `internal/handlers/transcode.go` - API handlers

## Success Criteria
- [ ] Videos transcode to MP4 correctly
- [ ] HLS output plays in browser
- [ ] Progress updates in real-time
- [ ] Jobs can be cancelled
- [ ] Multiple resolutions generated
