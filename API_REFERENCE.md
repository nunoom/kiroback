# 📡 API Reference

## Base URL
```
http://localhost:3000
```

## Autenticação

A maioria dos endpoints requer autenticação via JWT Bearer Token.

```
Authorization: Bearer {seu_token_jwt}
```

---

## 🔐 Auth

### POST /auth/register
Registrar novo usuário.

**Body:**
```json
{
  "email": "usuario@example.com",
  "password": "senha123",
  "name": "Nome do Usuário",
  "phone": "11999999999",
  "role": "CUSTOMER" // CUSTOMER, SELLER, ou ADMIN
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": "uuid",
    "email": "usuario@example.com",
    "name": "Nome do Usuário",
    "role": "CUSTOMER"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /auth/login
Fazer login.

**Body:**
```json
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Response:** `200 OK`
```json
{
  "user": { ... },
  "access_token": "..."
}
```

---

## 👤 Users

### GET /users/me
Obter perfil do usuário logado.

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "email": "usuario@example.com",
  "name": "Nome",
  "role": "CUSTOMER",
  "phone": "11999999999",
  "addresses": [...],
  "seller": null
}
```

### GET /users/:id
Buscar usuário por ID.

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

---

## 🛍️ Products

### GET /products
Listar todos os produtos.

**Query Params:**
- `categoryId` (opcional): Filtrar por categoria

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "name": "Produto",
    "description": "Descrição",
    "price": 99.99,
    "stock": 100,
    "sku": "PROD-001",
    "images": ["url1", "url2"],
    "isActive": true,
    "seller": { ... },
    "category": { ... }
  }
]
```

### GET /products/:id
Buscar produto por ID.

**Response:** `200 OK`

### POST /products
Criar novo produto.

**Headers:** `Authorization: Bearer {token}`

**Body:**
```json
{
  "name": "Nome do Produto",
  "description": "Descrição detalhada",
  "price": 99.99,
  "stock": 100,
  "sku": "PROD-001",
  "images": ["url1", "url2"],
  "isActive": true,
  "sellerId": "uuid",
  "categoryId": "uuid"
}
```

**Response:** `201 Created`

### PUT /products/:id
Atualizar produto.

**Headers:** `Authorization: Bearer {token}`

**Body:** (todos os campos são opcionais)
```json
{
  "name": "Novo Nome",
  "price": 89.99,
  "stock": 50
}
```

**Response:** `200 OK`

### DELETE /products/:id
Deletar produto.

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

---

## 📂 Categories

### GET /categories
Listar todas as categorias.

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "name": "Eletrônicos",
    "description": "Produtos eletrônicos",
    "slug": "eletronicos",
    "products": [...]
  }
]
```

### GET /categories/:id
Buscar categoria por ID.

**Response:** `200 OK`

### POST /categories
Criar nova categoria.

**Headers:** `Authorization: Bearer {token}`

**Body:**
```json
{
  "name": "Nome da Categoria",
  "description": "Descrição",
  "slug": "nome-da-categoria"
}
```

**Response:** `201 Created`

### PUT /categories/:id
Atualizar categoria.

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

### DELETE /categories/:id
Deletar categoria.

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

---

## 🛒 Cart

### GET /cart
Ver carrinho do usuário logado.

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "userId": "uuid",
  "items": [
    {
      "id": "uuid",
      "productId": "uuid",
      "quantity": 2,
      "product": { ... }
    }
  ]
}
```

### POST /cart/items
Adicionar item ao carrinho.

**Headers:** `Authorization: Bearer {token}`

**Body:**
```json
{
  "productId": "uuid",
  "quantity": 2
}
```

**Response:** `201 Created`

### DELETE /cart/items/:productId
Remover item do carrinho.

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

### DELETE /cart
Limpar carrinho.

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

---

## 📦 Orders

### GET /orders
Listar pedidos do usuário logado.

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "total": 199.98,
    "status": "PENDING",
    "paymentStatus": "PENDING",
    "items": [...],
    "address": { ... },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET /orders/:id
Buscar pedido por ID.

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

