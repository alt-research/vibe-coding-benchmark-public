# Task: Bidirectional JSON/XML Converter

## Objective
Build a Go tool that converts between JSON and XML while preserving data types and structure.

## Requirements

1. **JSON to XML**
   - Objects become elements
   - Arrays become repeated elements
   - Preserve attribute hints (@attr)
   - Handle namespaces
   - Pretty print or minified output

2. **XML to JSON**
   - Elements become object keys
   - Attributes become @attr keys
   - Text content becomes #text
   - Handle mixed content
   - Preserve order where possible

3. **Type Preservation**
   - Numbers stay numbers
   - Booleans stay booleans
   - Nulls are explicit
   - Arrays vs single elements

4. **CLI Interface**
   - `converter json2xml input.json output.xml`
   - `converter xml2json input.xml output.json`
   - `--pretty` for formatted output
   - `--schema` for validation

## Files to Create
- `cmd/converter/main.go` - CLI entry
- `internal/json2xml/convert.go` - JSON to XML
- `internal/xml2json/convert.go` - XML to JSON
- `internal/types/node.go` - Common types

## Success Criteria
- [ ] JSON→XML→JSON roundtrip preserves data
- [ ] XML→JSON→XML roundtrip preserves data
- [ ] Attributes handled correctly
- [ ] Namespaces preserved
- [ ] Arrays vs single elements distinguished
