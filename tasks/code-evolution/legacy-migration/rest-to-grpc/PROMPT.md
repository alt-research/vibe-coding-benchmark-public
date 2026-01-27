# Task: REST to gRPC Migration

## Objective
Migrate a REST API to gRPC while maintaining REST compatibility.

## Given Code
- REST handlers in Go
- JSON request/response
- HTTP status codes

## Requirements

1. **Proto Definitions**
   - Define service proto files
   - Message types from JSON schemas
   - RPC methods from REST endpoints
   - Proper field types

2. **gRPC Server**
   - Implement gRPC service
   - Server streaming where appropriate
   - Error handling with status codes
   - Interceptors for logging/auth

3. **gRPC-Gateway**
   - REST compatibility layer
   - HTTP/JSON transcoding
   - Same REST paths work
   - OpenAPI generation

4. **Client**
   - Go gRPC client
   - Connection pooling
   - Retry logic
   - Deadline propagation

## Files to Create
- `proto/*.proto` - Proto definitions
- `internal/grpc/server.go` - gRPC server
- `internal/grpc/gateway.go` - REST gateway

## Success Criteria
- [ ] Proto files compile
- [ ] gRPC service works
- [ ] REST still works via gateway
- [ ] Same behavior as before
- [ ] Performance improved
