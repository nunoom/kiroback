# 🧪 Guia de Testes

## Testando a API Manualmente

### Pré-requisitos
1. Servidor rodando: `npm run start:dev`
2. Banco populado: `npm run prisma:seed`

## 🔐 Teste 1: Autenticação

### 1.1 Login com Cliente
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "cliente@example.com",
    "password": "senha123"
  }'
```

**Resultado esperado:**
```json
{
  "user": {
    "id": "...",
    "email": "cliente@example.com",
    "name": "Maria Cliente",
    "role": "CUSTOMER"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 1.2 Registrar Novo Usuário
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@example.com",
    "password": "senha123",
    "name": "Usuário Teste",
    "phone": "11999999999"
  }'
```

## 🛍️ Teste 2: Produtos

### 2.1 Listar Todos os Produtos
```bash
curl http://localhost:3000/products
```

### 2.2 Buscar Produto Específico
```bash
curl http://localhost:3000/products/{ID_DO_PRODUTO}
```

### 2.3 Filtrar por Categoria
```bash
curl http://localhost:3000/products?categoryId={ID_DA_CATEGORIA}
```

## 🛒 Teste 3: Carrinho

**Importante:** Substitua `{TOKEN}` pelo token obtido no login!

### 3.1 Ver Carrinho
```bash
curl http://localhost:3000/cart \
  -H "Authorization: Bearer {TOKEN}"
```

### 3.2 Adicionar Item ao Carrinho
```bash
curl -X POST http://localhost:3000/cart/items \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "{ID_DO_PRODUTO}",
    "quantity": 2
  }'
```

### 3.3 Remover Item do Carrinho
```bash
curl -X DELETE http://localhost:3000/cart/items/{ID_DO_PRODUTO} \
  -H "Authorization: Bearer {TOKEN}"
```

### 3.4 Limpar Carrinho
```bash
curl -X DELETE http://localhost:3000/cart \
  -H "Authorization: Bearer {TOKEN}"
```

## 📦 Teste 4: Pedidos

### 4.1 Criar Pedido
Primeiro adicione itens ao carrinho, depois:

```bash
curl -X POST http://localhost:3000/orders \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "addressId": "{ID_DO_ENDERECO}"
  }'
```

### 4.2 Listar Meus Pedidos
```bash
curl http://localhost:3000/orders \
  -H "Authorization: Bearer {TOKEN}"
```

### 4.3 Ver Detalhes do Pedido
```bash
curl http://localhost:3000/orders/{ID_DO_PEDIDO} \
  -H "Authorization: Bearer {TOKEN}"
```

## 👤 Teste 5: Perfil

### 5.1 Ver Meu Perfil
```bash
curl http://localhost:3000/users/me \
  -H "Authorization: Bearer {TOKEN}"
```

## 🏪 Teste 6: Vendedores

### 6.1 Listar Vendedores
```bash
curl http://localhost:3000/sellers
```

### 6.2 Ver Detalhes do Vendedor
```bash
curl http://localhost:3000/sellers/{ID_DO_VENDEDOR}
```

### 6.3 Criar Perfil de Vendedor
```bash
curl -X POST http://localhost:3000/sellers \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "storeName": "Minha Loja",
    "description": "Produtos de qualidade",
    "commission": 15.0
  }'
```

## 📂 Teste 7: Categorias

### 7.1 Listar Categorias
```bash
curl http://localhost:3000/categories
```

### 7.2 Criar Categoria
```bash
curl -X POST http://localhost:3000/categories \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nova Categoria",
    "description": "Descrição da categoria",
    "slug": "nova-categoria"
  }'
```

## 🔍 Teste 8: Fluxo Completo de Compra

### Passo a Passo:

1. **Login**
```bash
TOKEN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"cliente@example.com","password":"senha123"}' \
  | jq -r '.access_token')
```

2. **Ver Produtos**
```bash
PRODUTO_ID=$(curl -s http://localhost:3000/products | jq -r '.[0].id')
```

3. **Adicionar ao Carrinho**
```bash
curl -X POST http://localhost:3000/cart/items \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"productId\":\"$PRODUTO_ID\",\"quantity\":1}"
```

4. **Ver Carrinho**
```bash
curl http://localhost:3000/cart \
  -H "Authorization: Bearer $TOKEN"
```

5. **Obter ID do Endereço**
```bash
ENDERECO_ID=$(curl -s http://localhost:3000/users/me \
  -H "Authorization: Bearer $TOKEN" \
  | jq -r '.addresses[0].id')
```

6. **Criar Pedido**
```bash
curl -X POST http://localhost:3000/orders \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"addressId\":\"$ENDERECO_ID\"}"
```

7. **Ver Pedidos**
```bash
curl http://localhost:3000/orders \
  -H "Authorization: Bearer $TOKEN"
```

## ✅ Checklist de Testes

- [ ] Login funciona
- [ ] Registro funciona
- [ ] Listar produtos funciona
- [ ] Adicionar ao carrinho funciona
- [ ] Ver carrinho funciona
- [ ] Remover do carrinho funciona
- [ ] Criar pedido funciona
- [ ] Listar pedidos funciona
- [ ] Ver perfil funciona
- [ ] Criar vendedor funciona
- [ ] Listar categorias funciona

## 🐛 Erros Comuns

### 401 Unauthorized
- Token expirado ou inválido
- Faça login novamente

### 404 Not Found
- ID do recurso não existe
- Verifique se o ID está correto

### 400 Bad Request
- Dados inválidos no body
- Verifique o formato JSON

### 500 Internal Server Error
- Erro no servidor
- Verifique os logs do servidor

## 📊 Usando Prisma Studio

Para visualizar os dados no banco:
```bash
npm run prisma:studio
```

Acesse: http://localhost:5555

## 🔧 Ferramentas Recomendadas

- **Postman** - Cliente HTTP visual
- **Insomnia** - Alternativa ao Postman
- **Thunder Client** - Extensão do VS Code
- **curl** - Linha de comando
- **httpie** - curl mais amigável
