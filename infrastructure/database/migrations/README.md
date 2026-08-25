Empty for now. Phase 2 will introduce a real migration tool (candidates: TypeORM
migrations generated from the entities in `apps/api/src/**/entities/`, or a standalone
tool like `node-pg-migrate`). Do not hand-write ad-hoc `.sql` migration files here until
that decision is made — `../schema.sql` is the single source of truth until then.
