# Task: Protocol Buffer Serialization

## Objective
Build a high-performance protobuf serialization library in Rust with JSON interop.

## Requirements

1. **Proto Schema**
   - Define message types for common entities
   - User, Order, Product, Event messages
   - Support nested messages
   - Support repeated fields and maps

2. **Serialization**
   - Serialize Rust structs to protobuf binary
   - Deserialize protobuf binary to Rust structs
   - Zero-copy deserialization where possible
   - Streaming support for large messages

3. **JSON Interop**
   - Convert protobuf to JSON
   - Convert JSON to protobuf
   - Handle field name mapping (camelCase vs snake_case)
   - Optional fields handling

4. **CLI Tool**
   - `proto encode --schema user.proto input.json output.bin`
   - `proto decode --schema user.proto input.bin output.json`
   - `proto validate --schema user.proto input.bin`

## Files to Create
- `src/main.rs` - CLI entry
- `src/schema/mod.rs` - Proto definitions
- `src/encoder.rs` - Serialization
- `src/decoder.rs` - Deserialization
- `src/json_interop.rs` - JSON conversion
- `protos/` - .proto files

## Success Criteria
- [ ] Binary serialization matches protobuf spec
- [ ] Deserialization is correct
- [ ] JSON roundtrip works
- [ ] Performance better than JSON for large data
- [ ] Streaming works for large messages
