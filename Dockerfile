# ----------- Build Stage -----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build TypeScript project
RUN npm run build

# ----------- Production Stage -----------
FROM node:20-alpine

WORKDIR /app

# Install only production dependencies (for safety)
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy built source and prisma files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expose the desired port (default: 3000)
EXPOSE 3000

# Run Prisma migration before starting app
CMD npx prisma migrate deploy && node dist/main.js
