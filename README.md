# SaaS Backend

This project provides a multi-tenant SaaS backend built with **NestJS**, **Prisma** and **PostgreSQL**. It includes JWT authentication with role based access control, Swagger documentation and basic modules for managing users, sites and plans.

## Prerequisites

- Node.js v18+
- PostgreSQL database

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and adjust values.
3. Generate Prisma client and run the initial migration:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Seed the database:
   ```bash
   npm run seed
   ```
5. Start the development server:
   ```bash
   npm run start:dev
   ```

Swagger documentation will be available at `http://localhost:3000/docs`.
