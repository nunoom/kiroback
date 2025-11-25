# ⚡ Deploy Render - Guia Rápido (5 minutos)

## ✅ Pré-requisitos
- Código no GitHub
- Neon DB configurado

---

## 🚀 Passos

### 1. Preparar código
```bash
git add .
git commit -m "Deploy to Render"
git push origin main
```

### 2. Criar Web Service
1. Acesse https://dashboard.render.com
2. Clique **"New +"** → **"Web Service"**
3. Conecte seu GitHub
4. Selecione o repositório

### 3. Configurar

**Build Command:**
```
npm install && npm run build && npx prisma generate && npx prisma migrate deploy
```

**Start Command:**
```
npm start
```

### 4. Variáveis de Ambiente

Adicione estas variáveis:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Sua connection string do Neon |
| `JWT_SECRET` | Seu secret (32+ caracteres) |
| `NODE_ENV` | `production` |

### 5. Deploy!
Clique **"Create Web Service"**

Aguarde 3-5 minutos...

### 6. Testar
```bash
curl https://seu-app.onrender.com/products
```

---

## 🎉 Pronto!

Sua API está no ar em:
```
https://seu-app.onrender.com
```

Swagger:
```
https://seu-app.onrender.com/api
```

---

## 📝 Notas

- ⚠️ Primeira requisição pode demorar (cold start)
- ✅ Deploy automático no push
- ✅ SSL grátis
- ✅ 750h/mês grátis

---

## 🔄 Atualizar

Basta fazer push:
```bash
git add .
git commit -m "Update"
git push
# Deploy automático!
```

---

**Guia completo:** [RENDER_DEPLOY.md](RENDER_DEPLOY.md)
