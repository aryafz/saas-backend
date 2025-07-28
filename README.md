# SaaS Backend

This project is a starter SaaS backend built with NestJS, Prisma and PostgreSQL. It provides multi-tenant foundations, JWT authentication with role based access control and Swagger documentation.

## Setup

1. Install dependencies
   ```bash
   npm install
   ```
2. Configure environment variables in `.env` (see `.env.example`).
3. Generate Prisma client and create migrations
   ```bash
   npx prisma generate
   npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/init.sql
   ```
4. Seed the database
   ```bash
   npm run seed
   ```
5. Run the server
   ```bash
   npm run start:dev
   ```

Swagger docs are available at `/api` when the server is running.
