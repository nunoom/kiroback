# 👋 Bem-vindo ao Backend Dropshipping!

## 🎯 Você está aqui

Este é um **backend completo** para uma aplicação de **Dropshipping/E-commerce** construído com as melhores tecnologias do mercado.

---

## ⚡ Começar AGORA (5 minutos)

```bash
# 1. Instalar dependências
npm install

# 2. Configurar banco de dados
# Opção A: Docker (local)
docker-compose up -d

# Opção B: Neon DB (cloud) - Veja QUICK_NEON.md
# 1. Crie conta em https://neon.tech
# 2. Copie a connection string
# 3. Cole no .env

# 3. Configurar banco
npm run prisma:migrate
npm run prisma:generate

# 4. Adicionar dados de teste
npm run prisma:seed

# 5. Iniciar servidor
npm run start:dev
```

✅ **Pronto!** Acesse http://localhost:3000

---

## 📚 Documentação

Escolha por onde começar:

### 🚀 Iniciante?
1. **[INICIO_RAPIDO.md](INICIO_RAPIDO.md)** ← Comece aqui!
2. **[GUIA_RAPIDO.md](GUIA_RAPIDO.md)** - Fluxos completos
3. **[TESTES.md](TESTES.md)** - Como testar

### 💻 Desenvolvedor?
1. **[ESTRUTURA.md](ESTRUTURA.md)** - Arquitetura do código
2. **[API_REFERENCE.md](API_REFERENCE.md)** - Todos os endpoints
3. **[api-examples.http](api-examples.http)** - Exemplos práticos

### 🚀 Pronto para Deploy?
1. **[DEPLOY.md](DEPLOY.md)** - Guia completo de deploy
2. **[CHECKLIST.md](CHECKLIST.md)** - Verificação pré-deploy

### 📊 Visão Geral?
1. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Resumo completo
2. **[ROADMAP.md](ROADMAP.md)** - Próximas features
3. **[README.md](README.md)** - Documentação principal

---

## 🎯 O que este projeto faz?

### Para Clientes
- ✅ Navegar produtos
- ✅ Adicionar ao carrinho
- ✅ Fazer pedidos
- ✅ Acompanhar entregas

### Para Vendedores
- ✅ Criar loja
- ✅ Cadastrar produtos
- ✅ Gerenciar estoque
- ✅ Ver vendas

### Para Admins
- ✅ Gerenciar usuários
- ✅ Criar categorias
- ✅ Moderar conteúdo

---

## 🛠️ Stack

- **NestJS** - Framework robusto
- **Fastify** - Servidor ultra-rápido
- **PostgreSQL** - Banco confiável
- **Prisma** - ORM moderno
- **TypeScript** - Type-safe
- **JWT** - Autenticação segura

---

## 🔑 Credenciais de Teste

Após rodar `npm run prisma:seed`:

**Cliente:**
- Email: `cliente@example.com`
- Senha: `senha123`

**Vendedor:**
- Email: `vendedor@example.com`
- Senha: `senha123`

---

## 🧪 Teste Rápido

```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"cliente@example.com","password":"senha123"}'

# Ver produtos
curl http://localhost:3000/products
```

---

## 📡 Principais Endpoints

- `POST /auth/register` - Registrar
- `POST /auth/login` - Login
- `GET /products` - Listar produtos
- `POST /cart/items` - Adicionar ao carrinho
- `POST /orders` - Criar pedido
- `GET /orders` - Ver pedidos

**[Ver todos os endpoints →](API_REFERENCE.md)**

---

## 🎨 Features

✨ Autenticação JWT
✨ Multi-vendedor
✨ Carrinho persistente
✨ Sistema de pedidos
✨ Categorias
✨ Controle de estoque
✨ Múltiplos endereços
✨ Status de pedido
✨ Comissões de vendedor

---

## 🚀 Próximos Passos

1. **Explorar a API** - Use Postman ou Thunder Client
2. **Ler a documentação** - Entenda a arquitetura
3. **Customizar** - Adicione suas features
4. **Deploy** - Coloque em produção

---

## 💡 Dicas

- Use `npm run prisma:studio` para ver o banco visualmente
- Veja `api-examples.http` para exemplos prontos
- Leia `ESTRUTURA.md` para entender o código
- Consulte `CHECKLIST.md` antes do deploy

---

## ❓ Problemas?

### Porta 3000 em uso?
```bash
# Mude no .env
PORT=3001
```

### Erro de conexão?
```bash
# Reinicie o Docker
docker-compose restart
```

### Migrations falhando?
```bash
# Resete o banco
npx prisma migrate reset
```

**[Ver mais soluções →](TESTES.md#-erros-comuns)**

---

## 📞 Suporte

- 📖 Leia a documentação
- 🐛 Abra uma issue
- 💬 Entre em contato

---

## 🎉 Pronto!

Você tem tudo que precisa para começar. Escolha um dos guias acima e comece a desenvolver!

**Happy Coding! 🚀**

---

## 📋 Arquivos Importantes

```
📁 Projeto
├── 📄 START_HERE.md          ← Você está aqui
├── 📄 README.md              ← Documentação principal
├── 📄 INICIO_RAPIDO.md       ← Setup em 5 minutos
├── 📄 API_REFERENCE.md       ← Todos os endpoints
├── 📄 GUIA_RAPIDO.md         ← Guia detalhado
├── 📄 ESTRUTURA.md           ← Arquitetura
├── 📄 TESTES.md              ← Como testar
├── 📄 DEPLOY.md              ← Como fazer deploy
├── 📄 ROADMAP.md             ← Próximas features
├── 📄 CHECKLIST.md           ← Verificação
├── 📄 PROJECT_SUMMARY.md     ← Resumo completo
└── 📄 api-examples.http      ← Exemplos de API
```

---

**Criado com ❤️ usando NestJS + Fastify + PostgreSQL + Prisma**
