# ---------- مرحلهٔ Build (با devDeps) ----------
FROM node:20-alpine AS builder
WORKDIR /app

# نصب همهٔ وابستگی‌ها برای Build
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# کپی سورس و Build
COPY . .
# اگر seed.ts داری، با tsconfig.build.json که exclude کرده بیلد می‌شود
RUN npx prisma generate && npm run build

# ---------- مرحلهٔ نصب deps تولید (بدون devDeps) ----------
FROM node:20-alpine AS prod-deps
WORKDIR /app

# فقط production deps را نصب می‌کنیم
COPY package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps

# حتماً schema را هم داشته باشیم، بعد generate بزنیم
COPY prisma ./prisma
RUN npx prisma generate

# ---------- مرحلهٔ Runtime ----------
FROM node:20-alpine
RUN apk add --no-cache curl
WORKDIR /app
ENV NODE_ENV=production

# فقط چیزهای لازم برای اجرا
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/prisma       ./prisma
COPY --from=builder   /app/package*.json ./
COPY --from=builder   /app/dist         ./dist

EXPOSE 3000
# برای اطمینان می‌توانی generate را هم موقع استارت بگذاری (اختیاری)
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
# اگر بخواهی ضدضربه‌تر شود:
# CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node dist/main.js"]
