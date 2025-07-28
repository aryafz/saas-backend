#!/bin/sh
set -e

echo "--- Running Build ---"
npm run build

echo "--- Running Database Migrations ---"
npx prisma migrate deploy

echo "--- Starting Application ---"
node dist/main.js
