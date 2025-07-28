FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY src ./src
COPY tsconfig*.json ./
COPY nest-cli.json ./

RUN npm ci --legacy-peer-deps
RUN npx prisma generate
RUN npm run build

# --- مرحله بازرسی نهایی ---
# از کل محتویات پوشه /app یک گزارش کامل تهیه کن
RUN ls -R /app
