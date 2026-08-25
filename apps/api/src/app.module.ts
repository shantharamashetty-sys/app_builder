import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { HealthModule } from './health/health.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ProjectsModule } from './projects/projects.module'
import { AiModule } from './ai/ai.module'
import { FilesModule } from './files/files.module'
import { PreviewModule } from './preview/preview.module'
import { DeploymentsModule } from './deployments/deployments.module'

// TypeOrmModule.forRoot(...) is intentionally NOT imported here yet — see the
// "apps/api backend contract" section in CLAUDE.md. Wiring it requires a live
// Postgres reachable at boot (docker-compose up postgres + a real DATABASE_URL),
// which would break `npm run dev:api` in any environment without that container
// running. That's the explicit next (Phase 2) step.
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    HealthModule,
    AuthModule,
    UsersModule,
    ProjectsModule,
    AiModule,
    FilesModule,
    PreviewModule,
    DeploymentsModule,
  ],
})
export class AppModule {}
