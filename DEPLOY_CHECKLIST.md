# ✅ Checklist de Deploy - Render + Neon

## 📋 Antes do Deploy

### Neon DB
- [ ] Conta criada em https://neon.tech
- [ ] Projeto criado
- [ ] Connection string copiada
- [ ] Testado localmente com Neon

### Código
- [ ] `.env` no `.gitignore`
- [ ] Build funciona localmente (`npm run build`)
- [ ] Servidor inicia (`npm start`)
- [ ] Migrations testadas
- [ ] Código no GitHub/GitLab

### Arquivos Necessários
- [ ] `render-build.sh` criado
- [ ] `package.json` com scripts corretos
- [ ] `render.yaml` configurado (opcional)

---

## 🚀 Durante o Deploy

### Render Setup
- [ ] Conta criada em https://render.com
- [ ] Web Service criado
- [ ] Repositório conectado
- [ ] Branch `main` selecionada

### Configuração
- [ ] Build Command configurado
- [ ] Start Command configurado
- [ ] Region escolhida (mesma do Neon)
- [ ] Plan selecionado (Free)

### Variáveis de Ambiente
- [ ] `DATABASE_URL` (do Neon)
- [ ] `JWT_SECRET` (32+ caracteres)
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000` (opcional)

---

## ✅ Após o Deploy

### Verificação Básica
- [ ] Build completou sem erros
- [ ] Status está verde (Running)
- [ ] URL do app acessível
- [ ] Logs sem erros críticos

### Testes de API
- [ ] `GET /products` responde
- [ ] `POST /auth/login` funciona
- [ ] `GET /categories` responde
- [ ] Swagger acessível em `/api`

### Testes de Autenticação
- [ ] Login retorna token
- [ ] Token funciona em rotas protegidas
- [ ] `GET /users/me` com token funciona

### Testes de CRUD
- [ ] Criar produto funciona
- [ ] Listar produtos funciona
- [ ] Atualizar produto funciona
- [ ] Deletar produto funciona

---

## 🔧 Configurações Adicionais

### Opcional mas Recomendado
- [ ] Domínio customizado configurado
- [ ] CORS configurado para frontend
- [ ] Rate limiting ativado
- [ ] Logs estruturados
- [ ] Monitoramento configurado

### Segurança
- [ ] JWT_SECRET forte
- [ ] Variáveis sensíveis não commitadas
- [ ] SSL ativo (automático no Render)
- [ ] CORS restrito ao frontend

---

## 📊 Monitoramento

### Render Dashboard
- [ ] CPU usage normal
- [ ] Memory usage normal
- [ ] Response time aceitável
- [ ] Sem erros nos logs

### Neon Dashboard
- [ ] Conexões ativas
- [ ] Queries executando
- [ ] Storage usage
- [ ] Sem erros de conexão

---

## 🐛 Troubleshooting

### Se o build falhar:
```bash
# Testar localmente
npm install
npm run build
npx prisma generate
npx prisma migrate deploy
npm start
```

### Se o servidor não iniciar:
- Verificar logs no Render
- Verificar DATABASE_URL
- Verificar se porta está correta
- Verificar se todas as dependências estão instaladas

### Se a API não responder:
- Verificar se o servidor está rodando
- Verificar logs de erro
- Testar conexão com Neon
- Verificar CORS se for do frontend

---

## 🎯 Comandos Úteis

### Testar localmente antes do deploy
```bash
# Build
npm run build

# Testar produção localmente
DATABASE_URL="sua_url_neon" npm start

# Testar migrations
DATABASE_URL="sua_url_neon" npx prisma migrate deploy
```

### Após deploy
```bash
# Testar API
curl https://seu-app.onrender.com/products

# Login
curl -X POST https://seu-app.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"cliente@example.com","password":"senha123"}'
```

### Popular dados em produção
```bash
# Conectar ao Neon e rodar seed
DATABASE_URL="sua_url_neon" npm run prisma:seed
```

---

## 📚 Documentação

- **Render:** [RENDER_DEPLOY.md](RENDER_DEPLOY.md)
- **Neon:** [NEON_SETUP.md](NEON_SETUP.md)
- **Guia Rápido Render:** [RENDER_QUICK.md](RENDER_QUICK.md)
- **Guia Rápido Neon:** [QUICK_NEON.md](QUICK_NEON.md)

---

## 🎉 Deploy Bem-Sucedido!

Se todos os itens estão marcados, parabéns! 🎊

Seu backend está no ar em:
```
https://seu-app.onrender.com
```

Swagger:
```
https://seu-app.onrender.com/api
```

---

## 🔄 Próximos Deploys

Agora é só fazer push:
```bash
git add .
git commit -m "Nova feature"
git push origin main
# Deploy automático!
```

---

**Última atualização:** Novembro 2024
