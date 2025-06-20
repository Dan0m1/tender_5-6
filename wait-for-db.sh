#!/bin/bash

# Ждем, пока база данных будет доступна на порту 5432
until nc -z -v -w30 db 5432; do
  echo "Waiting for database connection..."
  sleep 1
done

# Когда база данных доступна, выполняем миграции и запускаем приложение
echo "Database is up, running prisma db push"
npx prisma db push

# Запускаем приложение
node dist/main