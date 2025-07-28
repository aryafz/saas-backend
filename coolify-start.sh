#!/bin/sh
set -e

echo "--- Current directory is: ---"
pwd

echo "--- Listing all files in current directory: ---"
ls -la

echo "--- Running build command... ---"
npm run build

echo "--- Build finished. Listing all files AGAIN: ---"
ls -la

echo "--- Checking if 'dist' folder exists and listing its content: ---"
if [ -d "dist" ]; then
    ls -la dist
else
    echo "!!! ERROR: 'dist' folder NOT FOUND after build! !!!"
    exit 1
fi

echo "--- Running database migrations... ---"
npx prisma migrate deploy

echo "--- Starting application... ---"
node dist/main.js
