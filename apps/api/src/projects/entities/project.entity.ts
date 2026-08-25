import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

// Entity stub mirroring the `projects` table in infrastructure/database/schema.sql.
// Not wired to a live connection yet — see CLAUDE.md's "apps/api backend contract".
@Entity('projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'owner_id' })
  ownerId!: string

  @Column()
  name!: string

  @Column({ nullable: true })
  description?: string

  @Column({ default: 'draft' })
  status!: string

  @Column({ name: 'accent_color', nullable: true })
  accentColor?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
