import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Criar categorias
  const categoria1 = await prisma.category.create({
    data: {
      name: 'Eletrônicos',
      description: 'Produtos eletrônicos e tecnologia',
      slug: 'eletronicos',
    },
  });

  const categoria2 = await prisma.category.create({
    data: {
      name: 'Moda',
      description: 'Roupas e acessórios',
      slug: 'moda',
    },
  });

  console.log('✅ Categorias criadas');

  // Criar usuário vendedor
  const hashedPassword = await bcrypt.hash('senha123', 10);
  const vendedor = await prisma.user.create({
    data: {
      email: 'vendedor@example.com',
      password: hashedPassword,
      name: 'João Vendedor',
      role: 'SELLER',
      phone: '11999999999',
    },
  });

  // Criar perfil de vendedor
  const seller = await prisma.seller.create({
    data: {
      userId: vendedor.id,
      storeName: 'Loja do João',
      description: 'Os melhores produtos com os melhores preços',
      commission: 10.0,
    },
  });

  console.log('✅ Vendedor criado');

  // Criar produtos
  await prisma.product.createMany({
    data: [
      {
        name: 'Smartphone Galaxy X',
        description: 'Smartphone de última geração com 128GB',
        price: 1999.99,
        stock: 50,
        sku: 'PHONE-001',
        images: ['https://via.placeholder.com/400'],
        sellerId: seller.id,
        categoryId: categoria1.id,
      },
      {
        name: 'Notebook Pro 15',
        description: 'Notebook profissional com 16GB RAM',
        price: 4999.99,
        stock: 30,
        sku: 'NOTE-001',
        images: ['https://via.placeholder.com/400'],
        sellerId: seller.id,
        categoryId: categoria1.id,
      },
      {
        name: 'Camiseta Premium',
        description: 'Camiseta 100% algodão',
        price: 79.99,
        stock: 100,
        sku: 'SHIRT-001',
        images: ['https://via.placeholder.com/400'],
        sellerId: seller.id,
        categoryId: categoria2.id,
      },
    ],
  });

  console.log('✅ Produtos criados');

  // Criar usuário cliente
  const cliente = await prisma.user.create({
    data: {
      email: 'cliente@example.com',
      password: hashedPassword,
      name: 'Maria Cliente',
      role: 'CUSTOMER',
      phone: '11988888888',
    },
  });

  // Criar endereço
  await prisma.address.create({
    data: {
      userId: cliente.id,
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brasil',
      isDefault: true,
    },
  });

  console.log('✅ Cliente e endereço criados');
  console.log('\n🎉 Seed concluído com sucesso!');
  console.log('\n📧 Credenciais de teste:');
  console.log('Vendedor: vendedor@example.com / senha123');
  console.log('Cliente: cliente@example.com / senha123');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
