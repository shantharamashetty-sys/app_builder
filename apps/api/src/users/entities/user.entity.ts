import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

// Entity stub mirroring the `users` table in infrastructure/database/schema.sql.
// Not wired to a live connection yet — see the "apps/api backend contract" section
// in CLAUDE.md for why TypeOrmModule.forRoot isn't in AppModule.
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column({ unique: true })
  email!: string

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
