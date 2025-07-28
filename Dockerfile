# ---------- مرحلهٔ Build (با devDeps) ----------
FROM node:20-alpine AS builder
WORKDIR /app

# نصب همهٔ وابستگی‌ها برای Build
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# کپی سورس و Build
COPY . .
RUN npx prisma generate && npm run build

# ---------- مرحلهٔ نصب deps تولید (بدون devDeps) ----------
FROM node:20-alpine AS prod-deps
WORKDIR /app

COPY package*.json ./
# فقط production deps را نصب می‌کنیم؛ نیازی به prune نیست
RUN npm ci --omit=dev --legacy-peer-deps

# ---------- مرحلهٔ Runtime ----------
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# فقط چیزهای لازم برای اجرا
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder   /app/package*.json ./
COPY --from=builder   /app/prisma ./prisma
COPY --from=builder   /app/dist   ./dist

EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
