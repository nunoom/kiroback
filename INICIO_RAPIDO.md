# ⚡ Início Rápido - 5 Minutos

## 🎯 Setup Completo em 5 Passos

### 1️⃣ Instalar Dependências (1 min)
```bash
npm install
```

### 2️⃣ Subir o Banco de Dados (30 seg)
```bash
docker-compose up -d
```

### 3️⃣ Configurar e Migrar (1 min)
```bash
# O .env já está configurado para o Docker
npm run prisma:migrate
npm run prisma:generate
```

### 4️⃣ Popular com Dados de Teste (30 seg)
```bash
npm run prisma:seed
```

### 5️⃣ Iniciar o Servidor (30 seg)
```bash
npm run start:dev
```

## ✅ Pronto! Servidor rodando em http://localhost:3000

---

## 🧪 Teste Rápido

### 1. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"cliente@example.com","password":"senha123"}'
```

Copie o `access_token` da resposta!

### 2. Ver Produtos
```bash
curl http://localhost:3000/products
```

### 3. Ver Seu Perfil
```bash
curl http://localhost:3000/users/me \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 📚 Próximos Passos

1. **Explorar a API**: Veja `api-examples.http` para todos os endpoints
2. **Ler a Documentação**: Confira `README.md` para detalhes completos
3. **Testar Fluxos**: Siga o `GUIA_RAPIDO.md` para fluxos completos
4. **Ver Estrutura**: Leia `ESTRUTURA.md` para entender o código
5. **Deploy**: Quando pronto, veja `DEPLOY.md`

---

## 🔑 Credenciais de Teste

Após rodar o seed, você tem:

**Cliente:**
- Email: `cliente@example.com`
- Senha: `senha123`

**Vendedor:**
- Email: `vendedor@example.com`
- Senha: `senha123`

---

## 🛠️ Comandos Úteis

```bash
# Ver banco de dados visualmente
npm run prisma:studio

# Parar o PostgreSQL
docker-compose down

# Ver logs do servidor
# (os logs aparecem no terminal onde você rodou start:dev)

# Recriar banco do zero
docker-compose down -v
docker-compose up -d
npm run prisma:migrate
npm run prisma:seed
```

---

## ❓ Problemas?

### Porta 3000 já em uso?
```bash
# Mude a porta no .env
PORT=3001
```

### Erro de conexão com banco?
```bash
# Verifique se o Docker está rodando
docker-compose ps

# Reinicie o banco
docker-compose restart
```

### Erro nas migrations?
```bash
# Resete o banco
npx prisma migrate reset
```

---

## 🎉 Tudo Funcionando?

Agora você tem:
- ✅ API REST completa
- ✅ Autenticação JWT
- ✅ Banco de dados PostgreSQL
- ✅ Produtos, Carrinho, Pedidos
- ✅ Sistema de Vendedores
- ✅ Dados de teste

**Divirta-se desenvolvendo! 🚀**

---

## 📖 Documentação Completa

- `README.md` - Documentação principal
- `GUIA_RAPIDO.md` - Guia detalhado de uso
- `ESTRUTURA.md` - Estrutura do projeto
- `TESTES.md` - Como testar a API
- `DEPLOY.md` - Como fazer deploy
- `ROADMAP.md` - Próximas features
- `api-examples.http` - Exemplos de requisições
