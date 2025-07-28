import { PrismaClient, Role } from '../generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password,
      role: Role.SUPER_ADMIN,
    },
  });

  const basicPlan = await prisma.plan.create({
    data: {
      name: 'Basic',
      price: 0,
    },
  });

  await prisma.site.create({
    data: {
      name: 'Default Site',
      ownerId: admin.id,
      plans: {
        create: {
          planId: basicPlan.id,
          status: 'ACTIVE',
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
