import { Module } from '@nestjs/common'

// Scaffold only — Phase 2. The frontend already has a full mock auth contract
// (apps/builder/src/hooks/useAuth.ts, apps/builder/src/services/authService.ts:
// login/signup/requestPasswordReset/logout). This module's future shape should
// mirror that contract once a real auth strategy is chosen (Passport+JWT? a
// managed provider?). No endpoints are implemented here yet — see CLAUDE.md's
// "apps/api backend contract" for why.
@Module({})
export class AuthModule {}
