# 🚀 Setup Neon DB

## Passo a Passo

### 1. Criar conta no Neon
1. Acesse https://neon.tech
2. Clique em "Sign Up" (pode usar GitHub)
3. Crie um novo projeto
4. Escolha a região mais próxima (ex: US East)

### 2. Obter Connection String
Após criar o projeto, você verá:
```
postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Copie essa string!**

### 3. Configurar no projeto

Edite o arquivo `.env` e substitua a `DATABASE_URL`:

```env
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

### 4. Executar Migrations

```bash
# Aplicar migrations no Neon
npx prisma migrate deploy

# Ou criar nova migration
npx prisma migrate dev
```

### 5. Popular com dados (opcional)

```bash
npm run prisma:seed
```

### 6. Verificar

```bash
# Ver banco no Prisma Studio
npm run prisma:studio
```

## ✅ Pronto!

Agora seu banco está no Neon e você pode:
- Desenvolver localmente conectado ao Neon
- Fazer deploy da aplicação
- Acessar de qualquer lugar

## 🔒 Segurança

**IMPORTANTE:**
- ❌ Nunca commite o `.env` com a connection string
- ✅ Use variáveis de ambiente em produção
- ✅ O `.env` já está no `.gitignore`

## 💡 Dicas

### Usar Neon em produção e Docker local

Crie dois arquivos:

**.env.local** (Docker):
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/dropshipping_db?schema=public"
```

**.env.production** (Neon):
```env
DATABASE_URL="postgresql://username:password@ep-xxx.neon.tech/neondb?sslmode=require"
```

Depois use:
```bash
# Local
cp .env.local .env
npm run start:dev

# Production
cp .env.production .env
npm run build
npm start
```

## 📊 Vantagens do Neon

✅ **Gratuito** até 10GB  
✅ **Serverless** - escala automaticamente  
✅ **Branching** - crie branches do banco  
✅ **Backups** automáticos  
✅ **SSL** por padrão  
✅ **Rápido** - baixa latência  

## 🔗 Links Úteis

- Dashboard: https://console.neon.tech
- Docs: https://neon.tech/docs
- Prisma + Neon: https://neon.tech/docs/guides/prisma

## ⚠️ Troubleshooting

### Erro de conexão SSL
Certifique-se que a connection string tem `?sslmode=require`

### Timeout
Neon pode hibernar após inatividade. A primeira conexão pode demorar ~1s.

### Migration falhou
```bash
# Resetar e tentar novamente
npx prisma migrate reset
npx prisma migrate deploy
```

## 🎯 Próximos Passos

Depois de configurar o Neon:
1. Teste localmente
2. Faça deploy da aplicação (Railway, Render, Vercel)
3. Configure as variáveis de ambiente no serviço de deploy
4. Pronto! 🚀
