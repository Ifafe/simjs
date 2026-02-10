
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
      console.log('🌱 Starting seed...');

      // 1. Create/Update Admin User
      const adminEmail = 'admin@simjs.com';
      const adminUser = await prisma.user.upsert({
            where: { email: adminEmail },
            update: {},
            create: {
                  email: adminEmail,
                  name: 'Admin SIMJS',
                  role: 'ADMIN',
                  image: 'https://ui-avatars.com/api/?name=Admin+SIMJS&background=random',
                  // In production, you might want to handle passwords differently (e.g. hashing)
                  // For now, we are using the simple password field as per current implementation
                  password: 'admin'
            },
      });
      console.log(`👤 Admin user upserted: ${adminUser.email}`);

      // 2. Create/Update Hero Section
      const hero = await prisma.heroSection.upsert({
            where: { id: 1 },
            update: {},
            create: {
                  title: 'Soluções Empresariais',
                  highlight: 'Inovadoras',
                  subtitle: 'Transformamos ideias em resultados. Descubra como o Grupo SIMJS pode impulsionar o seu negócio.',
                  ctaText: 'Comece Agora',
                  ctaLink: '/login'
            }
      });
      console.log(`✨ Hero section upserted.`);

      console.log('✅ Seed completed.');
}

main()
      .catch((e) => {
            console.error(e);
            process.exit(1);
      })
      .finally(async () => {
            await prisma.$disconnect();
      });
