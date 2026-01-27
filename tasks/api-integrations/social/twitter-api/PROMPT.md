# Task: Twitter API Integration

## Objective
Integrate Twitter API v2 for posting and monitoring.

## Requirements

1. **Posting**
   - Create tweets
   - Reply to tweets
   - Quote tweets
   - Delete tweets

2. **Media**
   - Upload images
   - Upload videos
   - Alt text for images

3. **Monitoring**
   - Search tweets
   - Get mentions
   - Stream tweets
   - User timeline

4. **API**
   - `POST /twitter/tweet` - Create tweet
   - `GET /twitter/mentions` - Get mentions
   - `GET /twitter/search` - Search tweets

## Files to Create
- `app/services/twitter.py` - Twitter client
- `app/services/media.py` - Media uploads
- `app/services/monitoring.py` - Mention monitoring
- `app/routers/twitter.py` - API endpoints

## Success Criteria
- [ ] Tweets posted successfully
- [ ] Media uploads work
- [ ] Mentions retrieved
- [ ] Search works
- [ ] Rate limits handled
