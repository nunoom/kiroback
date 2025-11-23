# 🚀 Guia Rápido - API Dropshipping

## Início Rápido

### 1. Configurar o ambiente
```bash
# Instalar dependências
npm install

# Subir o PostgreSQL
docker-compose up -d

# Rodar migrations
npm run prisma:migrate

# Popular banco com dados de teste
npm run prisma:seed

# Iniciar servidor
npm run start:dev
```

Servidor rodando em: `http://localhost:3000`

## 📝 Fluxo Completo de Uso

### 1. Registrar um Cliente
```bash
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "email": "novo@cliente.com",
  "password": "senha123",
  "name": "Novo Cliente",
  "phone": "11999999999"
}
```

Resposta:
```json
{
  "user": {
    "id": "uuid",
    "email": "novo@cliente.com",
    "name": "Novo Cliente",
    "role": "CUSTOMER"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Login
```bash
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "cliente@example.com",
  "password": "senha123"
}
```

**Importante:** Copie o `access_token` para usar nas próximas requisições!

### 3. Ver Produtos Disponíveis
```bash
GET http://localhost:3000/products
```

### 4. Adicionar Produto ao Carrinho
```bash
POST http://localhost:3000/cart/items
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "productId": "id_do_produto",
  "quantity": 2
}
```

### 5. Ver Carrinho
```bash
GET http://localhost:3000/cart
Authorization: Bearer SEU_TOKEN_AQUI
```

### 6. Criar Pedido
Primeiro, você precisa ter um endereço cadastrado. Depois:

```bash
POST http://localhost:3000/orders
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "addressId": "id_do_endereco"
}
```

O pedido será criado com os itens do carrinho e o carrinho será limpo automaticamente.

## 🛍️ Fluxo do Vendedor

### 1. Registrar como Vendedor
```bash
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "email": "vendedor@loja.com",
  "password": "senha123",
  "name": "Nome do Vendedor",
  "role": "SELLER"
}
```

### 2. Criar Perfil de Vendedor
```bash
POST http://localhost:3000/sellers
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "storeName": "Minha Loja",
  "description": "Descrição da loja",
  "commission": 10.0
}
```

### 3. Criar Produto
```bash
POST http://localhost:3000/products
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "name": "Produto Incrível",
  "description": "Descrição detalhada",
  "price": 99.99,
  "stock": 100,
  "sku": "PROD-001",
  "images": ["https://exemplo.com/imagem.jpg"],
  "sellerId": "seu_seller_id",
  "categoryId": "id_da_categoria"
}
```

## 🔑 Autenticação

Todas as rotas protegidas requerem o header:
```
Authorization: Bearer SEU_TOKEN_JWT
```

## 📊 Status e Enums

### Roles de Usuário
- `CUSTOMER` - Cliente padrão
- `SELLER` - Vendedor
- `ADMIN` - Administrador

### Status de Pedido
- `PENDING` - Aguardando processamento
- `PROCESSING` - Em processamento
- `SHIPPED` - Enviado
- `DELIVERED` - Entregue
- `CANCELLED` - Cancelado

### Status de Pagamento
- `PENDING` - Aguardando pagamento
- `PAID` - Pago
- `FAILED` - Falha no pagamento
- `REFUNDED` - Reembolsado

## 🧪 Testando com Dados de Seed

Após rodar `npm run prisma:seed`, você terá:

**Vendedor:**
- Email: `vendedor@example.com`
- Senha: `senha123`

**Cliente:**
- Email: `cliente@example.com`
- Senha: `senha123`

**Produtos:**
- Smartphone Galaxy X - R$ 1.999,99
- Notebook Pro 15 - R$ 4.999,99
- Camiseta Premium - R$ 79,99

**Categorias:**
- Eletrônicos
- Moda

## 🛠️ Comandos Úteis

```bash
# Ver banco de dados visualmente
npm run prisma:studio

# Criar nova migration
npx prisma migrate dev --name nome_da_migration

# Resetar banco de dados
npx prisma migrate reset

# Verificar status das migrations
npx prisma migrate status
```

## 🐛 Troubleshooting

### Erro de conexão com banco
Verifique se o PostgreSQL está rodando:
```bash
docker-compose ps
```

### Erro "JWT must be provided"
Certifique-se de incluir o token no header Authorization.

### Erro "User already exists"
O email já está cadastrado. Use outro email ou faça login.

## 📚 Próximos Passos

1. Implementar upload de imagens (AWS S3, Cloudinary)
2. Adicionar sistema de avaliações de produtos
3. Implementar gateway de pagamento (Stripe, Mercado Pago)
4. Adicionar notificações por email
5. Implementar busca e filtros avançados
6. Adicionar sistema de cupons de desconto
7. Implementar rastreamento de pedidos
