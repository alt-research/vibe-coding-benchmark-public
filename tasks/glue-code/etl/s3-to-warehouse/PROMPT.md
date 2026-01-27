# Task: S3 to Data Warehouse Loader

## Objective
Build an ETL pipeline in Go that loads files from S3 into a data warehouse (PostgreSQL/Redshift).

## Requirements

1. **S3 Source**
   - List files in S3 bucket/prefix
   - Support multiple formats: CSV, JSON, Parquet
   - Handle partitioned data (year=2025/month=01/)
   - Track processed files to avoid reprocessing

2. **Data Loading**
   - Schema inference from files
   - Create tables if not exist
   - Bulk COPY for performance
   - Handle schema evolution

3. **Processing**
   - Parallel file processing
   - Memory-efficient streaming
   - Error handling per file
   - Dead letter queue for failed files

4. **CLI Interface**
   - `loader run --source s3://bucket/path --target warehouse.table`
   - `loader status` - Show processing status
   - `loader retry` - Retry failed files

## Technical Stack
- Go 1.21+
- AWS SDK v2
- PostgreSQL (or Redshift compatible)
- Parquet-go for Parquet files

## Files to Create
- `cmd/loader/main.go` - CLI entry
- `internal/source/s3.go` - S3 reader
- `internal/parser/csv.go` - CSV parser
- `internal/parser/parquet.go` - Parquet parser
- `internal/loader/warehouse.go` - DB loader
- `internal/state/tracker.go` - State tracking

## Success Criteria
- [ ] CSV files loaded correctly
- [ ] Parquet files loaded correctly
- [ ] Partitioned data handled
- [ ] Files not reprocessed
- [ ] Failed files tracked for retry
