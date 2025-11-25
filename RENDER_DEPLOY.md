# 🚀 Deploy no Render com Neon DB

## Pré-requisitos
- ✅ Conta no Render (https://render.com)
- ✅ Banco de dados no Neon configurado
- ✅ Código no GitHub/GitLab

---

## 📋 Passo a Passo

### 1️⃣ Preparar o Projeto

#### A. Criar arquivo de build

Crie o arquivo `render-build.sh` na raiz do projeto:

```bash
#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build
npx prisma generate
npx prisma migrate deploy
```

#### B. Atualizar package.json

Adicione o script de build:
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/main.js",
    "start:dev": "ts-node src/main.ts",
    "render-build": "bash render-build.sh"
  }
}
```

#### C. Commitar e fazer push

```bash
git add .
git commit -m "Preparar para deploy no Render"
git push origin main
```

---

### 2️⃣ Criar Web Service no Render

1. Acesse https://dashboard.render.com
2. Clique em **"New +"** → **"Web Service"**
3. Conecte seu repositório GitHub/GitLab
4. Selecione o repositório do projeto

---

### 3️⃣ Configurar o Web Service

Preencha os campos:

**Name:** `dropshipping-api` (ou o nome que preferir)

**Region:** Escolha a mesma região do Neon (ex: Oregon USA)

**Branch:** `main`

**Root Directory:** (deixe vazio)

**Runtime:** `Node`

**Build Command:**
```bash
npm install && npm run build && npx prisma generate && npx prisma migrate deploy
```

**Start Command:**
```bash
npm start
```

**Plan:** `Free`

---

### 4️⃣ Configurar Variáveis de Ambiente

Na seção **Environment Variables**, adicione:

**DATABASE_URL**
```
postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```
(Cole a connection string do Neon)

**JWT_SECRET**
```
seu_jwt_secret_super_seguro_minimo_32_caracteres
```

**PORT**
```
3000
```

**NODE_ENV**
```
production
```

---

### 5️⃣ Deploy

1. Clique em **"Create Web Service"**
2. Aguarde o build (3-5 minutos)
3. Render vai:
   - Instalar dependências
   - Compilar TypeScript
   - Gerar Prisma Client
   - Rodar migrations
   - Iniciar o servidor

---

### 6️⃣ Testar

Após o deploy, você verá a URL:
```
https://dropshipping-api.onrender.com
```

Teste:
```bash
# Ver produtos
curl https://dropshipping-api.onrender.com/products

# Login
curl -X POST https://dropshipping-api.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"cliente@example.com","password":"senha123"}'
```

---

## 🎯 Checklist Completo

### Antes do Deploy
- [ ] Código no GitHub/GitLab
- [ ] Neon DB configurado e funcionando
- [ ] `.env` no `.gitignore`
- [ ] Build local funciona (`npm run build`)
- [ ] Migrations testadas

### Durante o Deploy
- [ ] Web Service criado no Render
- [ ] Variáveis de ambiente configuradas
- [ ] Build command correto
- [ ] Start command correto

### Após o Deploy
- [ ] Build completou sem erros
- [ ] Servidor está rodando (status verde)
- [ ] Endpoints respondem
- [ ] Login funciona
- [ ] Swagger acessível em `/api`

---

## 🔧 Configurações Avançadas

### Auto-Deploy

Render faz deploy automático quando você faz push para `main`:
```bash
git add .
git commit -m "Nova feature"
git push origin main
# Deploy automático inicia!
```

### Logs

Ver logs em tempo real:
1. Dashboard do Render
2. Clique no seu serviço
3. Aba "Logs"

### Domínio Customizado

1. Aba "Settings"
2. Seção "Custom Domain"
3. Adicione seu domínio
4. Configure DNS

---

## 🐛 Troubleshooting

### Build falhou

**Erro:** `Cannot find module`
```bash
# Certifique-se que todas as dependências estão no package.json
npm install --save <pacote-faltando>
git push
```

**Erro:** `Prisma migration failed`
```bash
# Verifique a DATABASE_URL
# Teste localmente primeiro:
DATABASE_URL="sua_url_neon" npx prisma migrate deploy
```

### Servidor não inicia

**Erro:** `Port already in use`
- Remova `PORT=3000` das variáveis de ambiente
- Render define a porta automaticamente

**Erro:** `Cannot connect to database`
- Verifique a DATABASE_URL no Render
- Certifique-se que tem `?sslmode=require`

### Timeout na primeira requisição

Render hiberna apps gratuitos após inatividade.
- Primeira requisição pode demorar 30-60s
- Considere usar um serviço de "keep-alive"

---

## 💰 Custos

### Plano Free
- ✅ 750 horas/mês
- ✅ SSL automático
- ✅ Auto-deploy
- ⚠️ Hiberna após 15min inativo
- ⚠️ Build time limitado

### Plano Starter ($7/mês)
- ✅ Sempre ativo
- ✅ Mais recursos
- ✅ Build mais rápido

---

## 🔒 Segurança

### Variáveis de Ambiente
- ✅ Nunca commite `.env`
- ✅ Use variáveis do Render
- ✅ JWT_SECRET forte (32+ caracteres)

### CORS
Se tiver frontend, configure CORS no `main.ts`:
```typescript
app.enableCors({
  origin: ['https://seu-frontend.com'],
  credentials: true,
});
```

### Rate Limiting
Considere adicionar:
```bash
npm install @nestjs/throttler
```

---

## 📊 Monitoramento

### Render Dashboard
- CPU usage
- Memory usage
- Request count
- Response time

### Logs
```bash
# Ver logs em tempo real no dashboard
# Ou use a CLI do Render
```

### Health Check
Render verifica automaticamente se o servidor está respondendo.

---

## 🚀 Próximos Passos

Após deploy bem-sucedido:

1. **Popular dados**
   ```bash
   # Conecte ao Neon e rode o seed
   DATABASE_URL="sua_url_neon" npm run prisma:seed
   ```

2. **Testar todos os endpoints**
   - Use Postman ou Thunder Client
   - Teste autenticação
   - Teste CRUD completo

3. **Configurar domínio customizado**
   - Compre um domínio
   - Configure no Render
   - Atualize DNS

4. **Monitorar**
   - Configure alertas
   - Monitore logs
   - Acompanhe performance

---

## 📚 Links Úteis

- **Render Dashboard:** https://dashboard.render.com
- **Render Docs:** https://render.com/docs
- **Neon Console:** https://console.neon.tech
- **Seu App:** https://dropshipping-api.onrender.com

---

## ✅ Resumo Rápido

```bash
# 1. Preparar
git add .
git commit -m "Deploy to Render"
git push

# 2. Render
# - Criar Web Service
# - Conectar repo
# - Configurar variáveis
# - Deploy!

# 3. Testar
curl https://seu-app.onrender.com/products
```

**Pronto! Seu backend está no ar! 🎉**

---

## 🆘 Precisa de Ajuda?

- Render Support: https://render.com/docs/support
- Neon Support: https://neon.tech/docs/introduction
- Issues do projeto: GitHub Issues

---

**Última atualização:** Novembro 2024
