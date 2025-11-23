# Backend Dropshipping - NestJS + Fastify + PostgreSQL + Prisma

API completa para aplicação de Dropshipping com autenticação JWT, gerenciamento de produtos, carrinho de compras, pedidos e vendedores.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js
- **Fastify** - Servidor HTTP de alta performance
- **PostgreSQL** - Banco de dados relacional
- **Prisma ORM** - ORM moderno para TypeScript
- **JWT** - Autenticação via tokens
- **bcrypt** - Hash de senhas

## 📦 Entidades

- **User** - Usuários (clientes, vendedores, admins)
- **Seller** - Perfil de vendedor
- **Product** - Produtos do catálogo
- **Category** - Categorias de produtos
- **Cart** - Carrinho de compras
- **CartItem** - Itens do carrinho
- **Order** - Pedidos realizados
- **OrderItem** - Itens dos pedidos
- **Address** - Endereços de entrega

## 🔧 Instalação

1. Clone o repositório

2. Instale as dependências:
```bash
npm install
```

3. Inicie o PostgreSQL com Docker (ou use sua instalação local):
```bash
docker-compose up -d
```

4. Configure o arquivo `.env` (já está configurado para o Docker):
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/dropshipping_db?schema=public"
JWT_SECRET="seu_jwt_secret_aqui_mude_em_producao"
PORT=3000
```

5. Execute as migrations do Prisma:
```bash
npm run prisma:migrate
```

6. Gere o Prisma Client:
```bash
npm run prisma:generate
```

7. (Opcional) Popule o banco com dados de teste:
```bash
npm run prisma:seed
```

Credenciais de teste após o seed:
- Vendedor: `vendedor@example.com` / `senha123`
- Cliente: `cliente@example.com` / `senha123`

## 🏃 Executando

### Desenvolvimento
```bash
npm run start:dev
```

**Nota:** Você pode ver um aviso sobre `@fastify/static` - isso é normal e não afeta o funcionamento da API. Esse pacote só é necessário se você quiser servir arquivos estáticos.

### Produção
```bash
npm run build
npm start
```

### Prisma Studio (Interface visual do banco)
```bash
npm run prisma:studio
```

## 📡 Endpoints da API

### Autenticação
- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Login

### Usuários
- `GET /users/me` - Perfil do usuário logado
- `GET /users/:id` - Buscar usuário por ID

### Produtos
- `GET /products` - Listar produtos
- `GET /products/:id` - Buscar produto
- `POST /products` - Criar produto (requer autenticação)
- `PUT /products/:id` - Atualizar produto (requer autenticação)
- `DELETE /products/:id` - Deletar produto (requer autenticação)

### Categorias
- `GET /categories` - Listar categorias
- `GET /categories/:id` - Buscar categoria
- `POST /categories` - Criar categoria (requer autenticação)
- `PUT /categories/:id` - Atualizar categoria (requer autenticação)
- `DELETE /categories/:id` - Deletar categoria (requer autenticação)

### Carrinho
- `GET /cart` - Ver carrinho (requer autenticação)
- `POST /cart/items` - Adicionar item ao carrinho (requer autenticação)
- `DELETE /cart/items/:productId` - Remover item (requer autenticação)
- `DELETE /cart` - Limpar carrinho (requer autenticação)

### Pedidos
- `GET /orders` - Listar pedidos do usuário (requer autenticação)
- `GET /orders/:id` - Buscar pedido (requer autenticação)
- `POST /orders` - Criar pedido (requer autenticação)
- `PUT /orders/:id/status` - Atualizar status (requer autenticação)

### Vendedores
- `GET /sellers` - Listar vendedores
- `GET /sellers/:id` - Buscar vendedor
- `POST /sellers` - Criar perfil de vendedor (requer autenticação)
- `PUT /sellers/:id` - Atualizar vendedor (requer autenticação)

## 🔐 Autenticação

A API usa JWT Bearer Token. Após login/registro, inclua o token no header:
```
Authorization: Bearer seu_token_aqui
```

## 📊 Modelo de Dados

### Roles de Usuário
- `CUSTOMER` - Cliente
- `SELLER` - Vendedor
- `ADMIN` - Administrador

### Status de Pedido
- `PENDING` - Pendente
- `PROCESSING` - Processando
- `SHIPPED` - Enviado
- `DELIVERED` - Entregue
- `CANCELLED` - Cancelado

### Status de Pagamento
- `PENDING` - Pendente
- `PAID` - Pago
- `FAILED` - Falhou
- `REFUNDED` - Reembolsado

## 🛠️ Desenvolvimento

Para visualizar e editar o banco de dados:
```bash
npm run prisma:studio
```

Para criar novas migrations:
```bash
npx prisma migrate dev --name nome_da_migration
```

## � Doccumentação Adicional

- **[⚡ Início Rápido](INICIO_RAPIDO.md)** - Setup em 5 minutos
- **[📡 API Reference](API_REFERENCE.md)** - Documentação completa da API
- **[📖 Guia Completo](GUIA_RAPIDO.md)** - Guia detalhado de uso
- **[📁 Estrutura](ESTRUTURA.md)** - Arquitetura do projeto
- **[🧪 Testes](TESTES.md)** - Como testar a API
- **[🚀 Deploy](DEPLOY.md)** - Guia de deploy em produção
- **[🗺️ Roadmap](ROADMAP.md)** - Próximas funcionalidades
- **[📡 Exemplos](api-examples.http)** - Requisições HTTP de exemplo

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
1. Fazer fork do projeto
2. Criar uma branch para sua feature
3. Fazer commit das mudanças
4. Abrir um Pull Request

## 📝 Licença

MIT
# kiroback
