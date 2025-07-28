import { Test } from '@nestjs/testing';
import { PlanService } from './plan.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PlanService', () => {
  let service: PlanService;
  const prisma = {
    plan: { create: jest.fn(), findMany: jest.fn() },
  } as unknown as PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PlanService, { provide: PrismaService, useValue: prisma }],
    }).compile();
    service = module.get(PlanService);
  });

  it('creates plan', async () => {
    (prisma.plan.create as jest.Mock).mockResolvedValue({ id: 'p' });
    await expect(service.create({ name: 'pro', price: 1 })).resolves.toEqual({
      id: 'p',
    });
  });
});
