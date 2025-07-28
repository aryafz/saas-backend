import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash(
    process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!',
    10,
  );
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: { email: 'admin@example.com', password, role: Role.super_admin },
  });
  const plan = await prisma.plan.upsert({
    where: { code: 'BASIC' },
    update: {},
    create: { code: 'BASIC', name: 'Basic', priceCents: 9900, currency: 'USD' },
  });
  const feat = await prisma.feature.upsert({
    where: { code: 'CUSTOM_DOMAIN' },
    update: {},
    create: { code: 'CUSTOM_DOMAIN', name: 'Custom Domain' },
  });
  await prisma.planFeature.upsert({
    where: { planId_featureId: { planId: plan.id, featureId: feat.id } },
    update: {},
    create: { planId: plan.id, featureId: feat.id },
  });
  await prisma.theme.upsert({
    where: { code: 'DEFAULT' },
    update: {},
    create: { code: 'DEFAULT', name: 'Default Theme' },
  });
  console.log('Seed completed:', { admin: admin.email });
}

void main()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => void prisma.$disconnect());
