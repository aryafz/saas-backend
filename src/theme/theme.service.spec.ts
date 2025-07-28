import { Test } from '@nestjs/testing';
import { ThemeService } from './theme.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ThemeService', () => {
  let service: ThemeService;
  const prisma = { theme: { create: jest.fn() } } as unknown as PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThemeService, { provide: PrismaService, useValue: prisma }],
    }).compile();
    service = module.get(ThemeService);
  });

  it('creates theme', async () => {
    (prisma.theme.create as jest.Mock).mockResolvedValue({ id: 't' });
    await expect(
      service.create({ key: 'k', name: 'theme', assetsUrl: 'url' }),
    ).resolves.toEqual({ id: 't' });
  });
});
