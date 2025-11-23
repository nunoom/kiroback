# 📁 Estrutura do Projeto

```
dropshipping-backend/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   ├── seed.ts                # Script para popular o banco
│   └── migrations/            # Histórico de migrations
│
├── src/
│   ├── main.ts                # Ponto de entrada da aplicação
│   ├── app.module.ts          # Módulo principal
│   │
│   ├── prisma/                # Módulo Prisma (Database)
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   │
│   ├── auth/                  # Autenticação e Autorização
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   ├── jwt.strategy.ts
│   │   ├── jwt-auth.guard.ts
│   │   └── dto/
│   │       ├── login.dto.ts
│   │       └── register.dto.ts
│   │
│   ├── users/                 # Gerenciamento de Usuários
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   └── users.controller.ts
│   │
│   ├── sellers/               # Gerenciamento de Vendedores
│   │   ├── sellers.module.ts
│   │   ├── sellers.service.ts
│   │   ├── sellers.controller.ts
│   │   └── dto/
│   │       └── create-seller.dto.ts
│   │
│   ├── products/              # Gerenciamento de Produtos
│   │   ├── products.module.ts
│   │   ├── products.service.ts
│   │   ├── products.controller.ts
│   │   └── dto/
│   │       ├── create-product.dto.ts
│   │       └── update-product.dto.ts
│   │
│   ├── categories/            # Gerenciamento de Categorias
│   │   ├── categories.module.ts
│   │   ├── categories.service.ts
│   │   ├── categories.controller.ts
│   │   └── dto/
│   │       └── create-category.dto.ts
│   │
│   ├── cart/                  # Carrinho de Compras
│   │   ├── cart.module.ts
│   │   ├── cart.service.ts
│   │   ├── cart.controller.ts
│   │   └── dto/
│   │       └── add-to-cart.dto.ts
│   │
│   └── orders/                # Gerenciamento de Pedidos
│       ├── orders.module.ts
│       ├── orders.service.ts
│       ├── orders.controller.ts
│       └── dto/
│           └── create-order.dto.ts
│
├── dist/                      # Código compilado (gerado)
├── node_modules/              # Dependências
│
├── .env                       # Variáveis de ambiente
├── .gitignore                 # Arquivos ignorados pelo Git
├── docker-compose.yml         # Configuração do PostgreSQL
├── nest-cli.json              # Configuração do NestJS CLI
├── package.json               # Dependências e scripts
├── prisma.config.ts           # Configuração do Prisma 7
├── tsconfig.json              # Configuração do TypeScript
├── api-examples.http          # Exemplos de requisições HTTP
├── README.md                  # Documentação principal
├── GUIA_RAPIDO.md            # Guia rápido de uso
└── ESTRUTURA.md              # Este arquivo
```

## 🎯 Responsabilidades dos Módulos

### Auth Module
- Registro de novos usuários
- Login e geração de JWT tokens
- Validação de tokens
- Guards de autenticação

### Users Module
- CRUD de usuários
- Perfil do usuário
- Gerenciamento de endereços

### Sellers Module
- Criação de perfil de vendedor
- Gerenciamento de loja
- Comissões e configurações

### Products Module
- CRUD de produtos
- Gerenciamento de estoque
- Imagens e SKUs
- Filtros por categoria

### Categories Module
- CRUD de categorias
- Organização de produtos
- Slugs para URLs amigáveis

### Cart Module
- Adicionar/remover itens
- Atualizar quantidades
- Calcular totais
- Limpar carrinho

### Orders Module
- Criar pedidos a partir do carrinho
- Histórico de pedidos
- Atualização de status
- Gerenciamento de pagamentos

### Prisma Module
- Conexão com banco de dados
- Cliente Prisma global
- Gerenciamento de transações

## 🔄 Fluxo de Dados

```
Cliente → Controller → Service → Prisma → PostgreSQL
                ↓
            Validação (DTOs)
                ↓
            Guards (JWT)
```

## 🗄️ Modelo de Dados

```
User (1) ←→ (1) Seller
  ↓
  ├─→ (N) Address
  ├─→ (1) Cart ─→ (N) CartItem ─→ (1) Product
  └─→ (N) Order ─→ (N) OrderItem ─→ (1) Product

Seller (1) ─→ (N) Product ←─ (1) Category
```

## 🛡️ Segurança

- Senhas hasheadas com bcrypt (10 rounds)
- JWT tokens com expiração de 7 dias
- Guards para rotas protegidas
- Validação de dados com class-validator
- Sanitização automática com whitelist

## 📦 Principais Dependências

### Produção
- `@nestjs/core` - Framework principal
- `@nestjs/platform-fastify` - Servidor HTTP rápido
- `@prisma/client` - ORM para banco de dados
- `@nestjs/jwt` - Autenticação JWT
- `bcrypt` - Hash de senhas
- `class-validator` - Validação de DTOs

### Desenvolvimento
- `prisma` - CLI do Prisma
- `typescript` - Linguagem
- `ts-node` - Executar TypeScript
- `@nestjs/cli` - CLI do NestJS
