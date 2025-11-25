# 🛍️ Guia: Como Criar Produtos na API

## ❌ Problema Anterior

Erro ao criar produto:
```
Foreign key constraint violated: products_sellerId_fkey
```

**Causa:** O `sellerId` fornecido não existe na tabela de sellers.

## ✅ Solução Implementada

Agora o sistema:
1. **Valida automaticamente** se o seller existe
2. **Usa o seller do usuário autenticado** se não fornecer sellerId
3. **Valida se a categoria existe**
4. **Retorna mensagens de erro claras**

## 📋 Passo a Passo

### 1️⃣ Criar Conta de Usuário

```bash
POST /auth/register
```

```json
{
  "email": "vendedor@exemplo.com",
  "password": "senha123",
  "name": "João Vendedor",
  "role": "SELLER"
}
```

**Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clm1234567890abcdef",
    "email": "vendedor@exemplo.com",
    "name": "João Vendedor",
    "role": "SELLER"
  }
}
```

### 2️⃣ Criar Perfil de Vendedor

```bash
POST /sellers
Authorization: Bearer SEU_TOKEN_AQUI
```

```json
{
  "storeName": "Minha Loja Tech",
  "description": "Loja de produtos eletrônicos",
  "commission": 15
}
```

**Resposta:**
```json
{
  "id": "seller_abc123",
  "userId": "clm1234567890abcdef",
  "storeName": "Minha Loja Tech",
  "description": "Loja de produtos eletrônicos",
  "commission": 15,
  "isActive": true
}
```

### 3️⃣ Criar Categoria (se não existir)

```bash
POST /categories
Authorization: Bearer SEU_TOKEN_AQUI
```

```json
{
  "name": "Eletrônicos",
  "description": "Produtos eletrônicos e tecnologia",
  "slug": "eletronicos"
}
```

**Resposta:**
```json
{
  "id": "category_xyz789",
  "name": "Eletrônicos",
  "slug": "eletronicos"
}
```

### 4️⃣ Criar Produto

#### Opção A: Sem especificar sellerId (RECOMENDADO)
O sistema usa automaticamente o seller do usuário autenticado:

```bash
POST /products
Authorization: Bearer SEU_TOKEN_AQUI
```

```json
{
  "name": "Smartphone XYZ Pro",
  "description": "Smartphone de última geração",
  "price": 599.99,
  "stock": 50,
  "sku": "SMART-XYZ-001",
  "images": [
    "https://exemplo.com/img1.jpg",
    "https://exemplo.com/img2.jpg"
  ],
  "categoryId": "category_xyz789"
}
```

#### Opção B: Especificando sellerId
```json
{
  "name": "Smartphone XYZ Pro",
  "description": "Smartphone de última geração",
  "price": 599.99,
  "stock": 50,
  "sku": "SMART-XYZ-001",
  "images": [
    "https://exemplo.com/img1.jpg"
  ],
  "sellerId": "seller_abc123",
  "categoryId": "category_xyz789"
}
```

## 🔍 Verificar IDs Existentes

### Listar Sellers
```bash
GET /sellers
```

### Listar Categorias
```bash
GET /categories
```

### Ver Seu Perfil
```bash
GET /users/me
Authorization: Bearer SEU_TOKEN_AQUI
```

## ⚠️ Mensagens de Erro

### Erro: Usuário não é vendedor
```json
{
  "statusCode": 400,
  "message": "Usuário não possui perfil de vendedor. Crie um perfil de vendedor primeiro em /sellers"
}
```
**Solução:** Criar perfil de vendedor (Passo 2)

### Erro: Seller não encontrado
```json
{
  "statusCode": 404,
  "message": "Vendedor com ID xyz não encontrado"
}
```
**Solução:** Use um sellerId válido ou omita o campo

### Erro: Categoria não encontrada
```json
{
  "statusCode": 404,
  "message": "Categoria com ID xyz não encontrada"
}
```
**Solução:** Criar categoria (Passo 3) ou usar ID válido

## 🎯 Exemplo Completo no Swagger

1. Acesse: `https://seu-app.onrender.com/api`
2. Clique em **POST /auth/register** → Registre-se
3. Copie o `access_token`
4. Clique em **Authorize** (cadeado no topo)
5. Cole: `Bearer seu_token_aqui`
6. Clique em **POST /sellers** → Crie seu perfil
7. Clique em **GET /categories** → Veja categorias disponíveis
8. Clique em **POST /products** → Crie seu produto (sem sellerId)

## 📝 Notas Importantes

- ✅ O campo `sellerId` agora é **opcional**
- ✅ Se omitido, usa o seller do usuário autenticado
- ✅ Validações automáticas de seller e categoria
- ✅ Mensagens de erro claras e em português
- ✅ SKU deve ser único para cada produto
