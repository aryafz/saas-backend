# --- مرحله اول: کارگاه ساخت (Builder) ---
FROM node:20-alpine AS builder

# مشخص کردن پوشه کاری
WORKDIR /app

# کپی کردن فایل های پکیج
COPY package*.json ./

# نصب پکیج ها با دستور ضدخطای ما
RUN npm ci --legacy-peer-deps

# کپی کردن تمام کدهای پروژه
COPY . .

# ساختن پوشه نهایی 'dist'
RUN npm run build

# --- مرحله دوم: ویترین نمایش (Runner) ---
FROM node:20-alpine

WORKDIR /app

# کپی کردن فایل های پکیج برای نصب فقط پکیج های اجرایی
COPY package*.json ./
RUN npm ci --legacy-peer-deps --omit=dev

# کپی کردن پوشه 'dist' و 'prisma' از کارگاه ساخت
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# تعریف دستور نهایی برای روشن شدن قلعه
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
