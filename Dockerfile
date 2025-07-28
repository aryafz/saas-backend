FROM node:20-alpine

WORKDIR /app

# کپی کردن تمام فایل‌های ضروری
COPY package*.json ./
COPY prisma ./prisma
COPY src ./src
COPY tsconfig*.json ./
COPY nest-cli.json ./

# نصب تمام پکیج‌ها
RUN npm ci --legacy-peer-deps

# ساختن نقشه قطعات پریزما
RUN npx prisma generate

# ساختن پروژه و پوشه 'dist'
RUN npm run build

# باز کردن دروازه قلعه
EXPOSE 3000

# دستور نهایی برای روشن شدن و کار کردن قلعه
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
