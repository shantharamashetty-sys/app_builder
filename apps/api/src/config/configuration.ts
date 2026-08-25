// Typed env access via @nestjs/config's `load` option (see AppModule). No database
// connection is made from here — DATABASE_URL is only read, not connected to, until
// TypeOrmModule.forRoot is wired in Phase 2 (see CLAUDE.md, "apps/api backend contract").

export interface AppConfig {
  port: number
  databaseUrl: string | undefined
}

export default (): { app: AppConfig } => ({
  app: {
    port: Number(process.env.PORT) || 3000,
    databaseUrl: process.env.DATABASE_URL,
  },
})
