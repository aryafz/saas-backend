# SaaS Backend

This project provides a multi-tenant SaaS backend built with **NestJS**, **Prisma** and **PostgreSQL**. It includes JWT authentication with role based access control, Swagger documentation and basic modules for managing users, sites and plans.

## Prerequisites

- Node.js v18+
- PostgreSQL database

## Runbook

```bash
npm ci
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run start:dev
```

### Swagger

<http://localhost:3000/docs>
