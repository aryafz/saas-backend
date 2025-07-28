import { Test } from '@nestjs/testing';
import { SiteService } from './site.service';
import { PrismaService } from '../prisma/prisma.service';

describe('SiteService', () => {
  let service: SiteService;
  const prisma = {
    site: { create: jest.fn(), findMany: jest.fn() },
  } as unknown as PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SiteService, { provide: PrismaService, useValue: prisma }],
    }).compile();
    service = module.get(SiteService);
  });

  it('creates site', async () => {
    (prisma.site.create as jest.Mock).mockResolvedValue({ id: 's' });
    await expect(service.create({ name: 'a', ownerId: 'u' })).resolves.toEqual({
      id: 's',
    });
  });
});