### POST /orders
Criar novo pedido a partir do carrinho.

**Headers:** `Authorization: Bearer {token}`

**Body:**
```json
{
  "addressId": "uuid"
}
```

**Response:** `201 Created`

**Nota:** O carrinho será limpo automaticamente após criar o pedido.

### PUT /orders/:id/status
Atualizar status do pedido.

**Headers:** `Authorization: Bearer {token}`

**Body:**
```json
{
  "status": "PROCESSING"
}
```

**Status válidos:**
- `PENDING`
- `PROCESSING`
- `SHIPPED`
- `DELIVERED`
- `CANCELLED`

**Response:** `200 OK`

---

## 🏪 Sellers

### GET /sellers
Listar todos os vendedores ativos.

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "storeName": "Loja do João",
    "description": "Descrição da loja",
    "commission": 10.0,
    "isActive": true,
    "user": { ... },
    "products": [...]
  }
]
```

### GET /sellers/:id
Buscar vendedor por ID.

**Response:** `200 OK`

### POST /sellers
Criar perfil de vendedor.

**Headers:** `Authorization: Bearer {token}`

**Body:**
```json
{
  "storeName": "Nome da Loja",
  "description": "Descrição da loja",
  "commission": 10.0
}
```

**Response:** `201 Created`

### PUT /sellers/:id
Atualizar perfil de vendedor.

**Headers:** `Authorization: Bearer {token}`

**Body:**
```json
{
  "storeName": "Novo Nome",
  "description": "Nova descrição",
  "isActive": true
}
```

**Response:** `200 OK`

---

## 📊 Status Codes

- `200 OK` - Requisição bem-sucedida
- `201 Created` - Recurso criado com sucesso
- `400 Bad Request` - Dados inválidos
- `401 Unauthorized` - Não autenticado
- `403 Forbidden` - Sem permissão
- `404 Not Found` - Recurso não encontrado
- `500 Internal Server Error` - Erro no servidor

---

## 🔒 Roles

### CUSTOMER
- Ver produtos
- Gerenciar carrinho
- Criar pedidos
- Ver próprios pedidos

### SELLER
- Tudo do CUSTOMER
- Criar/editar produtos
- Ver vendas
- Gerenciar loja

### ADMIN
- Acesso total
- Gerenciar usuários
- Gerenciar categorias
- Ver todos os pedidos

---

## 🎯 Enums

### UserRole
```typescript
enum UserRole {
  CUSTOMER = "CUSTOMER",
  SELLER = "SELLER",
  ADMIN = "ADMIN"
}
```

### OrderStatus
```typescript
enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED"
}
```

### PaymentStatus
```typescript
enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED"
}
```

---

## 🔍 Exemplos de Uso

### Fluxo Completo de Compra

1. **Registrar/Login**
```bash
POST /auth/login
```

2. **Ver Produtos**
```bash
GET /products
```

3. **Adicionar ao Carrinho**
```bash
POST /cart/items
```

4. **Ver Carrinho**
```bash
GET /cart
```

5. **Criar Pedido**
```bash
POST /orders
```

6. **Ver Pedidos**
```bash
GET /orders
```

### Fluxo do Vendedor

1. **Registrar como Vendedor**
```bash
POST /auth/register (role: SELLER)
```

2. **Criar Perfil de Vendedor**
```bash
POST /sellers
```

3. **Criar Produto**
```bash
POST /products
```

4. **Ver Produtos da Loja**
```bash
GET /products?sellerId={id}
```

---

## 📝 Notas

- Todos os IDs são UUIDs
- Timestamps estão em formato ISO 8601
- Preços são em formato decimal (float)
- Imagens são URLs (string array)
- Senhas são hasheadas com bcrypt
- Tokens JWT expiram em 7 dias

---

## 🐛 Erros Comuns

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```
**Solução:** Verifique se o token está correto e não expirou.

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Produto não encontrado"
}
```
**Solução:** Verifique se o ID do recurso existe.

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```
**Solução:** Verifique os dados enviados no body.

---

Para mais exemplos, veja o arquivo `api-examples.http`.
