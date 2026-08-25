import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

// Unwired stub — mirrors the `app_versions` table in
// infrastructure/database/schema.sql. Not referenced by any service or controller
// yet: versioning semantics (what triggers a new version, diffing, rollback) aren't
// decided. Do not add a /projects/:id/versions endpoint until they are — see the
// "projects" row in CLAUDE.md's apps/api module tier table.
@Entity('app_versions')
export class AppVersionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'project_id' })
  projectId!: string

  @Column({ name: 'version_number' })
  versionNumber!: number

  @Column({ name: 'schema_snapshot', type: 'jsonb' })
  schemaSnapshot!: Record<string, unknown>

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date
}
