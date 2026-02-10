const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
      const email = "domingosifafe@gmail.com"; // User email from previous checks

      const user = await prisma.user.update({
            where: { email: email },
            data: { role: 'ADMIN' },
      });

      console.log(`User ${user.email} is now ${user.role}`);
}

main()
      .catch((e) => {
            console.error(e);
            process.exit(1);
      })
      .finally(async () => {
            await prisma.$disconnect();
      });
