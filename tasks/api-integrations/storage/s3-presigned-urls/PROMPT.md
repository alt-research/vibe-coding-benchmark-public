# Task: S3 Presigned URL Uploads

## Objective
Implement secure file uploads using S3 presigned URLs with validation.

## Requirements

1. **Upload Flow**
   - Request presigned upload URL
   - Validate file type and size
   - Upload directly to S3
   - Confirm upload completion

2. **Security**
   - Content-Type restriction
   - Size limit enforcement
   - Expiration time
   - Path prefix per user

3. **Endpoints**
   - `POST /uploads/presign` - Get presigned URL
   - `POST /uploads/confirm` - Confirm upload
   - `GET /uploads/{id}` - Get download URL

4. **Download**
   - Generate presigned download URL
   - Configurable expiration
   - Content-Disposition header

## Files to Create
- `internal/s3/client.go` - S3 client
- `internal/s3/presigned.go` - Presigned logic
- `internal/handlers/uploads.go` - HTTP handlers
- `internal/validators/file.go` - Validation

## Success Criteria
- [ ] Presigned URLs generated
- [ ] Direct upload to S3 works
- [ ] Invalid types rejected
- [ ] Size limits enforced
- [ ] Downloads work correctly
