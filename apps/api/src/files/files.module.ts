import { Module } from '@nestjs/common'

// Scaffold only — Phase 2. Subfolders (validators/, processors/, storage/) are
// reserved for upload validation, per-type processing (pdf/document/audio), and
// the storage backend — none of which is decided yet (local disk under
// generated/? S3? something else?). No upload endpoint is implemented here until
// that decision is made.
@Module({})
export class FilesModule {}
