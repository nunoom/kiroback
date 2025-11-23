# 🚀 Guia de Deploy

## Opções de Deploy

### 1. Railway (Recomendado para Iniciantes)

Railway oferece deploy gratuito com PostgreSQL incluído.

#### Passos:

1. Crie uma conta em [railway.app](https://railway.app)
2. Instale o Railway CLI:
```bash
npm install -g @railway/cli
```

3. Faça login:
```bash
railway login
```

4. Inicialize o projeto:
```bash
railway init
```

5. Adicione PostgreSQL:
```bash
railway add postgresql
```

6. Configure as variáveis de ambiente no dashboard do Railway:
```
DATABASE_URL=(gerado automaticamente)
JWT_SECRET=seu_secret_super_seguro
PORT=3000
NODE_ENV=production
```

7. Deploy:
```bash
railway up
```

8. Execute as migrations:
```bash
railway run npm run prisma:migrate
```

### 2. Render

Render oferece plano gratuito com PostgreSQL.

#### Passos:

1. Crie uma conta em [render.com](https://render.com)
2. Crie um novo PostgreSQL database
3. Crie um novo Web Service
4. Conecte seu repositório GitHub
5. Configure:
   - Build Command: `npm install && npm run build && npx prisma generate`
   - Start Command: `npm start`
6. Adicione variáveis de ambiente
7. Deploy automático!

### 3. Heroku

#### Passos:

1. Instale o Heroku CLI
2. Login:
```bash
heroku login
```

3. Crie o app:
```bash
heroku create nome-do-seu-app
```

4. Adicione PostgreSQL:
```bash
heroku addons:create heroku-postgresql:mini
```

5. Configure variáveis:
```bash
heroku config:set JWT_SECRET=seu_secret
heroku config:set NODE_ENV=production
```

6. Deploy:
```bash
git push heroku main
```

7. Execute migrations:
```bash
heroku run npm run prisma:migrate
```

### 4. DigitalOcean App Platform

1. Crie uma conta no DigitalOcean
2. Crie um novo App
3. Conecte seu repositório
4. Adicione um PostgreSQL database
5. Configure variáveis de ambiente
6. Deploy!

### 5. AWS (Avançado)

#### Componentes:
- **EC2**: Servidor da aplicação
- **RDS**: PostgreSQL gerenciado
- **S3**: Armazenamento de imagens
- **CloudFront**: CDN
- **Route 53**: DNS

#### Passos básicos:

1. Crie uma instância RDS PostgreSQL
2. Crie uma instância EC2
3. Instale Node.js e PM2
4. Clone o repositório
5. Configure variáveis de ambiente
6. Execute a aplicação com PM2

### 6. VPS (DigitalOcean, Linode, Vultr)

#### Setup completo:

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PostgreSQL
sudo apt install postgresql postgresql-contrib

# Instalar PM2
sudo npm install -g pm2

# Clonar repositório
git clone seu-repositorio.git
cd seu-repositorio

# Instalar dependências
npm install

# Configurar .env
nano .env

# Build
npm run build

# Executar migrations
npm run prisma:migrate

# Iniciar com PM2
pm2 start dist/main.js --name dropshipping-api
pm2 save
pm2 startup
```

## 📋 Checklist Pré-Deploy

- [ ] Todas as variáveis de ambiente configuradas
- [ ] JWT_SECRET forte e único
- [ ] DATABASE_URL correto
- [ ] Migrations executadas
- [ ] Seeds executados (se necessário)
- [ ] Build sem erros
- [ ] Testes passando
- [ ] CORS configurado corretamente
- [ ] Rate limiting ativado
- [ ] Logs configurados

## 🔐 Variáveis de Ambiente Obrigatórias

```env
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=seu_secret_super_seguro_minimo_32_caracteres
PORT=3000
NODE_ENV=production
```

## 🔒 Segurança em Produção

### 1. Use HTTPS
Configure SSL/TLS no seu servidor ou use um proxy reverso como Nginx.

### 2. Configure CORS
```typescript
app.enableCors({
  origin: ['https://seu-frontend.com'],
  credentials: true,
});
```

### 3. Rate Limiting
Instale e configure:
```bash
npm install @nestjs/throttler
```

### 4. Helmet
```bash
npm install helmet
```

### 5. Variáveis de Ambiente
Nunca commite o arquivo `.env`!

## 📊 Monitoramento

### PM2 Monitoring
```bash
pm2 monit
pm2 logs
```

### Logs
Configure logs estruturados:
```bash
npm install winston
```

### Health Check
Adicione endpoint de health:
```typescript
@Get('health')
health() {
  return { status: 'ok', timestamp: new Date() };
}
```

## 🔄 CI/CD com GitHub Actions

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - run: npm test
      # Adicione steps de deploy aqui
```

## 🐳 Docker em Produção

### Dockerfile otimizado:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npx prisma generate

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
EXPOSE 3000
CMD ["node", "dist/main"]
```

### Docker Compose para produção:
```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - postgres
    restart: always

  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

volumes:
  postgres_data:
```

## 🔧 Troubleshooting

### Erro de conexão com banco
- Verifique DATABASE_URL
- Verifique firewall/security groups
- Teste conexão: `psql $DATABASE_URL`

### Migrations não aplicadas
```bash
npx prisma migrate deploy
```

### Porta já em uso
```bash
lsof -ti:3000 | xargs kill -9
```

### PM2 não inicia
```bash
pm2 delete all
pm2 start dist/main.js
```

## 📈 Otimizações de Performance

1. **Enable compression**
```bash
npm install @fastify/compress
```

2. **Connection pooling**
Configure no Prisma:
```typescript
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  pool_size = 10
}
```

3. **Cache com Redis**
```bash
npm install @nestjs/cache-manager cache-manager
```

## 💰 Custos Estimados

### Gratuito
- Railway (500h/mês)
- Render (750h/mês)
- Heroku (550h/mês)

### Pago
- DigitalOcean: $5-20/mês
- AWS: $10-50/mês
- VPS: $5-10/mês

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs
2. Consulte a documentação
3. Abra uma issue no GitHub
4. Entre em contato com a comunidade

---

**Boa sorte com seu deploy! 🚀**
