import { Test } from '@nestjs/testing';
import { FeatureService } from './feature.service';
import { PrismaService } from '../prisma/prisma.service';

describe('FeatureService', () => {
  let service: FeatureService;
  const prisma = { feature: { create: jest.fn() } } as unknown as PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [FeatureService, { provide: PrismaService, useValue: prisma }],
    }).compile();
    service = module.get(FeatureService);
  });

  it('creates feature', async () => {
    (prisma.feature.create as jest.Mock).mockResolvedValue({ id: 'f' });
    await expect(
      service.create({ code: 'FEAT', name: 'feat' }),
    ).resolves.toEqual({
      id: 'f',
    });
  });
});
