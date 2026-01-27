# Task: Content Recommendation Engine

## Objective
Build a recommendation engine using embeddings to suggest similar content to users.

## Requirements

1. **Content Indexing**
   - Index content items (articles, products)
   - Generate embeddings for content
   - Update embeddings on content change
   - Handle content metadata

2. **User Modeling**
   - Track user interactions
   - Build user preference vector
   - Combine viewed/liked item embeddings
   - Decay old interactions

3. **Recommendations**
   - Similar to current item
   - Based on user history
   - Trending + personalized mix
   - Filter already seen

4. **API**
   - `POST /items` - Index item
   - `GET /recommend/similar/{id}` - Similar items
   - `GET /recommend/user/{id}` - User recommendations
   - `POST /interactions` - Record interaction

## Technical Stack
- Go 1.21+
- OpenAI Embeddings API
- Redis for user vectors
- pgvector for content

## Files to Create
- `cmd/recommender/main.go` - Entry point
- `internal/embeddings/client.go` - Embedding API
- `internal/recommender/similar.go` - Similar items
- `internal/recommender/personal.go` - Personalized
- `internal/user/profile.go` - User modeling
- `internal/handlers/api.go` - HTTP handlers

## Success Criteria
- [ ] Content indexed with embeddings
- [ ] Similar items are relevant
- [ ] User preferences captured
- [ ] Personalized recs improve
- [ ] Already seen items filtered
