# 🔧 مرحله Build: نصب، generate و build
FROM node:20-alpine AS builder
WORKDIR /app

# نصب پکیج‌ها
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# کپی بقیه فایل‌ها
COPY . .

# Prisma و Build
RUN npx prisma generate && npm run build

# ✅ بررسی پوشه dist
RUN ls -l dist && test -f dist/main.js

# 🔥 مرحله نهایی فقط با فایل‌های ضروری
FROM node:20-alpine
WORKDIR /app

# فقط چیزهای لازم رو می‌بریم به مرحله نهایی
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# اجرای نهایی
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
