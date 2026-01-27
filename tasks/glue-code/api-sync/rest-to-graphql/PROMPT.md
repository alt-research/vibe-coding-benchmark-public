# REST to GraphQL Adapter

Build a GraphQL API that wraps the JSONPlaceholder REST API.

## REST API (JSONPlaceholder)

Base URL: `https://jsonplaceholder.typicode.com`

Endpoints:
- `GET /users` - List all users
- `GET /users/:id` - Get user by ID
- `GET /posts` - List all posts
- `GET /posts/:id` - Get post by ID
- `GET /posts?userId=:id` - Get posts by user
- `GET /comments?postId=:id` - Get comments for post

## GraphQL Schema

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  username: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  body: String!
  author: User!
  comments: [Comment!]!
}

type Comment {
  id: ID!
  name: String!
  email: String!
  body: String!
  post: Post!
}

type Query {
  users: [User!]!
  user(id: ID!): User
  posts(userId: ID): [Post!]!
  post(id: ID!): Post
}
```

## Requirements

1. Use Apollo Server or graphql-yoga
2. Implement DataLoader for N+1 query prevention
3. Add response caching (5 minute TTL)
4. Handle errors gracefully
5. Add request logging

## Acceptance Criteria

- [ ] All queries resolve correctly
- [ ] Nested queries work (user.posts, post.comments)
- [ ] DataLoader batches requests
- [ ] Cache prevents redundant API calls
- [ ] Error handling for failed upstream requests
