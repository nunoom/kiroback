#!/usr/bin/env bash
# exit on error
set -o errexit

echo "📦 Instalando dependências..."
npm install

echo "🔨 Compilando TypeScript..."
npm run build

echo "🔧 Gerando Prisma Client..."
npx prisma generate

echo "🗄️ Executando migrations..."
npx prisma migrate deploy

echo "✅ Build concluído!"
