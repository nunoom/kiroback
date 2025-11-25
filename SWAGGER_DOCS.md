# Documentação Swagger - Melhorias Implementadas

## 📋 Resumo

Este documento descreve as melhorias implementadas na documentação Swagger da API de Dropshipping.

## ✅ Melhorias Implementadas

### 1. DTOs com Decorators do Swagger

Todos os DTOs agora incluem decorators `@ApiProperty` e `@ApiPropertyOptional` com:
- **Descrições claras** de cada campo
- **Exemplos práticos** de valores
- **Validações** (min, max, enum, etc.)
- **Tipos de dados** explícitos

#### DTOs Atualizados:
- ✅ `LoginDto` - Login de usuário
- ✅ `RegisterDto` - Registro de usuário
- ✅ `CreateProductDto` - Criação de produto
- ✅ `UpdateProductDto` - Atualização de produto
- ✅ `AddToCartDto` - Adicionar ao carrinho
- ✅ `CreateOrderDto` - Criar pedido
- ✅ `CreateCategoryDto` - Criar categoria
- ✅ `CreateSellerDto` - Criar perfil de vendedor

### 2. DTOs de Resposta

Criados DTOs específicos para documentar as respostas da API:
- ✅ `AuthResponseDto` - Resposta de autenticação (login/registro)
- ✅ `ProductResponseDto` - Resposta de produto

### 3. Controllers com Documentação Completa

Todos os controllers foram atualizados com:
- **@ApiOperation** - Descrição detalhada de cada endpoint
- **@ApiResponse** - Exemplos de respostas de sucesso e erro
- **@ApiBearerAuth** - Indicação de rotas protegidas
- **@ApiQuery** - Documentação de query parameters
- **@ApiBody** - Documentação de body parameters

#### Controllers Atualizados:
- ✅ `AuthController` - Autenticação
- ✅ `ProductsController` - Produtos
- ✅ `CartController` - Carrinho
- ✅ `OrdersController` - Pedidos
- ✅ `CategoriesController` - Categorias
- ✅ `SellersController` - Vendedores
- ✅ `UsersController` - Usuários

### 4. Configuração do Swagger Melhorada

O arquivo `main.ts` foi atualizado com:
- **deepScanRoutes: true** - Escaneia rotas profundamente
- **persistAuthorization: true** - Mantém token JWT entre recarregamentos
- **docExpansion: 'none'** - Interface mais limpa
- **filter: true** - Permite filtrar endpoints
- **showRequestDuration: true** - Mostra tempo de resposta

## 🎯 Benefícios

### Para Desenvolvedores:
- ✅ Schemas JSON completos para todos os DTOs
- ✅ Exemplos práticos em cada endpoint
- ✅ Validações visíveis na documentação
- ✅ Tipos de dados explícitos

### Para Testadores:
- ✅ Exemplos prontos para copiar e testar
- ✅ Descrições claras de cada campo
- ✅ Códigos de status HTTP documentados
- ✅ Mensagens de erro esperadas

### Para Integradores:
- ✅ Documentação completa da API
- ✅ Schemas exportáveis
- ✅ Exemplos de requisição e resposta
- ✅ Autenticação JWT documentada

## 📚 Como Usar

### 1. Iniciar o Servidor
```bash
npm run start:dev
```

### 2. Acessar o Swagger
Abra no navegador: `http://localhost:3000/api`

### 3. Testar Endpoints

#### Autenticação:
1. Vá para `POST /auth/register` ou `POST /auth/login`
2. Clique em "Try it out"
3. Use os exemplos fornecidos ou modifique conforme necessário
4. Execute e copie o `access_token` da resposta

#### Usar Token JWT:
1. Clique no botão "Authorize" no topo da página
2. Cole o token no formato: `Bearer seu_token_aqui`
3. Clique em "Authorize"
4. Agora você pode testar endpoints protegidos

## 🔍 Exemplos de Schemas

### Exemplo: Criar Produto
```json
{
  "name": "Smartphone XYZ Pro",
  "description": "Smartphone de última geração com câmera de 108MP e 5G",
  "price": 599.99,
  "stock": 50,
  "sku": "SMART-XYZ-001",
  "images": [
    "https://exemplo.com/img1.jpg",
    "https://exemplo.com/img2.jpg"
  ],
  "isActive": true,
  "categoryId": "clm0987654321fedcba"
}
```
**Nota:** O campo `sellerId` é opcional. Se não fornecido, usa o seller do usuário autenticado.

### Exemplo: Login
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

### Exemplo: Adicionar ao Carrinho
```json
{
  "productId": "clm1234567890abcdef",
  "quantity": 2
}
```

## 🎨 Interface do Swagger

A interface agora mostra:
- ✅ **Schemas** - Modelos de dados na seção "Schemas" no final da página
- ✅ **Examples** - Exemplos em cada endpoint
- ✅ **Validations** - Regras de validação visíveis
- ✅ **Responses** - Exemplos de respostas de sucesso e erro
- ✅ **Authentication** - Indicação clara de rotas protegidas

## 📝 Notas

- Todos os endpoints protegidos exigem autenticação JWT
- Use o botão "Authorize" para configurar o token
- Os exemplos podem ser copiados e modificados
- A documentação é gerada automaticamente a partir do código
