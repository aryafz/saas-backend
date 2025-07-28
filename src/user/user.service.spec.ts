import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;
  const prisma = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  } as unknown as PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserService, { provide: PrismaService, useValue: prisma }],
    }).compile();
    service = module.get(UserService);
  });

  it('creates user', async () => {
    (prisma.user.create as jest.Mock).mockResolvedValue({ id: '1' });

    await expect(
      service.create({ email: 'a', password: 'b', role: 'user' }),
    ).resolves.toEqual({ id: '1' });
  });
});
