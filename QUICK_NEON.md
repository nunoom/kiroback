# ⚡ Neon DB - Setup Rápido (2 minutos)

## 1️⃣ Criar conta
👉 https://neon.tech → Sign Up (use GitHub)

## 2️⃣ Criar projeto
- Clique em "Create Project"
- Nome: `dropshipping-db`
- Região: escolha a mais próxima
- Clique em "Create"

## 3️⃣ Copiar Connection String
Você verá algo assim:
```
postgresql://alex:AbC123...@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Copie tudo!**

## 4️⃣ Colar no .env
Abra o arquivo `.env` e substitua:

```env
DATABASE_URL="cole_aqui_a_string_do_neon"
```

## 5️⃣ Rodar migrations
```bash
npx prisma migrate deploy
```

## 6️⃣ Popular dados (opcional)
```bash
npm run prisma:seed
```

## ✅ Pronto!
```bash
npm run start:dev
```

Seu app agora usa Neon DB! 🎉

---

## 🔄 Voltar para Docker local?

Edite `.env`:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/dropshipping_db?schema=public"
```

E rode:
```bash
docker-compose up -d
npx prisma migrate deploy
```

---

## 💡 Dica Pro

Crie dois arquivos:

**.env.local**
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/dropshipping_db?schema=public"
```

**.env.neon**
```env
DATABASE_URL="sua_string_do_neon"
```

Depois:
```bash
# Usar local
cp .env.local .env

# Usar Neon
cp .env.neon .env
```

---

## 📊 Neon Dashboard

Acesse: https://console.neon.tech

Lá você pode:
- Ver queries
- Monitorar uso
- Criar branches do banco
- Ver backups
- Gerenciar conexões

---

**Dúvidas? Veja [NEON_SETUP.md](NEON_SETUP.md) para guia completo**
