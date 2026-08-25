import { Module } from '@nestjs/common'

// Scaffold only — Phase 2. Subfolders (prompts/, generation/{pipeline,generators,
// validators}/) are reserved for the AI orchestration pipeline described in
// CLAUDE.md's "App Schema philosophy": prompt -> AppSchema -> code, never
// prompt -> code directly. No logic is implemented yet, and no endpoint (e.g.
// POST /ai/generate) should be added here until a real AI provider and pipeline
// design exist — a canned response would be exactly the kind of disconnected,
// half-finished feature this scaffold intentionally avoids.
@Module({})
export class AiModule {}
